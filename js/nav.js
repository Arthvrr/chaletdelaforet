/* ==========================================================================
   LE CHALET DE LA FORÊT — Navigation (scroll, rideau mobile, badge statut)
   ========================================================================== */
import { statusLabel } from './openStatus.js';

export function initNav() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mm-close');
  const links = document.querySelectorAll('.nav-links a, .mobile-menu nav a');
  const badge = document.querySelector('.nav-cta');
  const dot = document.querySelector('.nav-dot');
  const openText = document.querySelector('.open-text');

  // ---------- Lien actif selon page ----------
  const page = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === page || (page === '' && href === 'index.html'))) {
      a.classList.add('is-active');
    }
    if (page === '' && href === 'index.html') a.classList.add('is-active');
  });

  // ---------- Navbar au scroll ----------
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    if (nav) nav.classList.toggle('scrolled', scrolled);
  });

  // ---------- Menu rideau mobile ----------
  function openMenu() {
    if (menu) { menu.classList.remove('is-open'); menu.style.transform = 'translateY(0)'; }
    if (toggle) toggle.classList.add('open');
    document.body.classList.add('noscroll');
  }
  function closeMenu() {
    if (menu) { menu.classList.add('is-open'); menu.style.transform = 'translateY(100vh)'; }
    if (toggle) toggle.classList.remove('open');
    document.body.classList.remove('noscroll');
  }
  if (toggle) toggle.addEventListener('click', () => {
    const open = !toggle.classList.contains('open');
    open ? openMenu() : closeMenu();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu nav a').forEach(a => a.addEventListener('click', closeMenu));

  // Clic hors menu pour fermer (optionnel, via backdrop)
  window.addEventListener('click', (e) => {
    if (menu && toggle && toggle.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      // ne pas fermer si clic sur un lien (géré ci-dessus)
    }
  });

  // ---------- Badge ouvert/fermé (temps réel, Europe/Brussels) ----------
  function updateBadge() {
    const st = statusLabel('room');
    if (badge) {
      badge.className = 'nav-cta ' + st.class;
      if (dot) dot.className = 'nav-dot';
      if (openText) openText.textContent = st.open ? 'OUVERT' : 'FERMÉ';
    }
  }
  updateBadge();
  setInterval(updateBadge, 60000);
}