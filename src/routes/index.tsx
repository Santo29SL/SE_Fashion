import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, type CSSProperties } from "react";

import heroPhoto from "@/assets/hero-loom-rack.webp";
import moodboardAsset from "@/assets/moodboard-heritage.webp.asset.json";
import { Ribbon, Spark } from "@/components/southern/Editorial";
import { useShop } from "@/components/southern/ShopProvider";
import { useRevealOnView } from "@/components/southern/useRevealOnView";
import { getProductsByRealm } from "@/lib/southern/products";
import { realms } from "@/lib/southern/realms";

// Lovable CDN URLs (/__l5e/…) only resolve on Lovable's servers.
// Fall back to the real file in public/ for local dev and self-hosted builds.
const moodboardUrl = moodboardAsset.url.startsWith("/__l5e/")
  ? "/images/editorial/moodboard-heritage.png"
  : moodboardAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Southern Edit — Modern Dravidian Luxury" },
      {
        name: "description",
        content:
          "The Southern Edit — a Dravidian heritage marketplace and journal. Modular clothing from Tamil Nadu, Kerala, Karnataka, and Andhra & Telangana.",
      },
      { property: "og:title", content: "The Southern Edit — Modern Dravidian Luxury" },
      {
        property: "og:description",
        content: "Heritage as clothing, not a museum. Four realms. Direct from artisan clusters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RealmsPage,
});

const CRAFT_RIBBON = [
  "Kanchipuram silk",
  "Kasavu kora",
  "Mysore crepe",
  "Pochampally ikat",
  "Bhavani jamakkalam",
  "Kalamkari",
  "Madras checks",
];

function RealmsPage() {
  const { openLookbook } = useShop();
  const stackRef = useRef<HTMLDivElement>(null);
  useRevealOnView(stackRef);

  return (
    <>
      <section className="hero-cover" id="intro">
        <div className="hero-cover-stage">
          <img className="hero-cover-underlay" src={moodboardUrl} alt="" aria-hidden="true" width={1600} height={1309} />
          <h1 className="hero-cover-title">
            <span className="hero-cover-line reveal d1">Rooted in</span>
            <span className="hero-cover-line reveal d2">
              the South.
              <Spark />
            </span>
          </h1>
        </div>

        <div className="hero-cover-deck reveal d3">
          <p className="hero-cover-tag">Worn in the now.</p>
          <p className="hero-cover-sub">
            A marketplace and journal for living Dravidian craft — Kanchipuram silk, Bhavani jamakkalam, Mysore crepe,
            Kasavu kora, Pochampally ikat — rebuilt as modular clothing.
          </p>
          <div className="hero-cover-cta">
            <Link className="btn-primary" to="/shop">
              Explore all artifacts in Shop
            </Link>
            <Link className="btn-ghost" to="/journal">
              Read the journal
            </Link>
          </div>
        </div>

        <figure className="hero-cover-photo reveal d4">
          <img
            src={heroPhoto}
            alt="Handloom kasavu, Kanchipuram silk, ikat and Madras check garments hanging on a driftwood rail"
            width={1920}
            height={1152}
            fetchPriority="high"
          />
        </figure>

        <Ribbon items={CRAFT_RIBBON} />
      </section>

      <section className="realms-section" id="realms">
        <div className="pin-stack" id="realmPinStack" ref={stackRef}>
          {realms.map((realm, i) => {
            const chapter = String(i + 1).padStart(2, "0");
            const count = getProductsByRealm(realm.id).length;
            return (
              <article
                key={realm.id}
                className="realm-panel"
                id={`realm-${realm.id}`}
                style={{ "--realm-accent": realm.accentColor } as CSSProperties}
              >
                <div className="realm-copy">
                  <div className="realm-meta">
                    <span>
                      Chapter {chapter} <span className="realm-meta-of">/ 0{realms.length}</span>
                    </span>
                    <span>{realm.subtitle}</span>
                  </div>

                  <div className="realm-heading">
                    <p className="realm-native">{realm.native}</p>
                    <h3 className="realm-name">{realm.name}</h3>
                    <p className="realm-tagline">{realm.tagline}</p>
                  </div>

                  <p className="realm-desc">{realm.description}</p>

                  <dl className="realm-details">
                    <div className="realm-detail-row">
                      <dt>Palette</dt>
                      <dd className="palette-swatches">
                        {realm.colors.map((c) => (
                          <span key={c} className="swatch-circle" style={{ background: c }} title={c} />
                        ))}
                      </dd>
                    </div>
                    <div className="realm-detail-row">
                      <dt>Crafts</dt>
                      <dd>
                        <ul className="realm-crafts">
                          {realm.crafts.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>

                  <blockquote className="realm-quote">{realm.artisanNote}</blockquote>

                  <div className="realm-cta">
                    <Link to="/shop" search={{ realm: realm.id }} className="btn-primary">
                      Shop this realm
                    </Link>
                    <button type="button" className="realm-lookbook-btn" onClick={() => openLookbook(realm.id)}>
                      <span className="realm-lookbook-thumb" aria-hidden="true">
                        <img src={realm.moodboard} alt="" loading="lazy" />
                      </span>
                      <span className="realm-lookbook-text">
                        <strong>Open the lookbook</strong>
                        <small>{count} artifacts · flash cards</small>
                      </span>
                      <span className="realm-lookbook-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </div>

                <figure className="realm-media">
                  <div className="realm-photo">
                    <img src={realm.photo} alt={realm.photoAlt} width={1024} height={1280} loading="lazy" />
                  </div>
                  <figcaption className="realm-caption">
                    <span>Fig. {chapter}</span>
                    <span>{realm.tagline}</span>
                  </figcaption>
                </figure>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
