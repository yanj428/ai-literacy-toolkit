// Lesson content for the AI Literacy Toolkit (EN + TH).
// Data only, no DOM access. Consumed by js/app.js.

const lessons = [
  {
    id: 'what-is-ai', icon: '🧠', duration: '40–50 min',
    slidesFile: 'slides/lesson-1-what-is-ai.pptx',
    image: 'assets/lessons/lesson-1-what-is-ai-en.jpg', imageRatio: '1672/941', imageTh: 'assets/lessons/lesson-1-what-is-ai-th.jpg',
    title: { en: 'What Is AI?', th: 'AI คืออะไร?' },
    short: { en: 'A first look at what AI is and where students already meet it every day.', th: 'ทำความรู้จัก AI เบื้องต้น และจุดที่นักเรียนพบเจอ AI ในชีวิตประจำวันอยู่แล้ว' },
    objective: { en: 'Students will understand what AI is and identify examples of AI in daily life.', th: 'นักเรียนจะเข้าใจว่า AI คืออะไร และสามารถระบุตัวอย่างการใช้ AI ในชีวิตประจำวันได้' },
    materials: {
      notech: {
        en: ['Printed picture cards (apple, chair, desk, cat)', 'AI-generated versions of the same pictures', 'Poster paper for group answers'],
        th: ['การ์ดรูปภาพพิมพ์ (แอปเปิล เก้าอี้ โต๊ะ แมว)', 'รูปภาพชุดเดียวกันที่สร้างโดย AI', 'กระดาษโปสเตอร์สำหรับบันทึกคำตอบกลุ่ม']
      },
      tech: {
        en: ['Slide presentation with AI examples', 'Projector or screen to display images', 'Optional: quiz app (e.g. Kahoot) for voting'],
        th: ['สไลด์นำเสนอพร้อมตัวอย่าง AI', 'โปรเจกเตอร์หรือหน้าจอแสดงภาพ', 'ทางเลือก: แอปแบบทดสอบ (เช่น Kahoot) สำหรับโหวต']
      }
    },
    warmup: { en: ['Have you ever used TikTok?', 'How does YouTube know what videos you like?'], th: ['เคยเล่น TikTok ไหม?', 'YouTube รู้ได้อย่างไรว่าเราชอบดูวิดีโอแบบไหน?'] },
    explanation: {
      en: 'AI is a computer program that learns from data to help people solve problems. Everyday examples include face unlock, voice assistants, translation apps, and recommendation systems.',
      th: 'AI คือโปรแกรมคอมพิวเตอร์ที่เรียนรู้จากข้อมูลเพื่อช่วยแก้ปัญหาให้มนุษย์ ตัวอย่างที่พบในชีวิตประจำวัน ได้แก่ การปลดล็อกด้วยใบหน้า ผู้ช่วยเสียง แอปแปลภาษา และระบบแนะนำเนื้อหา'
    },
    activity: {
      notech: {
        en: 'Real or AI? In groups, students sort printed picture cards into "Uses AI" and "Does not use AI", then discuss the clues that helped them decide.',
        th: 'จริงหรือ AI? แบ่งกลุ่มให้นักเรียนจัดหมวดหมู่การ์ดรูปภาพพิมพ์เป็น "ใช้ AI" และ "ไม่ใช้ AI" แล้วอภิปรายเบาะแสที่ช่วยให้ตัดสินใจได้'
      },
      tech: {
        en: 'Real or AI? Display image pairs on the projector one at a time. Students vote (hands up or quiz app) on which one is AI-generated, then discuss the clues as a class.',
        th: 'จริงหรือ AI? ฉายภาพคู่ทีละคู่บนโปรเจกเตอร์ ให้นักเรียนโหวต (ยกมือหรือใช้แอปแบบทดสอบ) ว่าภาพไหนสร้างโดย AI แล้วอภิปรายเบาะแสร่วมกันทั้งชั้น'
      }
    },
    reflection: { en: ['Name one AI tool you use every day.', 'How does AI help people?'], th: ['บอกชื่อเครื่องมือ AI ที่คุณใช้ทุกวันมาหนึ่งอย่าง', 'AI ช่วยเหลือมนุษย์อย่างไรบ้าง?'] },
    groupSize: { en: 'Whole class + independent', th: 'ทั้งชั้นเรียน + ฝึกด้วยตนเอง' },
    beforeYouBegin: { en: 'Print or prepare 3 rounds of real-vs-AI photo pairs (labeled A/B) ahead of time. These are the heart of the lesson, so having them ready to project or hand out saves class time.', th: 'เตรียมภาพคู่ "จริงหรือ AI" จำนวน 3 รอบ (ติดป้าย A/B) ไว้ล่วงหน้า ภาพเหล่านี้คือหัวใจของบทเรียน การเตรียมพร้อมสำหรับฉายหรือแจกจะช่วยประหยัดเวลาในชั้นเรียน' },
    tipBeforeYouBegin: { en: "If you're short on prep time, a single strong photo pair is enough for a first run-through. You can build up to three rounds next time you teach this lesson.", th: 'หากมีเวลาเตรียมตัวจำกัด ภาพคู่ที่ดีเพียงคู่เดียวก็เพียงพอสำหรับการทดลองสอนครั้งแรก แล้วค่อยเพิ่มเป็นสามรอบในครั้งต่อไป' },
    tipWarmup: { en: 'Resist the urge to explain AI here, even if a student gets close. Let the mystery carry into the next section. It makes the "What Is AI?" reveal land better.', th: 'อดใจไม่อธิบาย AI ตรงนี้ แม้จะมีนักเรียนเดาใกล้เคียง ปล่อยให้ความลึกลับดำเนินต่อไปจนถึงหัวข้อถัดไป จะทำให้การเฉลย "AI คืออะไร" น่าประทับใจยิ่งขึ้น' },
    aiAroundUs: {
      en: ['Voice assistants (Siri, Alexa)', 'YouTube recommendations', 'Translation apps', 'Face unlock'],
      th: ['ผู้ช่วยเสียง (Siri, Alexa)', 'ระบบแนะนำวิดีโอของ YouTube', 'แอปแปลภาษา', 'การปลดล็อกด้วยใบหน้า']
    },
    tipAiAroundUs: { en: 'For each example, ask "who here has used this?" before explaining it. Hands going up keeps the room engaged and makes the abstract idea of AI feel immediately personal.', th: 'สำหรับแต่ละตัวอย่าง ให้ถามว่า "ใครเคยใช้สิ่งนี้บ้าง" ก่อนอธิบาย การยกมือช่วยให้ห้องเรียนมีส่วนร่วมและทำให้แนวคิดเรื่อง AI ที่เป็นนามธรรมรู้สึกใกล้ตัวขึ้นทันที' },
    whyMistakes: { en: 'AI images can look strange because they are like a giant puzzle made by a robot. The robot tries to guess what things should look like, but sometimes it puts the wrong pieces together, like giving a person six fingers or a floating shoe.', th: 'ภาพที่สร้างโดย AI อาจดูแปลกเพราะเหมือนกับปริศนาชิ้นใหญ่ที่หุ่นยนต์เป็นผู้ประกอบ หุ่นยนต์พยายามเดาว่าสิ่งต่าง ๆ ควรมีลักษณะอย่างไร แต่บางครั้งก็ประกอบชิ้นส่วนผิด เช่น ทำให้คนมีนิ้วมือหกนิ้ว หรือรองเท้าลอยได้' },
    tipActivity: { en: 'Take a quick show-of-hands vote ("who thinks A is real?") before revealing each answer. It turns a passive reveal into a moment students are personally invested in.', th: 'ให้ยกมือโหวตอย่างรวดเร็ว ("ใครคิดว่า A คือภาพจริง") ก่อนเฉลยแต่ละรอบ วิธีนี้เปลี่ยนการเฉลยแบบเฉย ๆ ให้กลายเป็นช่วงเวลาที่นักเรียนรู้สึกมีส่วนร่วม' },
    exitTicket: { en: 'Optional exit ticket: have students write one new thing they learned about AI today before leaving.', th: 'ทางเลือกเสริม: ให้นักเรียนเขียนสิ่งใหม่หนึ่งอย่างที่ได้เรียนรู้เกี่ยวกับ AI ในวันนี้ก่อนออกจากห้อง' },
    misconceptions: [
      { claim: { en: 'AI thinks like a human brain.', th: 'AI คิดเหมือนสมองมนุษย์' }, explanation: { en: "AI doesn't understand things the way people do; it recognizes patterns in data.", th: 'AI ไม่ได้เข้าใจสิ่งต่าง ๆ แบบเดียวกับมนุษย์ แต่มันจดจำรูปแบบจากข้อมูล' } },
      { claim: { en: "AI is always right because it's a computer.", th: 'AI ถูกต้องเสมอเพราะเป็นคอมพิวเตอร์' }, explanation: { en: "This lesson's whole point is to gently challenge that assumption; don't over-correct it yet, since Lesson 3 addresses this directly.", th: 'ประเด็นหลักของบทเรียนนี้คือการค่อย ๆ ท้าทายความเชื่อนี้ ยังไม่ต้องแก้ไขความเข้าใจผิดนี้มากเกินไป เพราะบทเรียนที่ 3 จะพูดถึงเรื่องนี้โดยตรง' } }
    ],
    differentiation: {
      support: { en: 'Reduce to 2 photo rounds and give students the 5 spot-the-clue categories in advance (hands, text, patterns, light, edges) from Lesson 3 as a preview scaffold.', th: 'ลดเหลือ 2 รอบภาพ และแจกหมวดหมู่เบาะแส 5 ข้อ (มือ ตัวอักษร ลวดลาย แสง ขอบภาพ) จากบทเรียนที่ 3 ให้นักเรียนล่วงหน้าเป็นตัวช่วย' },
      challenge: { en: 'After the reveal, ask students to explain the clue in their own words rather than just naming it ("the shadow falls the wrong way because...").', th: 'หลังเฉลยแล้ว ให้นักเรียนอธิบายเบาะแสด้วยคำพูดของตัวเอง แทนที่จะบอกแค่ชื่อเบาะแส (เช่น "เงาตกผิดทิศทางเพราะ...")' }
    },
    assessmentMaterials: {
      en: ['Slide deck: What Is AI? (14 slides)', 'Worksheet: What Is AI? Worksheet (1 page, Parts A–D)', 'Printable real-vs-AI photo pairs (3 rounds, teacher to source/print)'],
      th: ['สไลด์นำเสนอ: AI คืออะไร? (14 สไลด์)', 'ใบงาน: AI คืออะไร? (1 หน้า ส่วน A–D)', 'ภาพคู่จริง-เทียบ AI สำหรับพิมพ์ (3 รอบ ครูเตรียม/พิมพ์เอง)']
    }
  },
  {
    id: 'how-ai-learns', icon: '📚', duration: '50 min',
    slidesFile: 'slides/lesson-2-how-ai-learns.pptx',
    image: 'assets/lessons/lesson-2-how-ai-learns-en.jpg', imageRatio: '1672/941', imageTh: 'assets/lessons/lesson-2-how-ai-learns-th.jpg',
    title: { en: 'How Does AI Learn?', th: 'AI เรียนรู้ได้อย่างไร?' },
    short: { en: 'Students discover that AI learns from examples (data), just like people learn from practice.', th: 'นักเรียนจะค้นพบว่า AI เรียนรู้จากตัวอย่าง (ข้อมูล) เช่นเดียวกับที่คนเราเรียนรู้จากการฝึกฝน' },
    objective: { en: 'Students understand that AI learns from examples (data).', th: 'นักเรียนเข้าใจว่า AI เรียนรู้จากตัวอย่าง (ข้อมูล)' },
    materials: {
      notech: {
        en: ['Printed pictures of cats and dogs', 'Cards with fruits, animals, vehicles'],
        th: ['รูปภาพแมวและสุนัขแบบพิมพ์', 'การ์ดรูปผลไม้ สัตว์ และยานพาหนะ']
      },
      tech: {
        en: ['Slide deck with the Data → AI → Answer diagram', 'Digital photo gallery of cats/dogs or fruit/animal/vehicle images', 'Screen or projector'],
        th: ['สไลด์แผนภาพ ข้อมูล → AI → คำตอบ', 'แกลเลอรีภาพดิจิทัลของแมว/สุนัข หรือผลไม้/สัตว์/ยานพาหนะ', 'หน้าจอหรือโปรเจกเตอร์']
      }
    },
    warmup: { en: ['How do people learn to recognize cats and dogs?'], th: ['คนเราเรียนรู้ที่จะแยกแยะแมวกับสุนัขได้อย่างไร?'] },
    explanation: {
      en: 'AI learns by studying many examples, just like students learn from practice: Data → AI → Answer.',
      th: 'AI เรียนรู้จากการศึกษาตัวอย่างจำนวนมาก เช่นเดียวกับที่นักเรียนเรียนรู้จากการฝึกฝน: ข้อมูล → AI → คำตอบ'
    },
    activity: {
      notech: {
        en: 'Sorting Game: Students physically sort cards into Fruits, Animals, and Vehicles, then discuss how AI also learns patterns and categories from examples.',
        th: 'เกมจัดหมวดหมู่: นักเรียนจัดกลุ่มการ์ดจริงเป็นผลไม้ สัตว์ และยานพาหนะ แล้วอภิปรายว่า AI ก็เรียนรู้รูปแบบและหมวดหมู่จากตัวอย่างเช่นกัน'
      },
      tech: {
        en: 'Sorting Game: Show a slideshow of mixed images; students call out the category for each one as it appears, then discuss how AI learns categories the same way from many examples.',
        th: 'เกมจัดหมวดหมู่: ฉายสไลด์ภาพผสมทีละภาพ ให้นักเรียนบอกหมวดหมู่ของแต่ละภาพ แล้วอภิปรายว่า AI ก็เรียนรู้หมวดหมู่แบบเดียวกันจากตัวอย่างจำนวนมาก'
      }
    },
    reflection: { en: ['What does AI need to learn?', 'Can AI learn without examples?'], th: ['AI ต้องการอะไรในการเรียนรู้?', 'AI เรียนรู้ได้โดยไม่มีตัวอย่างหรือไม่?'] },
    groupSize: { en: 'Whole class + pairs', th: 'ทั้งชั้นเรียน + จับคู่' },
    beforeYouBegin: { en: "Prepare the cat/dog photo set (printed or displayed) for the warm-up, and confirm student devices and internet access are ready for the AI for Oceans activity, since it's the heart of this lesson's hands-on learning, testing the link ahead of time saves you from losing class time to loading issues.", th: 'เตรียมชุดภาพแมว/สุนัข (พิมพ์หรือฉาย) สำหรับกิจกรรมนำเข้าสู่บทเรียน และตรวจสอบว่าอุปกรณ์และอินเทอร์เน็ตของนักเรียนพร้อมสำหรับกิจกรรม AI for Oceans เนื่องจากเป็นหัวใจของบทเรียนภาคปฏิบัตินี้ การทดสอบลิงก์ล่วงหน้าจะช่วยประหยัดเวลาในชั้นเรียน' },
    tipBeforeYouBegin: { en: 'If devices aren\'t available, this lesson still works as a discussion-only lesson: skip AI for Oceans and use the "Cat or Dog" photos to walk the class through examples, patterns, and guesses together instead.', th: 'หากไม่มีอุปกรณ์ บทเรียนนี้ยังใช้ได้ในรูปแบบอภิปรายอย่างเดียว: ข้ามกิจกรรม AI for Oceans แล้วใช้ภาพ "แมวหรือสุนัข" พาชั้นเรียนดูตัวอย่าง รูปแบบ และการเดาร่วมกันแทน' },
    tipWarmup: { en: 'Chart student answers instead of confirming right or wrong yet. Save the "AI does something similar" reveal for the Introduction. It makes the connection land harder.', th: 'จดคำตอบของนักเรียนไว้บนกระดานโดยยังไม่เฉลยว่าถูกหรือผิด เก็บการเฉลย "AI ก็ทำแบบเดียวกัน" ไว้ในช่วงบทนำ จะทำให้การเชื่อมโยงน่าประทับใจยิ่งขึ้น' },
    bodyBlocks: [
      { heading: { en: 'How Do We Learn?', th: 'เรามนุษย์เรียนรู้ได้อย่างไร?' }, items: {
        en: ['We read from textbooks.', 'We apply what we learned and make mistakes.', 'We learn from our mistakes to get it right the next time.'],
        th: ['เราอ่านจากตำราเรียน', 'เรานำสิ่งที่เรียนรู้ไปใช้และเกิดข้อผิดพลาด', 'เราเรียนรู้จากข้อผิดพลาดเพื่อทำให้ถูกต้องในครั้งต่อไป']
      } },
      { heading: { en: 'How Does AI Learn?', th: 'AI เรียนรู้ได้อย่างไร?' }, items: {
        en: ['AI looks at LOTS of examples.', 'AI finds patterns in those examples.', 'AI uses those patterns to make guesses about new, unseen examples.'],
        th: ['AI ดูตัวอย่างจำนวนมาก', 'AI ค้นหารูปแบบจากตัวอย่างเหล่านั้น', 'AI ใช้รูปแบบเหล่านั้นในการเดาตัวอย่างใหม่ที่ไม่เคยเห็นมาก่อน']
      } },
      { text: { en: 'Connect back to the warm-up: just as students used patterns like ear shape, size, and fur to tell cats from dogs, AI uses patterns found in many example images to do the same thing.', th: 'เชื่อมโยงกลับไปที่กิจกรรมนำเข้าสู่บทเรียน: เช่นเดียวกับที่นักเรียนใช้รูปแบบอย่างรูปทรงหู ขนาด และขนเพื่อแยกแมวจากสุนัข AI ก็ใช้รูปแบบที่พบในภาพตัวอย่างจำนวนมากเพื่อทำสิ่งเดียวกัน' }, tip: { en: 'Ask "who here got better at riding a bike or tying their shoes with practice?" before introducing this idea. It sets up that AI improves the same way people do, through repeated exposure, not memorized rules.', th: 'ถามว่า "ใครเก่งขึ้นในการขี่จักรยานหรือผูกเชือกรองเท้าจากการฝึกฝนบ้าง" ก่อนแนะนำแนวคิดนี้ เพื่อปูทางว่า AI พัฒนาขึ้นแบบเดียวกับมนุษย์ ผ่านการเจอตัวอย่างซ้ำ ๆ ไม่ใช่การจำกฎตายตัว' } }
    ],
    postActivityBlocks: [
      { activityStyle: true, heading: { en: 'AI for Oceans Activity', th: 'กิจกรรม AI for Oceans' }, text: { en: 'Students individually or in pairs complete the interactive "AI for Oceans" activity, training a simple AI model by sorting images into categories and watching how its guesses improve, or get confused, as it sees more examples.', th: 'นักเรียนทำกิจกรรมโต้ตอบ "AI for Oceans" เป็นรายบุคคลหรือจับคู่ โดยฝึกโมเดล AI อย่างง่ายด้วยการจัดหมวดหมู่ภาพ และสังเกตว่าการเดาของ AI ดีขึ้น หรือสับสน อย่างไรเมื่อเห็นตัวอย่างมากขึ้น' }, link: { url: 'https://ailiteracyframework.org/ai-for-oceans/', label: { en: 'Open AI for Oceans activity', th: 'เปิดกิจกรรม AI for Oceans' } } },
      { text: { en: 'Circulate and prompt students to notice: What happens when the AI sees more examples? What happens when the training examples are confusing or unbalanced?', th: 'เดินสำรวจและกระตุ้นให้นักเรียนสังเกต: เกิดอะไรขึ้นเมื่อ AI เห็นตัวอย่างมากขึ้น? เกิดอะไรขึ้นเมื่อตัวอย่างที่ใช้ฝึกสับสนหรือไม่สมดุล?' } },
      { text: { en: "AI can get confused for the same reason people do: it's only as good as the examples it's been shown. If it only ever sees clear, similar pictures, a strange or blurry one can throw it off.", th: 'AI สับสนได้ด้วยเหตุผลเดียวกับมนุษย์: มันดีได้เท่าที่ตัวอย่างที่มันเคยเห็นเท่านั้น หากมันเห็นแต่ภาพที่ชัดเจนและคล้ายกัน ภาพที่แปลกหรือเบลอก็อาจทำให้มันสับสนได้' }, tip: { en: 'Have students predict, before each round, whether they think the AI\'s guess will be correct. It turns a passive demo into something they\'re personally invested in.', th: 'ให้นักเรียนทายล่วงหน้าก่อนแต่ละรอบว่าคิดว่า AI จะเดาถูกหรือไม่ วิธีนี้เปลี่ยนการสาธิตแบบเฉย ๆ ให้กลายเป็นสิ่งที่นักเรียนรู้สึกมีส่วนร่วม' } }
    ],
    exitTicket: { en: 'Optional exit ticket: have students write one new thing they learned about how AI learns before leaving.', th: 'ทางเลือกเสริม: ให้นักเรียนเขียนสิ่งใหม่หนึ่งอย่างที่ได้เรียนรู้เกี่ยวกับวิธีที่ AI เรียนรู้ก่อนออกจากห้อง' },
    misconceptions: [
      { claim: { en: 'AI is smart because it thinks for itself.', th: 'AI ฉลาดเพราะมันคิดเองได้' }, explanation: { en: 'AI doesn\'t reason; it makes guesses based on patterns it noticed in the examples it was shown.', th: 'AI ไม่ได้ใช้เหตุผล แต่มันเดาจากรูปแบบที่สังเกตเห็นในตัวอย่างที่มันเคยเห็น' } },
      { claim: { en: 'More examples always make AI perfect.', th: 'ยิ่งมีตัวอย่างมาก AI ก็ยิ่งสมบูรณ์แบบเสมอ' }, explanation: { en: "More examples usually help, but confusing or unbalanced examples can still lead to wrong guesses; this previews Lesson 3's look at AI mistakes.", th: 'ตัวอย่างที่มากขึ้นมักช่วยได้ แต่ตัวอย่างที่สับสนหรือไม่สมดุลก็ยังทำให้เดาผิดได้ ซึ่งเป็นการปูเรื่องสำหรับบทเรียนที่ 3 เรื่องข้อผิดพลาดของ AI' } }
    ],
    differentiation: {
      support: { en: 'Give students sentence starters for the reflection question (e.g., "AI needs ___ so that it can ___.").', th: 'ให้ตัวช่วยเริ่มประโยคสำหรับคำถามสะท้อนคิด (เช่น "AI ต้องการ ___ เพื่อที่จะ ___")' },
      challenge: { en: 'Ask students to predict what might happen if AI is only shown a few examples, or examples that are all very similar.', th: 'ให้นักเรียนทายว่าจะเกิดอะไรขึ้นหาก AI เห็นตัวอย่างเพียงไม่กี่ตัวอย่าง หรือตัวอย่างที่คล้ายกันมากทั้งหมด' }
    },
    assessmentMaterials: {
      en: ['Slide deck: How Does AI Learn? (7 slides)', 'Interactive activity: AI for Oceans (ailiteracyframework.org/ai-for-oceans)', 'Printable/projectable cat-vs-dog photo set (teacher to source/print)'],
      th: ['สไลด์นำเสนอ: AI เรียนรู้ได้อย่างไร? (7 สไลด์)', 'กิจกรรมโต้ตอบ: AI for Oceans (ailiteracyframework.org/ai-for-oceans)', 'ชุดภาพแมว-สุนัขสำหรับพิมพ์/ฉาย (ครูเตรียม/พิมพ์เอง)']
    }
  },
  {
    id: 'ai-mistakes', icon: '⚠️', duration: '45–50 min',
    slidesFile: 'slides/lesson-3-ai-mistakes.pptx',
    image: 'assets/lessons/lesson-3-ai-mistakes-en.jpg', imageRatio: '1672/941', imageTh: 'assets/lessons/lesson-3-ai-mistakes-th.jpg',
    title: { en: 'Can AI Make Mistakes?', th: 'AI ทำผิดพลาดได้ไหม?' },
    short: { en: 'Students recognize that AI is useful but not always correct.', th: 'นักเรียนจะตระหนักว่า AI มีประโยชน์ แต่ไม่ได้ถูกต้องเสมอไป' },
    objective: { en: 'Students recognize that AI is useful but not always correct.', th: 'นักเรียนตระหนักว่า AI มีประโยชน์แต่ไม่ได้ถูกต้องเสมอไป' },
    materials: {
      notech: {
        en: ['Printed examples of AI-generated images or incorrect AI answers'],
        th: ['ตัวอย่างภาพที่สร้างโดย AI หรือคำตอบที่ AI ตอบผิดแบบพิมพ์']
      },
      tech: {
        en: ['Slide deck or screen showing AI-generated images/text examples', 'Internet access (optional) to show a live AI mistake'],
        th: ['สไลด์หรือหน้าจอแสดงตัวอย่างภาพ/ข้อความที่สร้างโดย AI', 'อินเทอร์เน็ต (ถ้ามี) เพื่อแสดงตัวอย่างข้อผิดพลาดของ AI สด ๆ']
      }
    },
    warmup: { en: ['Are computers always right?'], th: ['คอมพิวเตอร์ถูกต้องเสมอไปหรือไม่?'] },
    explanation: {
      en: 'AI can make mistakes and give wrong information. Humans should always check facts.',
      th: 'AI สามารถทำผิดพลาดและให้ข้อมูลที่ไม่ถูกต้องได้ มนุษย์ควรตรวจสอบข้อเท็จจริงเสมอ'
    },
    activity: {
      notech: {
        en: 'Human or AI? Students view printed pictures or short texts and guess whether each was made by a human or by AI, then discuss the clues.',
        th: 'มนุษย์หรือ AI? นักเรียนดูภาพหรือข้อความพิมพ์สั้น ๆ แล้วทายว่าเป็นผลงานของมนุษย์หรือ AI จากนั้นอภิปรายเบาะแสที่ใช้ตัดสิน'
      },
      tech: {
        en: 'Human or AI? Project each image/text on screen one at a time. Students vote live, then, if internet allows, try a real AI tool together to see a mistake happen in real time.',
        th: 'มนุษย์หรือ AI? ฉายภาพ/ข้อความแต่ละชิ้นบนหน้าจอทีละชิ้น ให้นักเรียนโหวตสด ๆ และถ้ามีอินเทอร์เน็ต ลองใช้เครื่องมือ AI จริงร่วมกันเพื่อดูข้อผิดพลาดที่เกิดขึ้นแบบสด'
      }
    },
    reflection: { en: ['Why should we verify information from AI?'], th: ['เหตุใดเราจึงควรตรวจสอบข้อมูลจาก AI?'] },
    groupSize: { en: 'Whole class + independent', th: 'ทั้งชั้นเรียน + ฝึกด้วยตนเอง' },
    beforeYouBegin: { en: 'Print or prepare the AI-generated image examples (the ones showing extra fingers, doubled objects, or mismatched limbs) ahead of time. Spotting the errors is the heart of this lesson\'s hands-on portion, so having them ready to project or hand out saves class time.', th: 'เตรียมภาพตัวอย่างที่สร้างโดย AI (ภาพที่มีนิ้วเกิน วัตถุซ้ำ หรือแขนขาผิดรูป) ไว้ล่วงหน้า การหาข้อผิดพลาดคือหัวใจของกิจกรรมภาคปฏิบัติของบทเรียนนี้ การเตรียมพร้อมสำหรับฉายหรือแจกจะช่วยประหยัดเวลาในชั้นเรียน' },
    tipBeforeYouBegin: { en: 'Keep one or two of the odder AI images (like the nose-legged creature or the man with too many fingers) in reserve for the end of the lesson as a fun, easy "final check" that sends students out on a high note.', th: 'เก็บภาพ AI ที่แปลกกว่าปกติหนึ่งหรือสองภาพ (เช่น สิ่งมีชีวิตขาจมูก หรือชายที่มีนิ้วเกิน) ไว้สำหรับช่วงท้ายบทเรียนเป็น "ด่านสุดท้าย" สนุก ๆ ที่ง่าย เพื่อส่งนักเรียนกลับด้วยความรู้สึกดี' },
    tipWarmup: { en: 'Resist the urge to explain AI mistakes here, even if a student gets close. Let the mystery carry into the next section. It makes the "AI Can Make Mistakes" reveal land better.', th: 'อดใจไม่อธิบายข้อผิดพลาดของ AI ตรงนี้ แม้จะมีนักเรียนเดาใกล้เคียง ปล่อยให้ความลึกลับดำเนินต่อไปจนถึงหัวข้อถัดไป จะทำให้การเฉลย "AI ทำผิดพลาดได้" น่าประทับใจยิ่งขึ้น' },
    bodyBlocks: [
      { heading: { en: 'Can AI Make Mistakes?', th: 'AI ทำผิดพลาดได้ไหม?' }, text: { en: 'Yes. Explain in simple terms why:', th: 'ได้ อธิบายง่าย ๆ ว่าทำไม:' }, items: {
        en: ["AI relies on old data it's used before.", 'AI relies on guesses.', "AI doesn't think; it predicts patterns."],
        th: ['AI พึ่งพาข้อมูลเก่าที่เคยใช้มาก่อน', 'AI พึ่งพาการเดา', 'AI ไม่ได้คิด มันทำนายรูปแบบ']
      } },
      { heading: { en: 'Types of Mistakes AI Can Make', th: 'ประเภทของข้อผิดพลาดที่ AI ทำได้' }, text: { en: 'Introduce four common categories of AI mistakes:', th: 'แนะนำข้อผิดพลาดของ AI สี่ประเภทหลัก:' }, items: {
        en: ['Factual errors: missing important information.', 'Bias: unfair patterns learned from data.', 'Hallucinations: making information up.', 'Misunderstanding context.'],
        th: ['ข้อผิดพลาดด้านข้อเท็จจริง: ขาดข้อมูลสำคัญ', 'อคติ: รูปแบบที่ไม่เป็นธรรมที่เรียนรู้มาจากข้อมูล', 'การสร้างข้อมูลเท็จ (Hallucination): กุข้อมูลขึ้นมาเอง', 'การเข้าใจบริบทผิด']
      }, tip: { en: 'For each mistake type, ask "who here has seen an example like this?" before explaining it. It keeps the room engaged and makes the abstract categories feel immediately real.', th: 'สำหรับข้อผิดพลาดแต่ละประเภท ให้ถามว่า "ใครเคยเจอตัวอย่างแบบนี้บ้าง" ก่อนอธิบาย จะช่วยให้ห้องเรียนมีส่วนร่วมและทำให้หมวดหมู่ที่เป็นนามธรรมรู้สึกจริงขึ้นทันที' } }
    ],
    postActivityBlocks: [
      { activityStyle: true, heading: { en: 'Real-Life Examples Activity', th: 'กิจกรรมตัวอย่างจากชีวิตจริง' }, text: { en: 'Share three real-world examples of AI mistakes, one for each major type. For each one, discuss: "What could have prevented this mistake?"', th: 'แชร์ตัวอย่างข้อผิดพลาดของ AI จากโลกจริงสามตัวอย่าง หนึ่งตัวอย่างต่อประเภทหลัก สำหรับแต่ละตัวอย่าง อภิปราย: "อะไรจะช่วยป้องกันข้อผิดพลาดนี้ได้"' }, items: {
        en: [
          "Factual errors: An airline's chatbot told a customer they could get a refund under a real policy but got the policy details wrong; the airline was held responsible for what its AI told the customer.",
          'Bias: Amazon built an AI to help sort job applications, but it had learned from old hiring data that was mostly men, so it began downgrading resumes containing words like "women\'s" (as in "women\'s chess club"). Amazon caught this and shut the tool down before it was fully used.',
          'Hallucinations: A lawyer used ChatGPT for legal research. It invented six fake court cases with fake quotes, and even claimed they were real when asked to double-check. The lawyer was fined for never verifying the cases before submitting them to court.'
        ],
        th: [
          'ข้อผิดพลาดด้านข้อเท็จจริง: แชทบอทของสายการบินแจ้งลูกค้าว่าสามารถขอเงินคืนได้ตามนโยบายจริง แต่ให้รายละเอียดนโยบายผิด สายการบินต้องรับผิดชอบต่อสิ่งที่ AI แจ้งลูกค้า',
          'อคติ: Amazon สร้าง AI เพื่อช่วยคัดกรองใบสมัครงาน แต่มันเรียนรู้จากข้อมูลการจ้างงานเก่าที่ส่วนใหญ่เป็นผู้ชาย จึงเริ่มให้คะแนนต่ำกับเรซูเม่ที่มีคำอย่าง "women\'s" (เช่น "women\'s chess club") Amazon พบปัญหานี้และปิดการใช้งานเครื่องมือก่อนนำไปใช้งานจริงเต็มรูปแบบ',
          'การสร้างข้อมูลเท็จ: ทนายความคนหนึ่งใช้ ChatGPT ค้นคว้าข้อมูลกฎหมาย มันสร้างคดีในศาลปลอมหกคดีพร้อมคำพูดปลอม และยังยืนยันว่าเป็นเรื่องจริงเมื่อถูกขอให้ตรวจสอบซ้ำ ทนายความคนนี้ถูกปรับเนื่องจากไม่เคยตรวจสอบคดีเหล่านั้นก่อนยื่นต่อศาล'
        ]
      } },
      { tip: { en: 'After each example, take a quick show of hands: "who thinks this mistake was easy to catch, or easy to miss?" It turns passive listening into a moment students are personally invested in.', th: 'หลังจากแต่ละตัวอย่าง ให้ยกมือโหวตอย่างรวดเร็ว: "ใครคิดว่าข้อผิดพลาดนี้จับได้ง่ายหรือจับยาก" วิธีนี้เปลี่ยนการฟังแบบเฉย ๆ ให้กลายเป็นช่วงเวลาที่นักเรียนรู้สึกมีส่วนร่วม' } },
      { activityStyle: true, heading: { en: 'How to Spot an AI Picture Activity', th: 'กิจกรรมสังเกตภาพที่สร้างโดย AI' }, text: { en: 'Introduce five visual clues that can reveal an AI-generated image:', th: 'แนะนำเบาะแสภาพห้าข้อที่ช่วยเผยว่าภาพนั้นสร้างโดย AI:' }, items: {
        en: ['Hands & fingers: too many, too few, or bent wrong.', 'Text & symbols: letters that look like scribbles or gibberish.', 'Patterns: things that repeat weirdly (extra chair legs, doubled objects).', 'Light & shadows: shadows going the wrong way, or missing.', 'Edges: blurry or melted-looking where two things meet.'],
        th: ['มือและนิ้ว: มากไป น้อยไป หรือโค้งงอผิดรูป', 'ตัวอักษรและสัญลักษณ์: ตัวอักษรที่ดูเหมือนขีดเขียนหรืออ่านไม่ออก', 'ลวดลาย: สิ่งที่ซ้ำแบบแปลก ๆ (ขาเก้าอี้เกิน วัตถุซ้ำ)', 'แสงและเงา: เงาตกผิดทิศทาง หรือไม่มีเงา', 'ขอบภาพ: เบลอหรือดูละลายตรงจุดที่สองสิ่งชนกัน']
      } },
      { text: { en: 'Show students the set of example images (including the woman with a third eye, the dog with extra legs, the nose-legged creature, and the man with too many fingers). For each one, have students guess what\'s "off" before revealing the clue, then discuss: "What gave it away?"', th: 'แสดงชุดภาพตัวอย่างให้นักเรียนดู (รวมถึงภาพผู้หญิงที่มีตาที่สาม สุนัขขาเกิน สิ่งมีชีวิตขาจมูก และชายที่มีนิ้วเกิน) สำหรับแต่ละภาพ ให้นักเรียนทายว่าอะไร "ผิดปกติ" ก่อนเฉลยเบาะแส แล้วอภิปราย: "อะไรที่ทำให้จับได้"' } },
      { tip: { en: 'Take a quick vote ("who spotted the mistake before I said anything?") before revealing each clue. It turns a passive reveal into a moment students are personally invested in.', th: 'ให้โหวตอย่างรวดเร็ว ("ใครจับข้อผิดพลาดได้ก่อนที่ครูจะพูดบ้าง") ก่อนเฉลยแต่ละเบาะแส วิธีนี้เปลี่ยนการเฉลยแบบเฉย ๆ ให้กลายเป็นช่วงเวลาที่นักเรียนรู้สึกมีส่วนร่วม' } },
      { heading: { en: 'How Humans Help AI', th: 'มนุษย์ช่วย AI ได้อย่างไร' }, text: { en: 'Explain that people play an important role in catching and correcting AI\'s mistakes:', th: 'อธิบายว่ามนุษย์มีบทบาทสำคัญในการจับและแก้ไขข้อผิดพลาดของ AI:' }, items: {
        en: ['If we notice a mistake from the AI, we write it down in the prompt.', 'The AI will try its best to notice the mistake and start over.'],
        th: ['หากเราสังเกตเห็นข้อผิดพลาดจาก AI เราเขียนมันลงในพรอมต์', 'AI จะพยายามอย่างเต็มที่เพื่อสังเกตข้อผิดพลาดและเริ่มต้นใหม่']
      } },
      { text: { en: 'Discuss why giving AI feedback, and double-checking its answers, matters, rather than just accepting whatever it says the first time.', th: 'อภิปรายว่าทำไมการให้ฟีดแบ็กกับ AI และการตรวจสอบคำตอบซ้ำ จึงสำคัญ แทนที่จะยอมรับสิ่งที่มันพูดตั้งแต่ครั้งแรกโดยไม่ตรวจสอบ' } }
    ],
    exitTicket: { en: 'Optional exit ticket: have students write one new thing they learned about AI mistakes before leaving.', th: 'ทางเลือกเสริม: ให้นักเรียนเขียนสิ่งใหม่หนึ่งอย่างที่ได้เรียนรู้เกี่ยวกับข้อผิดพลาดของ AI ก่อนออกจากห้อง' },
    misconceptions: [
      { claim: { en: "AI never makes mistakes because it's a computer.", th: 'AI ไม่เคยทำผิดพลาดเพราะมันเป็นคอมพิวเตอร์' }, explanation: { en: 'This lesson directly challenges that assumption by showing real examples of AI getting things wrong.', th: 'บทเรียนนี้ท้าทายความเชื่อนี้โดยตรงด้วยการแสดงตัวอย่างจริงที่ AI ทำผิดพลาด' } },
      { claim: { en: 'If AI sounds confident, it must be right.', th: 'ถ้า AI พูดด้วยความมั่นใจ มันต้องถูกต้องแน่นอน' }, explanation: { en: "Hallucinations often sound just as confident and detailed as correct answers, which is exactly why they're easy to miss.", th: 'การสร้างข้อมูลเท็จมักฟังดูมั่นใจและละเอียดพอ ๆ กับคำตอบที่ถูกต้อง ซึ่งเป็นเหตุผลที่มันจับได้ยาก' } }
    ],
    differentiation: {
      support: { en: 'Give students the five spot-the-clue categories (hands, text, patterns, light, edges) as a printed checklist to reference while looking at images.', th: 'แจกรายการตรวจสอบเบาะแสทั้งห้าประเภท (มือ ตัวอักษร ลวดลาย แสง ขอบภาพ) แบบพิมพ์ให้นักเรียนใช้อ้างอิงขณะดูภาพ' },
      challenge: { en: 'Ask students to write their own short scenario describing an AI mistake for one of the four mistake types.', th: 'ให้นักเรียนเขียนสถานการณ์สั้น ๆ ของตัวเองที่อธิบายข้อผิดพลาดของ AI สำหรับหนึ่งในสี่ประเภท' }
    },
    assessmentMaterials: {
      en: ['Slide deck: Can AI Make Mistakes? (11 slides)', 'Printable/projectable set of real-life AI mistake examples and AI-generated images (teacher to source/print)'],
      th: ['สไลด์นำเสนอ: AI ทำผิดพลาดได้ไหม? (11 สไลด์)', 'ชุดตัวอย่างข้อผิดพลาดจากชีวิตจริงและภาพที่สร้างโดย AI สำหรับพิมพ์/ฉาย (ครูเตรียม/พิมพ์เอง)']
    }
  },
  {
    id: 'ai-responsibly', icon: '🛡️', duration: '50 min',
    slidesFile: 'slides/lesson-4-ai-responsibly.pptx',
    image: 'assets/lessons/lesson-4-ai-responsibly-en.jpg', imageRatio: '1672/941', imageTh: 'assets/lessons/lesson-4-ai-responsibly-th.jpg',
    title: { en: 'Using AI Responsibly', th: 'การใช้ AI อย่างมีความรับผิดชอบ' },
    short: { en: 'Students learn safe and ethical use of AI.', th: 'นักเรียนจะเรียนรู้การใช้ AI อย่างปลอดภัยและมีจริยธรรม' },
    objective: { en: 'Students learn safe and ethical use of AI.', th: 'นักเรียนเรียนรู้การใช้ AI อย่างปลอดภัยและมีจริยธรรม' },
    materials: {
      notech: {
        en: ['Printed scenario cards'],
        th: ['การ์ดสถานการณ์จำลองแบบพิมพ์']
      },
      tech: {
        en: ['Scenario slides or short video clips', 'Screen or projector'],
        th: ['สไลด์สถานการณ์หรือคลิปวิดีโอสั้น', 'หน้าจอหรือโปรเจกเตอร์']
      }
    },
    warmup: { en: ['Should students copy AI answers without understanding them?'], th: ['นักเรียนควรคัดลอกคำตอบจาก AI โดยไม่เข้าใจหรือไม่?'] },
    explanation: {
      en: 'Good uses: learning, getting ideas, checking information, protecting personal information. Bad uses: cheating, believing everything AI says, sharing personal data.',
      th: 'การใช้ที่ดี: เรียนรู้ หาไอเดีย ตรวจสอบข้อมูล ปกป้องข้อมูลส่วนตัว การใช้ที่ไม่ดี: การโกง การเชื่อทุกอย่างที่ AI พูด การแชร์ข้อมูลส่วนตัว'
    },
    activity: {
      notech: {
        en: 'Scenario Discussion: In groups, students read printed scenario cards (e.g. copying AI homework, sharing a password with a chatbot) and decide whether each is a good idea or bad idea, and why.',
        th: 'อภิปรายสถานการณ์: แบ่งกลุ่มให้นักเรียนอ่านการ์ดสถานการณ์แบบพิมพ์ (เช่น การคัดลอกการบ้านจาก AI การแชร์รหัสผ่านกับแชทบอท) แล้วตัดสินว่าเป็นความคิดที่ดีหรือไม่ดี พร้อมเหตุผล'
      },
      tech: {
        en: 'Scenario Discussion: Display each scenario on screen. Students vote good idea/bad idea as a class (hands up or quiz app), then discuss why in small groups.',
        th: 'อภิปรายสถานการณ์: ฉายสถานการณ์แต่ละข้อบนหน้าจอ ให้นักเรียนโหวตว่าเป็นความคิดที่ดีหรือไม่ดีทั้งชั้น (ยกมือหรือใช้แอปแบบทดสอบ) แล้วอภิปรายเหตุผลเป็นกลุ่มย่อย'
      }
    },
    reflection: { en: ['Write one rule for responsible AI use.'], th: ['เขียนกฎหนึ่งข้อสำหรับการใช้ AI อย่างมีความรับผิดชอบ'] },
    groupSize: { en: 'Whole class + independent', th: 'ทั้งชั้นเรียน + ฝึกด้วยตนเอง' },
    beforeYouBegin: { en: 'Print or prepare the five "Good or Bad" scenario cards ahead of time. Sorting them is the heart of this lesson\'s practice time, so having them ready to hand out or project saves class time.', th: 'เตรียมการ์ดสถานการณ์ "ดีหรือไม่ดี" ทั้งห้าใบไว้ล่วงหน้า การจัดหมวดหมู่การ์ดคือหัวใจของช่วงฝึกปฏิบัติของบทเรียนนี้ การเตรียมพร้อมสำหรับแจกหรือฉายจะช่วยประหยัดเวลาในชั้นเรียน' },
    tipBeforeYouBegin: { en: 'Write "GOOD" and "BAD" as two headers on the board or on opposite sides of the room before class starts. It turns the sorting activity into something physical and active instead of just a worksheet.', th: 'เขียนคำว่า "ดี" และ "ไม่ดี" เป็นสองหัวข้อบนกระดาน หรือติดไว้คนละฝั่งของห้องก่อนเริ่มเรียน จะทำให้กิจกรรมจัดหมวดหมู่กลายเป็นกิจกรรมทางกายภาพที่กระตือรือร้น แทนที่จะเป็นแค่ใบงาน' },
    tipWarmup: { en: 'Resist the urge to give a firm "yes" or "no" here, even if a student gets close. Let the mystery carry into the next section. It makes the "Good vs. Bad Uses of AI" discussion land better.', th: 'อดใจไม่ตอบ "ใช่" หรือ "ไม่ใช่" อย่างชัดเจนตรงนี้ แม้จะมีนักเรียนเดาใกล้เคียง ปล่อยให้ความลึกลับดำเนินต่อไปจนถึงหัวข้อถัดไป จะทำให้การอภิปราย "การใช้ AI ที่ดีและไม่ดี" น่าประทับใจยิ่งขึ้น' },
    bodyBlocks: [
      { heading: { en: 'Good vs. Bad Uses of AI', th: 'การใช้ AI ที่ดีและไม่ดี' }, text: { en: 'Introduce examples of responsible and irresponsible AI use:', th: 'แนะนำตัวอย่างการใช้ AI อย่างมีความรับผิดชอบและไม่มีความรับผิดชอบ:' }, items: {
        en: ['Good: Asking for help on confusing words.', 'Good: Brainstorming ideas.', 'Good: Research.', 'Bad: Cheating.', 'Bad: Sharing personal information.', 'Bad: Believing everything AI says.'],
        th: ['ดี: ขอความช่วยเหลือเกี่ยวกับคำที่สับสน', 'ดี: ระดมความคิด', 'ดี: การค้นคว้า', 'ไม่ดี: การโกง', 'ไม่ดี: การแชร์ข้อมูลส่วนตัว', 'ไม่ดี: การเชื่อทุกอย่างที่ AI พูด']
      } },
      { heading: { en: 'Always Check If AI Is Correct or Wrong!!', th: 'ตรวจสอบเสมอว่า AI ถูกหรือผิด!!' }, text: { en: 'Remind students: sometimes AI can make mistakes. Always make sure to double check!', th: 'เตือนนักเรียน: บางครั้ง AI ก็ทำผิดพลาดได้ ต้องตรวจสอบซ้ำเสมอ!' }, tip: { en: 'Connect this back to Lesson 3: ask "who remembers a type of mistake AI can make?" before moving on. It reinforces that double-checking isn\'t optional; it\'s a habit.', th: 'เชื่อมโยงกลับไปที่บทเรียนที่ 3: ถามว่า "ใครจำประเภทข้อผิดพลาดของ AI ได้บ้าง" ก่อนไปต่อ ช่วยตอกย้ำว่าการตรวจสอบซ้ำไม่ใช่ทางเลือก แต่เป็นนิสัยที่ต้องทำ' } },
      { heading: { en: "How Do You Know If It's Good or Bad?", th: 'จะรู้ได้อย่างไรว่าดีหรือไม่ดี?' }, text: { en: 'Teach students three questions to ask themselves before or while using AI:', th: 'สอนนักเรียนสามคำถามที่ควรถามตัวเองก่อนหรือขณะใช้ AI:' }, items: {
        en: ['Is it helping me learn, or doing my thinking for me?', "Am I checking if it's true?", 'Am I keeping my personal info private?'],
        th: ['สิ่งนี้ช่วยให้ฉันเรียนรู้ หรือคิดแทนฉัน?', 'ฉันกำลังตรวจสอบว่ามันเป็นจริงหรือไม่?', 'ฉันกำลังปกป้องข้อมูลส่วนตัวของฉันอยู่หรือไม่?']
      } },
      { text: { en: 'Summarize the difference simply:', th: 'สรุปความแตกต่างแบบง่าย ๆ:' }, items: {
        en: ['Good AI use: helps you learn, and you check if it\'s true.', 'Bad AI use: replaces your thinking, or shares private info.'],
        th: ['การใช้ AI ที่ดี: ช่วยให้คุณเรียนรู้ และคุณตรวจสอบว่าเป็นจริง', 'การใช้ AI ที่ไม่ดี: แทนที่ความคิดของคุณ หรือแชร์ข้อมูลส่วนตัว']
      }, tip: { en: 'Have students repeat the three questions back in their own words, or turn them into a simple chant or checklist they can reuse. Repetition here makes the habit stick beyond this one lesson.', th: 'ให้นักเรียนพูดสามคำถามซ้ำด้วยคำพูดของตัวเอง หรือแปลงเป็นบทสวดหรือเช็คลิสต์ง่าย ๆ ที่นำกลับมาใช้ได้ การทำซ้ำแบบนี้ช่วยให้นิสัยนี้ติดตัวไปนานกว่าบทเรียนเดียว' } }
    ],
    postActivityBlocks: [
      { heading: { en: 'Good or Bad Activity: Scenarios', th: 'กิจกรรมดีหรือไม่ดี: สถานการณ์' }, text: { en: 'Present five scenarios. For each one, students decide whether it\'s a good or bad use of AI, using the three questions from the previous section to justify their answer:', th: 'นำเสนอสถานการณ์ห้าข้อ สำหรับแต่ละข้อ ให้นักเรียนตัดสินว่าเป็นการใช้ AI ที่ดีหรือไม่ดี โดยใช้สามคำถามจากหัวข้อก่อนหน้าเพื่ออธิบายเหตุผล:' }, items: {
        en: ['Copying AI to do homework', 'Giving private information to AI', 'Researching a topic to write an essay', 'Trusting facts from AI without double checking', 'Learning by letting AI explain concepts'],
        th: ['คัดลอกคำตอบจาก AI มาทำการบ้าน', 'ให้ข้อมูลส่วนตัวกับ AI', 'ค้นคว้าหัวข้อเพื่อเขียนเรียงความ', 'เชื่อข้อเท็จจริงจาก AI โดยไม่ตรวจสอบซ้ำ', 'เรียนรู้โดยให้ AI อธิบายแนวคิด']
      } },
      { text: { en: 'Answer key: Bad, Bad, Good, Bad, Good. After each scenario, ask a student to explain which of the three questions led them to their answer, rather than just stating good or bad.', th: 'เฉลย: ไม่ดี, ไม่ดี, ดี, ไม่ดี, ดี หลังจากแต่ละสถานการณ์ ให้นักเรียนคนหนึ่งอธิบายว่าคำถามข้อไหนที่นำไปสู่คำตอบของพวกเขา แทนที่จะบอกแค่ว่าดีหรือไม่ดี' } },
      { tip: { en: 'Take a quick vote ("who says good, who says bad?") before revealing each answer. It turns a passive reveal into a moment students are personally invested in.', th: 'ให้โหวตอย่างรวดเร็ว ("ใครว่าดี ใครว่าไม่ดี") ก่อนเฉลยแต่ละคำตอบ วิธีนี้เปลี่ยนการเฉลยแบบเฉย ๆ ให้กลายเป็นช่วงเวลาที่นักเรียนรู้สึกมีส่วนร่วม' } }
    ],
    exitTicket: { en: 'Optional exit ticket: have students write their personal rule on a sticky note and post it on the board as they leave, building a class-wide list of AI ground rules.', th: 'ทางเลือกเสริม: ให้นักเรียนเขียนกฎส่วนตัวของตนเองลงในกระดาษโน้ตแล้วติดบนกระดานก่อนออกจากห้อง เพื่อสร้างรายการกฎการใช้ AI ของทั้งชั้นเรียนร่วมกัน' },
    misconceptions: [
      { claim: { en: 'Using AI for schoolwork is always cheating.', th: 'การใช้ AI ทำการบ้านถือเป็นการโกงเสมอ' }, explanation: { en: "It depends on how it's used; asking AI to explain a concept is different from asking it to do the work for you.", th: 'ขึ้นอยู่กับวิธีใช้ การขอให้ AI อธิบายแนวคิดนั้นต่างจากการขอให้มันทำงานแทนคุณ' } },
      { claim: { en: "If I don't share my name, it's safe to share anything with AI.", th: 'ถ้าฉันไม่บอกชื่อ ก็ปลอดภัยที่จะแชร์อะไรก็ได้กับ AI' }, explanation: { en: 'Details like your address, school, or photos can still be identifying and private, even without your name attached.', th: 'รายละเอียดอย่างที่อยู่ โรงเรียน หรือรูปภาพ ก็ยังสามารถระบุตัวตนและเป็นข้อมูลส่วนตัวได้ แม้จะไม่มีชื่อของคุณติดอยู่' } }
    ],
    differentiation: {
      support: { en: 'Work through the three-question checklist together as a class before starting the Good or Bad activity.', th: 'ทำแบบฝึกหัดเช็คลิสต์สามคำถามร่วมกันทั้งชั้นก่อนเริ่มกิจกรรมดีหรือไม่ดี' },
      challenge: { en: 'Have students write their own "good or bad" AI scenario for classmates to sort.', th: 'ให้นักเรียนเขียนสถานการณ์ "ดีหรือไม่ดี" ของ AI ของตัวเองให้เพื่อนร่วมชั้นจัดหมวดหมู่' }
    },
    assessmentMaterials: {
      en: ['Slide deck: Using AI Responsibly (9 slides)', '"Good or Bad" scenario cards (5 scenarios; answer key: Bad, Bad, Good, Bad, Good)'],
      th: ['สไลด์นำเสนอ: การใช้ AI อย่างมีความรับผิดชอบ (9 สไลด์)', 'การ์ดสถานการณ์ "ดีหรือไม่ดี" (5 สถานการณ์ เฉลย: ไม่ดี, ไม่ดี, ดี, ไม่ดี, ดี)']
    }
  },
  {
    id: 'ai-project', icon: '🚀', duration: '50–60 min',
    slidesFile: 'slides/lesson-5-ai-project.pptx',
    image: 'assets/lessons/lesson-5-ai-project-en.jpg', imageRatio: '1672/941', imageTh: 'assets/lessons/lesson-5-ai-project-th.jpg',
    title: { en: 'AI Around Us Project', th: 'โครงงาน AI รอบตัวเรา' },
    short: { en: 'Students apply what they learned and explain AI to others.', th: 'นักเรียนนำสิ่งที่เรียนรู้มาประยุกต์ใช้และอธิบาย AI ให้ผู้อื่นฟัง' },
    objective: { en: 'Students apply what they learned and explain AI to others.', th: 'นักเรียนนำสิ่งที่เรียนรู้มาประยุกต์ใช้และอธิบาย AI ให้ผู้อื่นฟัง' },
    materials: {
      notech: {
        en: ['Poster paper and markers'],
        th: ['กระดาษโปสเตอร์และปากกาเมจิก']
      },
      tech: {
        en: ['Laptop/tablet access for slides (e.g. Canva or Google Slides)', 'Projector for presentations'],
        th: ['แล็ปท็อป/แท็บเล็ตสำหรับทำสไลด์ (เช่น Canva หรือ Google Slides)', 'โปรเจกเตอร์สำหรับการนำเสนอ']
      }
    },
    warmup: { en: ['Review: What is AI? How does AI learn? Can AI make mistakes?'], th: ['ทบทวน: AI คืออะไร? AI เรียนรู้อย่างไร? AI ทำผิดพลาดได้ไหม?'] },
    explanation: {
      en: 'Groups create an "AI Around Us" poster including three examples of AI, how AI helps people, one limitation of AI, and one rule for responsible use.',
      th: 'แต่ละกลุ่มสร้างโปสเตอร์ "AI รอบตัวเรา" ประกอบด้วยตัวอย่าง AI สามตัวอย่าง วิธีที่ AI ช่วยเหลือมนุษย์ ข้อจำกัดหนึ่งข้อของ AI และกฎการใช้งานอย่างมีความรับผิดชอบหนึ่งข้อ'
    },
    activity: {
      notech: {
        en: 'Poster Project & Presentation: Groups build a paper poster, then present it to the class.',
        th: 'โครงงานโปสเตอร์และการนำเสนอ: แต่ละกลุ่มสร้างโปสเตอร์กระดาษแล้วนำเสนอหน้าชั้นเรียน'
      },
      tech: {
        en: 'Slide Project & Presentation: Groups build a short slide deck (e.g. in Canva or Google Slides), then present it to the class.',
        th: 'โครงงานสไลด์และการนำเสนอ: แต่ละกลุ่มสร้างสไลด์สั้น ๆ (เช่นใน Canva หรือ Google Slides) แล้วนำเสนอหน้าชั้นเรียน'
      }
    },
    reflection: { en: ['What is the most important thing you learned about AI?'], th: ['สิ่งสำคัญที่สุดที่คุณได้เรียนรู้เกี่ยวกับ AI คืออะไร?'] },
    groupSize: { en: 'Whole class + independent (or pairs)', th: 'ทั้งชั้นเรียน + ฝึกด้วยตนเอง (หรือจับคู่)' },
    beforeYouBegin: { en: "Gather poster-making supplies (large paper, markers, optional magazines or printed images) ahead of time. Since this is the unit's capstone lesson, having students' worksheets or notes from Lessons 1–4 on hand will help them recall specific examples for their poster.", th: 'เตรียมอุปกรณ์ทำโปสเตอร์ (กระดาษแผ่นใหญ่ ปากกาเมจิก และนิตยสารหรือภาพพิมพ์ถ้ามี) ไว้ล่วงหน้า เนื่องจากนี่คือบทเรียนสรุปของหน่วยการเรียนรู้ การมีใบงานหรือโน้ตจากบทเรียนที่ 1–4 พร้อมใช้งานจะช่วยให้นักเรียนนึกถึงตัวอย่างเฉพาะสำหรับโปสเตอร์ของตน' },
    tipBeforeYouBegin: { en: 'If time is short, pairs can share one poster instead of working individually. It keeps the review conversation going while still producing a finished product each pair can be proud of.', th: 'หากมีเวลาจำกัด ให้จับคู่ทำโปสเตอร์ร่วมกันหนึ่งแผ่นแทนการทำคนเดียว วิธีนี้ยังคงให้บทสนทนาทบทวนดำเนินต่อไป ในขณะที่แต่ละคู่ยังได้ผลงานที่เสร็จสมบูรณ์และภาคภูมิใจ' },
    tipWarmup: { en: 'Keep a running list on the board as students answer. It becomes a quick word bank they can pull from once they start building their poster.', th: 'จดรายการคำตอบไว้บนกระดานระหว่างที่นักเรียนตอบ มันจะกลายเป็นคลังคำศัพท์ที่นักเรียนหยิบมาใช้ได้ทันทีเมื่อเริ่มทำโปสเตอร์' },
    bodyBlocks: [
      { heading: { en: 'Introduction: Make a Poster!', th: 'บทนำ: มาทำโปสเตอร์กัน!' }, text: { en: 'Explain that students will show what they\'ve learned across the whole unit by creating an "AI Around Us" poster. Each poster must include:', th: 'อธิบายว่านักเรียนจะแสดงสิ่งที่ได้เรียนรู้ตลอดทั้งหน่วยการเรียนรู้ด้วยการสร้างโปสเตอร์ "AI รอบตัวเรา" โปสเตอร์แต่ละแผ่นต้องมี:' }, items: {
        en: ['Three examples of AI.', 'How AI helps people.', 'One limitation of AI.', 'One rule for responsible use.'],
        th: ['ตัวอย่าง AI สามตัวอย่าง', 'AI ช่วยเหลือมนุษย์อย่างไร', 'ข้อจำกัดหนึ่งข้อของ AI', 'กฎการใช้งานอย่างมีความรับผิดชอบหนึ่งข้อ']
      }, tip: { en: 'Sketch a simple four-box layout on the board (Examples / Helps / Limitation / Rule) as a model. It gives students a starting structure without dictating their design.', th: 'ร่างผังสี่ช่องอย่างง่ายบนกระดาน (ตัวอย่าง / ช่วยเหลือ / ข้อจำกัด / กฎ) เป็นแบบอย่าง ช่วยให้นักเรียนมีโครงสร้างเริ่มต้นโดยไม่บังคับการออกแบบ' } },
      { text: { en: "Point out that each requirement connects directly back to one of the unit's four review questions, so students already have everything they need from the last four lessons.", th: 'ชี้ให้เห็นว่าแต่ละข้อกำหนดเชื่อมโยงโดยตรงกับหนึ่งในสี่คำถามทบทวนของหน่วยการเรียนรู้ ดังนั้นนักเรียนจึงมีทุกอย่างที่ต้องการจากสี่บทเรียนที่ผ่านมาอยู่แล้ว' } }
    ],
    postActivityBlocks: [
      { activityStyle: true, heading: { en: 'Poster-Making Activity', th: 'กิจกรรมทำโปสเตอร์' }, text: { en: 'Students work independently or in pairs to design and complete their "AI Around Us" poster.', th: 'นักเรียนทำงานเดี่ยวหรือจับคู่เพื่อออกแบบและทำโปสเตอร์ "AI รอบตัวเรา" ให้เสร็จสมบูรณ์' }, items: {
        en: [
          'Circulate and prompt students who are stuck: "What\'s an AI tool you or your family uses at home?" or "What mistake did we talk about in Lesson 3?"',
          'Encourage students to use both words and pictures: a labeled sketch, a magazine cutout, or a drawn icon are all valid ways to show an example of AI.',
          'Remind students their "rule for responsible use" should be specific and personal, not just copied from the board.'
        ],
        th: [
          'เดินสำรวจและกระตุ้นนักเรียนที่ติดขัด: "มีเครื่องมือ AI อะไรที่คุณหรือครอบครัวใช้ที่บ้านบ้าง" หรือ "เราพูดถึงข้อผิดพลาดอะไรในบทเรียนที่ 3"',
          'สนับสนุนให้นักเรียนใช้ทั้งคำและภาพ: ภาพร่างพร้อมป้ายกำกับ ภาพตัดจากนิตยสาร หรือไอคอนที่วาดเอง ล้วนเป็นวิธีที่ใช้ได้ในการแสดงตัวอย่าง AI',
          'เตือนนักเรียนว่า "กฎการใช้งานอย่างมีความรับผิดชอบ" ควรเจาะจงและเป็นส่วนตัว ไม่ใช่คัดลอกจากกระดาน'
        ]
      } },
      { tip: { en: 'For students who finish early, challenge them to add one more real-life example beyond the four required elements, or to swap posters with a partner and guess which rule belongs to which classmate.', th: 'สำหรับนักเรียนที่ทำเสร็จก่อนเวลา ท้าทายให้เพิ่มตัวอย่างจากชีวิตจริงอีกหนึ่งตัวอย่างนอกเหนือจากสี่องค์ประกอบที่กำหนด หรือให้แลกโปสเตอร์กับเพื่อนแล้วทายว่ากฎไหนเป็นของเพื่อนคนไหน' } },
      { heading: { en: 'Share Out', th: 'นำเสนอผลงาน' }, text: { en: 'Have students do a quick gallery walk or partner share, showing their poster and explaining one part of it out loud.', th: 'ให้นักเรียนเดินชมผลงานอย่างรวดเร็วหรือแชร์กับคู่ โดยแสดงโปสเตอร์และอธิบายหนึ่งส่วนออกมาดัง ๆ' }, items: {
        en: ["Prompt listeners to ask one question or share one thing they liked about a classmate's poster."],
        th: ['กระตุ้นให้ผู้ฟังถามหนึ่งคำถาม หรือแชร์หนึ่งสิ่งที่ชอบเกี่ยวกับโปสเตอร์ของเพื่อน']
      } }
    ],
    exitTicket: { en: 'Optional exit ticket: have students write their answer on the back of their poster before turning it in or displaying it.', th: 'ทางเลือกเสริม: ให้นักเรียนเขียนคำตอบไว้ด้านหลังโปสเตอร์ก่อนส่งหรือนำไปจัดแสดง' },
    misconceptionsHeading: { en: 'Unit Wrap-Up: Ideas to Double-Check', th: 'สรุปหน่วยการเรียนรู้: แนวคิดที่ควรตรวจสอบซ้ำ' },
    misconceptions: [
      { claim: { en: 'AI thinks like a human brain.', th: 'AI คิดเหมือนสมองมนุษย์' }, explanation: { en: "Remind students AI recognizes patterns in data; it doesn't understand things the way people do.", th: 'เตือนนักเรียนว่า AI จดจำรูปแบบจากข้อมูล มันไม่ได้เข้าใจสิ่งต่าง ๆ แบบเดียวกับมนุษย์' } },
      { claim: { en: "AI is always right because it's a computer.", th: 'AI ถูกต้องเสมอเพราะเป็นคอมพิวเตอร์' }, explanation: { en: 'Posters should reflect that AI can make mistakes and needs to be double-checked.', th: 'โปสเตอร์ควรสะท้อนว่า AI ทำผิดพลาดได้และต้องตรวจสอบซ้ำเสมอ' } },
      { claim: { en: 'Using AI is always good, or always bad.', th: 'การใช้ AI ดีเสมอ หรือไม่ดีเสมอ' }, explanation: { en: 'Responsible use depends on the situation, which is why each poster includes both a benefit and a limitation.', th: 'การใช้อย่างมีความรับผิดชอบขึ้นอยู่กับสถานการณ์ ซึ่งเป็นเหตุผลที่โปสเตอร์แต่ละแผ่นต้องมีทั้งประโยชน์และข้อจำกัด' } }
    ],
    differentiation: {
      support: { en: 'Provide a poster template with four labeled boxes (Examples / Helps / Limitation / Rule) so students can focus on content rather than layout.', th: 'จัดเตรียมแม่แบบโปสเตอร์ที่มีสี่ช่องพร้อมป้ายกำกับ (ตัวอย่าง / ช่วยเหลือ / ข้อจำกัด / กฎ) เพื่อให้นักเรียนโฟกัสที่เนื้อหามากกว่าการจัดวาง' },
      challenge: { en: 'Ask students to illustrate their "limitation of AI" box with one of the specific real-life mistake types from Lesson 3 (factual error, bias, or hallucination).', th: 'ให้นักเรียนวาดภาพประกอบช่อง "ข้อจำกัดของ AI" ด้วยหนึ่งในประเภทข้อผิดพลาดจากชีวิตจริงจากบทเรียนที่ 3 (ข้อผิดพลาดด้านข้อเท็จจริง อคติ หรือการสร้างข้อมูลเท็จ)' }
    },
    assessmentMaterials: {
      en: ['Slide deck: AI Around Us (3 slides)', '"AI Around Us" poster requirements checklist (3 examples, benefit, limitation, rule)', "Completed posters serve as the unit's culminating assessment"],
      th: ['สไลด์นำเสนอ: AI รอบตัวเรา (3 สไลด์)', 'รายการตรวจสอบข้อกำหนดโปสเตอร์ "AI รอบตัวเรา" (ตัวอย่าง 3 ข้อ ประโยชน์ ข้อจำกัด กฎ)', 'โปสเตอร์ที่เสร็จสมบูรณ์ทำหน้าที่เป็นการประเมินสรุปของหน่วยการเรียนรู้']
    }
  }
];
