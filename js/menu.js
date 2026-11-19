/* ==========================================================================
   LE CHALET DE LA FORÊT — Carte interactive (filtres, recherche, onglets)
   ========================================================================== */
import { menuPart1 } from './data-menu-1.js';
import { menuPart2 } from './data-menu-2.js';
import { menuPart3 } from './data-menu-3.js';
import { menuCategories, dietFilters } from './data-menu-3.js';

const $ = (sel) => document.querySelector(sel);
const allMenu = [...menuPart1, ...menuPart2, ...menuPart3];

export function initMenu() {
  const tabsWrap = $('#category-tabs');
  const filtersWrap = $('#diet-filters');
  const listWrap = $('#menu-list');
  const searchInput = $('#menu-search');
  const emptyState = $('#empty-state');
  const categoryTitle = $('#category-title');
  const categoryIntro = $('#category-intro');

  if (!tabsWrap || !listWrap) return;

  let state = {
    category: 'tapas',
    diets: new Set(),
    search: '',
  };

  // ---------- Rendu onglets catégories ----------
  function renderTabs() {
    tabsWrap.innerHTML = '';
    menuCategories.forEach(cat => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = cat.label;
      b.dataset.key = cat.key;
      b.className = state.category === cat.key ? 'active' : '';
      b.addEventListener('click', () => {
        state.category = cat.key;
        state.diets.clear();
        renderFilters();
        renderList();
        updateCategoryHeader();
        renderTabs();
      });
      tabsWrap.appendChild(b);
    });
  }

  // ---------- Rendu filtres diététiques ----------
  function renderFilters() {
    filtersWrap.innerHTML = '';
    dietFilters.forEach(f => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = f.label;
      b.dataset.key = f.key;
      b.className = (state.diets.has(f.key) ? 'active' : '') + (f.accent ? '' : '');
      b.addEventListener('click', () => {
        if (state.diets.has(f.key)) state.diets.delete(f.key);
        else state.diets.add(f.key);
        renderFilters();
        renderList();
      });
      filtersWrap.appendChild(b);
    });
  }

  // ---------- Mise à jour en-tête catégorie ----------
  function updateCategoryHeader() {
    const cat = menuCategories.find(c => c.key === state.category);
    if (categoryTitle) categoryTitle.textContent = cat.label;
    if (categoryIntro) categoryIntro.textContent = cat.intro;
  }

  // ---------- Filtrage ----------
  function filterItems() {
    return allMenu.filter(item => {
      if (item.cat !== state.category) return false;
      if (state.diets.size > 0) {
        const match = [...state.diets].every(d => item.tags.includes(d));
        if (!match) return false;
      }
      if (state.search) {
        const s = state.search.toLowerCase();
        const hay = (item.name + ' ' + item.desc + ' ' + item.tags.join(' ')).toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }

  // ---------- Affichage prix ----------
  function priceHtml(item) {
    return item.price.map(p => `
      <div class="menu-item-price">
        <span class="label">${p.label ? p.label + ' ' : ''}</span>
        <span class="val">${p.val} €</span>
      </div>
    `).join('');
  }

  function tagsHtml(item) {
    return item.tags.map(t => `<span class="badge badge--soft">${capitalize(t)}</span>`).join('');
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ');
  }

  // ---------- Rendu liste ----------
  function renderList() {
    const items = filterItems();
    listWrap.innerHTML = '';
    if (items.length === 0) {
      emptyState.style.display = 'block';
      listWrap.style.display = 'none';
      return;
    }
    emptyState.style.display = 'none';
    listWrap.style.display = 'grid';
    items.forEach(item => {
      const el = document.createElement('article');
      el.className = 'menu-item' + (item.tags.includes('signature') ? ' menu-item--signature' : '');
      el.innerHTML = `
        <div class="menu-item-content">
          <h3>${escapeHtml(item.name)}</h3>
          <div class="menu-item-tags">${tagsHtml(item)}</div>
          ${item.desc ? `<p class="menu-item-desc">${escapeHtml(item.desc)}</p>` : ''}
        </div>
        <div class="menu-item-prices">${priceHtml(item)}</div>
      `;
      listWrap.appendChild(el);
    });
  }

  // ---------- Recherche ----------
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.search = e.target.value;
      renderList();
    });
  }

  renderTabs();
  renderFilters();
  updateCategoryHeader();
  renderList();
}

function escapeHtml(t) {
  return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}