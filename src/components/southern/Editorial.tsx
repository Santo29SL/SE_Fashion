import type { CSSProperties, ReactNode } from "react";

/** Four-point brass spark used beside cover titles. */
export function Spark() {
  return (
    <svg className="hero-spark" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z"
      />
    </svg>
  );
}

/** One straight marquee line; content is doubled so the loop is seamless. */
export function Ribbon({ items }: { items: string[] }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="hero-ribbon" aria-hidden="true">
      <div className="hero-ribbon-track">
        {[0, 1].map((half) => (
          <span key={half} style={{ display: "inline-flex" }}>
            {loop.map((text, i) => (
              <span key={`${half}-${i}`} className="hero-ribbon-item">
                {text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

interface PageCoverProps {
  act: string;
  meta: string;
  lines: string[];
  tag: string;
  sub: string;
  ribbon?: string[];
  children?: ReactNode;
}

/** Magazine-cover opener shared by Shop, Journal and Heritage — the same voice as the Realms hero. */
export function PageCover({ act, meta, lines, tag, sub, ribbon, children }: PageCoverProps) {
  return (
    <section className="page-cover">
      <div className="page-cover-meta reveal">
        <span>{act}</span>
        <span>{meta}</span>
      </div>
      <h1 className="page-cover-title">
        {lines.map((line, i) => (
          <span key={line} className={`hero-cover-line reveal d${i + 1}`}>
            {line}
            {i === lines.length - 1 && <Spark />}
          </span>
        ))}
      </h1>
      <p className="hero-cover-tag reveal d3">{tag}</p>
      <p className="page-cover-sub reveal d3">{sub}</p>
      {children && <div className="hero-cover-cta reveal d4">{children}</div>}
      {ribbon && <Ribbon items={ribbon} />}
    </section>
  );
}

interface TypePlateProps {
  numeral: string;
  word: string;
  caption: string;
  accent?: string;
  className?: string;
}

/** Image-free editorial plate: oversized numeral and word on a woven-paper ground, with a Fig. caption. */
export function TypePlate({ numeral, word, caption, accent, className = "" }: TypePlateProps) {
  return (
    <figure
      className={`type-plate ${className}`}
      style={accent ? ({ "--plate-accent": accent } as CSSProperties) : undefined}
    >
      <div className="type-plate-face" aria-hidden="true">
        <span className="type-plate-numeral">{numeral}</span>
        <span className="type-plate-word">{word}</span>
        <span className="type-plate-corner tl" />
        <span className="type-plate-corner br" />
      </div>
      <figcaption className="realm-caption">
        <span>Fig. {numeral}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
