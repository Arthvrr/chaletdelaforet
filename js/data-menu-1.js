/* ==========================================================================
   LE CHALET DE LA FORÊT — Carte partie 1 (Tapas, Entrées, Salades)
   tags : végétarien | sans-gluten | sans-lactose | fumoir | enfant | piquant | signature
   ========================================================================== */
export const menuPart1 = [
  { id: 't1', cat: 'tapas', name: 'Planche de fromages', desc: 'Tome de chèvre, Maredsous et comté accompagnés de pain et de beurre.', price: [{ label: '', val: '12,50' }], tags: ['végétarien'] },
  { id: 't2', cat: 'tapas', name: 'Planche de saucissons', desc: 'Nature, aux noisettes et au Beaufort accompagnés de pain et de beurre.', price: [{ label: '', val: '12,50' }], tags: ['sans-lactose'] },
  { id: 't3', cat: 'tapas', name: 'Planche mixte', desc: '3 variétés de fromages et de saucissons accompagnés de pain et de beurre.', price: [{ label: '', val: '13,50' }], tags: [] },
  { id: 't4', cat: 'tapas', name: 'Planche mixte fumée maison', desc: '', price: [{ label: '', val: '16,00' }], tags: ['fumoir'] },
  { id: 't5', cat: 'tapas', name: 'Tapas asiatique', desc: 'Chinoiseries, sauce aigre-douce et sauce soja.', price: [{ label: '', val: '14,00' }], tags: [] },
  { id: 't6', cat: 'tapas', name: 'Tartine de fromage blanc', desc: 'Maquée de la ferme de la Baillerie, radis et oignons rouges.', price: [{ label: '', val: '11,50' }], tags: ['végétarien'] },
  { id: 't7', cat: 'tapas', name: 'Tartine de saumon fumé maison', desc: 'Crème citronnée, échalotes, persil haché.', price: [{ label: '', val: '14,00' }], tags: ['fumoir'] },
  { id: 't8', cat: 'tapas', name: 'Ribs fumés maison, sauce barbecue', desc: '', price: [{ label: '', val: '14,00' }], tags: ['fumoir'] },
  { id: 't9', cat: 'tapas', name: 'Ailes de poulet fumées maison, sauce aïoli', desc: '', price: [{ label: '', val: '14,00' }], tags: ['fumoir', 'sans-gluten'] },

  { id: 'e1', cat: 'entrees', name: 'Carpaccio de bœuf', desc: 'Huile d\'olive et parmesan.', price: [{ label: 'Entrée', val: '17,50' }, { label: 'Plat', val: '22,00' }], tags: ['sans-gluten'] },
  { id: 'e2', cat: 'entrees', name: 'Croquettes de fromage maison', desc: '', price: [{ label: 'Entrée (2 pc, salade)', val: '17,50' }, { label: 'Plat (3 pc, salade, frites)', val: '22,00' }], tags: ['végétarien'] },
  { id: 'e3', cat: 'entrees', name: 'Croquettes de crevettes maison', desc: '', price: [{ label: 'Entrée (2 pc, salade)', val: '20,50' }, { label: 'Plat (3 pc, salade, frites)', val: '25,00' }], tags: [] },
  { id: 'e4', cat: 'entrees', name: 'Duo de croquettes', desc: '', price: [{ label: 'Entrée (2 pc, salade)', val: '19,50' }, { label: 'Plat (3 pc, salade, frites)', val: '24,00' }], tags: [] },
  { id: 'e5', cat: 'entrees', name: 'L\'assiette de saumon fumé et ses toasts', desc: '', price: [{ label: 'Entrée', val: '18,50' }, { label: 'Plat', val: '24,50' }], tags: ['fumoir'] },

  { id: 's1', cat: 'salades', name: 'Salade de chèvre chaud de la ferme de la Baillerie', desc: '', price: [{ label: '', val: '18,50' }], tags: ['végétarien', 'sans-gluten'] },
  { id: 's2', cat: 'salades', name: 'Salade César', desc: 'Poulet basse température, bacon, parmesan, œufs, croûtons, sauce César.', price: [{ label: '', val: '21,50' }], tags: ['sans-gluten'] },
];