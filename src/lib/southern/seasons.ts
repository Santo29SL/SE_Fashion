import type { SeasonCollection, SeasonId } from "./types";

/** Shop collections in display order: Summer, Fall, Winter, Spring, then International. */
export const seasons: SeasonCollection[] = [
  {
    id: "summer",
    name: "Summer",
    months: "April – June",
    monthsShort: "Apr – Jun",
    tagline: "Cloth that breathes.",
    description:
      "Kora, kasavu and featherweight cotton for the hottest months — the cloth the South has always worn against the sun, cut loose and open.",
    salvaged: "Festival mundus worn once, flood-washed loom stock and unsold kora from cooperative godowns.",
    accentColor: "#b8913f",
    palette: ["#f6f2eb", "#d4af37", "#b9c4a8", "#d9822b"],
    image: "/images/seasons/summer.jpg",
    imageAlt: "Salvaged kora cotton and kasavu garments drying on a wooden pole in a sunlit courtyard with palm shadows",
  },
  {
    id: "fall",
    name: "Fall",
    months: "September – November",
    monthsShort: "Sep – Nov",
    tagline: "Gold for the festival season.",
    description:
      "Navaratri to Deepavali — heavy silk borders, temple zari and bell-metal brass, rescued from heirlooms and set into pieces you'll wear to every celebration.",
    salvaged: "Torn heirloom wedding silks, Gadwal and Dharmavaram borders, retired temple lamps recast as brass.",
    accentColor: "#8c3322",
    palette: ["#0f4a3c", "#611c28", "#b8913f", "#8c4e3b"],
    image: "/images/seasons/fall.jpg",
    imageAlt: "Folded green, maroon and magenta silk sari borders beside lit brass lamps and marigold garlands",
  },
  {
    id: "winter",
    name: "Winter",
    months: "December – February",
    monthsShort: "Dec – Feb",
    tagline: "Weight for the hills.",
    description:
      "For Margazhi mornings and Nilgiri mist — shepherd wool, dense pit-loom yardage and layered leather that take the chill off without losing the craft.",
    salvaged: "Retired Deccani Kambli blankets, loom-end jamakkalam yardage and saddlery leather offcuts.",
    accentColor: "#424930",
    palette: ["#2b2a29", "#f2ece0", "#9e3d2a", "#4a5335"],
    image: "/images/seasons/winter.jpg",
    imageAlt: "Folded black, grey and cream wool blankets and a Toda embroidered shawl on a bench by a misty hill window",
  },
  {
    id: "spring",
    name: "Spring",
    months: "February – April",
    monthsShort: "Feb – Apr",
    tagline: "First colour of the year.",
    description:
      "Mango blossom season — checks, ikat, hand-stitched Kasuti and printed silk squares in the brightest dyes of the year, pieced from saris families had put away.",
    salvaged: "Faded Narayanpet and Ilkal saris, Pochampally ikat cut-pieces and silk sample lengths.",
    accentColor: "#9b1c1f",
    palette: ["#9b1c1f", "#d9a21b", "#1b2838", "#f6f2eb"],
    image: "/images/seasons/spring.jpg",
    imageAlt: "Kalamkari floral cloth and a red embroidered sari over a cane chair beside mango blossoms and bowls of natural dye",
  },
  {
    id: "international",
    name: "International",
    months: "All year · Worldwide",
    monthsShort: "Worldwide",
    tagline: "The South, worn anywhere.",
    description:
      "Trench, bomber, denim, tie — global silhouettes cut from Dravidian cloth for cities, offices and airports far from the loom that made them.",
    salvaged: "Chettiar trunk Kandangi, Kerala wedding saris, worn Kanchipuram pallus and post-wear denim.",
    accentColor: "#1b2838",
    palette: ["#1b2838", "#b5531e", "#efe6d2", "#2b2a29"],
    image: "/images/seasons/international.jpg",
    imageAlt: "A check trench coat with a gold temple border and a navy silk tie on a steel rail in a pale gallery",
  },
];

export const seasonIds = seasons.map((s) => s.id);

export function isSeasonId(value: unknown): value is SeasonId {
  return typeof value === "string" && (seasonIds as string[]).includes(value);
}

export function getSeason(id: SeasonId): SeasonCollection {
  const season = seasons.find((s) => s.id === id);
  if (!season) throw new Error(`Unknown season ${id}`);
  return season;
}
