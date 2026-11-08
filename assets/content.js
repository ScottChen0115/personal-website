/*
 * All page copy lives here. Every text field is { zh, en }.
 * Facts follow scott-website-brief.md, Scott's own updates, the BUILD ACROSS
 * certificate, and the official Future Science Prize site (futureprize-hk.org).
 */
window.SITE = {
  ui: {
    title: { zh: '陈佳乐 · Scott Chen', en: 'Scott Chen · 陈佳乐' },
    'nav.experience': { zh: '经历', en: 'Experience' },
    'nav.hobbies': { zh: '爱好', en: 'Hobbies' },
    'nav.contact': { zh: '联系', en: 'Contact' },

    'hero.alt': { zh: '陈佳乐', en: '陈佳乐 · Chen Jiale' },
    'chip.experience': { zh: '经历', en: 'Experience' },
    'chip.hobbies': { zh: '古琴与网球', en: 'Guqin & tennis' },
    'chip.contact': { zh: '联系我', en: 'Say hi' },
    'chip.github': { zh: 'GitHub 项目', en: 'GitHub projects' },

    'experience.title': { zh: '经历', en: 'Experience' },
    'experience.hint': { zh: '点击卡片查看详情', en: 'Tap a card for details' },
    'hobbies.title': { zh: '爱好', en: 'Hobbies' },
    'contact.title': { zh: '联系', en: 'Contact' },
    'contact.lede': { zh: '欢迎打个招呼。', en: 'Always happy to hear from you.' },

    'label.copy': { zh: '复制', en: 'Copy' },
    'label.copied': { zh: '已复制邮箱', en: 'Email copied' },
    'label.close': { zh: '关闭', en: 'Close' },
    'label.prev': { zh: '上一条', en: 'Previous' },
    'label.next': { zh: '下一条', en: 'Next' },
    'label.top': { zh: '回到顶部', en: 'Back to top' },
  },

  facts: [
    { k: { zh: '学校', en: 'School' }, v: { zh: '香港科技大学 · 本科在读', en: 'HKUST · Undergraduate' } },
    { k: { zh: '兴趣', en: 'Into' }, v: { zh: '物理 · 编程', en: 'Physics · Code' } },
    { k: { zh: '课余', en: 'Off hours' }, v: { zh: '古琴 · 网球', en: 'Guqin · Tennis' } },
    {
      k: { zh: '项目', en: 'Projects' },
      v: { zh: 'GitHub', en: 'GitHub' },
      href: 'https://github.com/ScottChen0115',
    },
  ],

  experience: [
    {
      id: 'future-science-prize',
      image: 'assets/img/exp-future-science.jpg',
      when: { zh: '2026.11.06 · 11.08', en: '6 & 8 Nov 2026' },
      title: { zh: '2026 未来科学大奖周', en: '2026 Future Science Prize Week' },
      role: { zh: '志愿者', en: 'Volunteer' },
      meta: [
        { k: { zh: '地点', en: 'Where' }, v: { zh: '香港', en: 'Hong Kong' } },
        {
          k: { zh: '联合主办', en: 'Co-organisers' },
          v: {
            zh: '香港未来科学大奖基金会、香港科学院',
            en: 'Future Science Prize Foundation (Hong Kong), The Hong Kong Academy of Sciences',
          },
        },
      ],
      listTitle: { zh: '负责场次', en: 'Assigned sessions' },
      sessions: [
        {
          when: { zh: '11 月 6 日', en: '6 Nov' },
          name: {
            zh: '科技论坛「人机共生时代：AI 的边界与人类的选择」',
            en: 'Science and Technology Forum “Human-Machine Symbiosis Era: Boundaries of AI and Human Choices”',
          },
          where: { zh: '香港科技大学曾肇添演讲厅', en: 'Tsang Shiu Tim Lecture Hall, HKUST' },
        },
        {
          when: { zh: '11 月 8 日上午', en: '8 Nov, morning' },
          name: { zh: '2026 未来科学大奖获奖者与青少年对话', en: '2026 Future Science Prize Laureates’ Dialogue with the Youth' },
          where: { zh: '香港科学馆', en: 'Hong Kong Science Museum' },
        },
        {
          when: { zh: '11 月 8 日下午', en: '8 Nov, afternoon' },
          name: { zh: '2026 未来科学大奖颁奖典礼与音乐会', en: '2026 Future Science Prize Awards Ceremony and Concert' },
          where: { zh: '东九文化中心', en: 'East Kowloon Cultural Centre' },
        },
      ],
    },
    {
      id: 'build-across',
      image: 'assets/img/exp-hackathon.jpg',
      when: { zh: '2026.10.03 · 10.04', en: '3 & 4 Oct 2026' },
      title: { zh: 'Hong Kong AI Summit 2026 · BUILD ACROSS 黑客松', en: 'Hong Kong AI Summit 2026 · BUILD ACROSS Hackathon' },
      role: { zh: '参赛者（团队）', en: 'Participant (team)' },
      meta: [
        { k: { zh: '时间', en: 'When' }, v: { zh: '2026 年 10 月 3 日、4 日', en: '3 & 4 October 2026' } },
        { k: { zh: '地点', en: 'Where' }, v: { zh: 'HKUST Business School Central', en: 'HKUST Business School Central' } },
        { k: { zh: '赛道', en: 'Track' }, v: { zh: 'Startup – Build Your Own Idea', en: 'Startup – Build Your Own Idea' } },
        {
          k: { zh: '主办', en: 'Organisers' },
          v: {
            zh: 'Erasmus AI Society、Maastricht AI Network、HKUST MBA Program',
            en: 'Erasmus AI Society, Maastricht AI Network, HKUST MBA Program',
          },
        },
      ],
    },
    {
      id: 'msss',
      image: 'assets/img/exp-msss.jpg',
      when: { zh: '2026.09 – 2027.06', en: 'Sep 2026 – Jun 2027' },
      title: { zh: 'HKUST 内地学生学者联谊会 · 第 34 届', en: 'HKUST MSSS · 34th term' },
      role: { zh: '创业俱乐部执委 · 网球俱乐部执委', en: 'Executive Committee · Entrepreneurship & Tennis Clubs' },
      meta: [
        {
          k: { zh: '组织', en: 'Organisation' },
          v: { zh: '香港科技大学内地学生学者联谊会（MSSS）', en: 'HKUST Mainland Students and Scholars Society (MSSS)' },
        },
        { k: { zh: '任期', en: 'Term' }, v: { zh: '2026 年 9 月 – 2027 年 6 月', en: 'Sep 2026 – Jun 2027' } },
      ],
    },
    {
      id: 'hit-shenzhen',
      image: 'assets/img/exp-research.jpg',
      when: { zh: '2026.08', en: 'Aug 2026' },
      title: { zh: '哈尔滨工业大学（深圳）研学访问', en: 'Research visit · HIT (Shenzhen)' },
      role: { zh: '计算机科学与技术学院', en: 'School of Computer Science and Technology' },
      meta: [
        { k: { zh: '交流', en: 'Exchange' }, v: { zh: '与李晶教授及博士生团队交流', en: 'With Prof. Li Jing and the doctoral team' } },
      ],
    },
  ],

  hobbies: [
    {
      id: 'guqin',
      image: 'assets/img/hobby-guqin.jpg',
      alt: { zh: '陈佳乐弹古琴', en: 'Scott playing the guqin' },
      name: { zh: '古琴', en: 'Guqin' },
      desc: {
        zh: '自 2021 年 1 月起，师从湖南省古琴学会陈严杭老师。',
        en: 'Studying under Chen Yanhang of the Hunan Guqin Society since January 2021.',
      },
    },
    {
      id: 'tennis',
      image: 'assets/img/hobby-tennis.jpg',
      alt: { zh: '网球与球拍', en: 'Tennis racket and ball' },
      name: { zh: '网球', en: 'Tennis' },
    },
  ],

  contact: [
    {
      id: 'email',
      icon: 'mail',
      label: { zh: '邮箱', en: 'Email' },
      value: 'scottchen0115@gmail.com',
      href: 'mailto:scottchen0115@gmail.com',
      copy: true,
    },
    {
      id: 'instagram',
      icon: 'instagram',
      label: { zh: 'Instagram', en: 'Instagram' },
      value: '@scottchen0115',
      href: 'https://www.instagram.com/scottchen0115/',
    },
    {
      id: 'facebook',
      icon: 'facebook',
      label: { zh: 'Facebook', en: 'Facebook' },
      value: '@scottchen0115',
      href: 'https://www.facebook.com/scottchen0115',
    },
    {
      id: 'github',
      icon: 'github',
      label: { zh: 'GitHub · 个人项目', en: 'GitHub · Projects' },
      value: '@ScottChen0115',
      href: 'https://github.com/ScottChen0115',
    },
  ],
};
