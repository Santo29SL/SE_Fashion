import type { Realm } from "./types";

/**
 * The home-hero "anatomy" of the Revival Overshirt: each part of the garment,
 * where its cloth was salvaged and who remade it. Coordinates are in the
 * hero photo's own pixel space (1280 × 960) so dots and arrows stay pinned.
 */
export interface AnatomyCallout {
  no: string;
  part: string;
  realm: Realm["id"];
  state: string;
  salvaged: string;
  remade: string;
  /** Point on the garment the arrow lands on. */
  dot: { x: number; y: number };
  /** Where the label's edge sits; side decides which way the label grows. */
  label: { x: number; y: number; side: "left" | "right" };
}

export const ANATOMY_SIZE = { width: 1280, height: 960 } as const;

export const ANATOMY: AnatomyCallout[] = [
  {
    no: "01",
    part: "Collar & pocket",
    realm: "kerala",
    state: "Kerala",
    salvaged: "A Balaramapuram kasavu mundu, worn once at Onam",
    remade: "Re-starched and hand-felled by kora weavers in Balaramapuram",
    dot: { x: 618, y: 205 },
    label: { x: 905, y: 175, side: "right" },
  },
  {
    no: "02",
    part: "Body panels",
    realm: "telangana",
    state: "Andhra Pradesh",
    salvaged: "A torn Dharmavaram wedding silk from a family trunk",
    remade: "Darned, steamed and re-cut into panels in Dharmavaram",
    dot: { x: 560, y: 380 },
    label: { x: 360, y: 320, side: "left" },
  },
  {
    no: "03",
    part: "Temple border",
    realm: "tamilnadu",
    state: "Tamil Nadu",
    salvaged: "The frayed korvai pallu of a Kanchipuram sari",
    remade: "Zari re-couched by hand by a third-generation Kanchipuram weaver",
    dot: { x: 770, y: 545 },
    label: { x: 905, y: 560, side: "right" },
  },
  {
    no: "04",
    part: "Sleeves",
    realm: "telangana",
    state: "Telangana",
    salvaged: "Pochampally double-ikat cut-pieces swept off loom floors",
    remade: "Pieced and hand-stitched by the Pochampally cooperative",
    dot: { x: 462, y: 420 },
    label: { x: 360, y: 545, side: "left" },
  },
  {
    no: "05",
    part: "Trousers",
    realm: "karnataka",
    state: "Karnataka",
    salvaged: "Undyed Ilkal sari seconds that failed the loom check",
    remade: "Washed, pressed and tailored by artisans in Gadag",
    dot: { x: 540, y: 770 },
    label: { x: 360, y: 790, side: "left" },
  },
];
