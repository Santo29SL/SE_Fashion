import type { AddOn, CartItem, Product } from "./types";
import { FREE_SHIPPING_THRESHOLD } from "./format";

/** Adds a product to the bag. Same product + same colourway stacks quantity. */
export function addProductToCart(
  cart: CartItem[],
  product: Product,
  colorIndex = 0,
  modeIndex?: number,
): CartItem[] {
  const selectedColor = product.colors[colorIndex]?.name || "Standard";
  const selectedMode =
    typeof modeIndex === "number" ? product.stylingModes[modeIndex]?.name || "Default" : "Suggested styles";
  const existing = cart.find((item) => item.id === product.id && item.selectedColor === selectedColor);
  if (existing) {
    return cart.map((item) => (item === existing ? { ...item, quantity: item.quantity + 1 } : item));
  }
  return [
    ...cart,
    {
      id: product.id,
      name: product.name,
      price: product.price,
      slot: product.slots.main || "",
      image: product.imageMain || "",
      selectedColor,
      selectedMode,
      quantity: 1,
    },
  ];
}

export function addAddonToCart(cart: CartItem[], addon: AddOn): CartItem[] {
  const existing = cart.find((item) => item.id === addon.id);
  if (existing) {
    return cart.map((item) => (item === existing ? { ...item, quantity: item.quantity + 1 } : item));
  }
  return [
    ...cart,
    {
      id: addon.id,
      name: addon.name,
      price: addon.price,
      image: addon.image || "",
      slot: addon.slot || "",
      selectedColor: "Standard",
      selectedMode: "Accent",
      quantity: 1,
    },
  ];
}

/** Changes quantity of the line at `index`; lines that reach zero are removed. */
export function changeCartQty(cart: CartItem[], index: number, delta: number): CartItem[] {
  const line = cart[index];
  if (!line) return cart;
  const quantity = line.quantity + delta;
  if (quantity <= 0) return cart.filter((_, i) => i !== index);
  return cart.map((item, i) => (i === index ? { ...item, quantity } : item));
}

export function cartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/** Percentage (0–100) of the way to free shipping, and how much (INR) is still needed. */
export function shippingProgress(subtotal: number): { percent: number; remaining: number; unlocked: boolean } {
  return {
    percent: Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)),
    remaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    unlocked: subtotal >= FREE_SHIPPING_THRESHOLD,
  };
}

export function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}
