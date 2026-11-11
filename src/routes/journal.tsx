import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";

import { Media } from "@/components/southern/Media";
import { useShop } from "@/components/southern/ShopProvider";
import { useRevealOnView } from "@/components/southern/useRevealOnView";
import { journalPosts } from "@/lib/southern/journal";
import { products } from "@/lib/southern/products";

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
  const { price } = useShop();
  const gridRef = useRef<HTMLDivElement>(null);
  useRevealOnView(gridRef);

  return (
    <section className="journal-section" id="journal" style={{ paddingTop: "calc(var(--header-h) + 2.5rem)" }}>
      <header className="chapter-head">
        <p className="section-eyebrow">Act III · The Journal</p>
        <h1 className="section-title">Stories the cloth still tells</h1>
        <p className="section-subtitle">
          Essays in craft, language, and cluster — each piece shops directly back into the collection.
        </p>
      </header>
      <div className="journal-grid" ref={gridRef}>
        {journalPosts.map((post) => {
          const related = products.filter((p) => post.relatedProductIds.includes(p.id));
          return (
            <article className="journal-card" key={post.id}>
              <div className="journal-media">
                <Media path={post.image} slot={post.slot} label={post.title} />
              </div>
              <div className="journal-body">
                <span className="journal-kicker">{post.kicker}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="journal-shop">
                  <span>Related artifacts:</span>
                  <div className="intro-realms" style={{ marginTop: "0.5rem" }}>
                    {related.map((p) => (
                      <Link key={p.id} to="/shop" search={{ realm: p.stateId }}>
                        {p.name} · {price(p.price)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
