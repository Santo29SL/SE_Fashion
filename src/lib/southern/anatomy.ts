import type { Realm } from "./types";

/**
 * The home-hero swing tags on the Revival Overshirt: each part of the garment,
 * where its cloth was salvaged and who remade it. Coordinates are in the
 * hero photo's own pixel space (1280 × 960) so pins and strings stay put. Tag x
 * values below 0 or above 1280 hang the tag in the margin beside the photo.
 */
export interface AnatomyCallout {
  no: string;
  part: string;
  realm: Realm["id"];
  state: string;
  salvaged: string;
  remade: string;
  /** Point on the garment where the string is pinned. */
  dot: { x: number; y: number };
  /** Centre of the tag's punched hole; the tag hangs below it, tilted by `tilt` degrees. */
  tag: { x: number; y: number; tilt: number };
}

export const ANATOMY_SIZE = { width: 1280, height: 960 } as const;

export const ANATOMY: AnatomyCallout[] = [
  {
    no: "01",
    part: "Collar & pocket",
    realm: "kerala",
    state: "Kerala",
    salvaged: "A kasavu mundu worn once at Onam",
    remade: "Hand-felled by kora weavers, Balaramapuram",
    dot: { x: 618, y: 205 },
    tag: { x: 1130, y: 40, tilt: 3 },
  },
  {
    no: "02",
    part: "Body panels",
    realm: "telangana",
    state: "Andhra Pradesh",
    salvaged: "A torn Dharmavaram wedding silk",
    remade: "Darned and re-cut in Dharmavaram",
    dot: { x: 560, y: 380 },
    tag: { x: 148, y: 120, tilt: -4 },
  },
  {
    no: "03",
    part: "Sleeves",
    realm: "telangana",
    state: "Telangana",
    salvaged: "Pochampally ikat swept off loom floors",
    remade: "Pieced by the Pochampally cooperative",
    dot: { x: 462, y: 420 },
    tag: { x: 148, y: 400, tilt: 3 },
  },
  {
    no: "04",
    part: "Temple border",
    realm: "tamilnadu",
    state: "Tamil Nadu",
    salvaged: "A frayed Kanchipuram sari pallu",
    remade: "Zari re-couched by a Kanchipuram weaver",
    dot: { x: 770, y: 545 },
    tag: { x: 1130, y: 400, tilt: -3 },
  },
  {
    no: "05",
    part: "Trousers",
    realm: "karnataka",
    state: "Karnataka",
    salvaged: "Ilkal sari seconds that failed the loom check",
    remade: "Washed and tailored in Gadag",
    dot: { x: 712, y: 790 },
    tag: { x: 1130, y: 700, tilt: 3 },
  },
];
