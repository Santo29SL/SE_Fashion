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
      { title: "The Southern Edit — Lost Dravidian Craft, Revived on Salvaged Cloth" },
      {
        name: "description",
        content:
          "The Southern Edit revives the fading crafts of Tamil Nadu, Kerala, Karnataka and Andhra & Telangana — remaking salvaged heirloom saris, loom-ends and shepherd wool into modern clothing.",
      },
      { property: "og:title", content: "The Southern Edit — Lost Craft, Revived" },
      {
        property: "og:description",
        content: "Four Dravidian states. Crafts on the edge of being forgotten. Salvaged cloth, revived by the last hands that know it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RealmsPage,
});

const CRAFT_RIBBON = [
  "Salvaged Kanchipuram pallus",
  "Rescued kasavu borders",
  "Retired Kambli wool",
  "Pochampally ikat offcuts",
  "Bhavani loom-ends",
  "Temple kalamkari",
  "Toda embroidery",
];

const REVIVAL_STEPS = [
  {
    no: "01",
    verb: "Salvage",
    native: "மீட்பு",
    title: "We find the cloth the South left behind.",
    body: "Heirloom saris folded away for good, loom-ends swept off shed floors, shepherd blankets past their years, temple hangings retired after festivals.",
  },
  {
    no: "02",
    verb: "Revive",
    native: "புத்துயிர்",
    title: "The last hands that know the craft rework it.",
    body: "Master weavers, Kasuti and Toda embroiderers, block carvers and bell-metal casters are paid to repair, re-weave and teach — keeping each craft alive another generation.",
  },
  {
    no: "03",
    verb: "Re-wear",
    native: "மறுபயன்",
    title: "It comes back as clothing you'll keep for decades.",
    body: "Cut into modular pieces for every season of the year — so the craft is worn on the street, not locked behind museum glass.",
  },
];

const LOST_CRAFTS = [
  { craft: "Toda pukhoor embroidery", where: "Nilgiris, Tamil Nadu" },
  { craft: "Deccani Kambli wool", where: "Chitradurga, Karnataka" },
  { craft: "Kasuti counted stitch", where: "Dharwad, Karnataka" },
  { craft: "Chettinad Kandangi", where: "Karaikudi, Tamil Nadu" },
  { craft: "Kuthampully zari", where: "Thrissur, Kerala" },
  { craft: "Srikalahasti pen kalamkari", where: "Tirupati, Andhra Pradesh" },
  { craft: "Narayanpet small checks", where: "Narayanpet, Telangana" },
  { craft: "Aranmula bell metal", where: "Pathanamthitta, Kerala" },
];

function RealmsPage() {
  const { openLookbook } = useShop();
  const stackRef = useRef<HTMLDivElement>(null);
  const revivalRef = useRef<HTMLElement>(null);
  useRevealOnView(stackRef);
  useRevealOnView(revivalRef);

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
          <p className="hero-cover-tag">Revived from what was left behind.</p>
          <p className="hero-cover-sub">
            Four Dravidian states. Crafts on the edge of being forgotten. We salvage heirloom saris, loom-ends and
            shepherd wool — and pay the last master artisans to remake them as clothing you'll wear for decades.
          </p>
          <div className="hero-cover-cta">
            <Link className="btn-primary" to="/shop">
              Shop the five seasons
            </Link>
            <a className="btn-ghost" href="#revival">
              How the revival works
            </a>
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

      <section className="revival-section" id="revival" ref={revivalRef}>
        <header className="chapter-head reveal-on-view">
          <p className="section-eyebrow">The revival</p>
          <h2 className="section-title">
            Lost craft.
            <br />
            <em>Salvaged cloth.</em>
          </h2>
          <p className="section-subtitle">
            The South once dressed itself in a hundred living crafts. Many now survive in a handful of homes. We exist to
            bring them back — using only cloth that already exists.
          </p>
        </header>

        <ol className="revival-steps">
          {REVIVAL_STEPS.map((step, i) => (
            <li className="revival-step reveal-on-view" key={step.no} style={{ "--d": i } as CSSProperties}>
              <div className="revival-step-head">
                <span className="revival-step-no">{step.no}</span>
                <span className="revival-step-native">{step.native}</span>
              </div>
              <p className="revival-step-verb">{step.verb}</p>
              <h3 className="revival-step-title">{step.title}</h3>
              <p className="revival-step-body">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="lost-crafts reveal-on-view">
          <p className="lost-crafts-title">
            <Spark /> Crafts we are bringing back
          </p>
          <ul className="lost-crafts-list">
            {LOST_CRAFTS.map((c) => (
              <li key={c.craft}>
                <strong>{c.craft}</strong>
                <span>{c.where}</span>
              </li>
            ))}
          </ul>
          <Link to="/heritage" className="btn-ghost">
            Read the full story
          </Link>
        </div>
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
                      <dt>Reviving</dt>
                      <dd>{realm.revivedCraft}</dd>
                    </div>
                    <div className="realm-detail-row">
                      <dt>Salvaged</dt>
                      <dd>{realm.salvaged}</dd>
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
