import { useEffect, type DependencyList, type RefObject } from "react";

const SELECTOR = ".journal-card, .product-card, .realm-panel, .reveal-on-view";

/** Adds `in-view` to cards inside `rootRef` as they scroll into view (fade/rise-in). */
export function useRevealOnView(rootRef: RefObject<HTMLElement | null>, deps: DependencyList = []) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll(SELECTOR);
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
