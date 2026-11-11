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

function ProductTurntable({ name, views }: { name: string; views: ProductImageView[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const activeView = views[activeIndex];

  const cycle = (step: number) => {
    setActiveIndex((index) => (index + step + views.length) % views.length);
  };

  if (!activeView) return null;

  return (
    <div className="product-turntable">
      <div
        className="product-turntable-stage"
        role="group"
        aria-label={`${name} rotatable product views`}
        tabIndex={0}
        onPointerDown={(event) => {
          dragStartX.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (dragStartX.current === null) return;
          const delta = event.clientX - dragStartX.current;
          const steps = Math.max(1, Math.floor(Math.abs(delta) / 48));
          if (Math.abs(delta) > 20) cycle(delta < 0 ? steps : -steps);
          dragStartX.current = null;
        }}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") cycle(1);
          if (event.key === "ArrowLeft") cycle(-1);
        }}
      >
        <img className="product-turntable-image" src={activeView.src} alt={`${name} — ${activeView.label} view`} draggable={false} />
        <span className="product-turntable-hint">Drag to rotate</span>
      </div>
      <div className="product-turntable-controls">
        <button type="button" aria-label="Previous product view" onClick={() => cycle(-1)}>
          ←
        </button>
        <span aria-live="polite">
          {activeView.label} · {String(activeIndex + 1).padStart(2, "0")} / {String(views.length).padStart(2, "0")}
        </span>
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
