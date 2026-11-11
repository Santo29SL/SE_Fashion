import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { products } from "./products";

describe("product lookbook views", () => {
  it("gives every product at least three angles (front, side/back) for the drag viewer", () => {
    for (const product of products) {
      expect(product.imageViews?.length ?? 0, product.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("stores every view image in public/images/products", () => {
    for (const product of products) {
      for (const view of product.imageViews ?? []) {
        expect(view.src.startsWith("/images/products/"), view.src).toBe(true);
        expect(existsSync(resolve(process.cwd(), "public", view.src.slice(1))), view.src).toBe(true);
      }
    }
  });
});
