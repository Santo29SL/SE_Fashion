import { escapeHtml } from './escape.js';

/**
 * Renders a photograph when a path is set, otherwise a labeled blank slot.
 * Drop files into /public and set the matching path on the product/realm later.
 */
export function mediaHTML({ path = '', slot = '', label = 'Photograph', extraClass = '' } = {}) {
  if (path) {
    return `<img class="media-fill ${extraClass}" src="${escapeHtml(path)}" alt="${escapeHtml(label)}" loading="lazy" />`;
  }

  return `
    <div class="media-placeholder ${extraClass}" data-slot="${escapeHtml(slot)}" role="img" aria-label="${escapeHtml(label)} — photograph not added yet">
      <span class="ph-kicker">Photograph slot</span>
      <strong class="ph-label">${escapeHtml(label)}</strong>
      <span class="ph-slot">${escapeHtml(slot || 'public/images/…')}</span>
    </div>
  `;
}

export function productMedia(product, kind = 'main') {
  const map = {
    main: { path: product.imageMain, slot: product.slots?.main, label: product.name },
    lookbook: { path: product.imageLookbook, slot: product.slots?.lookbook, label: `${product.name} lookbook` },
    detail: { path: product.imageDetail, slot: product.slots?.detail, label: `${product.name} craft detail` }
  };
  return mediaHTML(map[kind] || map.main);
}

export function realmMedia(realm, kind = 'moodboard') {
  const map = {
    moodboard: { path: realm.moodboard, slot: realm.slots?.moodboard, label: `${realm.name} moodboard` },
    lookbook: { path: realm.lookbookBg, slot: realm.slots?.lookbook, label: `${realm.name} lookbook` }
  };
  return mediaHTML(map[kind] || map.moodboard);
}
