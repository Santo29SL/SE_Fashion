import { products, addOns, getProductsByRealm, getProductById } from './data/products.js';
import { realms, heritagePillars } from './data/realms.js';
import { journalPosts } from './data/journal.js';
import { mediaHTML, productMedia, realmMedia } from './lib/media.js';
import { formatPrice, formatRating } from './lib/format.js';
import { escapeHtml } from './lib/escape.js';
import { createThrowDeck } from './lib/throwDeck.js';
import { getArtifactArtwork } from './lib/artwork.js';

const state = {
  catalogFilter: 'all',
  sortOrder: 'featured',
  currency: localStorage.getItem('southern_edit_currency') || 'INR',
  cart: JSON.parse(localStorage.getItem('southern_edit_cart') || '[]'),
  selectedProduct: null,
  modalWearIndex: 0,
  modalColorIndex: 0,
  audioActive: false,
  audioContext: null,
  audioInterval: null,
  decks: []
};

const el = (id) => document.getElementById(id);

function price(amount) {
  return formatPrice(amount, state.currency);
}

function showToast(message) {
  const host = el('toastContainer');
  if (!host) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  host.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function observeInView(root = document) {
  const nodes = root.querySelectorAll('.journal-card, .product-card, .realm-panel');
  if (!nodes.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    },
    { threshold: 0.15 }
  );
  nodes.forEach((node) => io.observe(node));
}

function bindDelegatedClicks() {
  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const id = target.dataset.id;
    if (action === 'quick-view') openQuickView(id);
    if (action === 'add-bag') addToBag(id, false);
    if (action === 'filter-realm') {
      window.location.href = `shop.html?realm=${encodeURIComponent(id)}`;
    }
    if (action === 'lookbook') openLookbook(id);
    if (action === 'qty') changeCartQty(Number(target.dataset.index), Number(target.dataset.delta));
    if (action === 'addon') addAddon(id);
    if (action === 'multiwear') selectMultiwear(Number(target.dataset.index));
    if (action === 'color') selectModalColor(Number(target.dataset.index), target);
  });
}

// -------------------------------------------------------------
// REALMS VIEW & MOODBOARD PLACEHOLDERS
// -------------------------------------------------------------
function renderRealms() {
  const stack = el('realmPinStack');
  if (!stack) return;

  stack.innerHTML = realms
    .map(
      (realm) => `
      <article class="realm-panel" id="realm-${escapeHtml(realm.id)}" style="--realm-accent:${realm.accentColor}">
        <div class="realm-copy">
          <p class="realm-tagline">${escapeHtml(realm.tagline)}</p>
          <p class="realm-native">${escapeHtml(realm.native)}</p>
          <h3 class="section-title">${escapeHtml(realm.name)}</h3>
          <p class="section-subtitle">${escapeHtml(realm.description)}</p>
          <div class="palette-swatches">
            ${realm.colors.map((c) => `<span class="swatch-circle" style="background:${c}"></span>`).join('')}
          </div>
          <div class="realm-crafts">
            ${realm.crafts.map((c) => `<span class="craft-tag">${escapeHtml(c)}</span>`).join('')}
          </div>
          <p class="realm-quote">“${escapeHtml(realm.artisanNote)}”</p>
          <div class="intro-cta">
            <a href="shop.html?realm=${escapeHtml(realm.id)}" class="btn-primary">Shop this realm</a>
            <button type="button" class="btn-ghost" data-action="lookbook" data-id="${escapeHtml(realm.id)}">Lookbook slot</button>
          </div>
        </div>
        <div class="realm-media">${realmMedia(realm, 'moodboard')}</div>
      </article>
    `
    )
    .join('');

  const footerRealms = el('footerRealmLinks');
  if (footerRealms) {
    footerRealms.innerHTML = realms
      .map(
        (realm) =>
          `<li><a href="shop.html?realm=${escapeHtml(realm.id)}">${escapeHtml(realm.name)}</a></li>`
      )
      .join('');
  }
}

// -------------------------------------------------------------
// SHOP / CATALOG VIEW (All Artifacts with Sort & Filters)
// -------------------------------------------------------------
function realmCounts() {
  const counts = { all: products.length, bestseller: products.filter((p) => p.isBestseller).length };
  realms.forEach((realm) => {
    counts[realm.id] = products.filter((p) => p.stateId === realm.id).length;
  });
  return counts;
}

function renderFilters() {
  const host = el('catalogFilters');
  if (!host) return;

  const counts = realmCounts();
  const items = [
    { id: 'all', label: `All Realms (${counts.all})` },
    ...realms.map((r) => ({ id: r.id, label: `${r.name} (${counts[r.id]})` })),
    { id: 'bestseller', label: `Bestsellers (${counts.bestseller})` }
  ];

  host.innerHTML = items
    .map(
      (item) =>
        `<button type="button" class="catalog-filter-btn ${state.catalogFilter === item.id ? 'active' : ''}" data-filter="${item.id}">${escapeHtml(item.label)}</button>`
    )
    .join('');

  host.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => setCatalogFilter(btn.dataset.filter));
  });
}

function filteredProducts() {
  let list = [...products];
  if (state.catalogFilter === 'bestseller') list = list.filter((p) => p.isBestseller);
  else if (state.catalogFilter !== 'all') list = list.filter((p) => p.stateId === state.catalogFilter);

  if (state.sortOrder === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (state.sortOrder === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (state.sortOrder === 'rating') list.sort((a, b) => b.rating - a.rating);
  else if (state.sortOrder === 'featured') {
    // Relevance / Featured: bestsellers first, then rating
    list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.rating - a.rating);
  }
  return list;
}

function renderCatalog() {
  const grid = el('productsGrid');
  if (!grid) return;

  const list = filteredProducts();
  const countBar = el('shopCountBadge');
  if (countBar) {
    countBar.textContent = `Showing ${list.length} of ${products.length} artifacts`;
  }

  if (!list.length) {
    grid.innerHTML = `<p class="empty-note">No pieces found for this selection.</p>`;
    return;
  }

  grid.innerHTML = list
    .map((product) => {
      const modes = product.stylingModes?.length || 0;
      return `
        <article class="product-card" data-id="${escapeHtml(product.id)}">
          <div class="product-media-wrap" data-action="quick-view" data-id="${escapeHtml(product.id)}">
            <div class="product-media-layer is-main">${productMedia(product, 'main')}</div>
            <div class="product-media-layer is-lookbook">${productMedia(product, 'lookbook')}</div>
            <div class="product-badge-float">
              <span class="badge-state">${escapeHtml(product.stateName)}</span>
              ${product.isBestseller ? '<span class="badge-bestseller">Bestseller</span>' : ''}
            </div>
            <button type="button" class="product-quick-view-btn" data-action="quick-view" data-id="${escapeHtml(product.id)}">Quick view</button>
          </div>
          <div class="product-info-wrap">
            <span class="product-gi-tag">${escapeHtml(product.giTag)}</span>
            <h3 class="product-name">${escapeHtml(product.name)}</h3>
            <p class="product-subtitle">${escapeHtml(product.subtitle)}</p>
            <p class="product-rating">${formatRating(product.rating, product.reviewsCount)}</p>
            ${modes > 1 ? `<p class="product-multiwear-pill">${modes}-way modular</p>` : ''}
            <div class="product-bottom-row">
              <div>
                <span class="product-price-current">${price(product.price)}</span>
                <span class="product-price-original">${price(product.originalPrice)}</span>
              </div>
              <button type="button" class="product-add-btn" data-action="add-bag" data-id="${escapeHtml(product.id)}" aria-label="Add ${escapeHtml(product.name)} to bag">Add</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
  observeInView(grid);
}

function setCatalogFilter(filterId) {
  state.catalogFilter = filterId;
  renderFilters();
  renderCatalog();
}

// -------------------------------------------------------------
// JOURNAL VIEW
// -------------------------------------------------------------
function renderJournal() {
  const host = el('journalGrid');
  if (!host) return;

  host.innerHTML = journalPosts
    .map((post) => {
      const related = products.filter((p) => post.relatedProductIds.includes(p.id));
      return `
        <article class="journal-card">
          <div class="journal-media">${mediaHTML({ path: post.image, slot: post.slot, label: post.title })}</div>
          <div class="journal-body">
            <span class="journal-kicker">${escapeHtml(post.kicker)}</span>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.excerpt)}</p>
            <div class="journal-shop">
              <span>Related artifacts:</span>
              <div class="intro-realms" style="margin-top: 0.5rem;">
                ${related
                  .map(
                    (p) => `<a href="shop.html?realm=${escapeHtml(p.stateId)}">${escapeHtml(p.name)} · ${price(p.price)}</a>`
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
  observeInView(host);
}

// -------------------------------------------------------------
// HERITAGE VIEW
// -------------------------------------------------------------
function renderHeritage() {
  const frameCulture = el('heritageFrameCulture');
  const frameModular = el('heritageFrameModular');
  const pillarsHost = el('heritagePillars');
  if (!pillarsHost) return;

  if (frameCulture) {
    frameCulture.innerHTML = mediaHTML({
      slot: 'images/editorial/heritage_culture.webp',
      label: 'Culture × contemporary'
    });
  }
  if (frameModular) {
    frameModular.innerHTML = mediaHTML({
      slot: 'images/editorial/heritage_modular.webp',
      label: 'Modular architecture'
    });
  }

  pillarsHost.innerHTML = heritagePillars
    .map(
      (pillar) => `
      <article class="pillar-item">
        <div class="pillar-header">
          <span>${pillar.index} · ${escapeHtml(pillar.label)}</span>
          <span class="pillar-badge">${escapeHtml(pillar.badge)}</span>
        </div>
        <div class="pillar-comparison-grid">
          <div class="pillar-box">
            <strong>${escapeHtml(pillar.traditional.title)}</strong>
            ${escapeHtml(pillar.traditional.body)}
          </div>
          <div class="pillar-box">
            <strong>${escapeHtml(pillar.contemporary.title)}</strong>
            ${escapeHtml(pillar.contemporary.body)}
          </div>
        </div>
      </article>
    `
    )
    .join('');

  document.querySelectorAll('[data-heritage]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.heritage;
      document.querySelectorAll('[data-heritage]').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      frameCulture?.classList.toggle('is-active', mode === 'culture');
      frameModular?.classList.toggle('is-active', mode === 'modular');
    });
  });

  const provMedia = el('provenanceMedia');
  if (provMedia) {
    provMedia.innerHTML = mediaHTML({
      slot: 'images/editorial/madras_loom.webp',
      label: 'Weaver cooperative'
    });
  }
}

// -------------------------------------------------------------
// PRODUCT QUICK VIEW DIALOG
// -------------------------------------------------------------
function setDialogView(kind) {
  const prod = state.selectedProduct;
  if (!prod) return;
  el('dialogProductStage').innerHTML = productMedia(prod, kind);
  document.querySelectorAll('.quick-view-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.view === kind);
  });
}

function openQuickView(productId) {
  const prod = getProductById(productId);
  if (!prod) return;
  state.selectedProduct = prod;
  state.modalWearIndex = 0;
  state.modalColorIndex = 0;

  el('dialogProductGI').textContent = prod.giTag;
  el('dialogProductName').textContent = prod.name;
  el('dialogProductSubtitle').textContent = prod.subtitle;
  el('dialogProductRating').textContent = formatRating(prod.rating, prod.reviewsCount);
  el('dialogProductPrice').textContent = price(prod.price);
  el('dialogProductOriginalPrice').textContent = price(prod.originalPrice);
  el('dialogProductDesc').textContent = prod.description;
  el('dialogCraftStory').textContent = prod.craftStory;
  el('dialogAddPriceBtn').textContent = price(prod.price);
  el('dialogSpecMaterial').textContent = prod.specifications.material;
  el('dialogSpecHardware').textContent = prod.specifications.hardware || 'Antiqued brass';
  el('dialogSpecOrigin').textContent = prod.specifications.origin;
  setDialogView('main');

  if (prod.stylingModes?.length) {
    el('dialogMultiwearBox').style.display = 'block';
    el('dialogMultiwearButtons').innerHTML = prod.stylingModes
      .map(
        (mode, idx) =>
          `<button type="button" class="multiwear-btn ${idx === 0 ? 'active' : ''}" data-action="multiwear" data-index="${idx}">${escapeHtml(mode.name)}</button>`
      )
      .join('');
    el('dialogMultiwearNote').textContent = prod.stylingModes[0].note;
  } else {
    el('dialogMultiwearBox').style.display = 'none';
  }

  el('dialogSwatches').innerHTML = (prod.colors || [])
    .map(
      (c, idx) =>
        `<span class="swatch-circle" style="background:${c.hex};cursor:pointer;${idx === 0 ? 'outline:2px solid var(--brass);outline-offset:2px;' : ''}" title="${escapeHtml(c.name)}" data-action="color" data-index="${idx}"></span>`
    )
    .join('');

  el('quickViewDialog').showModal();
}

function selectMultiwear(index) {
  state.modalWearIndex = index;
  const prod = state.selectedProduct;
  if (!prod?.stylingModes) return;
  el('dialogMultiwearButtons')
    .querySelectorAll('.multiwear-btn')
    .forEach((btn, i) => btn.classList.toggle('active', i === index));
  el('dialogMultiwearNote').textContent = prod.stylingModes[index].note;
}

function selectModalColor(index, node) {
  state.modalColorIndex = index;
  el('dialogSwatches').querySelectorAll('.swatch-circle').forEach((s) => {
    s.style.outline = 'none';
  });
  node.style.outline = '2px solid var(--brass)';
  node.style.outlineOffset = '2px';
}

function openLookbook(realmId) {
  const realm = realms.find((r) => r.id === realmId);
  if (!realm) return;

  const deckDialog = el('lookbookDeckDialog');
  if (!deckDialog) return;

  // Clean up any previously active deck instance
  state.activeDeck?.destroy?.();
  state.activeDeck = null;

  const eyebrow = el('lookbookDeckEyebrow');
  const title = el('lookbookDeckTitle');
  if (eyebrow) eyebrow.textContent = `${realm.name} · Artifacts Flash Cards`;
  if (title) title.textContent = realm.tagline;

  const realmProducts = getProductsByRealm(realm.id);
  const deckCards = realmProducts.map((p) => {
    const artSvg = getArtifactArtwork(p.id, realm.accentColor);
    return {
      id: p.id,
      title: p.name,
      subtitle: p.subtitle,
      price: price(p.price),
      art: artSvg,
      description: p.description,
      specs: [
        { label: 'Origin', value: p.specifications?.origin?.split(',')[0] || p.stateName },
        { label: 'Material', value: p.specifications?.material?.split('&')[0] || 'Handloom' },
        { label: 'Hardware', value: p.specifications?.hardware?.split(' ')[0] || 'Solid Brass' },
        { label: 'GI Status', value: p.giTag ? 'GI Certified' : 'Heritage Craft' }
      ],
      product: p
    };
  });

  const stage = el('lookbookDeckStage');
  if (!stage) return;

  state.activeDeck = createThrowDeck(stage, {
    cards: deckCards,
    accent: realm.accentColor,
    actionLabel: 'Add to bag',
    onAction: (card) => {
      addToBag(card.id, false);
      deckDialog.close();
    },
    formatPriceFn: price
  });

  deckDialog.showModal();
}

// -------------------------------------------------------------
// CART & BAG DRAWER
// -------------------------------------------------------------
function saveCart() {
  localStorage.setItem('southern_edit_cart', JSON.stringify(state.cart));
  const badge = el('cartCountBadge');
  if (badge) {
    badge.textContent = String(state.cart.reduce((sum, item) => sum + item.quantity, 0));
  }
  renderCart();
}

function addToBag(productId, fromModal = false) {
  const prod = getProductById(productId);
  if (!prod) return;
  const selectedColor = prod.colors?.[fromModal ? state.modalColorIndex : 0]?.name || 'Standard';
  const selectedMode = prod.stylingModes?.[fromModal ? state.modalWearIndex : 0]?.name || 'Default';
  const existing = state.cart.find((item) => item.id === productId && item.selectedColor === selectedColor);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      slot: prod.slots?.main || '',
      image: prod.imageMain || '',
      selectedColor,
      selectedMode,
      quantity: 1
    });
  }
  saveCart();
  showToast(`Added ${prod.name} to bag`);
  if (fromModal) el('quickViewDialog')?.close();
  el('cartDrawer')?.showModal();
}

function addAddon(addonId) {
  const addon = addOns.find((a) => a.id === addonId);
  if (!addon) return;
  const existing = state.cart.find((i) => i.id === addon.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: addon.id,
      name: addon.name,
      price: addon.price,
      image: addon.image || '',
      slot: addon.slot || '',
      selectedColor: 'Standard',
      selectedMode: 'Accent',
      quantity: 1
    });
  }
  saveCart();
  showToast(`Added ${addon.name}`);
}

function changeCartQty(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) state.cart.splice(index, 1);
  saveCart();
}

function renderCart() {
  const list = el('cartItemsList');
  if (!list) return;

  if (!state.cart.length) {
    list.innerHTML = `
      <div class="empty-note">
        <p>Your bag is empty.</p>
        <a href="shop.html" class="btn-primary" id="emptyDiscover" style="margin-top: 1rem; display: inline-flex;">Discover artifacts</a>
      </div>`;
    el('cartSubtotal').textContent = price(0);
    el('freeShippingBar').style.width = '0%';
    el('freeShippingNotice').textContent = `Add ${price(3000)} more for complimentary pan-India delivery.`;
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  el('cartSubtotal').textContent = price(subtotal);
  const pct = Math.min(100, Math.round((subtotal / 3000) * 100));
  el('freeShippingBar').style.width = `${pct}%`;
  el('freeShippingNotice').textContent =
    subtotal >= 3000
      ? 'Complimentary pan-India shipping unlocked.'
      : `Add ${price(3000 - subtotal)} more for complimentary shipping.`;

  const items = state.cart
    .map(
      (item, idx) => `
      <div class="cart-item">
        <div class="cart-thumb">${mediaHTML({ path: item.image, slot: item.slot, label: item.name })}</div>
        <div>
          <p class="cart-item-title">${escapeHtml(item.name)}</p>
          <p class="cart-item-meta">${escapeHtml(item.selectedColor)} · ${escapeHtml(item.selectedMode)}</p>
          <p class="cart-item-price">${price(item.price)} each</p>
        </div>
        <div class="cart-qty-ctrl">
          <button type="button" data-action="qty" data-index="${idx}" data-delta="-1" aria-label="Decrease">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="qty" data-index="${idx}" data-delta="1" aria-label="Increase">+</button>
        </div>
      </div>`
    )
    .join('');

  const addons = addOns
    .filter((addon) => !state.cart.some((i) => i.id === addon.id))
    .map(
      (addon) => `
      <div class="cart-item">
        <div class="cart-thumb">${mediaHTML({ path: addon.image, slot: addon.slot, label: addon.name })}</div>
        <div>
          <p class="cart-item-title">${escapeHtml(addon.name)}</p>
          <p class="cart-item-price">${price(addon.price)}</p>
        </div>
        <button type="button" class="product-add-btn" data-action="addon" data-id="${escapeHtml(addon.id)}">Add</button>
      </div>`
    )
    .join('');

  list.innerHTML = items + (addons ? `<p class="multiwear-title">Complete the look</p>${addons}` : '');
}

// -------------------------------------------------------------
// WEAVER LOOM AUDIO SYNTHESIS
// -------------------------------------------------------------
function initAudio() {
  if (!state.audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new Ctx();
  }
  if (state.audioContext.state === 'suspended') state.audioContext.resume();

  const stroke = (isReed) => {
    if (!state.audioActive || !state.audioContext) return;
    const ctx = state.audioContext;
    const now = ctx.currentTime;
    const size = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (size * 0.25));
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(isReed ? 850 : 1350, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(now);
  };

  let step = 0;
  state.audioInterval = setInterval(() => {
    if (state.audioActive) stroke(step % 2 === 1);
    step += 1;
  }, 780);
}

function toggleMenu(open) {
  const drawer = el('mobileDrawer');
  const backdrop = el('mobileBackdrop');
  const btn = el('navMenuBtn');
  if (!drawer || !backdrop) return;
  const shouldOpen = open ?? drawer.hidden;
  drawer.hidden = !shouldOpen;
  backdrop.hidden = !shouldOpen;
  btn?.setAttribute('aria-expanded', String(shouldOpen));
}

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const t = max > 0 ? window.scrollY / max : 0;
  const prog = el('scrollProgress');
  if (prog) prog.style.transform = `scaleX(${t})`;
  el('siteHeader')?.classList.toggle('is-scrolled', window.scrollY > 24);
}

function closeOnBackdrop(dialog) {
  if (!dialog) return;
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

// -------------------------------------------------------------
// APP INITIALIZATION
// -------------------------------------------------------------
function init() {
  // Check URL parameters (e.g. ?realm=kerala for shop page)
  const urlParams = new URLSearchParams(window.location.search);
  const realmParam = urlParams.get('realm');
  if (realmParam) {
    state.catalogFilter = realmParam;
  }

  // Set currency selector value
  const currencySelect = el('currencySelect');
  if (currencySelect) {
    currencySelect.value = state.currency;
  }

  // Initialize Page-Specific Components
  renderRealms();
  renderFilters();
  renderCatalog();
  renderJournal();
  renderHeritage();

  saveCart();
  bindDelegatedClicks();
  observeInView();

  // Shop sort listener
  const sortSelect = el('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortOrder = e.target.value;
      renderCatalog();
    });
  }

  // Currency select listener
  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      state.currency = e.target.value;
      localStorage.setItem('southern_edit_currency', state.currency);
      renderRealms();
      renderCatalog();
      renderCart();
      if (state.selectedProduct) {
        el('dialogProductPrice').textContent = price(state.selectedProduct.price);
        el('dialogProductOriginalPrice').textContent = price(state.selectedProduct.originalPrice);
        el('dialogAddPriceBtn').textContent = price(state.selectedProduct.price);
      }
      showToast(`Currency: ${state.currency} (indicative)`);
    });
  }

  // Mobile menu
  el('navMenuBtn')?.addEventListener('click', () => toggleMenu());
  el('mobileBackdrop')?.addEventListener('click', () => toggleMenu(false));
  el('mobileDrawer')?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Audio toggle
  const audioBtn = el('audioToggleBtn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      state.audioActive = !state.audioActive;
      audioBtn.setAttribute('aria-pressed', String(state.audioActive));
      el('audioIcon').textContent = state.audioActive ? '🔊' : '🔇';
      el('audioLabel').textContent = state.audioActive ? 'Loom audio on' : 'Loom audio off';
      if (state.audioActive) initAudio();
      else if (state.audioInterval) clearInterval(state.audioInterval);
    });
  }

  // Cart drawer triggers
  el('cartToggleBtn')?.addEventListener('click', () => {
    renderCart();
    el('cartDrawer')?.showModal();
  });
  el('cartCloseBtn')?.addEventListener('click', () => el('cartDrawer')?.close());
  el('dialogCloseBtn')?.addEventListener('click', () => el('quickViewDialog')?.close());
  el('slideViewerCloseBtn')?.addEventListener('click', () => el('slideViewerDialog')?.close());
  el('lookbookDeckCloseBtn')?.addEventListener('click', () => {
    state.activeDeck?.destroy?.();
    state.activeDeck = null;
    el('lookbookDeckDialog')?.close();
  });

  el('lookbookDeckDialog')?.addEventListener('close', () => {
    state.activeDeck?.destroy?.();
    state.activeDeck = null;
  });

  closeOnBackdrop(el('quickViewDialog'));
  closeOnBackdrop(el('cartDrawer'));
  closeOnBackdrop(el('slideViewerDialog'));
  closeOnBackdrop(el('lookbookDeckDialog'));

  document.querySelectorAll('.quick-view-tab').forEach((tab) => {
    tab.addEventListener('click', () => setDialogView(tab.dataset.view));
  });

  el('dialogAddToBagBtn')?.addEventListener('click', () => {
    if (state.selectedProduct) addToBag(state.selectedProduct.id, true);
  });

  el('cartCheckoutBtn')?.addEventListener('click', () => {
    if (!state.cart.length) return;
    const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    el('cartDrawer')?.close();
    showToast(`Checkout stub · ${price(subtotal)}. Payment gateway simulation.`);
  });

  el('clearCartBtn')?.addEventListener('click', () => {
    state.cart = [];
    saveCart();
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

window.addEventListener('DOMContentLoaded', init);
