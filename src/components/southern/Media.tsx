import type { Product, Realm } from "@/lib/southern/types";

interface MediaProps {
  path?: string | undefined;
  slot?: string | undefined;
  label?: string;
  extraClass?: string;
}

/** Renders a photograph when a path is set, otherwise a labeled blank slot. */
export function Media({ path = "", slot = "", label = "Photograph", extraClass = "" }: MediaProps) {
  if (path) {
    return <img className={`media-fill ${extraClass}`} src={path} alt={label} loading="lazy" />;
  }
  return (
    <div
      className={`media-placeholder ${extraClass}`}
      data-slot={slot}
      role="img"
      aria-label={`${label} — photograph not added yet`}
    >
      <span className="ph-kicker">Photograph slot</span>
      <strong className="ph-label">{label}</strong>
      <span className="ph-slot">{slot || "public/images/…"}</span>
    </div>
  );
}

export type ProductMediaKind = "main" | "lookbook" | "detail";

export function ProductMedia({ product, kind = "main" }: { product: Product; kind?: ProductMediaKind }) {
  if (kind === "lookbook") {
    return <Media path={product.imageLookbook} slot={product.slots.lookbook} label={`${product.name} lookbook`} />;
  }
  if (kind === "detail") {
    return <Media path={product.imageDetail} slot={product.slots.detail} label={`${product.name} craft detail`} />;
  }
  return <Media path={product.imageMain} slot={product.slots.main} label={product.name} />;
}

export function RealmMedia({ realm }: { realm: Realm }) {
  return <Media path={realm.moodboard} slot={realm.slots.moodboard} label={`${realm.name} moodboard`} />;
}
