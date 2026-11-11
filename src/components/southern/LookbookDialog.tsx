import { useEffect, useRef, type CSSProperties } from "react";

import { getProductsByRealm } from "@/lib/southern/products";
import { realms } from "@/lib/southern/realms";
import { createThrowDeck } from "@/lib/southern/throwDeck";
import { useShop } from "./ShopProvider";
import { useModalDialog } from "./useModalDialog";

/** Realm "flash card" lookbook, driven by the original throw-deck engine. */
export function LookbookDialog() {
  const { lookbookRealmId, closeLookbook, price, addToBag } = useShop();
  const realm = realms.find((r) => r.id === lookbookRealmId) ?? null;
  const { ref, onBackdropClick } = useModalDialog(realm !== null, closeLookbook);
  const stageRef = useRef<HTMLDivElement>(null);
  const handlers = useRef({ price, addToBag, closeLookbook });
  handlers.current = { price, addToBag, closeLookbook };

  useEffect(() => {
    const stage = stageRef.current;
    const dialog = ref.current;
    if (!realm || !stage || !dialog) return;

    dialog.classList.remove("is-split-view");
    const { price: fmt } = handlers.current;
    const cards = getProductsByRealm(realm.id).map((p) => ({
      id: p.id,
      title: p.name,
      subtitle: p.subtitle,
      price: fmt(p.price),
      image: p.imageLookbook || p.imageMain,
      description: p.description,
      specs: [
        { label: "Origin", value: p.specifications.origin?.split(",")[0] || p.stateName },
        { label: "Material", value: p.specifications.material?.split("&")[0] || "Handloom" },
        { label: "Hardware", value: p.specifications.hardware?.split(" ")[0] || "Solid Brass" },
        { label: "GI Status", value: p.giTag ? "GI Certified" : "Heritage Craft" },
      ],
      product: p,
    }));

    const deck = createThrowDeck(stage, {
      cards,
      accent: realm.accentColor,
      actionLabel: "Add to bag",
      onAction: (card: { id: string }) => {
        handlers.current.addToBag(card.id);
        handlers.current.closeLookbook();
      },
      onSplitChange: (isSplit: boolean) => {
        dialog.classList.toggle("is-split-view", isSplit);
      },
      formatPriceFn: fmt,
    });

    return () => {
      deck?.destroy();
      dialog.classList.remove("is-split-view");
      stage.innerHTML = "";
    };
  }, [realm, ref]);

  return (
    <dialog
      ref={ref}
      id="lookbookDeckDialog"
      className="lookbook-deck-dialog"
      aria-labelledby="lookbookDeckTitle"
      onClick={onBackdropClick}
    >
      <div
        className="lookbook-deck-header"
        style={realm ? ({ "--realm-accent": realm.accentColor } as CSSProperties) : undefined}
      >
        {realm?.moodboard ? (
          <img className="lookbook-deck-underlay" src={realm.moodboard} alt="" aria-hidden="true" />
        ) : null}
        <div className="lookbook-deck-meta">
          <span>{realm ? `${realm.native} · Lookbook` : "Lookbook"}</span>
          <button type="button" className="lookbook-deck-close" aria-label="Close lookbook" onClick={closeLookbook}>
            ✕
          </button>
        </div>
        <h3 className="lookbook-deck-title" id="lookbookDeckTitle">
          {realm ? realm.name : "Flash Card Deck"}
        </h3>
        <p className="lookbook-deck-eyebrow">{realm ? realm.tagline : "Realm artifacts"}</p>
      </div>
      <div className="lookbook-deck-body" ref={stageRef} />
    </dialog>
  );
}
