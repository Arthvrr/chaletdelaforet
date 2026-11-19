/* ==========================================================================
   LE CHALET DE LA FORÊT — Carte partie 3 (Desserts, catégories, filtres, SEO)
   ========================================================================== */
export const menuPart3 = [
  { id: 'd1', cat: 'desserts', name: 'Crêpes aux sucres', desc: '2 pc, 3 sucres.', price: [{ label: '', val: '8,00' }], tags: [] },
  { id: 'd2', cat: 'desserts', name: 'Crêpes au chocolat', desc: '2 pc, chocolat noir fondu maison (Callebaut).', price: [{ label: '', val: '8,50' }], tags: [] },
  { id: 'd3', cat: 'desserts', name: 'Crêpes Mikado', desc: '2 pc, chocolat fondu maison (Callebaut), chantilly, glace vanille.', price: [{ label: '', val: '9,50' }], tags: [] },
  { id: 'd4', cat: 'desserts', name: 'Moelleux du chef, boule de glace vanille, chantilly', desc: '', price: [{ label: '', val: '10,00' }], tags: [] },
  { id: 'd5', cat: 'desserts', name: 'Café liégeois', desc: '3 boules de glace Moka, café, chantilly.', price: [{ label: '', val: '9,50' }], tags: [] },
  { id: 'd6', cat: 'desserts', name: 'Tiramisu', desc: 'Aux boudoirs.', price: [{ label: '', val: '8,50' }], tags: [] },
  { id: 'd7', cat: 'desserts', name: 'Mousse au chocolat', desc: '', price: [{ label: '', val: '8,50' }], tags: [] },
  { id: 'd8', cat: 'desserts', name: 'Dame blanche', desc: '', price: [{ label: '', val: '9,00' }], tags: ['enfant'] },
  { id: 'd9', cat: 'desserts', name: 'Dame noire', desc: '', price: [{ label: '', val: '9,00' }], tags: ['enfant'] },
  { id: 'd10', cat: 'desserts', name: 'Brésilienne', desc: '', price: [{ label: '', val: '9,00' }], tags: ['enfant'] },
  { id: 'd11', cat: 'desserts', name: 'Colonel', desc: '3 boules de sorbet citron, Eau de Villée.', price: [{ label: '', val: '10,50' }], tags: [] },
  { id: 'd12', cat: 'desserts', name: 'Boule de glace', desc: 'Parfums : vanille, chocolat, moka, citron, melon, framboise.', price: [{ label: '', val: '3,00' }], tags: [] },
];

export const menuCategories = [
  { key: 'tapas', label: 'Tapas', intro: 'Idéaux à partager' },
  { key: 'entrees', label: 'Entrées', intro: 'Disponibles en entrée ou en plat' },
  { key: 'salades', label: 'Salades', intro: '' },
  { key: 'plats', label: 'Plats', intro: '' },
  { key: 'desserts', label: 'Desserts', intro: 'Faits maison' },
];

export const dietFilters = [
  { key: 'fumoir', label: 'Fumé maison', accent: true },
  { key: 'végétarien', label: 'Végétarien' },
  { key: 'sans-gluten', label: 'Sans gluten' },
  { key: 'sans-lactose', label: 'Sans produits laitiers' },
  { key: 'enfant', label: 'Disponible en plat enfant' },
  { key: 'piquant', label: 'Légèrement piquant' },
];

export const RESERVATION_NOTICE_HOURS = 48;

export const seo = {
  home: {
    title: 'Le Chalet de la Forêt — Brasserie & Fumoir maison à Genappe (Villers-la-Ville)',
    desc: 'Restaurant et brasserie à Genappe, à 150 m de l\'Abbaye de Villers-la-Ville. Cuisine de brasserie, produits locaux et fumoir artisanal maison depuis 1910. Réservez votre table.',
  },
  carte: {
    title: 'Notre carte — Le Chalet de la Forêt, Genappe',
    desc: 'Découvrez la carte du Chalet de la Forêt : tapas, entrées, salades, plats, desserts. Fumoir maison, produits locaux, végétarien et sans gluten.',
  },
  suggestions: {
    title: 'Suggestions et plats du jour — Le Chalet de la Forêt',
    desc: 'L\'ardoise du moment : plat du jour, suggestions du Chef et carte des boissons du Chalet de la Forêt à Genappe.',
  },
  evenements: {
    title: 'Nos événements — Le Chalet de la Forêt, Genappe',
    desc: 'Soirées thématiques et week-ends gourmands au Chalet de la Forêt, à 150 m de l\'Abbaye de Villers-la-Ville.',
  },
};