/* ==========================================================================
   LE CHALET DE LA FORÊT — Statut ouvert / fermé (fuseau Europe/Brussels)
   ========================================================================== */
import { chalet } from './data.js';

const pad = (n) => String(n).padStart(2, '0');
const toMinutes = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

// Heure locale Bruxelles (Europe/Brussels) avec gestion de l'heure d'été/hiver via Intl
function nowBrussels() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Brussels' }));
}

function isWeekend(d) {
  const day = d.getDay(); // 0=dimanche ... 6=samedi
  return day === 6 || day === 0;
}

// Est-ce que la salle est ouverte maintenant (11h-23h30, fermé lundi)
export function getRoomStatus() {
  const d = nowBrussels();
  const day = d.getDay();
  if (chalet.closedWeekdays.includes(day)) return { open: false, reason: 'Fermé le lundi' };
  const now = d.getHours() * 60 + d.getMinutes();
  const o = toMinutes(chalet.room.open);
  const c = toMinutes(chalet.room.close);
  return { open: now >= o && now < c, reason: null };
}

// Est-ce que la cuisine est ouverte maintenant
export function getKitchenStatus() {
  const d = nowBrussels();
  const day = d.getDay();
  if (chalet.closedWeekdays.includes(day)) return { open: false, reason: 'Fermé le lundi' };
  const we = isWeekend(d);
  const k = we ? chalet.kitchen.weekend : chalet.kitchen.weekday;
  const now = d.getHours() * 60 + d.getMinutes();
  const mid = d.getHours() * 60 + d.getMinutes();
  // Deux services : midi et soir
  const lunchOpen = toMinutes(k.open); const lunchClose = toMinutes(k.close);
  const dinnerOpen = toMinutes(k.dinnerOpen); const dinnerClose = toMinutes(k.dinnerClose);
  const open = (now >= lunchOpen && now < lunchClose) || (now >= dinnerOpen && now < dinnerClose);
  return { open, reason: null, service: (now >= dinnerOpen && now < dinnerClose) ? 'soir' : 'midi' };
}

// Texte lisible du statut
export function statusLabel(kind = 'room') {
  const st = kind === 'kitchen' ? getKitchenStatus() : getRoomStatus();
  if (!st.open) return { open: false, text: st.reason || 'Fermé', class: 'status-chip--closed' };
  const txt = kind === 'kitchen'
    ? `Cuisine ouverte — service ${st.service}`
    : `Ouvert jusqu’à ${chalet.room.close}`;
  return { open: true, text: txt, class: 'status-chip--open' };
}

// Prochaine ouverture (pour affichage si fermé)
export function nextOpening() {
  const d = nowBrussels();
  let day = d.getDay();
  let date = new Date(d);
  date.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    const dd = (day + i) % 7;
    if (!chalet.closedWeekdays.includes(dd)) {
      const opening = new Date(date);
      opening.setHours(...chalet.room.open.split(':').map(Number));
      return { date: opening, weekday: dd };
    }
    date.setDate(date.getDate() + 1);
  }
  return null;
}