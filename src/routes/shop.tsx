import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";

import { ProductMedia } from "@/components/southern/Media";
import { useShop } from "@/components/southern/ShopProvider";
import { useRevealOnView } from "@/components/southern/useRevealOnView";
import { formatRating } from "@/lib/southern/format";
import { products } from "@/lib/southern/products";
import { realms } from "@/lib/southern/realms";
import { filterAndSortProducts, type SortOrder } from "@/lib/southern/catalog";
import type { ProductAudience } from "@/lib/southern/types";

interface ShopSearch {
  realm?: string;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch =>
    typeof search["realm"] === "string" && search["realm"] ? { realm: search["realm"] } : {},
  head: () => ({
    meta: [
      { title: "The Collection (Shop) — The Southern Edit" },
      {
        name: "description",
        content:
          "Shop all Dravidian artifacts — 17 modular garments and accessories from Tamil Nadu, Kerala, Karnataka, and Andhra & Telangana. GI certified handloom.",
      },
      { property: "og:title", content: "Shop The Collection — The Southern Edit" },
      {
        property: "og:description",
        content: "All artifacts together from the 4 Dravidian realms. Filter by realm, sort by price and relevance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { realm } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const { price, addToBag, openQuickView } = useShop();
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");
  const [audienceFilter, setAudienceFilter] = useState<ProductAudience | "all">("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const filter = realm ?? "all";

  const list = useMemo(
    () => filterAndSortProducts(products, filter, sortOrder, audienceFilter),
    [filter, sortOrder, audienceFilter],
  );
  useRevealOnView(gridRef, [list]);

  const filters = useMemo(() => {
    const bestsellers = products.filter((p) => p.isBestseller).length;
    return [
      { id: "all", label: `All Realms (${products.length})` },
      ...realms.map((r) => ({ id: r.id, label: `${r.name} (${products.filter((p) => p.stateId === r.id).length})` })),
      { id: "bestseller", label: `Bestsellers (${bestsellers})` },
    ];
  }, []);

  const audienceFilters = useMemo(
    () => [
      { id: "all" as const, label: `All styles (${products.length})` },
      { id: "men" as const, label: `Men (${products.filter((p) => p.audience === "men").length})` },
      { id: "women" as const, label: `Women (${products.filter((p) => p.audience === "women").length})` },
      { id: "unisex" as const, label: `Unisex (${products.filter((p) => p.audience === "unisex").length})` },
    ],
    [],
  );

  const setFilter = (id: string) =>
    navigate({ search: id === "all" ? {} : { realm: id }, replace: true, resetScroll: false });

  return (
    <section className="catalog-section" id="catalog" style={{ paddingTop: "calc(var(--header-h) + 2.5rem)" }}>
      <header className="chapter-head">
        <p className="section-eyebrow">Act IV · The Dravidian Collection</p>
        <h1 className="section-title">All Artifacts</h1>
        <p className="section-subtitle">
          Every piece from the 4 Southern realms gathered in one catalog — sorted by relevance, price, and realm
          collection.
        </p>
      </header>

      <div className="catalog-controls">
        <div className="catalog-filter-groups">
          <div className="catalog-filter-tags" aria-label="Filter by realm">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`catalog-filter-btn ${filter === item.id ? "active" : ""}`}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="catalog-filter-tags" aria-label="Filter by audience">
            {audienceFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`catalog-filter-btn ${audienceFilter === item.id ? "active" : ""}`}
                aria-pressed={audienceFilter === item.id}
                onClick={() => setAudienceFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <select
            className="nav-select"
            aria-label="Sort products"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <option value="featured">Sort: Featured &amp; Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div style={{ maxWidth: 1440, marginInline: "auto", paddingInline: "clamp(1rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
        <div className="shop-meta-bar">
          <span className="shop-count-badge">
            Showing {list.length} of {products.length} artifacts
          </span>
          <span>Direct loom pricing · Free pan-India delivery over ₹3,000</span>
        </div>
      </div>

      <div className="products-grid" ref={gridRef} role="region" aria-label="Product catalog">
        {list.length === 0 ? (
          <p className="empty-note">No pieces found for this selection.</p>
        ) : (
          list.map((product) => {
            const modes = product.stylingModes.length;
            return (
              <article className="product-card" key={product.id}>
                <div className="product-media-wrap" onClick={() => openQuickView(product.id)}>
                  <div className="product-media-layer is-main">
                    <ProductMedia product={product} kind="main" />
                  </div>
                  <div className="product-media-layer is-lookbook">
                    <ProductMedia product={product} kind="lookbook" />
                  </div>
                  <div className="product-badge-float">
                    <span className="badge-state">{product.stateName}</span>
                    {product.isBestseller && <span className="badge-bestseller">Bestseller</span>}
                  </div>
                  <button
                    type="button"
                    className="product-quick-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(product.id);
                    }}
                  >
                    Quick view
                  </button>
                </div>
                <div className="product-info-wrap">
                  <span className="product-gi-tag">{product.giTag}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-subtitle">{product.subtitle}</p>
                  <p className="product-rating">{formatRating(product.rating, product.reviewsCount)}</p>
                  {modes > 1 && <p className="product-multiwear-pill">{modes}-way modular</p>}
                  <div className="product-bottom-row">
                    <div>
                      <span className="product-price-current">{price(product.price)}</span>
                      <span className="product-price-original">{price(product.originalPrice)}</span>
                    </div>
                    <button
                      type="button"
                      className="product-add-btn"
                      aria-label={`Add ${product.name} to bag`}
                      onClick={() => addToBag(product.id)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
