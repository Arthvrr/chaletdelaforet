/* ==========================================================================
   LE CHALET DE LA FORÊT — Formulaire de réservation (#reserver)
   Logique métier : blocage lundis/dates passées, créneaux Midi/Soir,
   alerte dynamique si < 48h, rappel Spams, état confirmation.
   ========================================================================== */
import { chalet } from './data.js';
import { generateSlots, isDateBlocked } from './slots.js';
import { statusLabel } from './openStatus.js';
import { RESERVATION_NOTICE_HOURS } from './data-menu-3.js';

const $ = (sel) => document.querySelector(sel);

export function initReservation() {
  const form = $('#reservation-form');
  if (!form) return;

  const dateInput = $('#res-date');
  const serviceEl = $('#res-service');
  const hourWrap = $('#res-hour-wrap');
  const hourSelect = $('#res-hour');
  const alert48h = $('#alert-48h');
  const confirmState = $('#confirm-state');
  const formWrap = $('#form-wrap');

  // ---------- Date : min = demain, exclure lundis ----------
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split('T')[0];

  dateInput.addEventListener('change', () => {
    const val = dateInput.value;
    if (isDateBlocked(val)) {
      dateInput.setCustomValidity('Ce jour est fermé (lundi) ou dans le passé. Choisissez une autre date.');
      dateInput.reportValidity();
      hourSelect.innerHTML = '';
      return;
    }
    dateInput.setCustomValidity('');

    // Règle 48h
    const selected = new Date(val + 'T00:00:00');
    const now = new Date();
    const diffHours = (selected - now) / (1000 * 60 * 60);
    if (diffHours < RESERVATION_NOTICE_HOURS && diffHours > 0) {
      alert48h.style.display = 'block';
    } else {
      alert48h.style.display = 'none';
    }

    // Recharge créneaux du service actif
    const service = serviceEl.querySelector('.active').dataset.service;
    loadSlots(val, service);
  });

  // ---------- Service segmenté ----------
  serviceEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    serviceEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const serviceInput = $('#res-service-val');
    if (serviceInput) serviceInput.value = btn.dataset.service;
    loadSlots(dateInput.value, btn.dataset.service);
  });

  function loadSlots(dateStr, service) {
    hourSelect.innerHTML = '';
    if (!dateStr || isDateBlocked(dateStr)) return;
    const slots = generateSlots(dateStr, service);
    slots.forEach(s => {
      const o = document.createElement('option');
      o.value = s.time; o.textContent = s.label;
      hourSelect.appendChild(o);
    });
  }

  // ---------- Compteur personnes ----------
  const counter = $('#res-counter');
  const valueEl = $('#res-count-value');
  let count = parseInt(valueEl.textContent, 10) || 2;
  counter.querySelector('[data-action="minus"]').addEventListener('click', () => {
    if (count > 1) { count--; valueEl.textContent = count; $('#res-count').value = count; }
  });
  counter.querySelector('[data-action="plus"]').addEventListener('click', () => {
    if (count < 20) { count++; valueEl.textContent = count; $('#res-count').value = count; }
  });

  // ---------- Badge ouvert/fermé dans le formulaire ----------
  const badge = $('#res-status-badge');
  if (badge) {
    const st = statusLabel('room');
    badge.className = 'open-pill ' + st.class;
    badge.querySelector('.open-text').textContent = st.text;
    setInterval(() => {
      const s = statusLabel('room');
      badge.className = 'open-pill ' + s.class;
      badge.querySelector('.open-text').textContent = s.text;
    }, 60000);
  }

  // ---------- Soumission ----------
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = "Envoi en cours…";
    btn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Tentative envoi (Formspree / EmailJS / propre endpoint à configurer)
    const endpoint = form.dataset.action || 'https://formspree.io/f/VOTRE_ID_FORMSPREE';
    let ok = false;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });
      ok = res.ok;
    } catch (err) {
      console.warn('Endpoint indisponible, fallback mailto', err);
      ok = false;
    }

    if (!ok) {
      // Fallback : ouverture du client mail avec mailto (pré-rempli)
      const subject = encodeURIComponent(`Réservation — ${data.res-date} ${data.res-service} ${data.res-hour}`);
      const body = encodeURIComponent(
        `Date : ${data.res-date}\nService : ${data.res-service}\nHeure : ${data.res-hour}\nPersonnes : ${data.res-count}\nNom : ${data.res-name}\nTéléphone : ${data.res-tel}\nEmail : ${data.res-email}\nCommentaire : ${data.res-comment || '—'}\n`
      );
      window.location.href = `${chalet.telLink.replace('tel:','mailto:')}${chalet.email}?subject=${subject}&body=${body}`;
    }

    // État confirmation côté front
    formWrap.style.display = 'none';
    alert48h.style.display = 'none';
    confirmState.style.display = 'block';

    // Récapitulatif
    $('#recap-date').textContent = data.res-date;
    $('#recap-service').textContent = data.res-service.charAt(0).toUpperCase() + data.res-service.slice(1);
    $('#recap-hour').textContent = data.res-hour;
    $('#recap-count').textContent = data.res-count + ' personne' + (data.res-count > 1 ? 's' : '');
    $('#recap-name').textContent = data.res-name;
    $('#recap-tel').textContent = data.res-tel;

    btn.textContent = original;
    btn.disabled = false;
  });
}