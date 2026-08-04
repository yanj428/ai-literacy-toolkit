// The lesson detail markup, as a pure function of the lesson data.
//
// It lives apart from app.js because two things render it: the browser, when a
// lesson is opened, and build.js, which writes the same markup into each
// lesson's static page so a crawler and a reader arriving cold both see the
// lesson rather than an empty container. One copy, so the two cannot drift.

// Indexed by lesson position, so they are read modulo their length: a sixth
// lesson reuses the first swatch rather than rendering "background:undefined".
const colors = ['#E1E6FD','#DCE3FB','#E6E9FE','#ECE5FD','#EFE8FE'];
const colorsText = ['#2E43E6','#1B2361','#3B4FE0','#6C3CE0','#7B2FE0'];
const swatch = i => colors[i % colors.length];
const swatchText = i => colorsText[i % colorsText.length];

function renderContentBlock(b, t) {
  const text = b.text ? `<p>${b.text[t] || b.text.en}</p>` : '';
  const items = b.items ? `<ul>${(b.items[t] || b.items.en).map(p => `<li>${p}</li>`).join('')}</ul>` : '';
  const link = b.link ? `<p><a href="${b.link.url}" target="_blank" rel="noopener" class="modal-link">🔗 ${b.link.label[t] || b.link.label.en}</a></p>` : '';
  const tip = b.tip ? `<div class="modal-tip">💡 <span>${b.tip[t] || b.tip.en}</span></div>` : '';
  if (b.activityStyle) {
    const heading = b.heading ? `<h4>🎯 ${b.heading[t] || b.heading.en}</h4>` : '';
    return `<div class="modal-activity">${heading}${text}${items}${link}</div>${tip}`;
  }
  const heading = b.heading ? `<h3>${b.heading[t] || b.heading.en}</h3>` : '';
  return heading + text + items + link + tip;
}

function lessonDetailHtml(l, i, t, mode) {
  const m = l.materials[mode];
  const act = l.activity[mode];
  const currentMode = mode;   // the template below reads this name
  return `
    <div class="modal-icon">${l.icon}</div>
    <h2>${l.title[t] || l.title.en}</h2>
    <div class="modal-meta">
      <span class="modal-tag" style="background:${swatch(i)};color:${swatchText(i)}">${t==='th' ? 'บทที่ '+(i+1) : 'Lesson '+(i+1)}</span>
      <span class="modal-tag" style="background:#EDF0FD;color:var(--muted)">⏱ ${l.duration}</span>
    </div>

    <div class="mode-toggle modal-mode-toggle" role="group" aria-label="${t==='th' ? 'รูปแบบห้องเรียน' : 'Classroom setup'}">
      <button type="button" data-mode="notech" class="${currentMode==='notech' ? 'active' : ''}" aria-pressed="${currentMode==='notech'}" onclick="setMode('notech')"><span aria-hidden="true">📴</span> ${t==='th' ? 'ไม่ใช้เทคโนโลยี' : 'No Technology'}</button>
      <button type="button" data-mode="tech" class="${currentMode==='tech' ? 'active' : ''}" aria-pressed="${currentMode==='tech'}" onclick="setMode('tech')"><span aria-hidden="true">💻</span> ${t==='th' ? 'ใช้เทคโนโลยี' : 'Technology'}</button>
    </div>

    <div class="modal-body">
      <p><strong>${t==='th' ? 'จุดประสงค์: ' : 'Objective: '}</strong>${l.objective[t] || l.objective.en}</p>
      ${l.groupSize ? `<p><strong>${t==='th' ? 'ขนาดกลุ่ม: ' : 'Group Size: '}</strong>${l.groupSize[t] || l.groupSize.en}</p>` : ''}

      <h3>${t==='th' ? 'อุปกรณ์ที่ต้องเตรียม' : 'Materials Needed'}</h3>
      <ul>${(m[t] || m.en).map(p => `<li>${p}</li>`).join('')}</ul>

      ${l.beforeYouBegin ? `
      <h3>${t==='th' ? 'ก่อนเริ่มบทเรียน' : 'Before You Begin'}</h3>
      <p>${l.beforeYouBegin[t] || l.beforeYouBegin.en}</p>
      ` : ''}
      ${l.tipBeforeYouBegin ? `<div class="modal-tip">💡 <span>${l.tipBeforeYouBegin[t] || l.tipBeforeYouBegin.en}</span></div>` : ''}

      <h3>${t==='th' ? 'คำถามนำเข้าบทเรียน' : 'Warm-Up'}</h3>
      <ul>${(l.warmup[t] || l.warmup.en).map(p => `<li>${p}</li>`).join('')}</ul>
      ${l.tipWarmup ? `<div class="modal-tip">💡 <span>${l.tipWarmup[t] || l.tipWarmup.en}</span></div>` : ''}

      <h3>${t==='th' ? 'คำอธิบาย' : 'Explanation'}</h3>
      <p>${l.explanation[t] || l.explanation.en}</p>
      ${l.aiAroundUs ? `
      <h3>${t==='th' ? 'AI รอบตัวเรา' : 'AI Around Us'}</h3>
      <ul>${(l.aiAroundUs[t] || l.aiAroundUs.en).map(p => `<li>${p}</li>`).join('')}</ul>
      ` : ''}
      ${l.tipAiAroundUs ? `<div class="modal-tip">💡 <span>${l.tipAiAroundUs[t] || l.tipAiAroundUs.en}</span></div>` : ''}
      ${(l.bodyBlocks || []).map(b => renderContentBlock(b, t)).join('')}

      <div class="modal-activity">
        <h4>🎯 ${t==='th' ? 'กิจกรรมในชั้นเรียน' : 'Classroom Activity'} <span class="modal-activity-mode">${currentMode==='notech' ? (t==='th'?'(ไม่ใช้เทคโนโลยี)':'(No Technology)') : (t==='th'?'(ใช้เทคโนโลยี)':'(Technology)')}</span></h4>
        <p>${act[t] || act.en}</p>
        ${l.whyMistakes ? `<p>${l.whyMistakes[t] || l.whyMistakes.en}</p>` : ''}
      </div>
      ${l.tipActivity ? `<div class="modal-tip">💡 <span>${l.tipActivity[t] || l.tipActivity.en}</span></div>` : ''}
      ${(l.postActivityBlocks || []).map(b => renderContentBlock(b, t)).join('')}

      <h3>${t==='th' ? 'คำถามสะท้อนคิด' : 'Reflection Questions'}</h3>
      <ul>${(l.reflection[t] || l.reflection.en).map(p => `<li>${p}</li>`).join('')}</ul>
      ${l.exitTicket ? `<p class="modal-exit-ticket">${l.exitTicket[t] || l.exitTicket.en}</p>` : ''}

      ${l.misconceptions ? `
      <h3>${(l.misconceptionsHeading && (l.misconceptionsHeading[t] || l.misconceptionsHeading.en)) || (t==='th' ? 'ความเข้าใจผิดที่พบบ่อย' : 'Common Misconceptions to Watch For')}</h3>
      <ul>${l.misconceptions.map(m2 => `<li><strong>"${m2.claim[t] || m2.claim.en}"</strong> ${m2.explanation[t] || m2.explanation.en}</li>`).join('')}</ul>
      ` : ''}

      ${l.differentiation ? `
      <h3>${t==='th' ? 'การปรับกิจกรรมตามระดับ' : 'Differentiation'}</h3>
      <ul>
        <li><strong>${t==='th' ? 'เสริมสำหรับผู้ต้องการความช่วยเหลือ: ' : 'Extra support: '}</strong>${l.differentiation.support[t] || l.differentiation.support.en}</li>
        <li><strong>${t==='th' ? 'ท้าทายเพิ่มเติม: ' : 'Extra challenge: '}</strong>${l.differentiation.challenge[t] || l.differentiation.challenge.en}</li>
      </ul>
      ` : ''}

      ${l.assessmentMaterials ? `
      <h3>${t==='th' ? 'การประเมิน / เอกสารประกอบการสอน' : 'Assessment / Materials Provided'}</h3>
      <ul>${(l.assessmentMaterials[t] || l.assessmentMaterials.en).map(p => `<li>${p}</li>`).join('')}</ul>
      ` : ''}
    </div>`;
}

// Node reads this file with eval; the browser just defines the globals.
if (typeof module !== 'undefined') module.exports = { lessonDetailHtml, swatch, swatchText };
