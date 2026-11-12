import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState, type CSSProperties } from "react";

import { PageCover } from "@/components/southern/Editorial";
import { ProductMedia } from "@/components/southern/Media";
import { useShop } from "@/components/southern/ShopProvider";
import { useRevealOnView } from "@/components/southern/useRevealOnView";
import { filterCatalog, groupBySeason, type SortOrder } from "@/lib/southern/catalog";
import { formatRating } from "@/lib/southern/format";
import { products } from "@/lib/southern/products";
import { realms } from "@/lib/southern/realms";
import { isSeasonId, seasons } from "@/lib/southern/seasons";
import type { Product, ProductAudience, SeasonCollection, SeasonId } from "@/lib/southern/types";

interface ShopSearch {
  season?: SeasonId;
  realm?: string;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const out: ShopSearch = {};
    if (isSeasonId(search["season"])) out.season = search["season"];
    if (typeof search["realm"] === "string" && realms.some((r) => r.id === search["realm"])) out.realm = search["realm"];
    return out;
  },
  head: () => ({
    meta: [
      { title: "Shop the Seasons — Summer, Fall, Winter, Spring & International | The Southern Edit" },
      {
        name: "description",
        content:
          "Five season collections remade from salvaged South Indian cloth — heirloom saris, loom-ends and shepherd wool — revived by the last artisans of Tamil Nadu, Kerala, Karnataka and Andhra & Telangana.",
      },
      { property: "og:title", content: "Shop the Seasons — The Southern Edit" },
      {
        property: "og:description",
        content: "Summer, Fall, Winter, Spring and International collections, each remade from salvaged Dravidian craft cloth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

const AUDIENCES: { id: ProductAudience | "all"; label: string }[] = [
  { id: "all", label: "Everyone" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "unisex", label: "Unisex" },
];

const COVER_RIBBON = [
  ...seasons.map((s) => `${s.name} · ${s.native}`),
  "Salvaged saris",
  "Rescued loom-ends",
  "Retired shepherd wool",
  "Revived by hand",
];

const catalogNumber = (id: string) => String(products.findIndex((p) => p.id === id) + 1).padStart(2, "0");
const seasonNumber = (id: SeasonId) => String(seasons.findIndex((s) => s.id === id) + 1).padStart(2, "0");

function ShopPage() {
  const { season, realm } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");
  const [audience, setAudience] = useState<ProductAudience | "all">("all");
  const pageRef = useRef<HTMLElement>(null);

  const list = useMemo(
    () => filterCatalog(products, { season: season ?? "all", realm: realm ?? "all", audience, sort: sortOrder }),
    [season, realm, audience, sortOrder],
  );
  const groups = useMemo(() => groupBySeason(list), [list]);
  useRevealOnView(pageRef, [list]);

  const setSearch = (next: ShopSearch) =>
    navigate({ search: (prev) => ({ ...prev, ...next }), replace: true, resetScroll: false });

  const pickSeason = (id: SeasonId | "all") => {
    setSearch({ season: id === "all" ? undefined : id });
    if (typeof window !== "undefined") {
      document.getElementById("collections")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const nextSeason = season ? seasons[(seasons.findIndex((s) => s.id === season) + 1) % seasons.length] : undefined;

  return (
    <>
      <PageCover
        act="Act IV · The Seasons"
        meta={`${products.length} pieces · ${seasons.length} collections`}
        lines={["Five", "Seasons."]}
        tag="Salvaged, revived, worn by the calendar."
        sub="Every piece is remade from cloth the South left behind — heirloom saris, loom-ends, retired shepherd blankets — and revived by the last hands that still know the craft. Shop it the way the year turns."
        ribbon={COVER_RIBBON}
      />

      <section className="catalog-section season-shop" id="collections" ref={pageRef}>
        <nav className="season-index reveal-on-view" aria-label="Season collections">
          <button
            type="button"
            className={`season-index-item ${!season ? "active" : ""}`}
            aria-pressed={!season}
            onClick={() => pickSeason("all")}
          >
            <span className="season-index-no">00</span>
            <span className="season-index-name">The whole year</span>
            <span className="season-index-native">
              ஆண்டு <sup>{products.length}</sup>
            </span>
          </button>
          {seasons.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`season-index-item ${season === s.id ? "active" : ""}`}
              aria-pressed={season === s.id}
              onClick={() => pickSeason(s.id)}
              style={{ "--season-accent": s.accentColor } as CSSProperties}
            >
              <span className="season-index-no">
                {seasonNumber(s.id)} · {s.monthsShort}
              </span>
              <span className="season-index-name">{s.name}</span>
              <span className="season-index-native">
                {s.native} <sup>{products.filter((p) => p.season === s.id).length}</sup>
              </span>
            </button>
          ))}
        </nav>

        <div className="catalog-toolbar reveal-on-view">
          <div className="catalog-audience" role="group" aria-label="Filter by who it's for">
            {AUDIENCES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`catalog-audience-btn ${audience === item.id ? "active" : ""}`}
                aria-pressed={audience === item.id}
                onClick={() => setAudience(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="catalog-toolbar-end">
            <span className="catalog-count">
              <strong>{list.length}</strong> of {products.length} pieces
            </span>
            <select
              className="nav-select"
              aria-label="Filter by realm"
              value={realm ?? "all"}
              onChange={(e) => setSearch({ realm: e.target.value === "all" ? undefined : e.target.value })}
            >
              <option value="all">All four realms</option>
              {realms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
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

        {groups.length === 0 ? (
          <p className="empty-note season-empty">
            Nothing in this collection matches yet.{" "}
            <button
              type="button"
              className="season-reset"
              onClick={() => {
                setAudience("all");
                setSearch({ realm: undefined });
              }}
            >
              Clear filters
            </button>
          </p>
        ) : (
          groups.map((group, gi) => (
            <SeasonChapter
              key={group.season.id}
              season={group.season}
              items={group.products}
              flip={gi % 2 === 1}
              showOnlyButton={!season}
              onShowOnly={() => pickSeason(group.season.id)}
            />
          ))
        )}

        {season && nextSeason && (
          <div className="season-next reveal-on-view">
            <button type="button" className="season-next-btn" onClick={() => pickSeason(nextSeason.id)}>
              <span>Next collection</span>
              <strong>
                {nextSeason.name} <em>{nextSeason.native}</em> →
              </strong>
            </button>
            <button type="button" className="btn-ghost" onClick={() => pickSeason("all")}>
              See the whole year
            </button>
          </div>
        )}

        <ul className="catalog-promise">
          <li className="reveal-on-view" style={{ "--d": 0 } as CSSProperties}>
            <span className="catalog-promise-no">01</span>
            <strong>Salvaged, not newly made</strong>
            <span>Every piece begins as cloth that already exists.</span>
          </li>
          <li className="reveal-on-view" style={{ "--d": 1 } as CSSProperties}>
            <span className="catalog-promise-no">02</span>
            <strong>Revived by master hands</strong>
            <span>65% of net margin goes back to the loom.</span>
          </li>
          <li className="reveal-on-view" style={{ "--d": 2 } as CSSProperties}>
            <span className="catalog-promise-no">03</span>
            <strong>Free pan-India delivery</strong>
            <span>On every bag over ₹3,000.</span>
          </li>
        </ul>
      </section>
    </>
  );
}

function SeasonChapter({
  season,
  items,
  flip,
  showOnlyButton,
  onShowOnly,
}: {
  season: SeasonCollection;
  items: Product[];
  flip: boolean;
  showOnlyButton: boolean;
  onShowOnly: () => void;
}) {
  const no = seasonNumber(season.id);
  return (
    <section
      className={`season-chapter ${flip ? "is-flipped" : ""}`}
      id={`season-${season.id}`}
      aria-labelledby={`season-${season.id}-title`}
      style={{ "--season-accent": season.accentColor, "--realm-accent": season.accentColor } as CSSProperties}
    >
      <header className="season-head reveal-on-view">
        <figure className="season-cover">
          <div className="season-cover-photo">
            <img src={season.image} alt={season.imageAlt} width={1536} height={1024} loading="lazy" />
            <span className="season-cover-native" aria-hidden="true">
              {season.native}
            </span>
          </div>
          <figcaption className="realm-caption">
            <span>Fig. S{no}</span>
            <span>{season.nativeLatin}</span>
          </figcaption>
        </figure>

        <div className="season-copy">
          <div className="realm-meta">
            <span>
              Collection {no} <span className="realm-meta-of">/ 0{seasons.length}</span>
            </span>
            <span>{season.months}</span>
          </div>
          <h2 className="season-name" id={`season-${season.id}-title`}>
            {season.name}
          </h2>
          <p className="realm-tagline">{season.tagline}</p>
          <p className="realm-desc">{season.description}</p>
          <dl className="realm-details">
            <div className="realm-detail-row">
              <dt>Salvaged</dt>
              <dd>{season.salvaged}</dd>
            </div>
            <div className="realm-detail-row">
              <dt>Palette</dt>
              <dd className="palette-swatches">
                {season.palette.map((c) => (
                  <span key={c} className="swatch-circle" style={{ background: c }} title={c} />
                ))}
              </dd>
            </div>
          </dl>
          <div className="season-copy-foot">
            <span className="season-count">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </span>
            {showOnlyButton && (
              <button type="button" className="season-only-btn" onClick={onShowOnly}>
                Shop only {season.name} <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="products-grid season-grid" role="list" aria-label={`${season.name} collection`}>
        {items.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { price, addToBag, openQuickView } = useShop();
  const views = product.imageViews ?? [];
  const altView = views[1]?.src;
  const realmAccent = realms.find((r) => r.id === product.stateId)?.accentColor;
  return (
    <article
      className="product-card"
      role="listitem"
      style={{ "--d": index % 4, "--realm-accent": realmAccent } as CSSProperties}
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
        <p className="product-salvage">
          <span>Remade from</span>
          {product.salvagedFrom}
        </p>
        <p className="product-card-tags">
          <span>{product.giTag}</span>
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
}
