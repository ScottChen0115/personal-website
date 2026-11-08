/*
 * All page copy lives here.
 * Facts follow scott-website-brief.md, Scott's own updates, the BUILD ACROSS
 * certificate, and the official Future Science Prize site (futureprize-hk.org).
 * Physics awards are checked against the official lists on cpho.pku.edu.cn
 * (Chinese Physical Society) and panpearl-phys.hkust.edu.hk.
 */
window.SITE = {
  facts: [
    { k: 'School', v: 'HKUST · Undergraduate' },
    {
      k: 'Into',
      items: [
        { label: 'Physics', open: 'physics' },
        { label: 'Computer Science', open: 'cs' },
      ],
    },
    { k: 'Off hours', v: 'Guqin · Tennis' },
    { k: 'Projects', items: [{ label: 'GitHub', href: 'https://github.com/ScottChen0115' }] },
  ],

  details: {
    physics: {
      role: 'Physics Olympiad',
      when: '2024 – 2025',
      title: 'Physics',
      meta: [],
      listTitle: 'Awards',
      sessions: [
        { when: '2025', name: '42nd Chinese Physics Olympiad (CPhO)', where: 'Provincial First Prize · Hunan' },
        { when: '2025', name: '21st Pan Pearl River Delta Physics Olympiad', where: 'First Prize · Comprehensive Test' },
        { when: '2024', name: '41st Chinese Physics Olympiad (CPhO)', where: 'Provincial First Prize · Hunan' },
      ],
    },
    cs: {
      role: 'Programming',
      title: 'Computer Science',
      meta: [
        { k: 'Language', v: 'Python' },
        { k: 'Projects', v: 'github.com/ScottChen0115', href: 'https://github.com/ScottChen0115' },
      ],
    },
  },

  experience: [
    {
      id: 'future-science-prize',
      image: 'assets/img/exp-future-science.jpg',
      when: '6 & 8 Nov 2026',
      title: '2026 Future Science Prize Week',
      role: 'Volunteer',
      meta: [
        { k: 'Where', v: 'Hong Kong' },
        { k: 'Co-organisers', v: 'Future Science Prize Foundation (Hong Kong), The Hong Kong Academy of Sciences' },
      ],
      listTitle: 'Assigned sessions',
      sessions: [
        {
          when: '6 Nov',
          name: 'Science and Technology Forum “Human-Machine Symbiosis Era: Boundaries of AI and Human Choices”',
          where: 'Tsang Shiu Tim Lecture Hall, HKUST',
        },
        {
          when: '8 Nov, morning',
          name: '2026 Future Science Prize Laureates’ Dialogue with the Youth',
          where: 'Hong Kong Science Museum',
        },
        {
          when: '8 Nov, afternoon',
          name: '2026 Future Science Prize Awards Ceremony and Concert',
          where: 'East Kowloon Cultural Centre',
        },
      ],
    },
    {
      id: 'build-across',
      image: 'assets/img/exp-hackathon.jpg',
      when: '3 & 4 Oct 2026',
      title: 'Hong Kong AI Summit 2026 · BUILD ACROSS Hackathon',
      role: 'Participant (team)',
      meta: [
        { k: 'When', v: '3 & 4 October 2026' },
        { k: 'Where', v: 'HKUST Business School Central' },
        { k: 'Track', v: 'Startup – Build Your Own Idea' },
        { k: 'Organisers', v: 'Erasmus AI Society, Maastricht AI Network, HKUST MBA Program' },
      ],
    },
    {
      id: 'msss',
      image: 'assets/img/exp-msss.jpg',
      when: 'Sep 2026 – Jun 2027',
      title: 'HKUST MSSS · 34th term',
      role: 'Executive Committee · Entrepreneurship & Tennis Clubs',
      meta: [
        { k: 'Organisation', v: 'HKUST Mainland Students and Scholars Society (MSSS)' },
        { k: 'Term', v: 'Sep 2026 – Jun 2027' },
      ],
    },
    {
      id: 'hit-shenzhen',
      image: 'assets/img/exp-research.jpg',
      when: 'Aug 2026',
      title: 'Research visit · HIT (Shenzhen)',
      role: 'School of Computer Science and Technology',
      meta: [{ k: 'Exchange', v: 'With Prof. Li Jing and the doctoral team' }],
    },
  ],

  hobbies: [
    {
      id: 'guqin',
      image: 'assets/img/hobby-guqin.jpg',
      alt: 'Scott playing the guqin',
      name: 'Guqin',
      desc: 'Studying under Chen Yanhang of the Hunan Guqin Society since January 2021.',
    },
    {
      id: 'tennis',
      image: 'assets/img/hobby-tennis.jpg',
      alt: 'Tennis racket and ball',
      name: 'Tennis',
    },
  ],

  contact: [
    { id: 'email', icon: 'mail', label: 'Email', value: 'scottchen0115@gmail.com', href: 'mailto:scottchen0115@gmail.com', copy: true },
    { id: 'x', icon: 'x', label: 'X', value: '@ScottCheni21e', href: 'https://x.com/ScottCheni21e' },
    { id: 'instagram', icon: 'instagram', label: 'Instagram', value: '@scottchen0115', href: 'https://www.instagram.com/scottchen0115/' },
    { id: 'facebook', icon: 'facebook', label: 'Facebook', value: '@scottchen0115', href: 'https://www.facebook.com/scottchen0115' },
    { id: 'github', icon: 'github', label: 'GitHub · Projects', value: '@ScottChen0115', href: 'https://github.com/ScottChen0115' },
  ],
};
