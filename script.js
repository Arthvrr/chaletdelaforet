/* ==========================================================================
   LE CHALET DE LA FORÊT — Logique métier, carte interactive, horaires,
   carrousel Abbaye, avis clients & lightbox
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. DONNÉES CENTRALISÉES
     ------------------------------------------------------------------------ */
  const CHALET = {
    name: 'Le Chalet de la Forêt',
    company: 'Le Chalet SRL',
    tva: 'BE 0632 467 318',
    address: 'Rue de Chevelipont 6, 1470 Genappe, Belgique',
    phone: '071/81.38.74',
    telLink: 'tel:+3271813874',
    email: 'info@chaletdelaforet.be',
    facebook: 'https://www.facebook.com/chaletdelaforet.be',
    reservationNoticeHours: 48,
    closedWeekdays: [1], // 1 = Lundi
    room: { open: '11:00', close: '23:30' },
    kitchen: {
      weekday: { lunchOpen: '12:00', lunchClose: '14:30', dinnerOpen: '18:30', dinnerClose: '21:00' },
      weekend: { lunchOpen: '12:00', lunchClose: '15:00', dinnerOpen: '18:30', dinnerClose: '21:30' }
    }
  };

  const MENU_CATEGORIES = [
    { key: 'all',      label: 'Toute la carte', intro: 'Cuisine de brasserie, produits locaux & fumoir maison' },
    { key: 'tapas',    label: 'Tapas',          intro: 'Ces plats sont idéaux à partager' },
    { key: 'entrees',  label: 'Entrées',        intro: 'Disponibles en entrée ou en plat' },
    { key: 'salades',  label: 'Salades',        intro: 'Fraîches et généreuses' },
    { key: 'plats',    label: 'Plats',          intro: 'Nos classiques belges, viandes & fumoir maison' },
    { key: 'desserts', label: 'Desserts',       intro: 'Faits maison' },
    { key: 'boissons', label: 'Boissons',       intro: 'Sugg’s liquides — Vins, cocktail du moment, bières, gin & whisky' }
  ];

  const FOOD_FILTERS = [
    { key: 'fumoir',       label: 'Fumé maison' },
    { key: 'végétarien',   label: 'Végétarien' },
    { key: 'sans-gluten',  label: 'Sans gluten' },
    { key: 'sans-lactose', label: 'Sans produits laitiers' },
    { key: 'enfant',       label: 'Plat enfant dispo' },
    { key: 'piquant',      label: 'Légèrement piquant' }
  ];

  const DRINK_FILTERS = [
    { key: 'vin',        label: 'Vins' },
    { key: 'cocktail',   label: 'Cocktail du moment' },
    { key: 'biere-fut',  label: 'Bières au fût' },
    { key: 'biere',      label: 'Bières bouteille' },
    { key: 'spiritueux', label: 'Gins & Whisky' }
  ];

  const TAG_LABELS = {
    'fumoir':       { label: 'Fumé maison',            cls: 'badge--filled' },
    'signature':    { label: 'Incontournable',         cls: 'badge--primary' },
    'végétarien':   { label: 'Végétarien',             cls: 'badge--sage' },
    'sans-gluten':  { label: 'Sans gluten',            cls: 'badge--soft' },
    'sans-lactose': { label: 'Sans produits laitiers', cls: 'badge--soft' },
    'enfant':       { label: 'Plat enfant dispo',      cls: 'badge--soft' },
    'piquant':      { label: 'Légèrement piquant',     cls: 'badge--soft' },
    'vin':          { label: 'Vin',                    cls: 'badge--soft' },
    'cocktail':     { label: 'Cocktail du moment',     cls: 'badge--filled' },
    'biere-fut':    { label: 'Bière au fût',           cls: 'badge--primary' },
    'exclusivite':  { label: 'En exclusivité',         cls: 'badge--filled' },
    'biere':        { label: 'Bière',                  cls: 'badge--soft' },
    'partager':     { label: 'À partager (75 cl)',     cls: 'badge--sage' },
    'spiritueux':   { label: 'Gin / Whisky',           cls: 'badge--soft' }
  };

  // Carte des plats (100 % conforme à chaletdelaforet.be)
  const MENU_ITEMS = [
    // Tapas
    { id: 't1', cat: 'tapas', name: 'Planche de fromages', desc: 'Tome de chèvre, Maredsous et comté accompagnés de pain et de beurre.', prices: [{ label: '', val: '12,50' }], tags: ['végétarien'] },
    { id: 't2', cat: 'tapas', name: 'Planche de saucissons', desc: 'Nature, aux noisettes et au Beaufort accompagnés de pain et de beurre.', prices: [{ label: '', val: '12,50' }], tags: ['sans-lactose'] },
    { id: 't3', cat: 'tapas', name: 'Planche mixte', desc: '3 variétés de fromages et de saucissons accompagnés de pain et de beurre.', prices: [{ label: '', val: '13,50' }], tags: [] },
    { id: 't4', cat: 'tapas', name: 'Planche mixte fumée maison', desc: 'Assortiment fumé sur place dans notre grand fumoir.', prices: [{ label: '', val: '16,00' }], tags: ['fumoir'] },
    { id: 't5', cat: 'tapas', name: 'Tapas asiatique', desc: 'Chinoiseries, sauce aigre-douce et sauce soja.', prices: [{ label: '', val: '14,00' }], tags: [] },
    { id: 't6', cat: 'tapas', name: 'Tartine de fromage blanc', desc: 'Maquée de la ferme de la Baillerie, radis et oignons rouges.', prices: [{ label: '', val: '11,50' }], tags: ['végétarien'] },
    { id: 't7', cat: 'tapas', name: 'Tartine de saumon fumé maison', desc: 'Crème citronnée, échalotes, persil haché.', prices: [{ label: '', val: '14,00' }], tags: ['fumoir'] },
    { id: 't8', cat: 'tapas', name: 'Ribs fumés maison, sauce barbecue', desc: '', prices: [{ label: '', val: '14,00' }], tags: ['fumoir'] },
    { id: 't9', cat: 'tapas', name: 'Ailes de poulet fumées maison, sauce aïoli', desc: '', prices: [{ label: '', val: '14,00' }], tags: ['fumoir', 'sans-gluten'] },

    // Entrées
    { id: 'e1', cat: 'entrees', name: 'Carpaccio de bœuf', desc: 'Huile d’olive et parmesan.', prices: [{ label: 'Entrée', val: '17,50' }, { label: 'Plat', val: '22,00' }], tags: ['sans-gluten'] },
    { id: 'e2', cat: 'entrees', name: 'Croquettes de fromage maison', desc: '', prices: [{ label: 'Entrée (2 pc et salade)', val: '17,50' }, { label: 'Plat (3 pc, salade et frites)', val: '22,00' }], tags: ['végétarien'] },
    { id: 'e3', cat: 'entrees', name: 'Croquettes de crevettes maison', desc: '', prices: [{ label: 'Entrée (2 pc et salade)', val: '20,50' }, { label: 'Plat (3 pc, salade et frites)', val: '25,00' }], tags: [] },
    { id: 'e4', cat: 'entrees', name: 'Duo de croquettes', desc: 'Fromage et crevettes maison.', prices: [{ label: 'Entrée (2 pc et salade)', val: '19,50' }, { label: 'Plat (3 pc, salade et frites)', val: '24,00' }], tags: [] },
    { id: 'e5', cat: 'entrees', name: 'L’assiette de saumon fumé et ses toasts', desc: 'Saumon fumé maison dans notre grand fumoir.', prices: [{ label: 'Entrée', val: '18,50' }, { label: 'Plat', val: '24,50' }], tags: ['fumoir'] },

    // Salades
    { id: 's1', cat: 'salades', name: 'Salade de chèvre chaud de la ferme de la Baillerie', desc: '', prices: [{ label: '', val: '18,50' }], tags: ['végétarien', 'sans-gluten'] },
    { id: 's2', cat: 'salades', name: 'Salade César', desc: 'Poulet basse température, bacon, parmesan, œufs, croûtons, sauce César.', prices: [{ label: '', val: '21,50' }], tags: ['sans-gluten'] },

    // Plats
    { id: 'p1',  cat: 'plats', name: 'Hamburger du Chalet, frites, salade', desc: 'Viande(s) de bœuf irlandaises, courgettes, cheddar, sauce andalouse maison.', prices: [{ label: '1 viande', val: '18,50' }, { label: '2 viandes', val: '21,50' }], tags: [] },
    { id: 'p2',  cat: 'plats', name: 'Hamburger végétarien', desc: 'Pain à la betterave, burger maison aux légumes, mayonnaise de pesto, roquette.', prices: [{ label: '', val: '21,50' }], tags: ['végétarien'] },
    { id: 'p3',  cat: 'plats', name: 'Wok du chef', desc: 'Nouilles, bœuf, poulet, carottes, champignons, courgettes, mange-tout, choux chinois, sauce soja, épices asiatiques.', prices: [{ label: '', val: '22,50' }], tags: ['piquant'] },
    { id: 'p4',  cat: 'plats', name: 'Wok aux légumes', desc: 'Nouilles, carottes, courgettes, champignons, choux chinois, mange-tout, épices asiatiques, sauce soja.', prices: [{ label: '', val: '19,50' }], tags: ['végétarien'] },
    { id: 'p5',  cat: 'plats', name: 'Américain préparé, frites, salade', desc: '', prices: [{ label: '', val: '21,00' }], tags: ['sans-gluten', 'enfant'] },
    { id: 'p6',  cat: 'plats', name: 'Boulettes sauce tomate, frites', desc: '', prices: [{ label: '', val: '19,00' }], tags: ['enfant'] },
    { id: 'p7',  cat: 'plats', name: 'Boulettes à la liégeoise, frites', desc: '', prices: [{ label: '', val: '19,00' }], tags: ['enfant'] },
    { id: 'p8',  cat: 'plats', name: 'Carbonnades au pain d’épices et sirop de Liège, frites', desc: '', prices: [{ label: '', val: '19,00' }], tags: ['enfant'] },
    { id: 'p9',  cat: 'plats', name: 'Vol-au-Vent au Coucou de Malines, frites', desc: '', prices: [{ label: '', val: '23,50' }], tags: ['enfant'] },
    { id: 'p10', cat: 'plats', name: 'Duo de solettes « Meunières », pommes grenailles, salade', desc: '', prices: [{ label: '', val: '25,50' }], tags: ['sans-gluten'] },
    { id: 'p11', cat: 'plats', name: 'Filet mignon irlandais (250 g), frites, salade', desc: '', prices: [{ label: '', val: '26,50' }], tags: ['sans-gluten'] },
    { id: 'p12', cat: 'plats', name: 'Onglet à l’échalote, frites, salade', desc: '', prices: [{ label: '', val: '28,50' }], tags: [] },
    { id: 'p13', cat: 'plats', name: 'Duo de ribs, frites, salade', desc: 'Ribs fumés maison, sauce barbecue et ribs miel-moutarde.', prices: [{ label: '', val: '22,50' }], tags: ['fumoir'] },
    { id: 'p14', cat: 'plats', name: 'Planche du boucher, frites, légumes chauds, sauce aïoli + 2 sauces au choix', desc: 'Pour 2 personnes. Viandes : filet mignon, lard, jambon, dinde, ribs fumés et ailes de poulet fumées maison.', prices: [{ label: '2 pers.', val: '65,00' }], tags: ['signature', 'fumoir', 'sans-gluten'] },
    { id: 'p15', cat: 'plats', name: 'Pâtes napolitaines', desc: 'Sauce tomatée végétarienne.', prices: [{ label: '', val: '15,00' }], tags: ['végétarien', 'enfant'] },
    { id: 'p16', cat: 'plats', name: 'Spaghetti bolognaise', desc: '', prices: [{ label: '', val: '17,50' }], tags: ['enfant'] },
    { id: 'p17', cat: 'plats', name: 'Lasagne végétarienne', desc: '', prices: [{ label: '', val: '19,50' }], tags: ['végétarien'] },

    // Desserts
    { id: 'd1',  cat: 'desserts', name: 'Crêpes aux sucres', desc: '2 pièces, 3 sucres.', prices: [{ label: '', val: '8,00' }], tags: [] },
    { id: 'd2',  cat: 'desserts', name: 'Crêpes au chocolat', desc: '2 pièces, chocolat noir fondu maison (Callebaut).', prices: [{ label: '', val: '8,50' }], tags: [] },
    { id: 'd3',  cat: 'desserts', name: 'Crêpes Mikado', desc: '2 pièces, chocolat fondu maison (Callebaut), chantilly, glace vanille.', prices: [{ label: '', val: '9,50' }], tags: [] },
    { id: 'd4',  cat: 'desserts', name: 'Moelleux du chef, boule de glace vanille, chantilly', desc: '', prices: [{ label: '', val: '10,00' }], tags: [] },
    { id: 'd5',  cat: 'desserts', name: 'Café liégeois', desc: '3 boules de glace Moka, café, chantilly.', prices: [{ label: '', val: '9,50' }], tags: [] },
    { id: 'd6',  cat: 'desserts', name: 'Tiramisu', desc: 'Aux boudoirs.', prices: [{ label: '', val: '8,50' }], tags: [] },
    { id: 'd7',  cat: 'desserts', name: 'Mousse au chocolat', desc: '', prices: [{ label: '', val: '8,50' }], tags: [] },
    { id: 'd8',  cat: 'desserts', name: 'Dame blanche', desc: '', prices: [{ label: '', val: '9,00' }], tags: ['enfant'] },
    { id: 'd9',  cat: 'desserts', name: 'Dame noire', desc: '', prices: [{ label: '', val: '9,00' }], tags: ['enfant'] },
    { id: 'd10', cat: 'desserts', name: 'Brésilienne', desc: '', prices: [{ label: '', val: '9,00' }], tags: ['enfant'] },
    { id: 'd11', cat: 'desserts', name: 'Colonel', desc: '3 boules de sorbet citron, Eau de Villée.', prices: [{ label: '', val: '10,50' }], tags: [] },
    { id: 'd12', cat: 'desserts', name: 'Boule de glace', desc: 'Parfums : vanille, chocolat, moka, citron, melon, framboise.', prices: [{ label: '', val: '3,00' }], tags: [] }
  ];

  // Sugg's Liquides (100 % conforme à assets/boissons.png)
  const MENU_DRINKS = [
    // Vins
    {
      id: 'b1',
      cat: 'boissons',
      name: 'Belle Mare – Picpoul de Pinet – More 2025',
      desc: '100 % Piquepoul — Cépage le plus tardif du Domaine, maturation très lente. Picpoul très minéral voire presque salin, fin de bouche nerveuse, bel équilibre entre acidité et rondeur. Se marie très bien avec les poissons et les fromages de brebis ou de chèvre.',
      prices: [
        { label: 'Verre', val: '4,40' },
        { label: '1/4', val: '8,50' },
        { label: '1/2', val: '16,50' },
        { label: 'Bouteille', val: '24,50' }
      ],
      tags: ['vin']
    },
    {
      id: 'b2',
      cat: 'boissons',
      name: 'Granit Tradition – More 2024',
      desc: 'Lesquerde — Côtes du Roussillon Villages aux arômes de cassis et de myrtilles complétés par des notes épicées, compagnon idéal de vos plats d’automne.',
      prices: [
        { label: 'Verre', val: '6,00' },
        { label: '1/4', val: '11,90' },
        { label: '1/2', val: '23,50' },
        { label: 'Bouteille', val: '35,00' }
      ],
      tags: ['vin']
    },

    // Cocktail du moment
    {
      id: 'b3',
      cat: 'boissons',
      name: 'Cocktail Tarte Tatin',
      desc: 'Organic Potato Vodka Dada Chapel, sirop de caramel, jus de pommes.',
      prices: [{ label: '', val: '9,50' }],
      tags: ['cocktail']
    },

    // Bières au fût
    {
      id: 'b4',
      cat: 'boissons',
      name: 'Liefmans Sour (7°)',
      desc: 'En exclusivité — Disponible uniquement au Chalet de la Forêt.',
      prices: [{ label: '25 cl', val: '4,10' }],
      tags: ['biere-fut', 'exclusivite']
    },
    {
      id: 'b5',
      cat: 'boissons',
      name: 'Vedett IPA (4,7°)',
      desc: 'Bière au fût.',
      prices: [{ label: '33 cl', val: '4,10' }],
      tags: ['biere-fut']
    },

    // Bières bouteille
    {
      id: 'b6',
      cat: 'boissons',
      name: 'Duvel Krush — New (8,4°)',
      desc: 'Triple hop.',
      prices: [{ label: '33 cl', val: '6,20' }],
      tags: ['biere']
    },
    {
      id: 'b7',
      cat: 'boissons',
      name: 'VanderGhinste (5,5°)',
      desc: 'Roodbruin.',
      prices: [{ label: '25 cl', val: '3,90' }],
      tags: ['biere']
    },
    {
      id: 'b8',
      cat: 'boissons',
      name: 'Chouffe Soleil (6°)',
      desc: 'Is back.',
      prices: [{ label: '33 cl', val: '4,70' }],
      tags: ['biere']
    },
    {
      id: 'b9',
      cat: 'boissons',
      name: 'Petit Ballot (5,7°)',
      desc: 'Brasserie des Beaux Jours — bière au foin (Frasnes-lez-Gosselies).',
      prices: [{ label: '33 cl', val: '5,90' }],
      tags: ['biere']
    },

    // Bières à partager - ou pas !
    {
      id: 'b10',
      cat: 'boissons',
      name: 'Omer — Traditional Blond (8,0°)',
      desc: 'Bière à partager — ou pas !',
      prices: [{ label: '75 cl', val: '13,50' }],
      tags: ['biere', 'partager']
    },

    // Gins
    {
      id: 'b11',
      cat: 'boissons',
      name: 'Panda Gin (40°)',
      desc: 'Gin belge organique.',
      prices: [{ label: '4 cl', val: '9,00' }],
      tags: ['spiritueux']
    },

    // Whisky
    {
      id: 'b12',
      cat: 'boissons',
      name: 'Bart’s Xtra Sherry (46°)',
      desc: 'Whisky d’Irlande — maturation en fûts de sherry.',
      prices: [{ label: '4 cl', val: '7,50' }],
      tags: ['spiritueux']
    }
  ];

  const EVENTS = [
    {
      title: 'Week-end Fondue Bourguignonne au Chalet',
      dayLabel: '12–15',
      monthLabel: 'Nov. 2026',
      dateRangeText: 'Du 12 nov. (18h00) au 15 nov. 2026 (14h00)',
      endISO: '2026-11-15T14:00:00',
      location: 'Rue de Chevelipont 6, 1470 Genappe',
      desc: 'Un moment gourmand et convivial autour d’une bonne fondue bourguignonne au Chalet de la Forêt.'
    }
  ];

  const REVIEWS = [
    {
      author: 'Arnaud Dumonceau',
      date: '3 juillet 2025',
      text: 'Service au top, efficace et à l’écoute. Très bon rapport qualité prix. Dîner en extérieur.',
      source: 'Facebook'
    },
    {
      author: 'Muriel Marchal & Olivier Frelik',
      date: '29 avril 2025',
      text: 'Personnel accueillant et agréable, bonne cuisine de brasserie.',
      source: 'Facebook'
    },
    {
      author: 'Corinne Lienard',
      date: '10 septembre 2023',
      text: 'Nous sommes allés hier midi, ce fut un délice de dîner en terrasse, je recommande.',
      source: 'Facebook'
    },
    {
      author: 'Dimitri Delo',
      date: '22 juillet 2022',
      text: 'Super service et très bon plat, chouette bar et ambiance au top.',
      source: 'Facebook'
    },
    {
      author: 'Jessica Jess Bonhivers',
      date: '3 juin 2022',
      text: 'Plat du jour savoureux pour un rapport qualité-prix top ! Cadre plus qu’agréable et personnel sympathique. Curieuse de découvrir une de leurs soirées à thème à l’occasion.',
      source: 'Facebook'
    },
    {
      author: 'Cindy Michaux',
      date: '9 mars 2022',
      text: 'Mon anniversaire surprise avec mes amis samedi. Très très bien mangé et accueillant. Merci pour ce bon moment auquel vous avez contribué.',
      source: 'Facebook'
    },
    {
      author: 'David Poncelet',
      date: '15 janvier 2022',
      text: 'Un moment délicieux passé dans cet endroit sympathique. Repas parfait de bout en bout, depuis l’entrée (assiette de poissons fumés maison), savoureux et frais, jusqu’au dessert (crème brûlée onctueuse et gourmande), en passant par une suggestion remarquable (côte de veau fumée, sauce aux pleurotes et ses accompagnements). Portion plus que généreuse, cuisson parfaite et saveur subtilement fumée. Sans oublier un service impeccable et très professionnel.',
      source: 'Facebook'
    },
    {
      author: 'Christophe Lhrx',
      date: '2 décembre 2021',
      text: 'En suggestion, j’ai mangé hier une couronne de cerf fumée à chaud à tomber… tellement c’était bon !',
      source: 'Facebook'
    },
    {
      author: 'Alexis Van Den Ende',
      date: '18 septembre 2021',
      text: 'Sympa pour une première fois, très bien mangé. Dîner en extérieur.',
      source: 'Facebook'
    },
    {
      author: 'Claude Henry',
      date: '15 septembre 2021',
      text: 'Bonjour, je viens de consommer une planche mixte fromages et saucissons. Un vrai régal. Je recommande.',
      source: 'Facebook'
    },
    {
      author: 'Pascal Jacques',
      date: '12 août 2021',
      text: 'Terrasse très sympa, de quoi passer un bon moment entre amis.',
      source: 'Facebook'
    }
  ];

  /* ------------------------------------------------------------------------
     2. UTILITAIRES GÉNÉRAUX & TEMPS RÉEL (Fuseau Europe/Brussels)
     ------------------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeText(str) {
    return String(str).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function toMinutes(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  }

  function fromMinutes(total) {
    const h = Math.floor(total / 60);
    const m = total % 60;
    return `${String(h).padStart(2, '0')}h${String(m).padStart(2, '0')}`;
  }

  function getBrusselsNow() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Brussels',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(now);

    const map = {};
    parts.forEach((p) => { map[p.type] = p.value; });
    const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const dayIndex = days[map.weekday] ?? now.getDay();
    const minutes = parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10);
    return { dayIndex, minutes };
  }

  function computeStatus() {
    const { dayIndex, minutes } = getBrusselsNow();
    if (CHALET.closedWeekdays.includes(dayIndex)) {
      return { isOpen: false, shortText: 'Fermé (lundi)', longText: 'Fermé le lundi · ouvre mardi à 11h00' };
    }
    const openMin = toMinutes(CHALET.room.open);
    const closeMin = toMinutes(CHALET.room.close);
    if (minutes >= openMin && minutes < closeMin) {
      return { isOpen: true, shortText: 'Ouvert', longText: 'Ouvert en ce moment · jusqu’à 23h30' };
    }
    if (minutes < openMin) {
      return { isOpen: false, shortText: 'Fermé', longText: 'Fermé · ouvre aujourd’hui à 11h00' };
    }
    return { isOpen: false, shortText: 'Fermé', longText: 'Fermé · réouverture demain à 11h00' };
  }

  function updateStatusBadges() {
    const st = computeStatus();
    document.querySelectorAll('.js-open-status').forEach((el) => {
      el.classList.toggle('is-open', st.isOpen);
      el.classList.toggle('is-closed', !st.isOpen);
      const txt = el.querySelector('.js-status-text');
      if (txt) {
        txt.textContent = el.dataset.statusFormat === 'long' ? st.longText : st.shortText;
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. NAVIGATION & MENU MOBILE
     ------------------------------------------------------------------------ */
  function initNav() {
    const nav = document.getElementById('site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = menu ? menu.querySelector('.mm-close') : null;

    const onScroll = () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function setMenuOpen(open) {
      if (!menu || !toggle) return;
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('noscroll', open);
    }

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        setMenuOpen(!isOpen);
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => setMenuOpen(false));
    }
    if (menu) {
      menu.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => setMenuOpen(false));
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) {
        setMenuOpen(false);
      }
    });

    updateStatusBadges();
    setInterval(updateStatusBadges, 60000);
  }

  /* ------------------------------------------------------------------------
     4. FORMULAIRE DE RÉSERVATION (index.html#reserver)
     ------------------------------------------------------------------------ */
  function isDateBlocked(dateStr) {
    if (!dateStr) return true;
    const d = new Date(dateStr + 'T12:00:00');
    if (Number.isNaN(d.getTime())) return true;
    if (CHALET.closedWeekdays.includes(d.getDay())) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(dateStr + 'T00:00:00');
    return chosen < today;
  }

  function generateSlots(dateStr, service) {
    const d = new Date(dateStr + 'T12:00:00');
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const k = isWeekend ? CHALET.kitchen.weekend : CHALET.kitchen.weekday;
    const start = toMinutes(service === 'midi' ? k.lunchOpen : k.dinnerOpen);
    const end   = toMinutes(service === 'midi' ? k.lunchClose : k.dinnerClose);

    const slots = [];
    for (let m = start; m < end; m += 30) {
      const hh = String(Math.floor(m / 60)).padStart(2, '0');
      const mm = String(m % 60).padStart(2, '0');
      slots.push({ value: `${hh}:${mm}`, label: fromMinutes(m) });
    }
    return slots;
  }

  function getNextOpenDateISO() {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    while (CHALET.closedWeekdays.includes(d.getDay())) {
      d.setDate(d.getDate() + 1);
    }
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function initReservation() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    const dateInput = document.getElementById('res-date');
    const dateError = document.getElementById('res-date-error');
    const serviceGroup = document.getElementById('res-service');
    const serviceHidden = document.getElementById('res-service-val');
    const hourSelect = document.getElementById('res-hour');
    const alert48h = document.getElementById('alert-48h');
    const formWrap = document.getElementById('form-wrap');
    const confirmState = document.getElementById('confirm-state');
    const counter = document.getElementById('res-counter');
    const countValueEl = document.getElementById('res-count-value');
    const countHidden = document.getElementById('res-count');
    const newResBtn = document.getElementById('new-reservation-btn');

    let count = parseInt(countHidden?.value, 10) || 2;

    const today = new Date();
    const minISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    dateInput.min = minISO;
    dateInput.value = getNextOpenDateISO();

    function syncCount() {
      if (countValueEl) countValueEl.textContent = `${count} personne${count > 1 ? 's' : ''}`;
      if (countHidden) countHidden.value = String(count);
    }

    function setServiceUI(val) {
      if (serviceHidden) serviceHidden.value = val;
      if (!serviceGroup) return;
      serviceGroup.querySelectorAll('button[data-service]').forEach((b) => {
        const active = b.dataset.service === val;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    }

    function populateHours() {
      const val = dateInput.value;
      const service = serviceHidden ? serviceHidden.value : 'midi';
      hourSelect.innerHTML = '';

      if (!val || isDateBlocked(val)) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'Choisissez d’abord un jour ouvert (mardi–dimanche)';
        hourSelect.appendChild(opt);
        hourSelect.disabled = true;
        return;
      }

      hourSelect.disabled = false;
      const slots = generateSlots(val, service);
      slots.forEach((s) => {
        const opt = document.createElement('option');
        opt.value = s.value;
        opt.textContent = s.label;
        hourSelect.appendChild(opt);
      });
    }

    function validateDate() {
      const val = dateInput.value;
      if (!val) {
        if (dateError) dateError.classList.remove('is-visible');
        if (alert48h) alert48h.classList.remove('is-visible');
        populateHours();
        return false;
      }

      if (isDateBlocked(val)) {
        dateInput.setCustomValidity('Le Chalet est fermé le lundi. Merci de choisir une autre date.');
        if (dateError) {
          dateError.textContent = 'Le Chalet est fermé le lundi (ou date passée). Merci de choisir un autre jour.';
          dateError.classList.add('is-visible');
        }
        if (alert48h) alert48h.classList.remove('is-visible');
        populateHours();
        return false;
      }

      dateInput.setCustomValidity('');
      if (dateError) dateError.classList.remove('is-visible');

      const selected = new Date(val + 'T12:00:00');
      const diffHours = (selected.getTime() - Date.now()) / (1000 * 60 * 60);
      if (alert48h) {
        alert48h.classList.toggle('is-visible', diffHours < CHALET.reservationNoticeHours);
      }

      populateHours();
      return true;
    }

    dateInput.addEventListener('change', validateDate);
    validateDate();

    if (serviceGroup) {
      serviceGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-service]');
        if (!btn) return;
        setServiceUI(btn.dataset.service);
        populateHours();
      });
    }

    if (counter) {
      syncCount();
      counter.querySelector('[data-action="minus"]')?.addEventListener('click', () => {
        if (count > 1) { count--; syncCount(); }
      });
      counter.querySelector('[data-action="plus"]')?.addEventListener('click', () => {
        if (count < 20) { count++; syncCount(); }
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const dateOk = validateDate();
      if (!dateOk || !form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Préparation en cours…';
      submitBtn.disabled = true;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const dateVal    = data['res-date'] || '';
      const serviceVal = data['res-service'] || 'midi';
      const hourVal    = data['res-hour'] || '';
      const countVal   = data['res-count'] || '2';
      const nameVal    = data['res-name'] || '';
      const telVal     = data['res-tel'] || '';
      const emailVal   = data['res-email'] || '';
      const commentVal = data['res-comment'] || '';

      const endpoint = form.dataset.action || '';
      let sentViaEndpoint = false;

      if (endpoint && !endpoint.includes('VOTRE_ID_FORMSPREE')) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData
          });
          sentViaEndpoint = res.ok;
        } catch {
          sentViaEndpoint = false;
        }
      }

      const formattedDate = new Date(dateVal + 'T12:00:00').toLocaleDateString('fr-BE', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      });

      if (!sentViaEndpoint) {
        const subject = encodeURIComponent(`Demande de réservation — ${formattedDate} (${serviceVal} ${hourVal})`);
        const body = encodeURIComponent(
          `Bonjour,\n\nJe souhaite réserver une table au Chalet de la Forêt :\n` +
          `- Date : ${formattedDate}\n` +
          `- Service : ${serviceVal}\n` +
          `- Heure : ${hourVal}\n` +
          `- Nombre de personnes : ${countVal}\n` +
          `- Nom : ${nameVal}\n` +
          `- Téléphone : ${telVal}\n` +
          `- Email : ${emailVal}\n` +
          `- Commentaire : ${commentVal || 'Aucun'}\n\n` +
          `Merci d'avance pour votre confirmation.`
        );
        window.location.href = `mailto:${CHALET.email}?subject=${subject}&body=${body}`;
      }

      document.getElementById('recap-date').textContent = formattedDate;
      document.getElementById('recap-service').textContent = serviceVal.charAt(0).toUpperCase() + serviceVal.slice(1);
      document.getElementById('recap-hour').textContent = hourVal.replace(':', 'h');
      document.getElementById('recap-count').textContent = `${countVal} personne${Number(countVal) > 1 ? 's' : ''}`;
      document.getElementById('recap-name').textContent = nameVal;
      document.getElementById('recap-tel').textContent = telVal;

      formWrap.style.display = 'none';
      confirmState.classList.add('is-visible');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });

    if (newResBtn) {
      newResBtn.addEventListener('click', () => {
        confirmState.classList.remove('is-visible');
        formWrap.style.display = 'block';
        form.reset();
        count = 2;
        syncCount();
        setServiceUI('midi');
        dateInput.value = getNextOpenDateISO();
        validateDate();
      });
    }
  }

  /* ------------------------------------------------------------------------
     5. CARTE INTERACTIVE (carte.html)
     ------------------------------------------------------------------------ */
  function initMenu() {
    const tabsWrap = document.getElementById('category-tabs');
    const filtersWrap = document.getElementById('diet-filters');
    const listWrap = document.getElementById('menu-list');
    const searchInput = document.getElementById('menu-search');
    const emptyState = document.getElementById('empty-state');
    const drinksBanner = document.getElementById('drinks-banner');
    const categoryTitle = document.getElementById('category-title');
    const categoryIntro = document.getElementById('category-intro');
    const countEl = document.getElementById('menu-count');
    const resetBtn = document.getElementById('reset-menu-filters');

    if (!tabsWrap || !listWrap) return;

    const state = {
      category: 'all',
      diets: new Set(),
      search: ''
    };

    function getActiveFiltersList() {
      return state.category === 'boissons' ? DRINK_FILTERS : FOOD_FILTERS;
    }

    function renderTabs() {
      tabsWrap.innerHTML = '';
      MENU_CATEGORIES.forEach((cat) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.textContent = cat.label;
        b.className = state.category === cat.key ? 'active' : '';
        b.setAttribute('aria-selected', String(state.category === cat.key));
        b.addEventListener('click', () => {
          const prevWasDrinks = state.category === 'boissons';
          const nextIsDrinks = cat.key === 'boissons';
          state.category = cat.key;
          if (prevWasDrinks !== nextIsDrinks) {
            state.diets.clear();
          }
          renderTabs();
          renderFilters();
          renderList();
        });
        tabsWrap.appendChild(b);
      });
    }

    function renderFilters() {
      if (!filtersWrap) return;
      filtersWrap.innerHTML = '';
      getActiveFiltersList().forEach((f) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = f.label;
        const active = state.diets.has(f.key);
        b.className = active ? 'active' : '';
        b.setAttribute('aria-pressed', String(active));
        b.addEventListener('click', () => {
          if (state.diets.has(f.key)) state.diets.delete(f.key);
          else state.diets.add(f.key);
          renderFilters();
          renderList();
        });
        filtersWrap.appendChild(b);
      });
    }

    function getFilteredItems() {
      const q = normalizeText(state.search.trim());
      const allItems = [...MENU_ITEMS, ...MENU_DRINKS];
      return allItems.filter((item) => {
        if (!q && state.category !== 'all' && item.cat !== state.category) return false;
        if (state.diets.size > 0) {
          const ok = [...state.diets].every((d) => item.tags.includes(d));
          if (!ok) return false;
        }
        if (q) {
          const hay = normalizeText(`${item.name} ${item.desc} ${item.tags.join(' ')}`);
          if (!hay.includes(q)) return false;
        }
        return true;
      });
    }

    function formatCount(len) {
      if (state.search.trim()) return `${len} résultat${len > 1 ? 's' : ''}`;
      if (state.category === 'boissons') return `${len} boisson${len > 1 ? 's' : ''}`;
      if (state.category === 'all') return `${len} choix`;
      return `${len} plat${len > 1 ? 's' : ''}`;
    }

    function renderList() {
      const q = state.search.trim();
      const catObj = MENU_CATEGORIES.find((c) => c.key === state.category) || MENU_CATEGORIES[0];

      if (categoryTitle) {
        categoryTitle.textContent = q ? `Résultats pour « ${q} »` : catObj.label;
      }
      if (categoryIntro) {
        categoryIntro.textContent = q ? 'Recherche dans toute la carte' : catObj.intro;
      }
      if (drinksBanner) {
        drinksBanner.hidden = state.category !== 'boissons' || Boolean(q);
      }

      const items = getFilteredItems();
      if (countEl) {
        countEl.textContent = formatCount(items.length);
      }

      listWrap.innerHTML = '';
      if (items.length === 0) {
        if (emptyState) emptyState.hidden = false;
        listWrap.style.display = 'none';
        return;
      }

      if (emptyState) emptyState.hidden = true;
      listWrap.style.display = 'grid';

      items.forEach((item) => {
        const el = document.createElement('article');
        el.className = 'menu-item' + (item.tags.includes('signature') ? ' menu-item--signature' : '');

        const tagsHtml = item.tags.map((t) => {
          const meta = TAG_LABELS[t] || { label: t, cls: 'badge--soft' };
          return `<span class="badge ${meta.cls}">${escapeHtml(meta.label)}</span>`;
        }).join('');

        const pricesHtml = item.prices.map((p) => `
          <div class="menu-item-price">
            ${p.label ? `<span class="label">${escapeHtml(p.label)}</span>` : ''}
            <span class="val">${escapeHtml(p.val)} €</span>
          </div>
        `).join('');

        el.innerHTML = `
          <div class="menu-item-content">
            <h3>${escapeHtml(item.name)}</h3>
            ${item.desc ? `<p class="menu-item-desc">${escapeHtml(item.desc)}</p>` : ''}
            ${tagsHtml ? `<div class="menu-item-tags">${tagsHtml}</div>` : ''}
          </div>
          <div class="menu-item-prices">${pricesHtml}</div>
        `;
        listWrap.appendChild(el);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderList();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.category = 'all';
        state.diets.clear();
        state.search = '';
        if (searchInput) searchInput.value = '';
        renderTabs();
        renderFilters();
        renderList();
      });
    }

    renderTabs();
    renderFilters();
    renderList();
  }

  /* ------------------------------------------------------------------------
     6. ÉVÉNEMENTS (evenements.html)
     ------------------------------------------------------------------------ */
  function initEvents() {
    const upcomingWrap = document.getElementById('events-upcoming');
    const upcomingEmpty = document.getElementById('events-empty');
    const pastSection = document.getElementById('events-past-section');
    const pastWrap = document.getElementById('events-past');
    if (!upcomingWrap) return;

    const now = Date.now();
    const upcoming = [];
    const past = [];

    EVENTS.forEach((ev) => {
      if (new Date(ev.endISO).getTime() >= now) upcoming.push(ev);
      else past.push(ev);
    });

    const renderEventCard = (ev, isPast) => `
      <article class="event-card${isPast ? ' event-card--past' : ''}">
        <div class="event-date">
          <span class="day">${escapeHtml(ev.dayLabel)}</span>
          <span class="month">${escapeHtml(ev.monthLabel)}</span>
        </div>
        <div class="event-body">
          <div>
            <span class="badge ${isPast ? 'badge--soft' : 'badge--filled'}">${isPast ? 'Événement passé' : 'À venir'}</span>
          </div>
          <h3>${escapeHtml(ev.title)}</h3>
          <div class="event-meta">
            <span>${escapeHtml(ev.dateRangeText)}</span>
            <span>· ${escapeHtml(ev.location)}</span>
          </div>
          <p class="event-desc">${escapeHtml(ev.desc)}</p>
          ${isPast ? '' : `
            <div class="event-actions">
              <a href="index.html#reserver" class="btn btn--primary btn--sm">Réserver une table</a>
              <a href="${CHALET.telLink}" class="btn btn--outline btn--sm">${CHALET.phone}</a>
            </div>
          `}
        </div>
      </article>
    `;

    if (upcoming.length > 0) {
      upcomingWrap.innerHTML = upcoming.map((ev) => renderEventCard(ev, false)).join('');
      if (upcomingEmpty) upcomingEmpty.style.display = 'none';
    } else {
      upcomingWrap.style.display = 'none';
      if (upcomingEmpty) upcomingEmpty.style.display = 'block';
    }

    if (past.length > 0 && pastWrap && pastSection) {
      pastWrap.innerHTML = past.map((ev) => renderEventCard(ev, true)).join('');
      pastSection.style.display = 'block';
    }
  }

  /* ------------------------------------------------------------------------
     7. LIGHTBOX PLEIN ÉCRAN (zoom + déplacement souris & tactile)
     ------------------------------------------------------------------------ */
  function initLightbox() {
    const box = document.getElementById('lightbox');
    if (!box) return;

    const img = box.querySelector('img');
    const closeBtn = box.querySelector('.btn-close');
    const backdrop = box.querySelector('.backdrop');
    const caption = box.querySelector('.caption');
    const openers = document.querySelectorAll('[data-lightbox]');

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let lastFocused = null;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    function applyTransform() {
      img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
      img.style.cursor = scale > 1 ? (isPanning ? 'grabbing' : 'grab') : 'zoom-in';
    }

    function resetTransform() {
      scale = 1;
      posX = 0;
      posY = 0;
      applyTransform();
    }

    function open(src, alt, title) {
      lastFocused = document.activeElement;
      img.src = src;
      img.alt = alt || title || '';
      if (caption) caption.textContent = title || alt || '';
      resetTransform();
      box.classList.add('is-open');
      box.setAttribute('aria-hidden', 'false');
      document.body.classList.add('noscroll');
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      if (!box.classList.contains('is-open')) return;
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('noscroll');
      resetTransform();
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    openers.forEach((op) => {
      op.addEventListener('click', (e) => {
        e.preventDefault();
        const nestedImg = op.tagName === 'IMG' ? op : op.querySelector('img');
        const src = op.dataset.lightbox || (nestedImg ? nestedImg.getAttribute('src') : '');
        const alt = nestedImg ? nestedImg.alt : '';
        const title = op.dataset.lightboxTitle || alt;
        if (src) open(src, alt, title);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && box.classList.contains('is-open')) close();
    });

    img.addEventListener('dblclick', () => {
      if (scale > 1) resetTransform();
      else { scale = 2.1; posX = 0; posY = 0; applyTransform(); }
    });

    img.addEventListener('wheel', (e) => {
      if (!box.classList.contains('is-open')) return;
      e.preventDefault();
      scale = clamp(scale - e.deltaY * 0.0015, 1, 4);
      if (scale === 1) { posX = 0; posY = 0; }
      applyTransform();
    }, { passive: false });

    img.addEventListener('mousedown', (e) => {
      if (scale <= 1) return;
      isPanning = true;
      startX = e.clientX - posX;
      startY = e.clientY - posY;
      applyTransform();
    });
    window.addEventListener('mousemove', (e) => {
      if (!isPanning) return;
      posX = e.clientX - startX;
      posY = e.clientY - startY;
      applyTransform();
    });
    window.addEventListener('mouseup', () => {
      if (!isPanning) return;
      isPanning = false;
      applyTransform();
    });

    img.addEventListener('touchstart', (e) => {
      if (scale <= 1 || e.touches.length !== 1) return;
      const t = e.touches[0];
      isPanning = true;
      startX = t.clientX - posX;
      startY = t.clientY - posY;
    }, { passive: true });
    img.addEventListener('touchmove', (e) => {
      if (!isPanning || e.touches.length !== 1) return;
      e.preventDefault();
      const t = e.touches[0];
      posX = t.clientX - startX;
      posY = t.clientY - startY;
      applyTransform();
    }, { passive: false });
    img.addEventListener('touchend', () => { isPanning = false; });
  }

  /* ------------------------------------------------------------------------
     8. CARROUSEL ABBAYE DE VILLERS (contrôles, points, swipe & pause au survol)
     ------------------------------------------------------------------------ */
  function initAbbeyCarousel() {
    const wrap = document.getElementById('abbey-carousel');
    const track = document.getElementById('abbey-carousel-track');
    if (!wrap || !track) return;

    const images = [...track.querySelectorAll('img')];
    const dots = [...wrap.querySelectorAll('.abbey-carousel-nav button')];
    const prevBtn = wrap.querySelector('.carousel-btn--prev');
    const nextBtn = wrap.querySelector('.carousel-btn--next');
    if (images.length === 0) return;

    let current = 0;
    let timer = null;
    let touchStartX = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goTo(index) {
      current = (index + images.length) % images.length;
      images.forEach((img, idx) => img.classList.toggle('active', idx === current));
      dots.forEach((dot, idx) => {
        const active = idx === current;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-selected', String(active));
      });
    }

    function stopAuto() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function startAuto() {
      if (prefersReducedMotion || images.length <= 1) return;
      stopAuto();
      timer = setInterval(() => goTo(current + 1), 4500);
    }

    prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goTo(idx);
        startAuto();
      });
    });

    wrap.addEventListener('mouseenter', stopAuto);
    wrap.addEventListener('mouseleave', startAuto);
    wrap.addEventListener('focusin', stopAuto);
    wrap.addEventListener('focusout', startAuto);

    wrap.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    wrap.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 45) {
        goTo(dx < 0 ? current + 1 : current - 1);
        startAuto();
      }
    }, { passive: true });

    goTo(0);
    startAuto();
  }

  /* ------------------------------------------------------------------------
     9. SECTION AVIS CLIENTS (grille + afficher plus)
     ------------------------------------------------------------------------ */
  function initReviews() {
    const wrap = document.getElementById('reviews-list');
    const toggleBtn = document.getElementById('reviews-toggle');
    if (!wrap) return;

    const INITIAL_COUNT = 6;
    let expanded = false;

    function render() {
      const visible = expanded ? REVIEWS : REVIEWS.slice(0, INITIAL_COUNT);
      wrap.innerHTML = visible.map((r) => `
        <article class="review-card" role="listitem">
          <div class="review-header">
            <div>
              <span class="review-author">${escapeHtml(r.author)}</span>
              <span class="review-date">${escapeHtml(r.date)}</span>
            </div>
            <span class="badge badge--soft">${escapeHtml(r.source)}</span>
          </div>
          <p class="review-text">« ${escapeHtml(r.text)} »</p>
        </article>
      `).join('');

      if (toggleBtn) {
        if (REVIEWS.length <= INITIAL_COUNT) {
          toggleBtn.hidden = true;
        } else {
          toggleBtn.hidden = false;
          toggleBtn.setAttribute('aria-expanded', String(expanded));
          toggleBtn.textContent = expanded
            ? 'Réduire les avis'
            : `Voir tous les avis (${REVIEWS.length})`;
        }
      }
    }

    toggleBtn?.addEventListener('click', () => {
      expanded = !expanded;
      render();
    });

    render();
  }

  /* ------------------------------------------------------------------------
     10. INITIALISATION GLOBALE
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initMenu();
    initReservation();
    initEvents();
    initLightbox();
    initAbbeyCarousel();
    initReviews();
  });
})();