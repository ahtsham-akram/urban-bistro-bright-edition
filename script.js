(() => {
  const root = document.documentElement;
  const toneBtn = document.querySelector('[data-tone-toggle]');
  const savedTone = localStorage.getItem('christies-light-tone') || 'warm';
  root.dataset.tone = savedTone;

  const updateToneButton = () => {
    if (!toneBtn) return;
    const crisp = root.dataset.tone === 'crisp';
    toneBtn.textContent = crisp ? '☼' : '◐';
    toneBtn.setAttribute('aria-label', crisp ? 'Switch to warm ivory palette' : 'Switch to crisp white palette');
    toneBtn.title = crisp ? 'Warm ivory palette' : 'Crisp white palette';
  };
  updateToneButton();

  if (toneBtn) {
    toneBtn.addEventListener('click', () => {
      root.dataset.tone = root.dataset.tone === 'crisp' ? 'warm' : 'crisp';
      localStorage.setItem('christies-light-tone', root.dataset.tone);
      updateToneButton();
    });
  }

  const header = document.querySelector('.site-header');
  const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  setHeaderState();
  addEventListener('scroll', setHeaderState, { passive: true });

  const menuBtn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    }));
  }

  document.querySelectorAll('[data-menu-filter]').forEach(btn => btn.addEventListener('click', () => {
    const target = btn.dataset.menuFilter;
    document.querySelectorAll('[data-menu-filter]').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.menu-panel').forEach(panel => panel.classList.toggle('active', panel.id === target));
  }));

  document.querySelectorAll('[data-form-tab]').forEach(btn => btn.addEventListener('click', () => {
    const target = btn.dataset.formTab;
    document.querySelectorAll('[data-form-tab]').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.form-view').forEach(v => v.classList.toggle('active', v.id === target));
  }));

  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) status.textContent = 'Thank you. Your request has been received and the Christie’s team will confirm shortly.';
      form.reset();
    });
  });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -24px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
  }

  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && !reduced && matchMedia('(min-width: 981px)').matches) {
    addEventListener('mousemove', e => {
      const x = (e.clientX / innerWidth - .5) * 8;
      const y = (e.clientY / innerHeight - .5) * 5;
      heroBg.style.transform = `scale(1.02) translate(${x}px, ${y}px)`;
    }, { passive: true });
  }
})();
