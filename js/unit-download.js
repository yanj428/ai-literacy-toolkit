// "Download the whole unit": every slide deck and worksheet in one file.
//
// The zip is built in the browser rather than committed to the repository.
// A checked-in archive would be a second copy of files that already live
// here, and it would go stale the moment a deck is re-exported - the same
// class of problem as a stale pre-rendered page, but silent, because nothing
// would look wrong until a teacher opened it. It would also add 24MB to every
// clone, and another 24MB to the history each time it changed.
//
// Depends on `lessons` and on asset()/currentLang from app.js.

// Entries are stored, not deflated. PDFs are already compressed, so deflating
// them costs CPU and saves close to nothing.
const ZIP_STORED = 0;

// A fixed timestamp, so the same inputs always produce byte-identical output
// and the file does not appear to change when it has not. 1 Jan 2026, in the
// DOS date format zip uses: year since 1980 << 9 | month << 5 | day.
const ZIP_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;
const ZIP_TIME = 0;

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

// Builds a zip from [{ name, bytes }]. Only what this needs: no directories,
// no deflate, no zip64. Every file here is far below the 4GB point where
// zip64 becomes necessary.
function buildZip(files) {
  const enc = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;

  const u32 = n => new Uint8Array([n & 0xFF, (n >>> 8) & 0xFF, (n >>> 16) & 0xFF, (n >>> 24) & 0xFF]);
  const u16 = n => new Uint8Array([n & 0xFF, (n >>> 8) & 0xFF]);
  const cat = parts => {
    const len = parts.reduce((a, p) => a + p.length, 0);
    const out = new Uint8Array(len);
    let at = 0;
    for (const p of parts) { out.set(p, at); at += p.length; }
    return out;
  };

  for (const f of files) {
    const name = enc.encode(f.name);
    const crc = crc32(f.bytes);
    const size = f.bytes.length;

    const local = cat([
      u32(0x04034b50), u16(20), u16(0x0800),   // 0x0800: the name is UTF-8
      u16(ZIP_STORED), u16(ZIP_TIME), u16(ZIP_DATE),
      u32(crc), u32(size), u32(size),
      u16(name.length), u16(0), name,
    ]);
    chunks.push(local, f.bytes);

    central.push(cat([
      u32(0x02014b50), u16(20), u16(20), u16(0x0800),
      u16(ZIP_STORED), u16(ZIP_TIME), u16(ZIP_DATE),
      u32(crc), u32(size), u32(size),
      u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0),
      u32(offset), name,
    ]));
    offset += local.length + size;
  }

  const dir = cat(central);
  const end = cat([
    u32(0x06054b50), u16(0), u16(0),
    u16(files.length), u16(files.length),
    u32(dir.length), u32(offset), u16(0),
  ]);
  return new Blob([...chunks, dir, end], { type: 'application/zip' });
}

// What goes in the bundle: the printable set. The editable .pptx files stay a
// per-lesson download - including them would push 24MB to 39MB for something
// most teachers never open.
function unitFiles() {
  const out = [];
  lessons.forEach((l, i) => {
    const n = i + 1;
    if (l.slidesFile) {
      out.push({ url: l.slidesFile.replace(/\.pptx$/, '.pdf'), name: `slides/lesson-${n}-slides.pdf` });
    }
    if (l.worksheetFile) {
      out.push({ url: l.worksheetFile, name: `worksheets/lesson-${n}-worksheet.pdf` });
    }
  });
  return out;
}

function unitReadme() {
  const list = lessons.map((l, i) => `  ${i + 1}. ${l.title.en} (${l.duration})`).join('\n');
  return `AI Literacy Toolkit
Five lesson plans for ages 11-14, by Youth of Change.

${list}

This bundle contains the slide deck and the printable worksheet for each
lesson, as PDFs. The full lesson plans - objectives, materials, activities,
reflection questions - are on the website, in English and Thai:

  ${location.origin}${BASE}

Editable PowerPoint versions of the decks are on each lesson's page.

Licensed CC BY-NC 4.0: share and adapt freely, credit Youth of Change, and
do not sell. https://creativecommons.org/licenses/by-nc/4.0/
`;
}

const UNIT_TEXT = {
  idle:  { en: '⬇ Download all (ZIP)', th: '⬇ ดาวน์โหลดทั้งหมด (ZIP)' },
  done:  { en: '✓ Downloaded', th: '✓ ดาวน์โหลดแล้ว' },
  fail:  { en: '✗ Download failed - try again', th: '✗ ดาวน์โหลดไม่สำเร็จ ลองอีกครั้ง' },
  prep:  { en: 'Packaging…', th: 'กำลังรวมไฟล์…' },
};

function unitStatus(msg) {
  const el = document.getElementById('unit-download-status');
  if (el) el.textContent = msg;
}

// 24MB over a school connection is not instant, so the button reports which
// file it is on rather than looking stuck.
async function downloadUnit(btn) {
  if (btn.dataset.busy) return;
  btn.dataset.busy = '1';
  btn.disabled = true;
  const t = currentLang;
  const files = unitFiles();
  const label = n => (t === 'th' ? `กำลังดาวน์โหลด ${n}/${files.length}…` : `Downloading ${n} of ${files.length}…`);

  try {
    const fetched = [];
    for (let i = 0; i < files.length; i++) {
      btn.textContent = label(i + 1);
      unitStatus(label(i + 1));
      const res = await fetch(asset(files[i].url));
      if (!res.ok) throw new Error(files[i].url);
      fetched.push({ name: `ai-literacy-toolkit/${files[i].name}`, bytes: new Uint8Array(await res.arrayBuffer()) });
    }

    btn.textContent = UNIT_TEXT.prep[t];
    unitStatus(UNIT_TEXT.prep[t]);
    fetched.push({
      name: 'ai-literacy-toolkit/README.txt',
      bytes: new TextEncoder().encode(unitReadme()),
    });

    const url = URL.createObjectURL(buildZip(fetched));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-literacy-toolkit.zip';
    a.click();
    // Revoked on a delay: revoking immediately can cancel the download in
    // some browsers before it has read the blob.
    setTimeout(() => URL.revokeObjectURL(url), 60000);

    btn.textContent = UNIT_TEXT.done[t];
    unitStatus(t === 'th' ? 'ดาวน์โหลดเสร็จแล้ว' : 'Download ready.');
  } catch (e) {
    btn.textContent = UNIT_TEXT.fail[t];
    unitStatus(t === 'th' ? 'ดาวน์โหลดไม่สำเร็จ' : 'Download failed.');
  } finally {
    delete btn.dataset.busy;
    btn.disabled = false;
    setTimeout(() => { btn.textContent = UNIT_TEXT.idle[currentLang]; }, 6000);
  }
}
