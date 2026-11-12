// @ts-nocheck -- ported verbatim from the original vanilla JS throw-deck engine
/**
 * @description: Throw Deck Engine (Vanilla JS implementation of KokonutUI Throw Deck v2.0.0)
 * Physics-driven interactive card stack with spring dynamics, velocity-based fling/throw,
 * apex z-index swapping, pointer capture, and modal product detail popups.
 */

import { escapeHtml } from './escape';

const TILTS = [0, -2, 1.5, -1];
const SLOT_Y = 9;
const SLOT_SCALE = 0.035;
const MAX_SLOT = TILTS.length - 1;

const MAX_DRAG_ROTATION = 18;
const THROW_VELOCITY = 0.5;
const THROW_DISTANCE = 0.35;
const TAP_SLOP = 5;
const VELOCITY_WINDOW = 90;

const HOME = { k: 420, c: 30 };
const FLIGHT = { k: 150, c: 15 };
const RETURN = { k: 240, c: 26 };
const TOP_Z = 1000;

function slotPose(depth) {
  const d = Math.min(depth, MAX_SLOT);
  return { x: 0, y: d * SLOT_Y, r: TILTS[d] ?? 0, s: 1 - d * SLOT_SCALE };
}

function lerpPose(a, b, t) {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    r: a.r + (b.r - a.r) * t,
    s: a.s + (b.s - a.s) * t,
  };
}

function poseTransform({ x, y, r, s }) {
  return `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${r.toFixed(3)}deg) scale(${s.toFixed(4)})`;
}

function makeBody(depth) {
  const pose = slotPose(depth);
  return {
    ...pose,
    vx: 0,
    vy: 0,
    vr: 0,
    vs: 0,
    phase: 'rest', // 'rest' | 'drag' | 'out' | 'return'
    out: pose,
    dx: 1,
    dy: 0,
    z: null,
    apexZ: null,
  };
}

function springAxis(value, velocity, target, spring, dt) {
  const accel = -spring.k * (value - target) - spring.c * velocity;
  const v = velocity + accel * dt;
  return [value + v * dt, v];
}

function stepBody(body, target, dt) {
  let spring = HOME;
  if (body.phase === 'out') {
    spring = FLIGHT;
  } else if (body.phase === 'return') {
    spring = RETURN;
  }
  const steps = Math.max(1, Math.ceil(dt * 240));
  const h = dt / steps;
  for (let i = 0; i < steps; i++) {
    [body.x, body.vx] = springAxis(body.x, body.vx, target.x, spring, h);
    [body.y, body.vy] = springAxis(body.y, body.vy, target.y, spring, h);
    [body.r, body.vr] = springAxis(body.r, body.vr, target.r, spring, h);
    [body.s, body.vs] = springAxis(body.s, body.vs, target.s, spring, h);
  }
}

function isSettled(body, target) {
  return (
    Math.abs(body.x - target.x) < 0.1 &&
    Math.abs(body.y - target.y) < 0.1 &&
    Math.abs(body.r - target.r) < 0.02 &&
    Math.abs(body.s - target.s) < 0.0005 &&
    Math.abs(body.vx) + Math.abs(body.vy) < 2 &&
    Math.abs(body.vr) < 1 &&
    Math.abs(body.vs) < 0.01
  );
}

function clearance(w, h, ux, uy) {
  const along = Math.min(
    ux === 0 ? Number.POSITIVE_INFINITY : w / Math.abs(ux),
    uy === 0 ? Number.POSITIVE_INFINITY : h / Math.abs(uy)
  );
  return along + 24;
}

function releaseVelocity(samples) {
  const last = samples[samples.length - 1];
  const first = samples.find(
    (sample) => last && last.t - sample.t <= VELOCITY_WINDOW
  );
  if (!(first && last) || last.t - first.t < 8) {
    return { vx: 0, vy: 0 };
  }
  const dt = last.t - first.t;
  return { vx: (last.x - first.x) / dt, vy: (last.y - first.y) / dt };
}

function cardState(phase) {
  if (phase === 'drag') return 'drag';
  return phase === 'rest' ? 'rest' : 'fly';
}

/**
 * Creates and mounts a Throw Deck in the given container
 */
export interface ThrowDeckCard {
  id: string;
  title: string;
  subtitle: string;
  price?: string;
  image: string;
  description: string;
  specs?: { label: string; value: string }[];
  [key: string]: unknown;
}

export interface ThrowDeckOptions {
  cards?: ThrowDeckCard[];
  accent?: string;
  actionLabel?: string;
  onAction?: ((card: ThrowDeckCard) => void) | null;
  onChange?: ((card: ThrowDeckCard) => void) | null;
  onSplitChange?: ((isSplit: boolean) => void) | null;
  formatPriceFn?: (value: number) => string;
}

export interface ThrowDeckHandle {
  cycle: (direction: 1 | -1) => void;
  openDetail: (card: ThrowDeckCard) => void;
  closeDetail: () => void;
  destroy: () => void;
}

export function createThrowDeck(container: HTMLElement, {
  cards = [],
  accent = '#9e3d2a',
  actionLabel = 'Add to bag',
  onAction = null,
  onChange = null,
  onSplitChange = null,
  formatPriceFn = (val) => `₹${val}`
}: ThrowDeckOptions = {}): ThrowDeckHandle | null {
  if (!container || !cards.length) return null;

  const count = cards.length;
  let order = cards.map((_, i) => i);
  let bodies = cards.map((_, i) => makeBody(i));
  let nodes = [];
  let drag = null;
  let progress = 0;
  let rafId = 0;
  let lastTime = 0;
  let suppressClick = false;
  let activeOpenId = null;
  let isDetailOpen = false;

  // Build DOM Structure with Split-Screen Architecture
  container.innerHTML = `
    <div class="throw-deck-wrap" style="--deck-accent:${escapeHtml(accent)}">
      <div class="throw-deck-split-layout">
        <!-- LEFT PANE: Flash card deck -->
        <div class="throw-deck-left-col">
          <div class="throw-deck-kicker">
            <span>Interactive deck · Click card to inspect</span>
          </div>

          <section class="throw-deck-stage" aria-label="Card deck. Drag a card away or use arrow keys to cycle.">
            ${cards.map((card, index) => `
              <button
                type="button"
                class="throw-deck-card"
                data-index="${index}"
                data-id="${escapeHtml(card.id)}"
                data-state="rest"
                aria-label="${escapeHtml(card.title)}, ${escapeHtml(card.subtitle)}. Open details"
              >
                <div class="throw-deck-card-inner">
                  <div class="throw-deck-card-art">
                    <img class="throw-deck-product-image" src="${escapeHtml(card.image)}" alt="${escapeHtml(card.title)}" draggable="false" />
                  </div>
                  <div class="throw-deck-card-footer">
                    <div class="throw-deck-card-text">
                      <span class="throw-deck-card-title">${escapeHtml(card.title)}</span>
                      <span class="throw-deck-card-subtitle">${escapeHtml(card.subtitle)}</span>
                    </div>
                    ${card.price ? `<span class="throw-deck-card-price">${escapeHtml(card.price)}</span>` : ''}
                  </div>
                </div>
              </button>
            `).join('')}
          </section>

          <div class="throw-deck-controls">
            <button type="button" class="throw-deck-nav-btn prev" aria-label="Previous card">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <p class="throw-deck-counter" aria-live="polite">
              <span class="throw-deck-current-num">01</span> / <span class="throw-deck-total-num">${String(count).padStart(2, '0')}</span>
              <span class="sr-only throw-deck-sr-title">: ${escapeHtml(cards[0]?.title || '')}</span>
            </p>
            <button type="button" class="throw-deck-nav-btn next" aria-label="Next card">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- RIGHT PANE: Split-screen Pop-out Details Box -->
        <aside class="throw-deck-right-col" hidden aria-label="Artifact Flash Details">
          <div class="throw-deck-detail-box">
            <!-- Populated dynamically when opened -->
          </div>
        </aside>
      </div>
    </div>
  `;

  const wrapEl = container.querySelector('.throw-deck-wrap');
  const stageEl = container.querySelector('.throw-deck-stage');
  const rightCol = container.querySelector('.throw-deck-right-col');
  const detailBox = container.querySelector('.throw-deck-detail-box');
  const prevBtn = container.querySelector('.throw-deck-nav-btn.prev');
  const nextBtn = container.querySelector('.throw-deck-nav-btn.next');
  const currentNumEl = container.querySelector('.throw-deck-current-num');
  const srTitleEl = container.querySelector('.throw-deck-sr-title');

  nodes = Array.from(stageEl.querySelectorAll('.throw-deck-card'));

  function write(index, depth) {
    const node = nodes[index];
    const body = bodies[index];
    if (!node || !body) return;
    node.style.transform = poseTransform(body);
    node.style.zIndex = String(body.z ?? (order.length - depth));
    const state = cardState(body.phase);
    if (node.dataset.state !== state) {
      node.dataset.state = state;
    }
  }

  function targetFor(body, depth) {
    if (body.phase === 'out') return body.out;
    const pose = slotPose(depth);
    if (depth > 0 && progress > 0) {
      return lerpPose(pose, slotPose(depth - 1), progress * 0.6);
    }
    return pose;
  }

  function advance(index, depth, dt) {
    const body = bodies[index];
    if (!body) return false;
    if (body.phase === 'drag') {
      write(index, depth);
      return true;
    }
    const target = targetFor(body, depth);
    stepBody(body, target, dt);

    // Top of the arc: card stops travelling outward, flips z-index behind deck and heads home
    if (body.phase === 'out' && (body.vx * body.dx + body.vy * body.dy) <= 0) {
      body.phase = 'return';
      body.z = body.apexZ;
    }

    const settled = isSettled(body, target);
    if (settled && body.phase !== 'out') {
      body.phase = 'rest';
      body.z = null;
    }
    write(index, depth);
    return !settled;
  }

  function tick(now) {
    const dt = Math.min((now - lastTime) / 1000, 1 / 30);
    lastTime = now;
    let active = false;
    order.forEach((index, depth) => {
      if (advance(index, depth, dt)) {
        active = true;
      }
    });
    rafId = active ? requestAnimationFrame(tick) : 0;
  }

  function kick() {
    if (rafId) return;
    lastTime = performance.now();
    rafId = requestAnimationFrame(tick);
  }

  function commitOrder(next) {
    order = next;
    const topCardIdx = next[0] ?? 0;
    const topCard = cards[topCardIdx];

    // Update counter
    currentNumEl.textContent = String(topCardIdx + 1).padStart(2, '0');
    srTitleEl.textContent = `: ${topCard?.title || ''}`;

    // Update aria attributes, tabindex, and highlight states
    nodes.forEach((node, i) => {
      const isTop = (i === topCardIdx);
      node.tabIndex = isTop ? 0 : -1;
      node.setAttribute('aria-hidden', String(!isTop));
      if (isTop) {
        node.classList.add('is-top');
        if (isDetailOpen) {
          node.classList.add('is-selected');
        } else {
          node.classList.remove('is-selected');
        }
      } else {
        node.classList.remove('is-top');
        node.classList.remove('is-selected');
      }
    });

    if (isDetailOpen && topCard) {
      renderDetail(topCard, true);
    }

    if (topCard) onChange?.(topCard);
    kick();
  }

  function throwTop(vx, vy, fx, fy) {
    const current = order;
    const index = current[0];
    if (index === undefined || current.length < 2) return;
    const body = bodies[index];
    const node = nodes[index];
    if (!body) return;

    const speed = Math.hypot(vx, vy);
    const rawX = speed > 0.05 ? vx : fx;
    const rawY = speed > 0.05 ? vy : fy;
    const norm = Math.hypot(rawX, rawY) || 1;
    const ux = rawX / norm;
    const uy = rawY / norm;
    const w = node?.offsetWidth || 256;
    const h = node?.offsetHeight || 320;
    const distance = clearance(w, h, ux, uy) + Math.min(speed * 50, 90);
    const launch = Math.max(speed, 0.9) * 1000;

    body.phase = 'out';
    body.dx = ux;
    body.dy = uy;
    body.out = {
      x: ux * distance,
      y: uy * distance,
      r: Math.max(-40, Math.min(40, body.r + ux * 26)),
      s: 1,
    };
    body.vx = ux * launch;
    body.vy = uy * launch;
    body.vr += ux * launch * 0.05;
    body.z = TOP_Z;
    body.apexZ = null;

    commitOrder([...current.slice(1), index]);
  }

  function bringBack() {
    const current = order;
    const index = current[current.length - 1];
    if (index === undefined || current.length < 2) return;
    const body = bodies[index];
    const node = nodes[index];
    if (!body) return;

    const ux = -0.97;
    const uy = -0.24;
    const w = node?.offsetWidth || 256;
    const h = node?.offsetHeight || 320;
    const distance = clearance(w, h, ux, uy) + 20;

    body.phase = 'out';
    body.dx = ux;
    body.dy = uy;
    body.out = { x: ux * distance, y: uy * distance, r: -16, s: 1 };
    body.vx = ux * 1100;
    body.vy = uy * 1100;
    body.z = 0;
    body.apexZ = TOP_Z - 1;

    commitOrder([index, ...current.slice(0, -1)]);
  }

  function cycle(direction) {
    if (direction === 1) {
      throwTop(1.3, -0.35, 1, 0);
    } else {
      bringBack();
    }
  }

  // Pointer Gesture Listeners
  function handlePointerDown(event, index) {
    suppressClick = false;
    if (drag || order[0] !== index) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const body = bodies[index];
    if (!body) return;
    const node = nodes[index];
    const rect = node.getBoundingClientRect();
    node.setPointerCapture(event.pointerId);

    drag = {
      pointerId: event.pointerId,
      index,
      startX: event.clientX,
      startY: event.clientY,
      baseX: body.x,
      baseY: body.y,
      width: node.offsetWidth,
      lever: event.clientY - rect.top < rect.height / 2 ? 1 : -1,
      moved: false,
      samples: [{ t: event.timeStamp, x: event.clientX, y: event.clientY }]
    };
  }

  function handlePointerMove(event) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (!drag.moved) {
      if (Math.hypot(dx, dy) < TAP_SLOP) return;
      // Axis lock for mobile touch: natural vertical page scroll takes over
      if (event.pointerType !== 'mouse' && Math.abs(dy) > Math.abs(dx)) {
        const node = nodes[drag.index];
        if (node && node.hasPointerCapture(event.pointerId)) {
          node.releasePointerCapture(event.pointerId);
        }
        drag = null;
        return;
      }
    }

    const body = bodies[drag.index];
    if (!body) return;

    drag.moved = true;
    drag.samples.push({ t: event.timeStamp, x: event.clientX, y: event.clientY });
    if (drag.samples.length > 24) drag.samples.shift();

    body.phase = 'drag';
    body.x = drag.baseX + dx;
    body.y = drag.baseY + dy;
    body.s = 1;
    body.r = Math.max(-1, Math.min(1, body.x / drag.width)) * MAX_DRAG_ROTATION * drag.lever;
    body.vx = 0;
    body.vy = 0;
    body.vr = 0;
    body.vs = 0;

    progress = Math.min(
      Math.hypot(body.x, body.y) / (drag.width * THROW_DISTANCE),
      1
    );
    kick();
  }

  function handlePointerUp(event, cancelled = false) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const currentDrag = drag;
    drag = null;
    progress = 0;

    const body = bodies[currentDrag.index];
    if (!body || !currentDrag.moved) {
      kick();
      return;
    }

    if (cancelled) {
      body.phase = 'rest';
      kick();
      return;
    }

    suppressClick = true;
    const { vx, vy } = releaseVelocity(currentDrag.samples);
    const speed = Math.hypot(vx, vy);
    const distance = Math.hypot(body.x, body.y);
    const heading = distance > 0 ? (vx * body.x + vy * body.y) / distance : 0;
    const fast = speed > THROW_VELOCITY && heading > -0.2;
    const far = distance > currentDrag.width * THROW_DISTANCE && heading > -0.3;

    if (fast || far) {
      throwTop(vx, vy, body.x / (distance || 1), body.y / (distance || 1));
      return;
    }

    // Spring back home, carrying release velocity
    body.phase = 'rest';
    body.vx = vx * 1000;
    body.vy = vy * 1000;
    body.vr = ((vx * 1000) / currentDrag.width) * MAX_DRAG_ROTATION * currentDrag.lever;
    kick();
  }

  function handleKeyDown(event) {
    suppressClick = false;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      cycle(1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      cycle(-1);
    }
  }

  // Bind card listeners
  nodes.forEach((node, index) => {
    node.addEventListener('pointerdown', (e) => handlePointerDown(e, index));
    node.addEventListener('pointermove', handlePointerMove);
    node.addEventListener('pointerup', (e) => handlePointerUp(e));
    node.addEventListener('pointercancel', (e) => handlePointerUp(e, true));
    node.addEventListener('lostpointercapture', (e) => handlePointerUp(e, true));
    node.addEventListener('keydown', handleKeyDown);

    node.addEventListener('click', () => {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      const pos = order.indexOf(index);
      if (pos === 0) {
        openDetail(cards[index]);
      } else if (pos > 0) {
        // Bring clicked card to top and open split detail
        const nextOrder = [...order.slice(pos), ...order.slice(0, pos)];
        commitOrder(nextOrder);
        openDetail(cards[index]);
      }
    });
  });

  // Controls click listeners
  prevBtn?.addEventListener('click', () => cycle(-1));
  nextBtn?.addEventListener('click', () => cycle(1));

  // -------------------------------------------------------------
  // Pop Details Split View Implementation
  // -------------------------------------------------------------
  function openDetail(card) {
    if (!card) return;
    activeOpenId = card.id;
    isDetailOpen = true;

    wrapEl.classList.add('has-split');
    const dialogEl = container.closest('dialog');
    if (dialogEl) {
      dialogEl.classList.add('is-split-view');
    }
    onSplitChange?.(true);

    rightCol.hidden = false;
    rightCol.classList.remove('is-closing');

    // Highlight top card in stack
    const topCardIdx = order[0] ?? 0;
    nodes.forEach((node, i) => {
      if (i === topCardIdx) {
        node.classList.add('is-selected');
      } else {
        node.classList.remove('is-selected');
      }
    });

    renderDetail(card, false);
  }

  function renderDetail(card, isUpdate = false) {
    if (!card) return;
    activeOpenId = card.id;

    if (isUpdate) {
      detailBox.classList.add('is-updating');
    }

    detailBox.innerHTML = `
      <div class="throw-deck-detail-top">
        <div class="throw-deck-detail-tag">
          <span class="detail-tag-dot"></span>
          <span class="detail-tag-text">ARTIFACT FLASH DETAIL</span>
        </div>
        <button type="button" class="throw-deck-detail-close-btn" aria-label="Close detail pane">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="throw-deck-detail-main">
        <div class="throw-deck-detail-info">
          <div class="throw-deck-detail-header">
            <div class="throw-deck-detail-titles">
              <h3 class="throw-deck-detail-title">${escapeHtml(card.title)}</h3>
              <p class="throw-deck-detail-subtitle">${escapeHtml(card.subtitle)}</p>
            </div>
            ${card.price ? `<div class="throw-deck-detail-price">${escapeHtml(card.price)}</div>` : ''}
          </div>

          <p class="throw-deck-detail-desc">${escapeHtml(card.description)}</p>

          ${card.specs && card.specs.length ? `
            <div class="throw-deck-detail-specs">
              ${card.specs.map(spec => `
                <div class="throw-deck-detail-spec-item">
                  <span class="spec-label">${escapeHtml(spec.label)}</span>
                  <span class="spec-value">${escapeHtml(spec.value)}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>

      <div class="throw-deck-detail-footer">
        <button type="button" class="throw-deck-detail-action-btn" data-action="deck-add">
          <span>${escapeHtml(actionLabel)}</span>
          <span class="action-btn-sep">·</span>
          <span>${escapeHtml(card.price || '')}</span>
        </button>
      </div>
    `;

    if (isUpdate) {
      requestAnimationFrame(() => {
        detailBox.classList.remove('is-updating');
      });
    }

    // Close button
    const closeBtn = detailBox.querySelector('.throw-deck-detail-close-btn');
    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDetail();
    });

    // Add to bag button
    const actionBtn = detailBox.querySelector('[data-action="deck-add"]');
    actionBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      onAction?.(card);
    });
  }

  function closeDetail() {
    if (!isDetailOpen) return;
    isDetailOpen = false;
    activeOpenId = null;

    wrapEl.classList.remove('has-split');
    const dialogEl = container.closest('dialog');
    if (dialogEl) {
      dialogEl.classList.remove('is-split-view');
    }
    onSplitChange?.(false);

    nodes.forEach(node => node.classList.remove('is-selected'));

    rightCol.classList.add('is-closing');
    setTimeout(() => {
      if (!isDetailOpen) {
        rightCol.hidden = true;
        rightCol.classList.remove('is-closing');
      }
    }, 220);

    // Return focus to top card
    const topIdx = order[0] ?? 0;
    nodes[topIdx]?.focus({ preventScroll: true });
  }

  function handleGlobalKeyDown(e) {
    if (e.key === 'Escape' && isDetailOpen) {
      e.preventDefault();
      e.stopPropagation();
      closeDetail();
    }
  }

  window.addEventListener('keydown', handleGlobalKeyDown);

  // Initial layout write and kick
  commitOrder(order);

  return {
    cycle,
    openDetail,
    closeDetail,
    openModal: openDetail,
    closeModal: closeDetail,
    destroy() {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', handleGlobalKeyDown);
      closeDetail();
    }
  };
}
