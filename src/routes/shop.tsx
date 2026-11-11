import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState, type CSSProperties } from "react";

import { PageCover } from "@/components/southern/Editorial";
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

const GI_RIBBON = [
  "Kanchipuram silk GI",
  "Balaramapuram kasavu",
  "Mysore crepe silk",
  "Pochampally ikat GI",
  "Srikalahasti kalamkari",
  "Bhavani jamakkalam",
  "Athangudi tile",
];

const AUDIENCES: { id: ProductAudience | "all"; label: string }[] = [
  { id: "all", label: "All styles" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "unisex", label: "Unisex" },
];

const catalogNumber = (id: string) => String(products.findIndex((p) => p.id === id) + 1).padStart(2, "0");

function ShopPage() {
  const { realm } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const { price, addToBag, openQuickView } = useShop();
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");
  const [audienceFilter, setAudienceFilter] = useState<ProductAudience | "all">("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  const filter = realm ?? "all";

  const list = useMemo(
    () => filterAndSortProducts(products, filter, sortOrder, audienceFilter),
    [filter, sortOrder, audienceFilter],
  );
  useRevealOnView(gridRef, [list]);
  useRevealOnView(pageRef);

  const realmIndex = useMemo(
    () => [
      { id: "all", no: "00", name: "All realms", native: "நான்கு · four", count: products.length, accent: undefined },
      ...realms.map((r, i) => ({
        id: r.id,
        no: String(i + 1).padStart(2, "0"),
        name: r.name,
        native: r.native,
        count: products.filter((p) => p.stateId === r.id).length,
        accent: r.accentColor,
      })),
      {
        id: "bestseller",
        no: "✦",
        name: "Bestsellers",
        native: "Most loved",
        count: products.filter((p) => p.isBestseller).length,
        accent: undefined,
      },
    ],
    [],
  );

  const accentFor = (stateId: string) => realms.find((r) => r.id === stateId)?.accentColor;

  const setFilter = (id: string) =>
    navigate({ search: id === "all" ? {} : { realm: id }, replace: true, resetScroll: false });

  return (
    <>
      <PageCover
        act="Act IV · The Collection"
        meta={`${products.length} artifacts · ${realms.length} realms`}
        lines={["The", "Collection."]}
        tag="Loom to wardrobe."
        sub="Every piece from the four Southern realms in one catalog — GI-certified handloom, cut into modular clothing you can wear more than one way."
        ribbon={GI_RIBBON}
      />

      <section className="catalog-section" id="catalog" ref={pageRef}>
        <nav className="realm-index reveal-on-view" aria-label="Filter by realm">
          {realmIndex.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`realm-index-item ${filter === item.id ? "active" : ""}`}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              style={item.accent ? ({ "--realm-accent": item.accent } as CSSProperties) : undefined}
            >
              <span className="realm-index-no">{item.no}</span>
              <span className="realm-index-name">{item.name}</span>
              <span className="realm-index-native">
                {item.native} <sup>{item.count}</sup>
              </span>
            </button>
          ))}
        </nav>

        <div className="catalog-toolbar reveal-on-view">
          <div className="catalog-audience" role="group" aria-label="Filter by audience">
            {AUDIENCES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`catalog-audience-btn ${audienceFilter === item.id ? "active" : ""}`}
                aria-pressed={audienceFilter === item.id}
                onClick={() => setAudienceFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="catalog-toolbar-end">
            <span className="catalog-count">
              Showing <strong>{list.length}</strong> of {products.length}
            </span>
            <select
              className="nav-select"
              aria-label="Sort products"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="products-grid" ref={gridRef} role="region" aria-label="Product catalog">
          {list.length === 0 ? (
            <p className="empty-note">No pieces found for this selection.</p>
          ) : (
            list.map((product, i) => {
              const modes = product.stylingModes.length;
              const views = product.imageViews ?? [];
              const altView = views[1]?.src;
              return (
                <article
                  className="product-card"
                  key={product.id}
                  style={{ "--d": i % 4, "--realm-accent": accentFor(product.stateId) } as CSSProperties}
                >
                  <div className="product-media-wrap" onClick={() => openQuickView(product.id)}>
                    <div className="product-media-layer is-main">
                      <ProductMedia product={product} kind="main" />
                    </div>
                    <div className="product-media-layer is-lookbook">
                      {altView ? (
                        <img className="media-fill" src={altView} alt="" loading="lazy" aria-hidden="true" />
                      ) : (
                        <ProductMedia product={product} kind="lookbook" />
                      )}
                    </div>
                    {product.isBestseller && (
                      <div className="product-badge-float">
                        <span className="badge-bestseller">Bestseller</span>
                      </div>
                    )}
                    {views.length > 1 && <span className="product-views-badge">↻ {views.length} views</span>}
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
                    <div className="product-card-meta">
                      <span>No. {catalogNumber(product.id)}</span>
                      <span>{product.stateName}</span>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-subtitle">{product.subtitle}</p>
                    <p className="product-card-tags">
                      <span>{product.giTag}</span>
                      {modes > 1 && <span>{modes}-way modular</span>}
                    </p>
                    <p className="product-rating">{formatRating(product.rating, product.reviewsCount)}</p>
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
                        Add +
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <ul className="catalog-promise">
          <li className="reveal-on-view" style={{ "--d": 0 } as CSSProperties}>
            <span className="catalog-promise-no">01</span>
            <strong>Direct loom pricing</strong>
            <span>No wholesalers between the weaver and you.</span>
          </li>
          <li className="reveal-on-view" style={{ "--d": 1 } as CSSProperties}>
            <span className="catalog-promise-no">02</span>
            <strong>Free pan-India delivery</strong>
            <span>On every bag over ₹3,000.</span>
          </li>
          <li className="reveal-on-view" style={{ "--d": 2 } as CSSProperties}>
            <span className="catalog-promise-no">03</span>
            <strong>GI-certified handloom</strong>
            <span>Traceable to the cluster that wove it.</span>
          </li>
        </ul>
      </section>
    </>
  );
}
