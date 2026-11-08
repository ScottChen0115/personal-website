(function () {
  'use strict';

  const SITE = window.SITE;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  const svg = (body, size = 20) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const ICONS = {
    mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    x: '<path d="M4 4h4l12 16h-4zM19.5 4l-6.4 7.3M10.9 12.7L4.5 20"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M17 3h-2.5A4.5 4.5 0 0 0 10 7.5V10H7.5v3.5H10V21h3.5v-7.5H16l.5-3.5h-3V8a1 1 0 0 1 1-1H17z"/>',
    github:
      '<path d="M9 19c-4.5 1.4-4.5-2.2-6.3-2.7M15 21v-3.5a3 3 0 0 0-.8-2.3c2.8-.3 5.8-1.4 5.8-6.3a4.9 4.9 0 0 0-1.3-3.4 4.6 4.6 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 1.8 5.4 2.1 5.4 2.1a4.6 4.6 0 0 0-.1 3.4A4.9 4.9 0 0 0 4 8.9c0 4.9 3 6 5.8 6.3a3 3 0 0 0-.8 2.3V21"/>',
    arrow: '<path d="M7 17L17 7M8 7h9v9"/>',
  };

  /* ---------------- rendering ---------------- */

  function factItem(it) {
    const inner = `${esc(it.label)}<span class="fact-arrow">${svg(ICONS.arrow, 28)}</span>`;
    return it.href
      ? `<a class="fact-link" href="${it.href}" target="_blank" rel="noopener">${inner}</a>`
      : `<button type="button" class="fact-link" data-open="${it.open}">${inner}</button>`;
  }

  function renderFacts() {
    $('#facts').innerHTML = SITE.facts
      .map((f) => {
        const segs = f.items ? f.items.map(factItem) : f.v.split(' · ').map(esc);
        const value = segs.map((s) => `<span class="seg">${s}</span>`).join(' · ');
        return `<div class="fact"><dt>${esc(f.k)}</dt><dd>${value}</dd></div>`;
      })
      .join('');
    $$('.fact-link[data-open]').forEach((btn) => btn.addEventListener('click', () => openDetail(btn.dataset.open)));
  }

  function renderExperience() {
    $('#exp-grid').innerHTML = SITE.experience
      .map(
        (e, i) => `
        <button type="button" class="exp-card reveal" data-index="${i}" style="--d:${(i % 2) * 0.08}s">
          <span class="exp-media">
            <img src="${e.image}" alt="" loading="lazy" decoding="async" />
            <span class="exp-date">${esc(e.when)}</span>
          </span>
          <span class="exp-body">
            <h3 class="exp-title">${esc(e.title)}</h3>
            <p class="exp-role">${esc(e.role)}</p>
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
          <div class="hobby-media"><img src="${h.image}" alt="${esc(h.alt)}" loading="lazy" decoding="async" /></div>
          <figcaption>
            <h3>${esc(h.name)}</h3>
            ${h.desc ? `<p>${esc(h.desc)}</p>` : ''}
          </figcaption>
        </figure>`
      )
      .join('');
    if (finePointer && !reduceMotion) {
      $$('.hobby-media').forEach((box) => {
        box.addEventListener('pointermove', (e) => {
          const r = box.getBoundingClientRect();
          box.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * -14}px`);
          box.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * -14}px`);
        });
        box.addEventListener('pointerleave', () => {
          box.style.removeProperty('--px');
          box.style.removeProperty('--py');
        });
      });
    }
    if (revealIO) $$('.hobby:not(.in)').forEach((el) => revealIO.observe(el));
  }

  function renderContact() {
    $('#contact-list').innerHTML = SITE.contact
      .map((c, i) => {
        const external = c.href.startsWith('http');
        return `
        <li class="contact-card reveal" id="contact-${c.id}" style="--d:${(i % 2) * 0.08}s">
          <a class="contact-link" href="${c.href}"${external ? ' target="_blank" rel="noopener"' : ''}>
            <span class="contact-icon">${svg(ICONS[c.icon])}</span>
            <span class="contact-arrow">${svg(ICONS.arrow, 18)}</span>
            <span class="contact-text">
              <span class="contact-label">${esc(c.label)}</span>
              <span class="contact-value">${esc(c.value)}</span>
            </span>
          </a>
          ${c.copy ? `<button type="button" class="copy-btn" data-copy="${esc(c.value)}">Copy</button>` : ''}
        </li>`;
      })
      .join('');
    $$('.copy-btn').forEach((btn) => btn.addEventListener('click', () => copyText(btn.dataset.copy, btn)));
    if (revealIO) $$('.contact-card:not(.in)').forEach((el) => revealIO.observe(el));
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
  const scroller = $('.modal-scroll', modal);
  const content = $('.modal-content', modal);
  const media = $('.modal-media', modal);
  let modalOpen = false;
  let modalIndex = null;
  let lastFocus = null;

  function renderEntry(e) {
    media.hidden = !e.image;
    if (e.image) $('#modal-img').src = e.image;
    const meta = e.meta
      .map((m) => {
        const v = m.href ? `<a href="${m.href}" target="_blank" rel="noopener">${esc(m.v)} ↗</a>` : esc(m.v);
        return `<div><dt>${esc(m.k)}</dt><dd>${v}</dd></div>`;
      })
      .join('');
    const sessions = (e.sessions || [])
      .map(
        (s) => `
        <li>
          <span class="s-when">${esc(s.when)}</span>
          <span class="s-name">${esc(s.name)}</span>
          <span class="s-where">${esc(s.where)}</span>
        </li>`
      )
      .join('');
    $('#modal-body').innerHTML = `
      <div class="modal-kicker"><span class="pill dark">${esc(e.role)}</span>${e.when ? `<span class="pill">${esc(e.when)}</span>` : ''}</div>
      <h3 id="modal-title">${esc(e.title)}</h3>
      ${meta ? `<dl class="modal-meta">${meta}</dl>` : ''}
      ${sessions ? `<p class="modal-list-title">${esc(e.listTitle)}</p><ol class="modal-sessions">${sessions}</ol>` : ''}`;
  }

  function fillModal(i) {
    renderEntry(SITE.experience[i]);
    $('#modal-count').textContent = `${String(i + 1).padStart(2, '0')} / ${String(SITE.experience.length).padStart(2, '0')}`;
  }

  function showModal() {
    lastFocus = document.activeElement;
    modalOpen = true;
    modal.classList.toggle('solo', modalIndex === null);
    modal.hidden = false;
    document.body.classList.add('locked');
    scroller.scrollTop = 0;
    requestAnimationFrame(() => {
      modal.classList.add('open');
      panel.focus({ preventScroll: true });
    });
  }

  function openModal(i) {
    modalIndex = i;
    fillModal(i);
    showModal();
  }

  function openDetail(key) {
    modalIndex = null;
    renderEntry(SITE.details[key]);
    showModal();
  }

  function closeModal() {
    if (!modalOpen) return;
    modal.classList.remove('open');
    modalOpen = false;
    modalIndex = null;
    document.body.classList.remove('locked');
    setTimeout(() => {
      if (!modalOpen) modal.hidden = true;
    }, reduceMotion ? 0 : 450);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function stepModal(d) {
    if (modalIndex === null) return;
    const n = SITE.experience.length;
    modalIndex = (modalIndex + d + n) % n;
    fillModal(modalIndex);
    scroller.scrollTop = 0;
    content.animate?.(
      [
        { opacity: 0.3, transform: `translateX(${d * 18}px)` },
        { opacity: 1, transform: 'none' },
      ],
      { duration: reduceMotion ? 0 : 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
  }

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) closeModal();
    const step = e.target.closest('[data-step]');
    if (step) stepModal(Number(step.dataset.step));
  });

  document.addEventListener('keydown', (e) => {
    if (!modalOpen) return;
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
  });

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
    showToast('Email copied');
    btn.classList.add('done');
    btn.textContent = '✓';
    setTimeout(() => {
      btn.classList.remove('done');
      btn.textContent = 'Copy';
    }, 1600);
  }

  /* ---------------- facts light up on scroll ---------------- */

  function updateFacts() {
    const rows = $$('.fact');
    if (reduceMotion) return rows.forEach((r) => r.classList.add('on'));
    const line = innerHeight * 0.78;
    rows.forEach((r) => r.classList.toggle('on', r.getBoundingClientRect().top < line));
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
      updateFacts();
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

  /* ---------------- flow lines ---------------- */

  function field() {
    const hero = $('.hero');
    const canvas = $('#field');
    const ctx = canvas.getContext('2d');
    const GAP = 18;
    const STEP = 10;
    const R2 = 2 * 170 * 170;
    let W, H, dpr;
    let mx = 0;
    let my = 0;
    let sx = 0;
    let sy = 0;
    let inside = false;
    let k = 0;
    let time = 0;
    let last = performance.now();
    let running = true;

    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = hero.clientWidth;
      H = hero.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      const rows = Math.ceil(H / GAP) + 4;
      for (let j = -3; j < rows; j++) {
        const base = j * GAP;
        const a = 0.06 + 0.07 * (0.5 + 0.5 * Math.sin(j * 0.33 + time * 0.5));
        ctx.strokeStyle = `rgba(11,11,12,${a.toFixed(3)})`;
        ctx.beginPath();
        for (let x = -STEP; x <= W + STEP; x += STEP) {
          let y =
            base +
            Math.sin(x * 0.0032 + time + j * 0.18) * 16 +
            Math.sin(x * 0.0011 - time * 0.7 + j * 0.07) * 26 +
            Math.sin(x * 0.008 + time * 1.4 - j * 0.3) * 3;
          if (k > 0.001) {
            const dx = x - sx;
            const dy = y - sy;
            const f = Math.exp(-(dx * dx + dy * dy) / R2) * k;
            y += (dy / Math.sqrt(dy * dy + 900)) * f * 34;
          }
          if (x === -STEP) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    function frame(now) {
      const dt = Math.min(now - last, 50);
      last = now;
      if (running) {
        time += dt * 0.00018;
        k += ((inside ? 1 : 0) - k) * 0.06;
        sx += (mx - sx) * 0.1;
        sy += (my - sy) * 0.1;
        draw();
      }
      requestAnimationFrame(frame);
    }

    size();
    if (reduceMotion) {
      draw();
      return;
    }

    if (finePointer) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
        if (k < 0.02) {
          sx = mx;
          sy = my;
        }
        inside = true;
      });
      hero.addEventListener('pointerleave', () => (inside = false));
    }
    new IntersectionObserver(([en]) => (running = en.isIntersecting)).observe(hero);
    document.addEventListener('visibilitychange', () => (running = !document.hidden && scrollY < hero.clientHeight));

    let timer;
    addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        size();
        if (!running) draw();
      }, 150);
    });
    requestAnimationFrame(frame);
  }

  /* ---------------- boot ---------------- */

  renderFacts();
  renderExperience();
  renderHobbies();
  renderContact();
  $$('.reveal:not(.in)').forEach((el) => (revealIO ? revealIO.observe(el) : el.classList.add('in')));
  wordmark();
  field();
  onScroll();
})();
