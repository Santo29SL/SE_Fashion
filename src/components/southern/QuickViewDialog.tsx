import { useEffect, useRef, useState } from "react";

import { formatRating } from "@/lib/southern/format";
import type { ProductImageView } from "@/lib/southern/types";
import { ProductMedia, type ProductMediaKind } from "./Media";
import { useShop } from "./ShopProvider";
import { useModalDialog } from "./useModalDialog";

const TABS: { view: ProductMediaKind; label: string; id: string }[] = [
  { view: "main", label: "Product", id: "dialogTabCutout" },
  { view: "lookbook", label: "Lookbook", id: "dialogTabSlide" },
];

const DRAG_STEP_PX = 56;

/** Drag (or arrow-key) through a product's photographed angles; all frames are stacked so switching crossfades. */
function ProductTurntable({ name, views }: { name: string; views: ProductImageView[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragOrigin = useRef<{ x: number; index: number } | null>(null);
  const activeView = views[activeIndex];

  const wrap = (index: number) => ((index % views.length) + views.length) % views.length;
  const cycle = (step: number) => setActiveIndex((index) => wrap(index + step));

  if (!activeView) return null;

  return (
    <div className="product-turntable">
      <div
        className={`product-turntable-stage ${dragging ? "is-dragging" : ""}`}
        role="group"
        aria-roledescription="rotatable product viewer"
        aria-label={`${name} — drag or use arrow keys to change the view`}
        tabIndex={0}
        onPointerDown={(event) => {
          dragOrigin.current = { x: event.clientX, index: activeIndex };
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const origin = dragOrigin.current;
          if (!origin) return;
          const steps = Math.trunc((origin.x - event.clientX) / DRAG_STEP_PX);
          const next = wrap(origin.index + steps);
          if (next !== activeIndex) setActiveIndex(next);
        }}
        onPointerUp={() => {
          dragOrigin.current = null;
          setDragging(false);
        }}
        onPointerCancel={() => {
          dragOrigin.current = null;
          setDragging(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") cycle(1);
          if (event.key === "ArrowLeft") cycle(-1);
        }}
      >
        {views.map((view, i) => (
          <img
            key={view.src}
            className={`product-turntable-image ${i === activeIndex ? "is-active" : ""}`}
            src={view.src}
            alt={i === activeIndex ? `${name} — ${view.label} view` : ""}
            aria-hidden={i !== activeIndex}
            draggable={false}
          />
        ))}
        <span className="product-turntable-hint" aria-hidden="true">
          ⟵ Drag to turn ⟶
        </span>
      </div>
      <div className="product-turntable-controls">
        <button type="button" aria-label="Previous product view" onClick={() => cycle(-1)}>
          ←
        </button>
        <div className="product-turntable-thumbs" role="tablist" aria-label="Product views">
          {views.map((view, i) => (
            <button
              key={view.src}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              className={`product-turntable-thumb ${i === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={view.src} alt="" loading="lazy" />
              <span>{view.label}</span>
            </button>
          ))}
        </div>
        <button type="button" aria-label="Next product view" onClick={() => cycle(1)}>
          →
        </button>
      </div>
    </div>
  );
}

export function QuickViewDialog() {
  const { quickViewProduct: prod, closeQuickView, price, addToBag } = useShop();
  const { ref, onBackdropClick } = useModalDialog(prod !== null, closeQuickView);
  const [view, setView] = useState<ProductMediaKind>("main");

  useEffect(() => {
    setView("main");
  }, [prod]);

  return (
    <dialog
      ref={ref}
      id="quickViewDialog"
      className="quick-view-dialog"
      aria-labelledby="dialogProductName"
      onClick={onBackdropClick}
    >
      {prod && (
        <div className="quick-view-inner">
          <div className="quick-view-media">
            <div className="quick-view-stage" id="dialogProductStage">
              {view === "lookbook" && prod.imageViews && prod.imageViews.length > 1 ? (
                <ProductTurntable key={prod.id} name={prod.name} views={prod.imageViews} />
              ) : (
                <ProductMedia product={prod} kind={view} />
              )}
            </div>
            <div className="quick-view-slide-toggle-bar">
              {TABS.map((tab) => (
                <button
                  key={tab.view}
                  type="button"
                  id={tab.id}
                  className={`quick-view-tab ${view === tab.view ? "active" : ""}`}
                  onClick={() => setView(tab.view)}
                >
                  {tab.label}
                  {tab.view === "lookbook" && prod.imageViews && prod.imageViews.length > 1 && (
                    <span className="quick-view-tab-count"> · {prod.imageViews.length} views</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="quick-view-details">
            <button type="button" className="dialog-close-btn" aria-label="Close" onClick={closeQuickView}>
              ✕
            </button>
            <span className="product-gi-tag">{prod.giTag}</span>
            <h3 className="product-name" id="dialogProductName">
              {prod.name}
            </h3>
            <p className="product-subtitle">{prod.subtitle}</p>
            <p className="dialog-rating">{formatRating(prod.rating, prod.reviewsCount)}</p>
            <div className="dialog-price-row">
              <span className="product-price-current">{price(prod.price)}</span>
              <span className="product-price-original">{price(prod.originalPrice)}</span>
            </div>
            <p className="dialog-copy">{prod.description}</p>
            <blockquote className="craft-story">{prod.craftStory}</blockquote>
            {prod.stylingModes.length > 0 && (
              <div className="multiwear-suggestions">
                <p className="multiwear-title">Ways to wear</p>
                <ul>
                  {prod.stylingModes.map((mode) => (
                    <li key={mode.name}>
                      <strong>{mode.name}</strong>
                      <span>{mode.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="palette-label">Colourway · {prod.colors[0]?.name}</p>
            <dl className="spec-grid">
              <div>
                <dt>Materials</dt>
                <dd>{prod.specifications.material}</dd>
              </div>
              <div>
                <dt>Hardware</dt>
                <dd>{prod.specifications.hardware || "Antiqued brass"}</dd>
              </div>
              <div>
                <dt>Origin</dt>
                <dd>{prod.specifications.origin}</dd>
              </div>
            </dl>
            <button
              type="button"
              className="btn-primary full"
              onClick={() => addToBag(prod.id, { fromModal: true })}
            >
              Add to bag · <span>{price(prod.price)}</span>
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
