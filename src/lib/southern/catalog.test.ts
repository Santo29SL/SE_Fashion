import { describe, expect, it } from "vitest";

import { filterCatalog, groupBySeason } from "./catalog";
import { products } from "./products";
import { seasons } from "./seasons";

describe("season collections", () => {
  it("lists the collections as Summer, Fall, Winter, Spring, International", () => {
    expect(seasons.map((s) => s.name)).toEqual(["Summer", "Fall", "Winter", "Spring", "International"]);
  });

  it("puts every product in one of the five collections", () => {
    const ids = seasons.map((s) => s.id);
    for (const product of products) expect(ids, product.id).toContain(product.season);
  });

  it("fills every collection with at least five pieces", () => {
    for (const season of seasons) {
      expect(products.filter((p) => p.season === season.id).length, season.id).toBeGreaterThanOrEqual(5);
    }
  });

  it("says what salvaged material every product is made from", () => {
    for (const product of products) expect(product.salvagedFrom.trim().length, product.id).toBeGreaterThan(10);
  });

  it("filters to a single collection", () => {
    const winter = filterCatalog(products, { season: "winter" });
    expect(winter.length).toBeGreaterThan(0);
    expect(winter.every((p) => p.season === "winter")).toBe(true);
  });

  it("combines season and realm filters", () => {
    const list = filterCatalog(products, { season: "international", realm: "kerala" });
    expect(list.map((p) => p.id)).toEqual(["kuthampully-bomber"]);
  });

  it("groups the full catalog into all five collections in order", () => {
    const groups = groupBySeason(filterCatalog(products));
    expect(groups.map((g) => g.season.id)).toEqual(["summer", "fall", "winter", "spring", "international"]);
    expect(groups.reduce((n, g) => n + g.products.length, 0)).toBe(products.length);
  });
});
