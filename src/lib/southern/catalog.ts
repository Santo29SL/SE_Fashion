import { seasons } from "./seasons";
import type { Product, ProductAudience, SeasonCollection, SeasonId } from "./types";

export type SortOrder = "featured" | "price-asc" | "price-desc" | "rating";

export interface CatalogFilter {
  season?: SeasonId | "all";
  realm?: string | "all";
  audience?: ProductAudience | "all";
  sort?: SortOrder;
}

/** Filter by season, realm and audience; then sort. Featured = bestsellers first, then rating. */
export function filterCatalog(all: Product[], filter: CatalogFilter = {}): Product[] {
  const { season = "all", realm = "all", audience = "all", sort = "featured" } = filter;
  let list = [...all];
  if (season !== "all") list = list.filter((p) => p.season === season);
  if (realm !== "all") list = list.filter((p) => p.stateId === realm);
  if (audience !== "all") list = list.filter((p) => p.audience === audience);

  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
  else list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.rating - a.rating);
  return list;
}

export interface SeasonGroup {
  season: SeasonCollection;
  products: Product[];
}

/** Split an already-filtered list into season collections, in collection order, dropping empty ones. */
export function groupBySeason(list: Product[]): SeasonGroup[] {
  return seasons
    .map((season) => ({ season, products: list.filter((p) => p.season === season.id) }))
    .filter((g) => g.products.length > 0);
}
