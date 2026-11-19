/* ==========================================================================
   LE CHALET DE LA FORÊT — Données métier centralisée
   Source : contenu_pour_ia.md + before/*.html (audit)
   Toute modification (prix, plat, horaire, événement) se fait ici uniquement.
   ========================================================================== */

export const chalet = {
  // ---------- Identité ----------
  name: 'Le Chalet de la Forêt',
  nameShort: 'Chalet de la Forêt',
  company: 'Le Chalet SRL',
  tva: 'BE 0632 467 318',
  address: 'Rue de Chevelipont 6, 1470 Genappe, Belgique',
  addressShort: 'Rue de Chevelipont 6, 1470 Genappe',
  phone: '071/81.38.74',
  phoneIntl: '+32 71 81 38 74',
  telLink: 'tel:+3271813874',
  email: 'info@chaletdelaforet.be',
  facebook: 'https://www.facebook.com/chaletdelaforet.be',
  gps: { lat: 50.59086, lng: 4.52688 },
  mapsUrl: 'https://maps.google.com/?q=50.59086,4.52688(Rue+de+Chevelipont+6,+1470+Genappe)',

  // ---------- Horaires ----------
  closedWeekdays: [1], // lundi fermé
  kitchen: {
    weekday:  { open: '12:00', close: '14:30', dinnerOpen: '18:30', dinnerClose: '21:00' },
    weekend:  { open: '12:00', close: '15:00', dinnerOpen: '18:30', dinnerClose: '21:30' },
  },
  room: { open: '11:00', close: '23:30' },

  // ---------- Texte ----------
  tagline: 'Institution gourmande depuis 1910 — Cuisine de brasserie, produits locaux & fumoir artisanal maison.',
  eyebrowHero: 'GENAPPE • À 150 M DE L\'ABBAYE DE VILLERS-LA-VILLE',

  history: [
    { year: '1898', title: 'Les origines', text: 'Construit à 150 m de l\'Abbaye de Villers-la-Ville pour loger les ouvriers engagés dans la carrière.' },
    { year: '1910', title: 'L\'âme de la table', text: 'Entièrement dédié à la restauration. Appelé par le passé « L\'Hôtel de la forêt », il devient le Chalet de la Forêt.' },
    { year: '2015', title: 'Le renouveau', text: 'Repris et entièrement rénové pour sublimer son cadre si chaleureux et y offrir une cuisine de qualité.' },
  ],
  fumoirIntro: 'Nous saumurons et fumons nos produits maison grâce à notre grand fumoir, et travaillons avec des producteurs et savoir-faire belges.',
  fumoirCards: [
    { badge: 'FUMOIR MAISON', title: 'Saumurage & fumage sur place', text: 'Saumon fumé maison, ribs fumés maison, ailes de poulet fumées, planche mixte fumée. Réalisés dans notre grand fumoir.' },
    { badge: 'TERROIR BELGE', title: 'Producteurs locaux', text: 'Maquée et chèvre chaud de la Ferme de la Baillerie, Coucou de Malines, chocolat Callebaut, Eau de Villée, carbonnades au pain d\'épices et sirop de Liège.' },
    { badge: 'INCONTOURNABLE', title: 'Planche du boucher', text: 'Pour 2 personnes — filet mignon, lard, jambon, dinde, ribs fumés et ailes de poulet fumées maison, frites, légumes chauds, sauce aïoli. 65,00 €.' },
  ],
};