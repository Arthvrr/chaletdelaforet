/* ==========================================================================
   LE CHALET DE LA FORÊT — Créneaux de réservation
   ========================================================================== */
import { chalet } from './data.js';

const toMinutes = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
const fromMinutes = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

// Est-ce que la date donnée est un week-end (sam/ dim)
function isWeekendDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  return day === 6 || day === 0;
}

// Génère les créneaux (toutes les 30 min) pour un service donné à une date donnée
export function generateSlots(dateStr, service) {
  // service: 'midi' | 'soir'
  const we = isWeekendDate(dateStr);
  const k = we ? chalet.kitchen.weekend : chalet.kitchen.weekday;
  let open, close;
  if (service === 'midi') { open = toMinutes(k.open); close = toMinutes(k.close); }
  else { open = toMinutes(k.dinnerOpen); close = toMinutes(k.dinnerClose); }

  const slots = [];
  for (let m = open; m < close; m += 30) {
    slots.push({ time: fromMinutes(m), label: fromMinutes(m) });
  }
  return slots;
}

// Dernier créneau autorisé pour une date donnée (pour bloquer les dates trop proches voir reservation.js)
export function isDateBlocked(dateStr) {
  // bloque les lundis et les dates passées
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  if (chalet.closedWeekdays.includes(day)) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
}