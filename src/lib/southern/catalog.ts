import type { Product, ProductAudience } from "./types";

export type SortOrder = "featured" | "price-asc" | "price-desc" | "rating";

/** Filter by realm id, "bestseller", or "all"; then sort. Featured = bestsellers first, then rating. */
export function filterAndSortProducts(
  all: Product[],
  filter: string,
  sortOrder: SortOrder,
  audience: ProductAudience | "all" = "all",
): Product[] {
  let list = [...all];
  if (filter === "bestseller") list = list.filter((p) => p.isBestseller);
  else if (filter !== "all") list = list.filter((p) => p.stateId === filter);
  if (audience !== "all") list = list.filter((product) => product.audience === audience);

  if (sortOrder === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sortOrder === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sortOrder === "rating") list.sort((a, b) => b.rating - a.rating);
  else list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.rating - a.rating);
  return list;
}
