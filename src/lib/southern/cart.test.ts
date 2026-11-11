import { describe, expect, it } from "vitest";

import { addProductToCart, changeCartQty, shippingProgress } from "./cart";
import { formatPrice } from "./format";
import { getProductById } from "./products";

const tote = getProductById("jamakkalam-tote")!;

describe("bag rules", () => {
  it("unlocks free pan-India delivery at ₹3,000", () => {
    expect(shippingProgress(2999).unlocked).toBe(false);
    expect(shippingProgress(2999).remaining).toBe(1);
    expect(shippingProgress(3000).unlocked).toBe(true);
  });

  it("stacks the same product in the same colourway instead of adding a new line", () => {
    const once = addProductToCart([], tote);
    const twice = addProductToCart(once, tote);
    expect(twice).toHaveLength(1);
    expect(twice[0]?.quantity).toBe(2);
  });

  it("removes a line when its quantity drops to zero", () => {
    const cart = addProductToCart([], tote);
    expect(changeCartQty(cart, 0, -1)).toHaveLength(0);
  });

  it("converts INR prices at the indicative rates", () => {
    expect(formatPrice(2999, "INR")).toBe("₹2,999");
    expect(formatPrice(1000, "USD")).toBe("$12.00");
  });
});
