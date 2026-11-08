(function () {
  'use strict';

  const SITE = window.SITE;
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

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
    $$('[data-i18n]').forEach((el) => (el.textContent = ui(el.dataset.i18n)));
    $$('[data-i18n-placeholder]').forEach((el) => (el.placeholder = ui(el.dataset.i18nPlaceholder)));
    $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', ui(el.dataset.i18nAria)));
    renderStatement();
    renderExperience();
    renderHobbies();
    renderContact();
    buildIndex();
    if (modalIndex !== null) fillModal(modalIndex);
  }

  function switchLang(next) {
    if (next === lang) return;
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch (_) {}
    const swap = () => {
      lang = next;
      applyLang();
      $$('.reveal').forEach((el) => el.classList.add('in'));
      updateStatement();
    };
    if (reduceMotion) return swap();
    document.body.classList.add('lang-switching');
    setTimeout(() => {
      swap();
      requestAnimationFrame(() => document.body.classList.remove('lang-switching'));
    }, 220);
  }

  $('.lang-toggle').addEventListener('click', (e) => {
    const opt = e.target.closest('.lang-opt');
    switchLang(opt ? opt.dataset.lang : lang === 'zh' ? 'en' : 'zh');
  });

  /* ---------------- rendering ---------------- */

  function renderStatement() {
    const text = ui('statement');
    const parts = lang === 'zh' ? Array.from(text) : text.split(/(\s+)/);
    $('#statement').innerHTML = parts
      .map((p) => (/^\s+$/.test(p) ? p : `<span class="w">${esc(p)}</span>`))
      .join('');
  }

  function renderExperience() {
    $('#exp-grid').innerHTML = SITE.experience
      .map(
        (e, i) => `
        <button type="button" class="exp-card reveal" data-index="${i}" style="--d:${(i % 2) * 0.08}s">
          <span class="exp-media">
            <img src="${e.image}" alt="" loading="lazy" decoding="async" />
            <span class="exp-date">${esc(t(e.when))}</span>
          </span>
          <span class="exp-body">
            <span>
              <h3 class="exp-title">${esc(t(e.title))}</h3>
              <p class="exp-role">${esc(t(e.role))}</p>
            </span>
            <span class="exp-plus" aria-hidden="true">+</span>
          </span>
        </button>`
      )
      .join('');
    $$('.exp-card').forEach((card) => {
      card.addEventListener('click', () => openModal(Number(card.dataset.index)));
      if (finePointer && !reduceMotion) bindTilt(card);
    });
    if (revealIO) $$('.exp-card:not(.in)').forEach((el) => revealIO.observe(el));
  }

  function renderHobbies() {
    $('#hobby-grid').innerHTML = SITE.hobbies
      .map(
        (h, i) => `
        <figure class="hobby reveal" id="hobby-${h.id}" style="--d:${i * 0.08}s">
          <img src="${h.image}" alt="${esc(t(h.name))}" loading="lazy" decoding="async" />
          <figcaption><h3>${esc(t(h.name))}</h3><p>${esc(t(h.desc))}</p></figcaption>
        </figure>`
      )
      .join('');
    if (finePointer && !reduceMotion) {
      $$('.hobby').forEach((fig) => {
        fig.addEventListener('pointermove', (e) => {
          const r = fig.getBoundingClientRect();
          fig.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * -14}px`);
          fig.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * -14}px`);
        });
        fig.addEventListener('pointerleave', () => {
          fig.style.removeProperty('--px');
          fig.style.removeProperty('--py');
        });
      });
    }
    if (revealIO) $$('.hobby:not(.in)').forEach((el) => revealIO.observe(el));
  }

  function renderContact() {
    $('#contact-list').innerHTML = SITE.contact
      .map((c) => {
        const external = c.href.startsWith('http');
        return `
        <li class="contact-row reveal" id="contact-${c.id}">
          <a class="contact-link" href="${c.href}"${external ? ' target="_blank" rel="noopener"' : ''}>
            <span class="contact-label">${esc(t(c.label))}</span>
            <span class="contact-value">${esc(c.value)}</span>
            <span class="contact-arrow" aria-hidden="true">→</span>
          </a>
          ${c.copy ? `<button type="button" class="copy-btn" data-copy="${esc(c.value)}">${esc(ui('label.copy'))}</button>` : ''}
        </li>`;
      })
      .join('');
    $$('.copy-btn').forEach((btn) => btn.addEventListener('click', () => copyText(btn.dataset.copy, btn)));
    if (revealIO) $$('.contact-row:not(.in)').forEach((el) => revealIO.observe(el));
  }

  /* ---------------- card tilt ---------------- */

  function bindTilt(card) {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', `${x * 5}deg`);
      card.style.setProperty('--rx', `${y * -5}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  }

  /* ---------------- modal ---------------- */

  const modal = $('#modal');
  const panel = $('.modal-panel', modal);
  let modalIndex = null;
  let lastFocus = null;

  function fillModal(i) {
    const e = SITE.experience[i];
    $('#modal-img').src = e.image;
    const meta = e.meta
      .map((m) => `<div><dt>${esc(t(m.k))}</dt><dd>${esc(t(m.v))}</dd></div>`)
      .join('');
    const points = e.points.map((p) => `<li>${esc(t(p))}</li>`).join('');
    const links = e.links
      .map((l) => `<a href="${t(l.href)}" target="_blank" rel="noopener">${esc(t(l.label))}<span aria-hidden="true">↗</span></a>`)
      .join('');
    $('#modal-body').innerHTML = `
      <div class="modal-kicker"><span class="pill dark">${esc(t(e.role))}</span><span class="pill">${esc(t(e.when))}</span></div>
      <h3 id="modal-title">${esc(t(e.title))}</h3>
      <dl class="modal-meta">${meta}</dl>
      <p class="modal-list-title">${esc(t(e.listTitle))}</p>
      <ul class="modal-points">${points}</ul>
      ${links ? `<div class="modal-links">${links}</div>` : ''}`;
    $('#modal-count').textContent = `${String(i + 1).padStart(2, '0')} / ${String(SITE.experience.length).padStart(2, '0')}`;
  }

  function openModal(i) {
    lastFocus = document.activeElement;
    modalIndex = i;
    fillModal(i);
    modal.hidden = false;
    document.body.classList.add('locked');
    panel.scrollTop = 0;
    requestAnimationFrame(() => {
      modal.classList.add('open');
      panel.focus({ preventScroll: true });
    });
  }

  function closeModal() {
    if (modalIndex === null) return;
    modal.classList.remove('open');
    modalIndex = null;
    document.body.classList.remove('locked');
    setTimeout(() => {
      if (modalIndex === null) modal.hidden = true;
    }, reduceMotion ? 0 : 450);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function stepModal(d) {
    if (modalIndex === null) return;
    const n = SITE.experience.length;
    const next = (modalIndex + d + n) % n;
    panel.animate?.(
      [
        { opacity: 0.4, transform: `translateX(${d * 16}px)` },
        { opacity: 1, transform: 'none' },
      ],
      { duration: reduceMotion ? 0 : 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
    modalIndex = next;
    fillModal(next);
    panel.scrollTop = 0;
  }

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) closeModal();
    const step = e.target.closest('[data-step]');
    if (step) stepModal(Number(step.dataset.step));
  });

  document.addEventListener('keydown', (e) => {
    if (modalIndex !== null) {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight') stepModal(1);
      else if (e.key === 'ArrowLeft') stepModal(-1);
      else if (e.key === 'Tab') {
        const f = $$('button, a[href]', panel).filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        if (e.shiftKey && (document.activeElement === f[0] || document.activeElement === panel)) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
      return;
    }
    const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      focusSearch();
    }
  });

  /* ---------------- search ---------------- */

  const input = $('#search-input');
  const results = $('#search-results');
  let index = [];
  let matches = [];
  let active = 0;

  const textOf = (v) => (v && typeof v === 'object' ? Object.values(v).join(' ') : v || '');

  function buildIndex() {
    index = [
      ...SITE.experience.map((e, i) => ({
        kind: 'kind.experience',
        label: () => t(e.title),
        hay: [e.title, e.role, e.when, ...e.points, ...e.meta.map((m) => m.v)].map(textOf).join(' ') + ' ' + e.keywords,
        run: () => openModal(i),
      })),
      ...SITE.hobbies.map((h) => ({
        kind: 'kind.hobby',
        label: () => `${t(h.name)} · ${t(h.desc)}`,
        hay: [h.name, h.desc].map(textOf).join(' ') + ' ' + h.keywords,
        run: () => goTo(`#hobby-${h.id}`),
      })),
      ...SITE.contact.map((c) => ({
        kind: 'kind.contact',
        label: () => `${t(c.label)} · ${c.value}`,
        hay: [c.label, c.value].map(textOf).join(' ') + ' ' + c.keywords + ' contact 联系',
        run: () => goTo(`#contact-${c.id}`),
      })),
    ].map((it) => ({ ...it, hay: it.hay.toLowerCase() }));
  }

  function search(q) {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return index.slice(0, 6);
    return index
      .map((it) => ({ it, score: terms.reduce((s, term) => s + (it.hay.includes(term) ? 1 : 0), 0) }))
      .filter((r) => r.score === terms.length)
      .map((r) => r.it)
      .slice(0, 6);
  }

  function renderResults() {
    matches = search(input.value);
    active = 0;
    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    if (!matches.length) {
      results.innerHTML = `<li class="none">${esc(ui('search.empty'))}</li>`;
      return;
    }
    results.innerHTML = matches
      .map(
        (m, i) => `
        <li role="option" data-i="${i}" aria-selected="${i === active}">
          <span class="kind">${esc(ui(m.kind))}</span>
          <span class="label">${esc(m.label())}</span>
          ${i === active ? `<span class="enter">${esc(ui('search.hint'))} ↵</span>` : ''}
        </li>`
      )
      .join('');
  }

  function highlight() {
    $$('li[role="option"]', results).forEach((li, i) => {
      li.setAttribute('aria-selected', String(i === active));
      const hint = $('.enter', li);
      if (i === active && !hint) li.insertAdjacentHTML('beforeend', `<span class="enter">${esc(ui('search.hint'))} ↵</span>`);
      if (i !== active && hint) hint.remove();
    });
  }

  function hideResults() {
    results.hidden = true;
    input.setAttribute('aria-expanded', 'false');
  }

  function runMatch(i) {
    const m = matches[i];
    if (!m) return;
    hideResults();
    input.blur();
    m.run();
  }

  input.addEventListener('focus', renderResults);
  input.addEventListener('input', renderResults);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && matches.length) {
      e.preventDefault();
      active = (active + 1) % matches.length;
      highlight();
    } else if (e.key === 'ArrowUp' && matches.length) {
      e.preventDefault();
      active = (active - 1 + matches.length) % matches.length;
      highlight();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runMatch(active);
    } else if (e.key === 'Escape') {
      hideResults();
      input.blur();
    }
  });
  results.addEventListener('pointerdown', (e) => {
    const li = e.target.closest('li[role="option"]');
    if (!li) return;
    e.preventDefault();
    runMatch(Number(li.dataset.i));
  });
  input.addEventListener('blur', () => setTimeout(hideResults, 120));
  $('.search-go').addEventListener('click', () => (input.value ? runMatch(active) : input.focus()));

  function focusSearch() {
    if (scrollY > 40) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      setTimeout(() => input.focus({ preventScroll: true }), reduceMotion ? 0 : 450);
    } else {
      input.focus({ preventScroll: true });
    }
  }
  $('.nav-search').addEventListener('click', focusSearch);

  function goTo(sel) {
    const el = $(sel);
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    el.animate?.(
      [{ boxShadow: '0 0 0 0 rgba(59,91,255,0)' }, { boxShadow: '0 0 0 6px rgba(59,91,255,.25)' }, { boxShadow: '0 0 0 0 rgba(59,91,255,0)' }],
      { duration: 1400, delay: 500, easing: 'ease-out' }
    );
  }

  $$('.chip[data-go]').forEach((chip) =>
    chip.addEventListener('click', () => {
      $(chip.dataset.go).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    })
  );

  /* ---------------- copy + toast ---------------- */

  const toast = $('#toast');
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    showToast(ui('label.copied'));
    btn.classList.add('done');
    btn.textContent = '✓';
    setTimeout(() => {
      btn.classList.remove('done');
      btn.textContent = ui('label.copy');
    }, 1600);
  }

  /* ---------------- statement scroll fill ---------------- */

  const statement = $('#statement');
  function updateStatement() {
    const words = $$('.w', statement);
    if (!words.length) return;
    if (reduceMotion) return words.forEach((w) => w.classList.add('on'));
    const r = statement.getBoundingClientRect();
    const p = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35), 0, 1);
    const n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
  }

  /* ---------------- reveal on scroll ---------------- */

  const revealIO = reduceMotion
    ? null
    : new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add('in');
            revealIO.unobserve(en.target);
          }),
        { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
      );

  /* ---------------- nav ---------------- */

  const nav = $('.nav');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', scrollY > 24);
      updateStatement();
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  const navLinks = $$('.nav-links a');
  const sectionIO = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
      }),
    { rootMargin: '-45% 0px -50% 0px' }
  );
  $$('main > section').forEach((s) => sectionIO.observe(s));

  /* ---------------- wordmark ---------------- */

  function wordmark() {
    const line = $('.wm-line');
    line.innerHTML = Array.from(line.textContent)
      .map((ch, i) => (ch === ' ' ? `<span class="wm-char space" style="--i:${i}"> </span>` : `<span class="wm-char" style="--i:${i}">${ch}</span>`))
      .join('');
    if (!reduceMotion) {
      line.classList.add('wm-intro');
      setTimeout(() => line.classList.remove('wm-intro'), 1800);
    }
    if (!finePointer || reduceMotion) return;
    const chars = $$('.wm-char:not(.space)', line);
    const hero = $('.hero');
    let raf = 0;
    let px = 0;
    let py = 0;
    hero.addEventListener('pointermove', (e) => {
      px = e.clientX;
      py = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        chars.forEach((c) => {
          const r = c.getBoundingClientRect();
          const dx = px - (r.left + r.width / 2);
          const dy = py - (r.top + r.height / 2);
          const f = Math.exp(-(dx * dx + dy * dy) / (2 * 160 * 160));
          c.style.setProperty('--ty', `${(-f * 0.08).toFixed(3)}em`);
          c.style.setProperty('--s', (1 + f * 0.06).toFixed(3));
        });
      });
    });
    hero.addEventListener('pointerleave', () =>
      chars.forEach((c) => {
        c.style.removeProperty('--ty');
        c.style.removeProperty('--s');
      })
    );
  }

  /* ---------------- dot field (2D Ising, Metropolis) ---------------- */

  function field() {
    const hero = $('.hero');
    const canvas = $('#field');
    const ctx = canvas.getContext('2d');
    const CELL = 16;
    const T = 2.3;
    const w4 = Math.exp(-4 / T);
    const w8 = Math.exp(-8 / T);
    let cols, rows, n, spin, W, H, dpr;
    let mx = -9999;
    let my = -9999;
    let running = true;

    function init() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = hero.clientWidth;
      H = hero.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      cols = Math.ceil(W / CELL) + 1;
      rows = Math.ceil(H / CELL) + 1;
      n = cols * rows;
      spin = new Int8Array(n);
      for (let i = 0; i < n; i++) spin[i] = Math.random() < 0.5 ? 1 : -1;
      for (let s = 0; s < 30; s++) sweep();
    }

    function sweep() {
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
        if (dE <= 0 || (dE === 4 ? Math.random() < w4 : dE === 8 && Math.random() < w8)) spin[i] = -s;
      }
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const R = 170;
      for (let pass = 0; pass < 2; pass++) {
        const up = pass === 1;
        ctx.fillStyle = up ? 'rgba(11,11,12,0.42)' : 'rgba(11,11,12,0.09)';
        ctx.beginPath();
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            if ((spin[y * cols + x] > 0) !== up) continue;
            let cx = x * CELL;
            let cy = y * CELL;
            const dx = cx - mx;
            const dy = cy - my;
            const d2 = dx * dx + dy * dy;
            let size = up ? 1.7 : 1.1;
            if (d2 < R * R) {
              const d = Math.sqrt(d2) || 1;
              const f = 1 - d / R;
              size *= 1 + f * 1.6;
              cx += (dx / d) * f * 14;
              cy += (dy / d) * f * 14;
            }
            ctx.moveTo(cx + size, cy);
            ctx.arc(cx, cy, size, 0, 6.2832);
          }
        }
        ctx.fill();
      }
    }

    function frame() {
      if (running) {
        sweep();
        draw();
      }
      requestAnimationFrame(frame);
    }

    init();
    if (reduceMotion) {
      for (let s = 0; s < 100; s++) sweep();
      draw();
      return;
    }

    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', () => {
      mx = -9999;
      my = -9999;
    });
    new IntersectionObserver(([en]) => (running = en.isIntersecting)).observe(hero);
    document.addEventListener('visibilitychange', () => (running = !document.hidden && scrollY < hero.clientHeight));

    let timer;
    let lastW = hero.clientWidth;
    addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (Math.abs(hero.clientWidth - lastW) < 30 && Math.abs(hero.clientHeight - H) < 120) return;
        lastW = hero.clientWidth;
        init();
      }, 200);
    });
    requestAnimationFrame(frame);
  }

  /* ---------------- boot ---------------- */

  applyLang();
  $$('.reveal:not(.in)').forEach((el) => (revealIO ? revealIO.observe(el) : el.classList.add('in')));
  wordmark();
  field();
  onScroll();
})();
