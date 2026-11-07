(function () {
  'use strict';

  const SITE = window.SITE;
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  /* ---------------- language ---------------- */

  const LANG_KEY = 'scottchen-lang';
  let lang = (() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (_) {}
    return (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  })();

  const t = (v) => (v && typeof v === 'object' ? (v[lang] ?? v.en ?? '') : v ?? '');
  const ui = (key) => t(SITE.ui[key]);

  function applyLang() {
    root.lang = lang === 'zh' ? 'zh-CN' : 'en';
    root.dataset.lang = lang;
    document.title = ui('title');
    $$('[data-i18n]').forEach((el) => {
      el.textContent = ui(el.dataset.i18n);
    });
    renderAll();
  }

  function switchLang(next) {
    if (next === lang) return;
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch (_) {}
    if (reduceMotion) {
      lang = next;
      applyLang();
      revealAllNow();
      return;
    }
    document.body.classList.add('lang-switching');
    setTimeout(() => {
      lang = next;
      applyLang();
      revealAllNow();
      requestAnimationFrame(() => document.body.classList.remove('lang-switching'));
    }, 220);
  }

  $('.lang-toggle').addEventListener('click', (e) => {
    const opt = e.target.closest('.lang-opt');
    switchLang(opt ? opt.dataset.lang : lang === 'zh' ? 'en' : 'zh');
  });

  /* ---------------- rendering ---------------- */

  function renderAll() {
    renderAbout();
    renderResume();
    renderAwards();
  }

  function renderAbout() {
    $('#about-text').innerHTML = SITE.about.paragraphs.map((p) => `<p>${t(p)}</p>`).join('');
    $('#facts').innerHTML =
      '<dl style="margin:0">' +
      SITE.about.facts.map((f) => `<div class="fact"><dt>${t(f.k)}</dt><dd>${t(f.v)}</dd></div>`).join('') +
      '</dl>';
  }

  function renderResume() {
    $('#resume').innerHTML = SITE.experience
      .map(
        (e, i) => `
        <li class="resume-item reveal" style="--d:${i * 0.05}s">
          <span class="resume-when">${t(e.when)}</span>
          <span class="resume-title">${t(e.title)}</span>
          <span class="resume-role">${t(e.role)}</span>
        </li>`
      )
      .join('');
  }

  function renderAwards() {
    const box = $('#awards');
    if (!SITE.config.showAwards) {
      box.hidden = true;
      box.innerHTML = '';
      return;
    }
    box.hidden = false;
    box.classList.add('reveal');
    box.innerHTML = `
      <h3>${ui('awards.title')}</h3>
      <ul>${SITE.awards.map((a) => `<li><span>${a.when}</span>${t(a.title)}</li>`).join('')}</ul>
      <p>${ui('awards.note')}</p>`;
  }

  /* ---------------- reveal on scroll ---------------- */

  const revealIO = reduceMotion
    ? null
    : new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('in');
              revealIO.unobserve(en.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );

  function observeReveals() {
    $$('.reveal:not(.in)').forEach((el) => {
      if (revealIO) revealIO.observe(el);
      else el.classList.add('in');
    });
  }

  function revealAllNow() {
    $$('.reveal').forEach((el) => el.classList.add('in'));
  }

  /* ---------------- nav: progress, active section ---------------- */

  const nav = $('.nav');
  const bar = $('.progress span');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
      nav.classList.toggle('scrolled', scrollY > 40);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });

  const navLinks = $$('.nav-links a');
  const sectionIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  $$('main .section, .hero').forEach((s) => sectionIO.observe(s));

  /* ---------------- Ising model hero ---------------- */

  function ising() {
    const hero = $('.hero');
    const canvas = $('#ising');
    const ctx = canvas.getContext('2d');
    const slider = $('#hud-slider');
    const hudT = $('#hud-t');
    const hudM = $('#hud-m');
    const hudRate = $('#hud-rate');

    const CELL = 7;
    let cols, rows, n, spin, heat, off, offCtx, img, gridPattern;
    let T = parseFloat(slider.value);
    let w4, w8;
    let running = true;
    let attempts = 0;
    let lastHud = 0;

    const setT = (v) => {
      T = v;
      w4 = Math.exp(-4 / T);
      w8 = Math.exp(-8 / T);
      hudT.textContent = T.toFixed(2);
    };
    setT(T);

    function init() {
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      n = cols * rows;
      spin = new Int8Array(n);
      heat = new Uint8Array(n);
      for (let i = 0; i < n; i++) spin[i] = Math.random() < 0.5 ? 1 : -1;

      canvas.width = cols * CELL;
      canvas.height = rows * CELL;
      canvas.style.width = `${cols * CELL}px`;
      canvas.style.height = `${rows * CELL}px`;

      off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      offCtx = off.getContext('2d');
      img = offCtx.createImageData(cols, rows);

      const tile = document.createElement('canvas');
      tile.width = tile.height = CELL;
      const tc = tile.getContext('2d');
      tc.fillStyle = '#05070a';
      tc.fillRect(CELL - 1, 0, 1, CELL);
      tc.fillRect(0, CELL - 1, CELL, 1);
      gridPattern = ctx.createPattern(tile, 'repeat');

      for (let s = 0; s < 40; s++) sweep(false);
    }

    function sweep(track) {
      const c = cols;
      const r = rows;
      for (let k = 0; k < n; k++) {
        const i = (Math.random() * n) | 0;
        const x = i % c;
        const y = (i / c) | 0;
        const s = spin[i];
        const nb =
          spin[y * c + (x + 1 === c ? 0 : x + 1)] +
          spin[y * c + (x === 0 ? c - 1 : x - 1)] +
          spin[(y + 1 === r ? 0 : y + 1) * c + x] +
          spin[(y === 0 ? r - 1 : y - 1) * c + x];
        const dE = 2 * s * nb;
        if (dE <= 0 || (dE === 4 ? Math.random() < w4 : dE === 8 && Math.random() < w8)) {
          spin[i] = -s;
          if (track) heat[i] = 200;
        }
      }
      attempts += n;
    }

    function draw() {
      const d = img.data;
      for (let i = 0, p = 0; i < n; i++, p += 4) {
        const h = heat[i];
        if (spin[i] > 0) {
          d[p] = 94 + ((90 * h) >> 8);
          d[p + 1] = 231;
          d[p + 2] = 255;
          d[p + 3] = 78 + ((70 * h) >> 8);
        } else {
          d[p] = 139;
          d[p + 1] = 123;
          d[p + 2] = 255;
          d[p + 3] = 14 + ((26 * h) >> 8);
        }
        if (h) heat[i] = h > 28 ? h - 28 : 0;
      }
      offCtx.putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gridPattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const fmt = (v) => (v >= 1e6 ? `${(v / 1e6).toFixed(2)}M` : `${(v / 1e3).toFixed(0)}K`);

    function hud(now) {
      if (now - lastHud < 250) return;
      let m = 0;
      for (let i = 0; i < n; i++) m += spin[i];
      hudM.textContent = Math.abs(m / n).toFixed(2);
      const dt = (now - lastHud) / 1000;
      if (lastHud) hudRate.textContent = fmt(attempts / dt);
      attempts = 0;
      lastHud = now;
    }

    function frame(now) {
      if (running) {
        sweep(true);
        draw();
        hud(now);
      }
      requestAnimationFrame(frame);
    }

    function perturb(e) {
      if (e.target.closest('.hud, .btn')) return;
      const rect = canvas.getBoundingClientRect();
      const cx = Math.floor((e.clientX - rect.left) / CELL);
      const cy = Math.floor((e.clientY - rect.top) / CELL);
      const R = 4;
      for (let dy = -R; dy <= R; dy++) {
        for (let dx = -R; dx <= R; dx++) {
          if (dx * dx + dy * dy > R * R) continue;
          const x = cx + dx;
          const y = cy + dy;
          if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
          const i = y * cols + x;
          if (Math.random() < 0.5) {
            spin[i] = -spin[i];
            heat[i] = 255;
          }
        }
      }
    }

    init();
    slider.addEventListener('input', () => setT(parseFloat(slider.value)));

    if (reduceMotion) {
      for (let s = 0; s < 200; s++) sweep(false);
      draw();
      hudM.textContent = '—';
      return;
    }

    hero.addEventListener('pointermove', perturb, { passive: true });
    new IntersectionObserver(([en]) => (running = en.isIntersecting && !document.hidden)).observe(hero);
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden && hero.getBoundingClientRect().bottom > 0;
    });

    let resizeTimer;
    let lastW = hero.clientWidth;
    addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (Math.abs(hero.clientWidth - lastW) < 40 && canvas.height >= hero.clientHeight) return;
        lastW = hero.clientWidth;
        init();
      }, 200);
    });

    requestAnimationFrame(frame);
  }

  /* ---------------- boot ---------------- */

  applyLang();
  observeReveals();
  onScroll();
  ising();
  requestAnimationFrame(() =>
    $$('.hero .reveal').forEach((el, i) => {
      el.style.setProperty('--d', `${0.1 + i * 0.1}s`);
      el.classList.add('in');
    })
  );
})();
