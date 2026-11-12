import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, type CSSProperties } from "react";

import heritageCulture from "@/assets/heritage-culture.webp.asset.json";
import { PageCover, TypePlate } from "@/components/southern/Editorial";
import { useRevealOnView } from "@/components/southern/useRevealOnView";
import { heritagePillars } from "@/lib/southern/realms";

export const Route = createFileRoute("/heritage")({
  head: () => ({
    meta: [
      { title: "Heritage & Provenance — Salvaged Cloth, Revived Craft | The Southern Edit" },
      {
        name: "description",
        content:
          "How The Southern Edit salvages heirloom saris, loom-ends and shepherd wool and pays the last Dravidian master artisans to revive their craft.",
      },
      { property: "og:title", content: "Heritage & Provenance — The Southern Edit" },
      {
        property: "og:description",
        content: "Lost Dravidian craft revived on salvaged cloth. 65% of net margin funds master weavers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HeritagePage,
});

const PILLAR_ACCENTS = ["var(--indigo)", "var(--terracotta)", "var(--brass)", "var(--olive)"];

const PILLAR_PHOTOS: Record<string, { src: string; alt: string }> = {
  salvage: {
    src: "/images/heritage/pillar-salvage.jpg",
    alt: "Salvaged saris and handloom offcuts folded into bundles, tied with jute and paper tags on a workshop table",
  },
  origin: {
    src: "/images/heritage/pillar-origin.jpg",
    alt: "Antique maroon temple silk unfolded beside tailor's shears and a collar cut from its border",
  },
  modular: {
    src: "/images/heritage/pillar-modular.jpg",
    alt: "Flat-lay of modular kasavu pieces — sleeves, panels, sash and brass fastenings that convert four ways",
  },
  value: {
    src: "/images/heritage/pillar-value.jpg",
    alt: "A master weaver's hands throwing the shuttle across striped pit-loom yardage",
  },
};

const CLUSTERS = [
  { name: "Bhavani master weavers", craft: "Chevron pit-loom rug yardage", realm: "Tamil Nadu" },
  { name: "Kanchipuram sericulture guild", craft: "Mulberry silk, gold zari paisley", realm: "Tamil Nadu" },
  { name: "Balaramapuram kasavu society", craft: "Fine-count kora cotton", realm: "Kerala" },
  { name: "Mysore silk filatures", craft: "Crepe silk for denim gussets", realm: "Karnataka" },
  { name: "Pochampally double-ikat", craft: "Resist-dye mathematics", realm: "Telangana" },
  { name: "Srikalahasti kalamkari", craft: "Pen-drawn vegetable dyes", realm: "Andhra Pradesh" },
];

const COSTS = [
  { label: "Artisan cooperatives & loom fund", pct: 65, highlight: true },
  { label: "Raw materials & mulberry silk", pct: 15 },
  { label: "Brass & leather hardware", pct: 12 },
  { label: "Packaging & logistics", pct: 8 },
];

const STATS = [
  { value: "100%", label: "of our cloth salvaged or surplus" },
  { value: "65%", label: "of net margin to the loom" },
  { value: "0", label: "wholesalers in between" },
  { value: "4", label: "Dravidian realms" },
];

function HeritagePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  useRevealOnView(pageRef);
  useRevealOnView(stackRef);

  return (
    <div ref={pageRef}>
      <PageCover
        act="Act II · The revival"
        meta={`${heritagePillars.length} pillars · ${CLUSTERS.length} clusters`}
        lines={["Lost,", "then found."]}
        tag="Salvaged cloth. Revived hands."
        sub="The crafts of the four Dravidian states are disappearing one loom at a time. We buy back the cloth they left behind and pay the last masters to make it live again."
        ribbon={["Salvage", "Revival", "Adaptability", "Fair trade", "Direct looms", "Living wages", "Nothing wasted"]}
      />

      <section className="manifesto" id="heritage">
        <figure className="manifesto-figure reveal-on-view">
          <div className="realm-photo">
            <img
              src={heritageCulture.url}
              alt="Flower seller stringing jasmine beside a carved temple sculpture — culture meeting the contemporary"
              loading="lazy"
            />
          </div>
          <figcaption className="realm-caption">
            <span>Fig. 00</span>
            <span>Culture × contemporary</span>
          </figcaption>
        </figure>
        <div className="manifesto-copy">
          <p className="section-eyebrow reveal-on-view">The manifesto</p>
          <p className="manifesto-statement reveal-on-view">
            A craft dies when no one wears it. We rescue cloth that was kept for temples and weddings — or thrown away —
            and give it back to the artisans who can revive it for <em>everyday life</em>, without losing a single thread
            of where it came from.
          </p>
          <dl className="manifesto-stats">
            {STATS.map((stat, i) => (
              <div className="reveal-on-view" key={stat.label} style={{ "--d": i } as CSSProperties}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="realms-section pillars-section" aria-label="Design pillars">
        <div className="pin-stack" ref={stackRef}>
          {heritagePillars.map((pillar, i) => (
            <article
              className="realm-panel"
              key={pillar.id}
              style={{ "--realm-accent": PILLAR_ACCENTS[i % PILLAR_ACCENTS.length] } as CSSProperties}
            >
              <div className="realm-copy">
                <div className="realm-meta">
                  <span>
                    Pillar {pillar.index} <span className="realm-meta-of">/ 0{heritagePillars.length}</span>
                  </span>
                  <span>Then × Now</span>
                </div>
                <div className="realm-heading">
                  <p className="realm-native">{pillar.badge}</p>
                  <h2 className="realm-name">{pillar.label}</h2>
                  <p className="realm-tagline">
                    From {pillar.traditional.title.toLowerCase()} to {pillar.contemporary.title.toLowerCase()}.
                  </p>
                </div>
                <dl className="pillar-compare">
                  <div className="pillar-compare-row">
                    <dt>Then</dt>
                    <dd>
                      <strong>{pillar.traditional.title}</strong>
                      {pillar.traditional.body}
                    </dd>
                  </div>
                  <div className="pillar-compare-row is-now">
                    <dt>Now</dt>
                    <dd>
                      <strong>{pillar.contemporary.title}</strong>
                      {pillar.contemporary.body}
                    </dd>
                  </div>
                </dl>
              </div>
              <TypePlate
                className="realm-media"
                numeral={pillar.index}
                word={pillar.badge}
                caption={pillar.label}
                accent={PILLAR_ACCENTS[i % PILLAR_ACCENTS.length]}
                image={PILLAR_PHOTOS[pillar.id]?.src}
                alt={PILLAR_PHOTOS[pillar.id]?.alt}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="provenance-section" id="provenance">
        <header className="chapter-head reveal-on-view">
          <p className="section-eyebrow">Act V · Supply chain transparency</p>
          <h2 className="section-title">Direct looms, living wages</h2>
          <p className="section-subtitle">
            No multi-tier wholesalers. Museum-grade handloom in daily wear, with generational weavers paid as authors
            of the cloth.
          </p>
        </header>

        <div className="provenance-grid">
          <div className="provenance-col">
            <p className="provenance-col-title reveal-on-view">The clusters</p>
            <ol className="cluster-index">
              {CLUSTERS.map((c, i) => (
                <li className="reveal-on-view" key={c.name} style={{ "--d": i % 3 } as CSSProperties}>
                  <span className="cluster-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cluster-name">{c.name}</span>
                  <span className="cluster-craft">{c.craft}</span>
                  <span className="cluster-realm">{c.realm}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="provenance-col" id="pricing">
            <p className="provenance-col-title reveal-on-view">Cost architecture · where ₹100 goes</p>
            <ul className="cost-bars">
              {COSTS.map((c, i) => (
                <li
                  className={`cost-bar reveal-on-view ${c.highlight ? "is-highlight" : ""}`}
                  key={c.label}
                  style={{ "--pct": `${c.pct}%`, "--d": i } as CSSProperties}
                >
                  <span className="cost-bar-label">{c.label}</span>
                  <span className="cost-bar-value">{c.pct}%</span>
                  <span className="cost-bar-track" aria-hidden="true">
                    <span className="cost-bar-fill" />
                  </span>
                </li>
              ))}
            </ul>
            <div className="provenance-cta reveal-on-view">
              <Link to="/shop" className="btn-primary">
                Shop the artisan collection
              </Link>
              <Link to="/journal" className="btn-ghost">
                Read the journal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
