/*
 * All page copy lives here. Every field is { zh, en }.
 * Keep wording consistent with scott-website-brief.md: verified facts only,
 * no inflated attribution, statuses stated as they are.
 */
window.SITE = {
  config: {
    // Physics competition awards come from self-reported materials; off until Scott confirms.
    showAwards: false,
  },

  ui: {
    brand: { zh: '陈佳乐', en: 'Scott Chen' },
    title: { zh: '陈佳乐 · Scott Chen', en: 'Scott Chen · 陈佳乐' },

    'nav.about': { zh: '关于', en: 'About' },
    'nav.experience': { zh: '经历', en: 'Experience' },
    'nav.contact': { zh: '联系', en: 'Contact' },

    'hero.eyebrow': { zh: '香港科技大学 · 本科生 · 香港', en: 'HKUST · Undergraduate · Hong Kong' },
    'hero.name': { zh: '陈佳乐', en: 'Scott Chen' },
    'hero.alt': { zh: 'Scott Chen', en: '陈佳乐 · Chen Jiale' },
    'hero.lede': {
      zh: '香港科技大学本科生。课余做一些可以公开的编程项目，也参加科学志愿服务和校园社团。',
      en: 'Undergraduate at HKUST. Outside class I build coding projects I can share publicly, volunteer at science events and serve on campus club committees.',
    },
    'hero.cta.github': { zh: 'GitHub 上的项目', en: 'Projects on GitHub' },
    'hero.cta.experience': { zh: '经历', en: 'Experience' },

    'hud.title': { zh: '二维 Ising · Metropolis', en: '2D Ising · Metropolis' },
    'hud.rate': { zh: '尝试/秒', en: 'flips/s' },
    'hud.hint': { zh: '拖动调节温度 · 移动鼠标扰动晶格', en: 'Drag to set temperature · move to perturb' },

    'about.title': { zh: '关于', en: 'About' },
    'experience.title': { zh: '经历', en: 'Experience' },
    'awards.title': { zh: '奖项', en: 'Awards' },
    'awards.note': {
      zh: '来源为本人材料，未附奖状复核。',
      en: 'From self-reported materials; certificates not attached.',
    },
    'contact.title': { zh: '项目与联系', en: 'Projects & Contact' },
    'contact.label': { zh: '项目代码 · 目前唯一的公开主页', en: 'Code · the one public profile, for now' },
    'contact.desc': {
      zh: '个人项目都在这里，可以从这里开始了解我在做什么。',
      en: 'All my personal projects live here — the best place to see what I’m working on.',
    },
    'footer.zh': { zh: '本网页为个人主页，内容可能不完整。', en: '' },
  },

  about: {
    paragraphs: [
      {
        zh: '我是陈佳乐（Scott Chen），香港科技大学本科生。',
        en: 'I’m Scott Chen (陈佳乐), an undergraduate at HKUST.',
      },
      {
        zh: '高中阶段主要准备物理竞赛；现在课余用编程和 AI 辅助工具做自己感兴趣的项目，比如跨设备的物理模拟、提示词质量工具，也参与科学志愿和校园社团。',
        en: 'In high school I mostly prepared for physics olympiads. Now I use code and AI-assisted tools on projects I find interesting — cross-device physics simulation, prompt-quality tools — and take part in science volunteering and campus clubs.',
      },
    ],
    facts: [
      { k: { zh: '中文名', en: 'Chinese name' }, v: { zh: '陈佳乐 · Chen Jiale', en: '陈佳乐 · Chen Jiale' } },
      { k: { zh: '学校', en: 'School' }, v: { zh: '香港科技大学 · 本科', en: 'HKUST · Undergraduate' } },
      { k: { zh: '入学', en: 'Since' }, v: { zh: '2026 年秋季', en: 'Fall 2026' } },
      { k: { zh: '所在地', en: 'Based in' }, v: { zh: '香港', en: 'Hong Kong' } },
      { k: { zh: '兴趣', en: 'Interests' }, v: { zh: '古琴 · 网球 · 乒乓球 · 长跑', en: 'Guqin · Tennis · Table tennis · Running' } },
    ],
  },

  experience: [
    {
      when: { zh: '2026.10', en: 'Oct 2026' },
      title: { zh: 'Hong Kong AI Summit 2026 · BUILD ACROSS 黑客松', en: 'Hong Kong AI Summit 2026 · BUILD ACROSS Hackathon' },
      role: { zh: '参赛者（团队）· 获参赛证书', en: 'Participant (team) · Certificate of Participation' },
    },
    {
      when: { zh: '2026', en: '2026' },
      title: { zh: '2026 未来科学大奖周', en: '2026 Future Science Prize Week' },
      role: { zh: '志愿者（已报名并参加培训）', en: 'Volunteer (registered and attended training)' },
    },
    {
      when: { zh: '2026.09 —', en: 'Sep 2026 —' },
      title: { zh: '香港科技大学内地学生学者联谊会（MSSS）第 34 届', en: 'HKUST Mainland Students and Scholars Society (MSSS), 34th term' },
      role: { zh: '创业俱乐部执委 · 网球俱乐部执委', en: 'Executive Committee, Entrepreneurship Club & Tennis Club' },
    },
    {
      when: { zh: '2026.08', en: 'Aug 2026' },
      title: { zh: '哈尔滨工业大学（深圳）计算机科学与技术学院', en: 'School of Computer Science and Technology, HIT (Shenzhen)' },
      role: { zh: '研学访问', en: 'Research visit' },
    },
    {
      when: { zh: '高中', en: 'High school' },
      title: { zh: '长沙市红十字会', en: 'Changsha Red Cross' },
      role: { zh: '志愿者', en: 'Volunteer' },
    },
  ],

  awards: [
    { when: '2025', title: { zh: '第 42 届全国中学生物理竞赛（湖南赛区）一等奖', en: 'First Prize, 42nd Chinese Physics Olympiad (Hunan)' } },
    { when: '2025', title: { zh: '第 21 届泛珠三角物理奥林匹克 · 物理综合试一等奖', en: 'First Prize, 21st Pan Pearl River Delta Physics Olympiad' } },
    { when: '2024', title: { zh: '第 41 届全国中学生物理竞赛（湖南赛区）一等奖', en: 'First Prize, 41st Chinese Physics Olympiad (Hunan)' } },
  ],
};
