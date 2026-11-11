import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cartCount } from "@/lib/southern/cart";
import { CURRENCIES, isCurrency } from "@/lib/southern/format";
import { realms } from "@/lib/southern/realms";
import { CartDrawer } from "./CartDrawer";
import { LookbookDialog } from "./LookbookDialog";
import { QuickViewDialog } from "./QuickViewDialog";
import { useShop } from "./ShopProvider";

const NAV = [
  { to: "/", label: "Realms", mobile: "The 4 Realms" },
  { to: "/shop", label: "Shop", mobile: "The Collection (Shop)" },
  { to: "/journal", label: "Journal", mobile: "Journal" },
  { to: "/heritage", label: "Heritage", mobile: "Heritage & Provenance" },
] as const;

function SiteHeader({ menuOpen, onToggleMenu }: { menuOpen: boolean; onToggleMenu: () => void }) {
  const { currency, setCurrency, cart, setCartOpen } = useShop();
  return (
    <header className="site-header" id="siteHeader">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="logo-mark" aria-hidden="true" />
          <span className="brand-title">The Southern Edit</span>
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeOptions={{ exact: true, includeSearch: false }}
              activeProps={{ className: "active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <select
            className="nav-select"
            aria-label="Currency"
            value={currency}
            onChange={(e) => {
              if (isCurrency(e.target.value)) setCurrency(e.target.value);
            }}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button className="nav-btn cart-btn" type="button" aria-label="Open bag" onClick={() => setCartOpen(true)}>
            Bag <span className="cart-badge">{cartCount(cart)}</span>
          </button>
          <button
            className="nav-menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobileDrawer"
            onClick={onToggleMenu}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { audioActive, toggleAudio } = useShop();
  return (
    <>
      <div className="mobile-drawer" id="mobileDrawer" hidden={!open}>
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true, includeSearch: false }}
              activeProps={{ className: "active" }}
              onClick={onClose}
            >
              {item.mobile}
            </Link>
          ))}
        </nav>
        <button className="nav-btn" type="button" aria-pressed={audioActive} onClick={toggleAudio}>
          <span>{audioActive ? "🔊" : "🔇"}</span> <span>{audioActive ? "Loom audio on" : "Loom audio off"}</span>
        </button>
      </div>
      <div className="mobile-backdrop" hidden={!open} onClick={onClose} />
    </>
  );
}

function SiteFooter({ variant }: { variant: "home" | "default" }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="brand-title footer-brand">The Southern Edit</p>
          <p className="footer-manifesto">
            Southern culture is not behind velvet rope. It is modular, street-ready, and alive.
          </p>
        </div>
        <div>
          <p className="footer-col-title">Realms</p>
          <ul className="footer-link-list">
            {realms.map((realm) => (
              <li key={realm.id}>
                <Link to="/shop" search={{ realm: realm.id }}>
                  {realm.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {variant === "home" ? (
          <div>
            <p className="footer-col-title">Pages</p>
            <ul className="footer-link-list">
              <li>
                <Link to="/shop">Shop all artifacts</Link>
              </li>
              <li>
                <Link to="/journal">Craft journal</Link>
              </li>
              <li>
                <Link to="/heritage">Design philosophy</Link>
              </li>
              <li>
                <Link to="/heritage" hash="pricing">
                  Transparent pricing
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <p className="footer-col-title">Visit</p>
            <ul className="footer-link-list">
              <li>
                <Link to="/">The 4 Realms</Link>
              </li>
              <li>
                <Link to="/shop">The Collection</Link>
              </li>
              <li>
                <Link to="/journal">Journal</Link>
              </li>
              <li>
                <Link to="/heritage">Design philosophy</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="footer-bottom">
        <p>© 2026 The Southern Edit</p>
        <p>Handloom GI · Ethical luxury · Pan-India delivery</p>
      </div>
    </footer>
  );
}

function ToastHost() {
  const { toasts } = useShop();
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.message}
        </div>
      ))}
    </div>
  );
}

/** Shared page frame: header, mobile menu, footer, bag, quick view, lookbook and toasts. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${t})`;
      document.getElementById("siteHeader")?.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#mainContent">
        Skip to content
      </a>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <SiteHeader menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main id="mainContent">{children}</main>
      <SiteFooter variant={pathname === "/" ? "home" : "default"} />
      <QuickViewDialog />
      <CartDrawer />
      <LookbookDialog />
      <ToastHost />
    </>
  );
}

export function pageIdForPath(pathname: string): string {
  if (pathname.startsWith("/shop")) return "shop";
  if (pathname.startsWith("/journal")) return "journal";
  if (pathname.startsWith("/heritage")) return "heritage";
  return "realms";
}
