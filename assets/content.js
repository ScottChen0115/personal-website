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
    'search.placeholder': { zh: '搜索经历、爱好或联系方式…', en: 'Search experience, hobbies, contact…' },
    'search.empty': { zh: '没有找到相关内容', en: 'Nothing matches that' },
    'search.hint': { zh: '回车打开', en: 'Enter to open' },
    'chip.experience': { zh: '经历', en: 'Experience' },
    'chip.hobbies': { zh: '古琴与网球', en: 'Guqin & tennis' },
    'chip.contact': { zh: '联系我', en: 'Say hi' },
    'chip.github': { zh: 'GitHub 项目', en: 'GitHub projects' },

    statement: {
      zh: '香港科技大学本科生。喜欢物理和代码，课余弹古琴、打网球。',
      en: 'Undergraduate at HKUST. Into physics and code — off the clock, guqin and tennis.',
    },
    'statement.link': { zh: '项目都在 GitHub', en: 'Projects live on GitHub' },

    'experience.title': { zh: '经历', en: 'Experience' },
    'experience.hint': { zh: '点击卡片查看详情', en: 'Tap a card for details' },
    'hobbies.title': { zh: '爱好', en: 'Hobbies' },
    'contact.title': { zh: '联系', en: 'Contact' },
    'contact.lede': { zh: '欢迎打个招呼。', en: 'Always happy to hear from you.' },

    'label.email': { zh: '邮箱', en: 'Email' },
    'label.copy': { zh: '复制', en: 'Copy' },
    'label.copied': { zh: '已复制邮箱', en: 'Email copied' },
    'label.close': { zh: '关闭', en: 'Close' },
    'label.prev': { zh: '上一条', en: 'Previous' },
    'label.next': { zh: '下一条', en: 'Next' },
    'label.top': { zh: '回到顶部', en: 'Back to top' },
    'label.githubNote': { zh: '个人项目', en: 'Personal projects' },
    'kind.experience': { zh: '经历', en: 'Experience' },
    'kind.hobby': { zh: '爱好', en: 'Hobby' },
    'kind.contact': { zh: '联系', en: 'Contact' },
  },

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
      points: [
        {
          zh: '11 月 6 日 · 科技论坛「人机共生时代：AI 的边界与人类的选择」，香港科技大学曾肇添演讲厅',
          en: '6 Nov · Science and Technology Forum “Human-Machine Symbiosis Era: Boundaries of AI and Human Choices”, Tsang Shiu Tim Lecture Hall, HKUST',
        },
        {
          zh: '11 月 8 日上午 · 2026 未来科学大奖获奖者与青少年对话，香港科学馆',
          en: '8 Nov, morning · 2026 Future Science Prize Laureates’ Dialogue with the Youth, Hong Kong Science Museum',
        },
        {
          zh: '11 月 8 日下午 · 2026 未来科学大奖颁奖典礼与音乐会，东九文化中心',
          en: '8 Nov, afternoon · 2026 Future Science Prize Awards Ceremony and Concert, East Kowloon Cultural Centre',
        },
      ],
      links: [
        {
          label: { zh: '大奖周官网', en: 'Official Prize Week site' },
          href: {
            zh: 'https://www.futureprize-hk.org/cn-2026futurescienceprizeweek',
            en: 'https://www.futureprize-hk.org/en/2026futurescienceprizeweek',
          },
        },
      ],
      keywords: 'future science prize 未来科学大奖 志愿 volunteer forum 论坛 youth 青少年 ceremony 颁奖 典礼',
    },
    {
      id: 'build-across',
      image: 'assets/img/exp-hackathon.jpg',
      when: { zh: '2026.10.03 – 10.04', en: '3–4 Oct 2026' },
      title: { zh: 'Hong Kong AI Summit 2026 · BUILD ACROSS 黑客松', en: 'Hong Kong AI Summit 2026 · BUILD ACROSS Hackathon' },
      role: { zh: '参赛者（团队）', en: 'Participant (team)' },
      meta: [
        { k: { zh: '地点', en: 'Where' }, v: { zh: 'HKUST Business School Central，金钟', en: 'HKUST Business School Central, Admiralty' } },
        { k: { zh: '赛道', en: 'Track' }, v: { zh: 'Startup – Build Your Own Idea', en: 'Startup – Build Your Own Idea' } },
        {
          k: { zh: '主办', en: 'Organisers' },
          v: {
            zh: 'Erasmus AI Society、Maastricht AI Network 与 HKUST MBA Program',
            en: 'Erasmus AI Society, Maastricht AI Network and the HKUST MBA Program',
          },
        },
      ],
      listTitle: { zh: '要点', en: 'Highlights' },
      points: [
        {
          zh: '为期两天的黑客松，围绕金融、城市化与创业三个方向。',
          en: 'A two-day hackathon around finance, urbanization and entrepreneurship.',
        },
        {
          zh: '参与团队项目，提交了场景资源与气动数据说明文档。',
          en: 'Worked on a team project and contributed documentation for scene assets and aerodynamic data.',
        },
        { zh: '获颁 Certificate of Participation。', en: 'Received a Certificate of Participation.' },
      ],
      links: [
        {
          label: { zh: '团队项目仓库', en: 'Team repository' },
          href: 'https://github.com/sakurakuso/drone-learning-platform',
        },
      ],
      keywords: 'hackathon 黑客松 ai summit build across startup drone 无人机 hkust',
    },
    {
      id: 'msss',
      image: 'assets/img/exp-msss.jpg',
      when: { zh: '2026.09 – 2027.06', en: 'Sep 2026 – Jun 2027' },
      title: { zh: '港科大内地学生学者联谊会 · 第 34 届', en: 'HKUST MSSS · 34th term' },
      role: { zh: '创业俱乐部执委 · 网球俱乐部执委', en: 'Executive Committee · Entrepreneurship & Tennis Clubs' },
      meta: [
        {
          k: { zh: '组织', en: 'Organisation' },
          v: { zh: '香港科技大学内地学生学者联谊会（MSSS）', en: 'HKUST Mainland Students and Scholars Society (MSSS)' },
        },
        { k: { zh: '任期', en: 'Term' }, v: { zh: '2026 年 9 月 – 2027 年 6 月', en: 'Sep 2026 – Jun 2027' } },
      ],
      listTitle: { zh: '做些什么', en: 'What I do' },
      points: [
        { zh: '组织联谊比赛和培训。', en: 'Organise friendly matches and training sessions.' },
        {
          zh: '负责场地协调、人员统筹，以及与学校部门沟通。',
          en: 'Handle venue coordination, staffing and communication with university offices.',
        },
      ],
      links: [],
      keywords: 'msss 执委 executive club 俱乐部 创业 entrepreneurship tennis 网球 社团',
    },
    {
      id: 'hit-shenzhen',
      image: 'assets/img/exp-research.jpg',
      when: { zh: '2026.08', en: 'Aug 2026' },
      title: { zh: '哈尔滨工业大学（深圳）研学访问', en: 'Research visit · HIT (Shenzhen)' },
      role: { zh: '计算机科学与技术学院', en: 'School of Computer Science and Technology' },
      meta: [
        {
          k: { zh: '学校', en: 'University' },
          v: { zh: '哈尔滨工业大学（深圳）', en: 'Harbin Institute of Technology, Shenzhen' },
        },
      ],
      listTitle: { zh: '要点', en: 'Highlights' },
      points: [
        {
          zh: '与李晶教授及博士生团队交流，进入课题组实验室。',
          en: 'Exchanged ideas with Prof. Li Jing and the doctoral team, and spent time in the group’s lab.',
        },
        {
          zh: '借助 AI 工具完成个人网页的设计与搭建。',
          en: 'Designed and built a personal web page with AI tools.',
        },
        {
          zh: '完成物理模型的程序模拟与成果展示。',
          en: 'Simulated a physics model in code and presented the results.',
        },
      ],
      links: [],
      keywords: 'hit 哈工大 深圳 shenzhen research 研学 lab 实验室 physics 物理 simulation 模拟',
    },
  ],

  hobbies: [
    {
      id: 'guqin',
      image: 'assets/img/hobby-guqin.jpg',
      name: { zh: '古琴', en: 'Guqin' },
      desc: { zh: '2020 年开始学琴。', en: 'Playing the seven-string zither since 2020.' },
      keywords: 'guqin 古琴 music 音乐 zither',
    },
    {
      id: 'tennis',
      image: 'assets/img/hobby-tennis.jpg',
      name: { zh: '网球', en: 'Tennis' },
      desc: { zh: '也在 MSSS 网球俱乐部做执委。', en: 'Also on the MSSS Tennis Club committee.' },
      keywords: 'tennis 网球 sport 运动',
    },
  ],

  contact: [
    {
      id: 'email',
      label: { zh: '邮箱', en: 'Email' },
      value: 'scottchen0115@gmail.com',
      href: 'mailto:scottchen0115@gmail.com',
      copy: true,
      keywords: 'email 邮箱 mail gmail',
    },
    {
      id: 'instagram',
      label: { zh: 'Instagram', en: 'Instagram' },
      value: '@scottchen0115',
      href: 'https://www.instagram.com/scottchen0115/',
      keywords: 'instagram ig ins',
    },
    {
      id: 'facebook',
      label: { zh: 'Facebook', en: 'Facebook' },
      value: '@scottchen0115',
      href: 'https://www.facebook.com/scottchen0115',
      keywords: 'facebook fb',
    },
    {
      id: 'github',
      label: { zh: 'GitHub · 个人项目', en: 'GitHub · projects' },
      value: '@ScottChen0115',
      href: 'https://github.com/ScottChen0115',
      keywords: 'github code 代码 项目 projects',
    },
  ],
};
