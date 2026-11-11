import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, type CSSProperties } from "react";

import { PageCover, TypePlate } from "@/components/southern/Editorial";
import { useShop } from "@/components/southern/ShopProvider";
import { useRevealOnView } from "@/components/southern/useRevealOnView";
import { craftGlossary, journalPosts } from "@/lib/southern/journal";
import { products } from "@/lib/southern/products";
import { realms } from "@/lib/southern/realms";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — The Southern Edit" },
      {
        name: "description",
        content: "The Southern Edit Journal — Essays in craft, language, and cluster. Stories the cloth still tells.",
      },
      { property: "og:title", content: "Craft Journal — The Southern Edit" },
      {
        property: "og:description",
        content: "Essays in craft, language, and artisan clusters — each one shops back into the collection.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const { price, openQuickView } = useShop();
  const pageRef = useRef<HTMLElement>(null);
  useRevealOnView(pageRef);

  return (
    <>
      <PageCover
        act="Act III · The Journal"
        meta={`${journalPosts.length} essays · ${journalPosts.length} languages`}
        lines={["Stories the cloth", "still tells."]}
        tag="Read the weave."
        sub="Essays in craft, language and cluster — each one shops straight back into the collection."
        ribbon={craftGlossary.map((g) => `${g.term} · ${g.native}`)}
      />

      <section className="journal-section" id="journal" ref={pageRef}>
        <div className="journal-list">
          {journalPosts.map((post, i) => {
            const realm = realms.find((r) => r.id === post.realmId);
            const related = products.filter((p) => post.relatedProductIds.includes(p.id));
            const no = String(i + 1).padStart(2, "0");
            return (
              <article
                className="journal-entry reveal-on-view"
                key={post.id}
                id={post.id}
                style={{ "--realm-accent": realm?.accentColor } as CSSProperties}
              >
                <TypePlate numeral={no} word={post.native} caption={post.kicker} accent={realm?.accentColor} />
                <div className="journal-entry-copy">
                  <div className="realm-meta">
                    <span>
                      Essay {no} <span className="realm-meta-of">/ 0{journalPosts.length}</span>
                    </span>
                    <span>
                      {realm?.name} · {post.readTime}
                    </span>
                  </div>
                  <h2 className="journal-entry-title">{post.title}</h2>
                  <p className="realm-desc">{post.excerpt}</p>
                  <blockquote className="realm-quote">{post.pullQuote}</blockquote>
                  <div className="journal-entry-shop">
                    <p className="journal-entry-shop-label">Shop the story</p>
                    <ul>
                      {related.map((p) => (
                        <li key={p.id}>
                          <button type="button" onClick={() => openQuickView(p.id)}>
                            <span className="journal-entry-shop-name">{p.name}</span>
                            <span className="journal-entry-shop-price">{price(p.price)}</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <section className="glossary" aria-labelledby="glossary-title">
          <header className="chapter-head reveal-on-view">
            <p className="section-eyebrow">Appendix · Words of the loom</p>
            <h2 className="section-title" id="glossary-title">
              A small glossary
            </h2>
            <p className="section-subtitle">The craft words that come up again and again — in the original script.</p>
          </header>
          <dl className="glossary-grid">
            {craftGlossary.map((g, i) => (
              <div className="glossary-item reveal-on-view" key={g.term} style={{ "--d": i % 3 } as CSSProperties}>
                <span className="glossary-native" aria-hidden="true">
                  {g.native}
                </span>
                <dt>{g.term}</dt>
                <dd>{g.meaning}</dd>
              </div>
            ))}
          </dl>
          <div className="glossary-cta reveal-on-view">
            <Link to="/shop" className="btn-primary">
              Shop the collection
            </Link>
            <Link to="/heritage" className="btn-ghost">
              Our design philosophy
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
