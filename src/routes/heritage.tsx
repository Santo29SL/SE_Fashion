import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import heritageCulture from "@/assets/heritage-culture.webp.asset.json";
import { Media } from "@/components/southern/Media";
import { heritagePillars } from "@/lib/southern/realms";

export const Route = createFileRoute("/heritage")({
  head: () => ({
    meta: [
      { title: "Heritage & Provenance — The Southern Edit" },
      {
        name: "description",
        content:
          "The Southern Edit — Design philosophy and supply chain provenance. Heritage, not costume. Direct looms, living wages.",
      },
      { property: "og:title", content: "Heritage & Provenance — The Southern Edit" },
      {
        property: "og:description",
        content: "Museum-grade Dravidian handloom deconstructed for daily modular wear. 65% net margin funds master weavers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HeritagePage,
});

type HeritageMode = "culture" | "modular";

const MODES: { id: HeritageMode; label: string }[] = [
  { id: "culture", label: "Culture × contemporary" },
  { id: "modular", label: "Modular architecture" },
];

function HeritagePage() {
  const [mode, setMode] = useState<HeritageMode>("culture");

  return (
    <>
      <section className="heritage-section" id="heritage" style={{ paddingTop: "calc(var(--header-h) + 2.5rem)" }}>
        <div className="heritage-sticky">
          <header className="chapter-head light">
            <p className="section-eyebrow">Act II · Design philosophy</p>
            <h1 className="section-title">Heritage, not costume</h1>
            <p className="section-subtitle">
              Unstitched ritual garments re-engineered into modular streetwear and timeless tailoring.
            </p>
          </header>
          <div className="heritage-layout">
            <div className="heritage-visual">
              <div className={`heritage-frame ${mode === "culture" ? "is-active" : ""}`}>
                <Media
                  path={heritageCulture.url}
                  slot="images/editorial/heritage_culture.webp"
                  label="Culture × contemporary"
                />
              </div>
              <div className={`heritage-frame ${mode === "modular" ? "is-active" : ""}`}>
                <Media slot="images/editorial/heritage_modular.webp" label="Modular architecture" />
              </div>
              <div className="heritage-toggles" role="tablist" aria-label="Heritage views">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`heritage-mode-btn ${mode === m.id ? "active" : ""}`}
                    role="tab"
                    aria-selected={mode === m.id}
                    onClick={() => setMode(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="heritage-pillars">
              {heritagePillars.map((pillar) => (
                <article className="pillar-item" key={pillar.id}>
                  <div className="pillar-header">
                    <span>
                      {pillar.index} · {pillar.label}
                    </span>
                    <span className="pillar-badge">{pillar.badge}</span>
                  </div>
                  <div className="pillar-comparison-grid">
                    <div className="pillar-box">
                      <strong>{pillar.traditional.title}</strong>
                      {pillar.traditional.body}
                    </div>
                    <div className="pillar-box">
                      <strong>{pillar.contemporary.title}</strong>
                      {pillar.contemporary.body}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="provenance-section" id="provenance">
        <div className="provenance-grid">
          <div>
            <p className="section-eyebrow">Act V · Supply chain transparency</p>
            <h2 className="section-title">Direct looms, living wages</h2>
            <p className="section-subtitle">
              No multi-tier wholesalers. Museum-grade handloom in daily wear, with generational weavers paid as authors
              of the cloth.
            </p>
            <ul className="cluster-list">
              <li>
                <strong>Bhavani master weavers</strong> — chevron pit-loom rug yardage
              </li>
              <li>
                <strong>Kanchipuram sericulture guild</strong> — mulberry silk, gold zari paisley
              </li>
              <li>
                <strong>Balaramapuram Kasavu society</strong> — fine-count kora cotton
              </li>
              <li>
                <strong>Pochampally double-ikat</strong> — resist-dye mathematics
              </li>
            </ul>
            <div className="pricing-breakdown-box" id="pricing">
              <div className="breakdown-title">Cost architecture</div>
              <div className="breakdown-row highlight">
                <span>Artisan cooperatives &amp; loom fund</span>
                <span>65%</span>
              </div>
              <div className="breakdown-row">
                <span>Raw materials &amp; mulberry silk</span>
                <span>15%</span>
              </div>
              <div className="breakdown-row">
                <span>Brass &amp; leather hardware</span>
                <span>12%</span>
              </div>
              <div className="breakdown-row">
                <span>Packaging &amp; logistics</span>
                <span>8%</span>
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link to="/shop" className="btn-primary">
                Shop the artisan collection
              </Link>
            </div>
          </div>
          <div className="provenance-media">
            <Media slot="images/editorial/madras_loom.webp" label="Weaver cooperative" />
          </div>
        </div>
      </section>
    </>
  );
}
