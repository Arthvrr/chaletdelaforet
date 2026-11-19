/* ==========================================================================
   LE CHALET DE LA FORÊT — Lightbox plein écran (zoom + déplacement tactile)
   ========================================================================== */
export function initLightbox() {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const stage = box.querySelector('.stage');
  const img = box.querySelector('img');
  const closeBtn = box.querySelector('.btn-close');
  const caption = box.querySelector('.caption');
  const openers = document.querySelectorAll('[data-lightbox]');

  let scale = 1;
  let posX = 0;
  let posY = 0;
  let isPanning = false;
  let startX, startY;

  function open(src, alt, title) {
    img.src = src;
    img.alt = alt;
    if (caption) caption.textContent = title || alt;
    resetTransform();
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    img.style.cursor = 'zoom-in';
  }

  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    resetTransform();
  }

  function resetTransform() {
    scale = 1; posX = 0; posY = 0;
    applyTransform();
  }

  function applyTransform() {
    img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    img.style.origin = 'center';
    img.style.willChange = 'transform';
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  // Clic sur miniature
  openers.forEach(op => {
    op.addEventListener('click', (e) => {
      e.preventDefault();
      const src = op.dataset.lightbox || op.querySelector('img').src;
      const alt = op.querySelector('img') ? op.querySelector('img').alt : '';
      const title = op.dataset.lightboxTitle || '';
      open(src, alt, title);
    });
  });

  // Fermeture
  closeBtn.addEventListener('click', close);
  box.querySelector('.backdrop').addEventListener('click', close);
  // Échap
  document.addEventListener('keydown', (e) => {
    if (box.classList.contains('is-open') && e.key === 'Escape') close();
  });

  // Zoom molette sur l'image dans la lightbox
  img.addEventListener('wheel', (e) => {
    if (!box.classList.contains('is-open')) return;
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    const newScale = clamp(scale + delta, 1, 5);
    // Zoom centré sur le pointeur
    const rect = img.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const beforeX = (cx - posX) / scale;
    const beforeY = (cy - posY) / scale;
    scale = newScale;
    posX = cx - beforeX * scale;
    posY = cy - beforeY * scale;
    applyTransform();
  }, { passive: false });

  // Déplacement (drag) quand zoomé
  img.addEventListener('mousedown', (e) => {
    if (scale <= 1) return;
    isPanning = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
    img.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    applyTransform();
  });
  window.addEventListener('mouseup', () => {
    isPanning = false;
    img.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
  });

  // Tactile
  let tStart = { x: 0, y: 0 };
  img.addEventListener('touchstart', (e) => {
    if (scale <= 1) return;
    const t = e.touches[0];
    isPanning = true;
    tStart = { x: t.clientX - posX, y: t.clientY - posY };
  }, { passive: true });
  img.addEventListener('touchmove', (e) => {
    if (!isPanning) return;
    e.preventDefault();
    const t = e.touches[0];
    posX = t.clientX - tStart.x;
    posY = t.clientY - tStart.y;
    applyTransform();
  }, { passive: false });
  img.addEventListener('touchend', () => { isPanning = false; });
}