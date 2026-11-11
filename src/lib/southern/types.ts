export interface ProductColor {
  name: string;
  hex: string;
}

export interface StylingMode {
  name: string;
  note: string;
}

export interface ProductImageView {
  label: string;
  src: string;
}

export type ProductAudience = "men" | "women" | "unisex";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  stateId: string;
  stateName: string;
  realm: string;
  giTag: string;
  craft: string;
  category: string;
  audience: ProductAudience;
  rating: number;
  reviewsCount: number;
  imageMain: string;
  imageLookbook: string;
  imageDetail: string;
  imageViews?: ProductImageView[];
  slots: { main: string; lookbook: string; detail: string };
  description: string;
  specifications: {
    material: string;
    hardware?: string;
    origin: string;
    [key: string]: string | undefined;
  };
  craftStory: string;
  stylingModes: StylingMode[];
  colors: ProductColor[];
  inStock: boolean;
  isBestseller: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  slot: string;
  description: string;
}

export interface Realm {
  id: string;
  name: string;
  native: string;
  tagline: string;
  subtitle: string;
  description: string;
  moodboard: string;
  /** Editorial still-life shown beside the realm chapter on the home page. */
  photo: string;
  photoAlt: string;
  lookbookBg: string;
  slots: { moodboard: string; lookbook: string };
  accentColor: string;
  colors: string[];
  crafts: string[];
  artisanNote: string;
}

export interface HeritagePillar {
  id: string;
  index: string;
  label: string;
  badge: string;
  traditional: { title: string; body: string };
  contemporary: { title: string; body: string };
}

export interface JournalPost {
  id: string;
  /** Realm the essay belongs to — drives its accent colour. */
  realmId: string;
  /** The craft word in its native script, set large on the typographic plate. */
  native: string;
  readTime: string;
  pullQuote: string;
  kicker: string;
  title: string;
  excerpt: string;
  slot: string;
  image: string;
  imageAlt?: string;
  relatedProductIds: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  slot: string;
  image: string;
  selectedColor: string;
  selectedMode: string;
  quantity: number;
}
