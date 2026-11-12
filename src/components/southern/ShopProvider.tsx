import { createContext, type Context, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { addAddonToCart, addProductToCart, changeCartQty, parseStoredCart } from "@/lib/southern/cart";
import { formatPrice, isCurrency, type Currency } from "@/lib/southern/format";
import { addOns, getProductById, products } from "@/lib/southern/products";
import type { CartItem, Product } from "@/lib/southern/types";

const CART_KEY = "southern_edit_cart";
const CURRENCY_KEY = "southern_edit_currency";
const ACTIVE_CART_ITEM_IDS = new Set([...products.map((product) => product.id), ...addOns.map((addon) => addon.id)]);

interface Toast {
  id: number;
  message: string;
}

interface ShopContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  price: (amountInINR: number) => string;
  cart: CartItem[];
  addToBag: (productId: string, options?: { colorIndex?: number; modeIndex?: number; fromModal?: boolean }) => void;
  addAddon: (addonId: string) => void;
  changeQty: (index: number, delta: number) => void;
  clearCart: () => void;
  showToast: (message: string) => void;
  toasts: Toast[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
  lookbookRealmId: string | null;
  openLookbook: (realmId: string) => void;
  closeLookbook: () => void;
  audioActive: boolean;
  toggleAudio: () => void;
}

// Keep one context object across hot reloads: when this module (or a data file it imports) is
// re-evaluated in dev, a fresh createContext() would no longer match the provider already mounted
// in the root route, and every useShop() call would throw.
const CONTEXT_KEY = "__southernEditShopContext";
type ShopContextGlobal = typeof globalThis & {
  [CONTEXT_KEY]?: Context<ShopContextValue | null>;
};
const contextHost = globalThis as ShopContextGlobal;
const ShopContext = (contextHost[CONTEXT_KEY] ??= createContext<ShopContextValue | null>(null));

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lookbookRealmId, setLookbookRealmId] = useState<string | null>(null);
  const [audioActive, setAudioActive] = useState(false);
  const toastId = useRef(0);
  const audioCtx = useRef<AudioContext | null>(null);
  const audioInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioActiveRef = useRef(false);

  // Restore saved bag and currency after hydration.
  useEffect(() => {
    setCart(parseStoredCart(localStorage.getItem(CART_KEY)).filter((item) => ACTIVE_CART_ITEM_IDS.has(item.id)));
    const savedCurrency = localStorage.getItem(CURRENCY_KEY);
    if (isCurrency(savedCurrency)) setCurrencyState(savedCurrency);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  const showToast = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((list) => [...list, { id, message }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3200);
  }, []);

  const price = useCallback((amount: number) => formatPrice(amount, currency), [currency]);

  const setCurrency = useCallback(
    (next: Currency) => {
      setCurrencyState(next);
      localStorage.setItem(CURRENCY_KEY, next);
      showToast(`Currency: ${next} (indicative)`);
    },
    [showToast],
  );

  const addToBag = useCallback<ShopContextValue["addToBag"]>(
    (productId, options = {}) => {
      const product = getProductById(productId);
      if (!product) return;
      setCart((current) => addProductToCart(current, product, options.colorIndex ?? 0, options.modeIndex));
      showToast(`Added ${product.name} to bag`);
      if (options.fromModal) setQuickViewProduct(null);
      setCartOpen(true);
    },
    [showToast],
  );

  const addAddon = useCallback(
    (addonId: string) => {
      const addon = addOns.find((a) => a.id === addonId);
      if (!addon) return;
      setCart((current) => addAddonToCart(current, addon));
      showToast(`Added ${addon.name}`);
    },
    [showToast],
  );

  const changeQty = useCallback((index: number, delta: number) => {
    setCart((current) => changeCartQty(current, index, delta));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const openQuickView = useCallback((productId: string) => {
    const product = getProductById(productId);
    if (product) setQuickViewProduct(product);
  }, []);

  const toggleAudio = useCallback(() => {
    const next = !audioActiveRef.current;
    audioActiveRef.current = next;
    setAudioActive(next);
    if (!next) {
      if (audioInterval.current) clearInterval(audioInterval.current);
      audioInterval.current = null;
      return;
    }
    if (!audioCtx.current) {
      const Ctx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx.current = new Ctx();
    }
    if (audioCtx.current.state === "suspended") void audioCtx.current.resume();

    // Synthesised pit-loom shuttle & reed strokes.
    const stroke = (isReed: boolean) => {
      const ctx = audioCtx.current;
      if (!audioActiveRef.current || !ctx) return;
      const now = ctx.currentTime;
      const size = Math.floor(ctx.sampleRate * 0.04);
      const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (size * 0.25));
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(isReed ? 850 : 1350, now);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start(now);
    };

    let step = 0;
    if (audioInterval.current) clearInterval(audioInterval.current);
    audioInterval.current = setInterval(() => {
      if (audioActiveRef.current) stroke(step % 2 === 1);
      step += 1;
    }, 780);
  }, []);

  useEffect(
    () => () => {
      if (audioInterval.current) clearInterval(audioInterval.current);
    },
    [],
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      currency,
      setCurrency,
      price,
      cart,
      addToBag,
      addAddon,
      changeQty,
      clearCart,
      showToast,
      toasts,
      cartOpen,
      setCartOpen,
      quickViewProduct,
      openQuickView,
      closeQuickView: () => setQuickViewProduct(null),
      lookbookRealmId,
      openLookbook: setLookbookRealmId,
      closeLookbook: () => setLookbookRealmId(null),
      audioActive,
      toggleAudio,
    }),
    [
      currency,
      setCurrency,
      price,
      cart,
      addToBag,
      addAddon,
      changeQty,
      clearCart,
      showToast,
      toasts,
      cartOpen,
      quickViewProduct,
      openQuickView,
      lookbookRealmId,
      audioActive,
      toggleAudio,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
