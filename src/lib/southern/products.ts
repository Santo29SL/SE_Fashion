import type { Product, AddOn } from "./types";

export const products: Product[] = [
  // -------------------------------------------------------------
  // TAMIL NADU (The Temple & Loom Realm)
  // -------------------------------------------------------------
  {
    id: "jamakkalam-tote",
    season: "winter",
    salvagedFrom: "Surplus loom-end yardage from Bhavani jamakkalam cooperatives",
    audience: "unisex",
    name: "Jamakkalam TOTE",
    subtitle: "Heavyweight Bhavani Chevron Handloom × Sculpted Leather",
    price: 2999,
    originalPrice: 3899,
    stateId: "tamilnadu",
    stateName: "Tamil Nadu",
    realm: "The Temple & Loom Realm",
    giTag: "GI Tagged: Bhavani Jamakkalam (TN-04)",
    craft: "Handloom Bhavani Jamakkalam Weave",
    category: "Bags & Totes",
    rating: 4.9,
    reviewsCount: 38,
    imageMain: "/images/products/01-jamakkalam-tote-front.jpg",
    imageLookbook: "/images/products/01-jamakkalam-tote-front.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/01-jamakkalam-tote-front.jpg" },
      { label: "Right", src: "/images/products/01-jamakkalam-tote-right.jpg" },
      { label: "Back", src: "/images/products/01-jamakkalam-tote-back.jpg" },
      { label: "Left", src: "/images/products/01-jamakkalam-tote-left.jpg" },
    ],
    slots: {
      main: "images/products/01-jamakkalam-tote.jpg",
      lookbook: "images/products/01-jamakkalam-tote.jpg",
      detail: "images/details/jamakkalam_tote_swatch_box.webp"
    },
    description: "Reinterpreting the iconic Tamil Nadu Jamakkalam rug weave into a structured, oversized everyday tote. Crafted with hand-dyed cotton yarn in earthen terracottas, indigo stripes, and solid brass temple door-knocker hardware.",
    specifications: {
      material: "100% Bhavani Handloom Heavy Cotton & Full-Grain Tan Leather Trim",
      hardware: "Cast Antique Brass Ring Pulls & Embossed Temple Charm",
      dimensions: "44cm (W) × 38cm (H) × 14cm (D)",
      closure: "Concealed Magnetic Snap with Interior Zippered Passport Pocket",
      origin: "Bhavani, Erode District, Tamil Nadu"
    },
    craftStory: "Historically woven since the 19th century by master weavers in Bhavani on pit looms, the Jamakkalam is famed for its extreme durability and dense geometric chevron stripes. We sourced excess loom yardage directly from weaver cooperatives to create this modern utility tote.",
    stylingModes: [
      { name: "Shoulder Carry", note: "Dual rolled-leather strap drop for effortless daily commute" },
      { name: "Top-Handle Grip", note: "Solid brass hoop handles for structured gallery visits" },
      { name: "Luggage Slip", note: "Rear slit pocket sits securely over rolling luggage handles" }
    ],
    colors: [
      { name: "Madder Terracotta & Indigo", hex: "#9e3d2a" },
      { name: "Raw Ecru & Temple Gold", hex: "#c5a059" },
      { name: "Midnight Chola Navy", hex: "#1b2838" }
    ],
    inStock: true,
    isBestseller: true
  },
  {
    id: "madras-check-vest",
    season: "summer",
    salvagedFrom: "Deadstock Madras check bolts from shuttered Chennai export mills",
    audience: "men",
    name: "Madras Check SHIRT / VEST",
    subtitle: "Tailored Sleeveless Waistcoat in Handwoven Bleeding Madras",
    price: 4999,
    originalPrice: 5999,
    stateId: "tamilnadu",
    stateName: "Tamil Nadu",
    realm: "The Temple & Loom Realm",
    giTag: "GI Tagged: Madras Check (TN-08)",
    craft: "Authentic Hand-Spun Madras Plaid Yarn-Dye",
    category: "Outerwear & Tops",
    rating: 4.8,
    reviewsCount: 31,
    imageMain: "/images/products/02-madras-check-vest-front.jpg",
    imageLookbook: "/images/products/02-madras-check-vest-front.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/02-madras-check-vest-front.jpg" },
      { label: "Right", src: "/images/products/02-madras-check-vest-right.jpg" },
      { label: "Back", src: "/images/products/02-madras-check-vest-back.jpg" },
      { label: "Left", src: "/images/products/02-madras-check-vest-left.jpg" },
    ],
    slots: {
      main: "images/products/02-madras-check-vest.jpg",
      lookbook: "images/products/02-madras-check-vest.jpg",
      detail: "images/details/madras_check_vest_styling_box.webp"
    },
    description: "A sharply tailored, sleeveless waistcoat that bridges 19th-century Madras heritage with modern modular layering. Features real water-buffalo horn buttons, cinch-back adjustable strap, and angled welt pockets.",
    specifications: {
      material: "100% Hand-Spun Lightweight Madras Cotton Plaid",
      lining: "Breathable Raw Mulmul Cotton in Kora Cream",
      buttons: "Hand-turned Natural Horn with 4-hole cross-stitch",
      hardware: "Antiqued Metal Cinch Buckle at back waist",
      origin: "Woven in Chennai (Madras) cluster, Tamil Nadu"
    },
    craftStory: "Madras plaid gained legendary global fame for its vibrant vegetable dyes that subtly matured and softened over washes ('bleeding Madras'). This vest takes the relaxed warm-weather textile and structures it into architectural tailoring.",
    stylingModes: [
      { name: "Sleeveless Bare", note: "Wear solo with high-waisted linen trousers for summer rooftop evenings" },
      { name: "Layered over Poplin", note: "Pair over an oversized crisp white button-down shirt" },
      { name: "Under Tailored Blazer", note: "Tucked beneath an unstructured blazer as a vibrant heritage pop" }
    ],
    colors: [
      { name: "Sunset Madras (Ochre / Navy / Madder)", hex: "#d9822b" },
      { name: "Forest Madras (Sage / Ecru / Indigo)", hex: "#4f563b" }
    ],
    inStock: true,
    isBestseller: false
  },
  {
    id: "athangudi-belt",
    season: "fall",
    salvagedFrom: "Tannery leather offcuts; inlay pigment ground from broken Athangudi tiles",
    audience: "unisex",
    name: "Athangudi Tile Inspired BELT",
    subtitle: "Full-Grain Italian Bridle Leather × Handcrafted Floral Tile Inlays",
    price: 2999,
    originalPrice: 3599,
    stateId: "tamilnadu",
    stateName: "Tamil Nadu",
    realm: "The Temple & Loom Realm",
    giTag: "Heritage Craft: Chettinad Athangudi Tiles",
    craft: "Cold-Cast Cement Ceramic Pigment Art on Leather",
    category: "Leather & Belts",
    rating: 4.9,
    reviewsCount: 19,
    imageMain: "/images/products/03-athangudi-belt-front.jpg",
    imageLookbook: "/images/products/03-athangudi-belt-front.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/03-athangudi-belt-front.jpg" },
      { label: "Right", src: "/images/products/03-athangudi-belt-right.jpg" },
      { label: "Back", src: "/images/products/03-athangudi-belt-back.jpg" },
      { label: "Left", src: "/images/products/03-athangudi-belt-left.jpg" },
    ],
    slots: {
      main: "images/products/03-athangudi-belt.jpg",
      lookbook: "images/products/03-athangudi-belt.jpg",
      detail: "images/details/athangudi_belt_tiles_box.webp"
    },
    description: "Inspired by the famed handmade geometric cement tiles of Athangudi palaces in Chettinad. Features hand-enameled resin medallion plates set into vegetable-tanned bridle leather with a heavy solid brass buckle.",
    specifications: {
      material: "3.8mm Vegetable Tanned Full-Grain Tuscan Leather",
      hardware: "Solid Antiqued Brass Monolithic Buckle",
      width: "38mm (1.5 inches) standard loop fit",
      dimensions: "Available in S (30-32), M (34-36), L (38-40)",
      origin: "Chettinad region, Sivaganga District, Tamil Nadu"
    },
    craftStory: "In the 19th century, Chettiar merchants commissioned local artisans to formulate unique handmade tiles using local sand, cement, and vegetable pigments cured in sunlight. This belt captures their hypnotic symmetry.",
    stylingModes: [
      { name: "High-Waist Cinch", note: "Cinch over oversized blazers, coats, or maxi dresses" },
      { name: "Low-Slung Denim", note: "Threaded through raw denim or relaxed workwear trousers" }
    ],
    colors: [
      { name: "Cognac Tan × Athangudi Blue", hex: "#8c5332" },
      { name: "Obsidian Black × Ochre Floral", hex: "#1a1817" }
    ],
    inStock: true,
    isBestseller: false
  },
  {
    id: "kanchivaram-tie",
    season: "international",
    salvagedFrom: "Pallus cut from worn heirloom Kanchipuram wedding saris",
    audience: "men",
    name: "Kanchivaram Silk TIE",
    subtitle: "Upcycled Heritage Sari Pallu × Antiqued Paisley (Manga) Motif",
    price: 2499,
    originalPrice: 3299,
    stateId: "tamilnadu",
    stateName: "Tamil Nadu",
    realm: "The Temple & Loom Realm",
    giTag: "GI Tagged: Kanchipuram Silk (TN-01)",
    craft: "Pure Mulberry Silk 3-Ply Weave with Zari Pallu",
    category: "Accessories & Neckwear",
    rating: 5.0,
    reviewsCount: 42,
    imageMain: "/images/products/04-kanchivaram-tie-front.jpg",
    imageLookbook: "/images/products/04-kanchivaram-tie-front.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/04-kanchivaram-tie-front.jpg" },
      { label: "Back", src: "/images/products/04-kanchivaram-tie-back.jpg" },
      { label: "Left", src: "/images/products/04-kanchivaram-tie-left.jpg" },
    ],
    slots: {
      main: "images/products/04-kanchivaram-tie.jpg",
      lookbook: "images/products/04-kanchivaram-tie.jpg",
      detail: "images/details/kanchivaram_tie_fabric_box.webp"
    },
    description: "Cut from deconstructed genuine Kanchipuram sari borders, each necktie is an unrepeatable work of wearable art. Midnight navy pure silk woven with antique copper and gold zari paisleys (*manga*) and temple spires (*rudraksha*).",
    specifications: {
      material: "100% Pure Mulberry Silk with Genuine Metallic Zari Weft",
      hardware: "Double-Brushed Wool Interlining for crisp dimples",
      dimensions: "Contemporary 7.5cm (3 inch) blade width with hand-rolled tip",
      origin: "Kanchipuram, Tamil Nadu"
    },
    craftStory: "Kanchipuram weavers trace their descent to the celestial weaver of the gods, Sage Markanda. By adapting archival sari pallus into boardroom and cocktail neckwear, we preserve temple motifs for the global contemporary collector.",
    stylingModes: [
      { name: "Formal Four-in-Hand", note: "Classic tailored knot paired with dark charcoal or navy tailoring" },
      { name: "Loosened Collar", note: "Worn untucked and slightly unfastened over a denim chore jacket" }
    ],
    colors: [
      { name: "Midnight Navy × Copper Manga", hex: "#1b2838" },
      { name: "Royal Emerald × Gold Korvai", hex: "#1f3b2d" },
      { name: "Deep Ruby × Antique Bronze", hex: "#611c28" }
    ],
    inStock: true,
    isBestseller: true
  },
  {
    id: "kanchi-bandana",
    season: "spring",
    salvagedFrom: "Unsold Kanchipuram silk borders and weavers' sample lengths",
    audience: "unisex",
    name: "The Kanchi BANDANA",
    subtitle: "55×55cm Pure Silk Square × Four-Way Modular Transformer",
    price: 1499,
    originalPrice: 1999,
    stateId: "tamilnadu",
    stateName: "Tamil Nadu",
    realm: "The Temple & Loom Realm",
    giTag: "GI Tagged: Kanchipuram Silk (TN-01)",
    craft: "Hand-Rolled Hemmed Pure Mulberry Silk with Gold Zari Border",
    category: "Scarves & Modular Accents",
    rating: 4.9,
    reviewsCount: 67,
    imageMain: "/images/products/05-kanchi-bandana-front.jpg",
    imageLookbook: "/images/products/05-kanchi-bandana-front.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/05-kanchi-bandana-front.jpg" },
      { label: "Back", src: "/images/products/05-kanchi-bandana-back.jpg" },
      { label: "Left", src: "/images/products/05-kanchi-bandana-left.jpg" },
    ],
    slots: {
      main: "images/products/05-kanchi-bandana.jpg",
      lookbook: "images/products/05-kanchi-bandana.jpg",
      detail: "images/details/kanchi_bandana_styles_box.webp"
    },
    description: "Our signature multi-functional accessory, engineered for 4 distinct modular wear styles. A 55×55cm pure mulberry silk square in rich temple maroon, framed by an authentic miniature gold temple gopuram border.",
    specifications: {
      material: "100% Heavy Mulberry Silk Twill (16 momme)",
      hardware: "Hand-Rolled and Hand-Stitched Contrast Edges",
      dimensions: "55cm × 55cm (21.6 × 21.6 inches)",
      origin: "Handwoven in Kanchipuram, Tamil Nadu"
    },
    craftStory: "Inspired by the ceremonial silks worn in Tamil temple processions, deconstructed into a versatile streetwear staple that adapts to any gender, climate, or aesthetic.",
    stylingModes: [
      { name: "Headscarf / Babushka", note: "Fold into triangle, drape over hair and knot behind neck" },
      { name: "Bandana Neck Tie", note: "Roll into slim band and double-knot at collarbone" },
      { name: "Tote Bag Accent", note: "Wrap tightly around Jamakkalam Tote handle" },
      { name: "Wrist Wrap", note: "Multi-layered wrist cuff with antique brass temple charm" }
    ],
    colors: [
      { name: "Temple Maroon & Gold Zari", hex: "#611c28" },
      { name: "Kalamkari Ochre & Indigo", hex: "#d9822b" },
      { name: "Emerald Kora & Bronze", hex: "#1f3b2d" }
    ],
    inStock: true,
    isBestseller: true
  },

  // -------------------------------------------------------------
  // KERALA (The Kora & Kasavu Realm)
  // -------------------------------------------------------------
  {
    id: "kasavu-halter",
    season: "summer",
    salvagedFrom: "Onam kasavu mundus handed back after a single festival wear",
    audience: "women",
    name: "Kasavu HALTER NECK",
    subtitle: "Unbleached Kora Cotton × Liquid Gold Woven Metallic Kasavu",
    price: 2499,
    originalPrice: 3199,
    stateId: "kerala",
    stateName: "Kerala",
    realm: "The Kora & Kasavu Realm",
    giTag: "GI Tagged: Balaramapuram Sarees & Fine Fabrics (KL-01)",
    craft: "Handloom Fine Count Kora Cotton with Zari Border",
    category: "Tops & Blouses",
    rating: 5.0,
    reviewsCount: 56,
    imageMain: "/images/products/06-kasavu-halter.jpg",
    imageLookbook: "/images/products/06-kasavu-halter.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/06-kasavu-halter.jpg" },
      { label: "Side", src: "/images/products/06-kasavu-halter-side.jpg" },
      { label: "Back", src: "/images/products/06-kasavu-halter-back.jpg" },
    ],
    slots: {
      main: "images/products/06-kasavu-halter.jpg",
      lookbook: "images/products/06-kasavu-halter.jpg",
      detail: "images/details/kasavu_halter_texture_box.webp"
    },
    description: "A tribute to Kerala's timeless Onam Kasavu elegance. Spun from featherlight unbleached kora cotton, accented with gleaming woven gold kasavu temple borders, and secured with back multi-tie strings for an adaptable silhouette.",
    specifications: {
      material: "100% Hand-Spun Unbleached Kerala Kora Cotton & Pure Kasavu Zari",
      hardware: "Adjustable Crossed Tie-Up Back Strap with Brass Bead Finials",
      dimensions: "Free size with adjustable back wrap harness",
      origin: "Balaramapuram & Chendamangalam clusters, Kerala"
    },
    craftStory: "Balaramapuram handloom originated under the reign of Maharaja Balarama Varma of Travancore. Kasavu's signature gold-on-cream purity symbolizes divine temple ceremonies, sunlight over coconut groves, and festive renewal.",
    stylingModes: [
      { name: "Open Back Tie", note: "Crisp halter collar with criss-cross back bow for warm coastal days" },
      { name: "Under Structured Suit", note: "Gold kasavu collar peeking out from an oversized charcoal blazer" },
      { name: "Tucked into Silk Trouser", note: "Elevated evening wear paired with high-waisted palazzo pants" }
    ],
    colors: [
      { name: "Kora Ecru × Royal Gold Kasavu", hex: "#f7f4ed" },
      { name: "Monsoon Sage × Fine Gold Zari", hex: "#4f563b" }
    ],
    inStock: true,
    isBestseller: true
  },
  {
    id: "balaramapuram-cape",
    season: "winter",
    salvagedFrom: "Loom-shed seconds from Balaramapuram handloom societies",
    audience: "unisex",
    name: "Balaramapuram Kora WRAP CAPE",
    subtitle: "Fine-Count Handspun Kora Cotton × Liquid Gold Kasavu Selvedge",
    price: 3899,
    originalPrice: 4799,
    stateId: "kerala",
    stateName: "Kerala",
    realm: "The Kora & Kasavu Realm",
    giTag: "GI Tagged: Balaramapuram Sarees & Fine Fabrics (KL-01)",
    craft: "Travancore Pit-Loom Fine Cotton Weave",
    category: "Outerwear & Tops",
    rating: 4.9,
    reviewsCount: 27,
    imageMain: "/images/products/07-balaramapuram-cape.jpg",
    imageLookbook: "/images/products/07-balaramapuram-cape.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/07-balaramapuram-cape.jpg" },
      { label: "Side", src: "/images/products/07-balaramapuram-cape-side.jpg" },
      { label: "Back", src: "/images/products/07-balaramapuram-cape-back.jpg" },
    ],
    slots: {
      main: "images/products/07-balaramapuram-cape.jpg",
      lookbook: "images/products/07-balaramapuram-cape.jpg",
      detail: "images/details/kasavu_halter_texture_box.webp"
    },
    description: "An ethereal outer layer constructed from 80s count unbleached Balaramapuram kora cotton. Edged with a 2-inch liquid gold Kasavu border and secured at the collar with a hand-turned solid brass toggle needle.",
    specifications: {
      material: "100% Certified Handspun Kora Cotton (80s count) & Metallic Kasavu Zari",
      hardware: "Cast Architectural Brass Toggle Needle and Ring Fastener",
      dimensions: "140cm × 110cm asymmetrical fluid drape",
      origin: "Travancore Handloom Society, Balaramapuram, Kerala"
    },
    craftStory: "Woven in damp coastal pit-looms where humidity lends exceptional tensile strength to ultra-fine yarn. The raw ecru cotton retains its natural seed specks, unbleached and chemical-free.",
    stylingModes: [
      { name: "Asymmetric Shoulder Pin", note: "Fasten brass needle at left collarbone for Grecian silhouette" },
      { name: "Open Kimono Drape", note: "Wear loosely draped over graphic tees or silk camisoles" }
    ],
    colors: [
      { name: "Raw Kora Ecru & Gold Zari", hex: "#f7f4ed" },
      { name: "Temple Sandalwood & Bronze", hex: "#c5a059" }
    ],
    inStock: true,
    isBestseller: false
  },
  {
    id: "chendamangalam-stole",
    season: "summer",
    salvagedFrom: "Flood-soaked Chendamangalam stock, river-washed and restored",
    audience: "unisex",
    name: "Chendamangalam Temple STOLE",
    subtitle: "Handloom Fine Cotton × Dipped Madder Red Temple Border",
    price: 1999,
    originalPrice: 2499,
    stateId: "kerala",
    stateName: "Kerala",
    realm: "The Kora & Kasavu Realm",
    giTag: "GI Tagged: Chendamangalam Handloom (KL-02)",
    craft: "Traditional Kasavu Pullu Motifs on Fine Cotton",
    category: "Scarves & Modular Accents",
    rating: 4.8,
    reviewsCount: 34,
    imageMain: "/images/products/08-chendamangalam-stole.jpg",
    imageLookbook: "/images/products/08-chendamangalam-stole.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/08-chendamangalam-stole.jpg" },
      { label: "Side", src: "/images/products/08-chendamangalam-stole-side.jpg" },
      { label: "Back", src: "/images/products/08-chendamangalam-stole-back.jpg" },
    ],
    slots: {
      main: "images/products/08-chendamangalam-stole.jpg",
      lookbook: "images/products/08-chendamangalam-stole.jpg",
      detail: "images/details/kasavu_halter_texture_box.webp"
    },
    description: "A lightweight, breathable stole featuring Chendamangalam's signature dipped red *karai* selvedge and subtle geometric *pullu* (star) motifs woven in liquid gold thread along both fringes.",
    specifications: {
      material: "100% River-Washed Natural Handloom Cotton",
      hardware: "Hand-Twisted Fringe Tassels with Brass End Beads",
      dimensions: "70cm × 200cm generous length",
      origin: "Chendamangalam Weaver Co-operative, Ernakulam, Kerala"
    },
    craftStory: "Chendamangalam weavers survived devastating floods through their unbreakable cooperative solidarity. This piece honors their heritage of pristine white-gold drapes, softened for all climates.",
    stylingModes: [
      { name: "Loop Drape", note: "Classic Parisian wrap around tailored linen coats" },
      { name: "Waist Sash", note: "Cinch around oversized poplin tunics as a striking red-gold focal line" }
    ],
    colors: [
      { name: "Ivory Cotton × Madder Red Karai", hex: "#8c3322" },
      { name: "Ivory Cotton × Forest Green Karai", hex: "#4f563b" }
    ],
    inStock: true,
    isBestseller: false
  },
  {
    id: "travancore-lotus-ring",
    season: "fall",
    salvagedFrom: "Retired temple lamps and cracked bell metal, melted and recast",
    audience: "men",
    name: "Travancore Lotus SIGNET RING",
    subtitle: "Lost-Wax Cast Antique Brass × Padmanabhaswamy Floral Crest",
    price: 1499,
    originalPrice: 1899,
    stateId: "kerala",
    stateName: "Kerala",
    realm: "The Kora & Kasavu Realm",
    giTag: "Heritage Craft: Kerala Temple Bell Metal",
    craft: "Aranmula Lost-Wax Bell Metal Casting",
    category: "Accessories & Hardware",
    rating: 5.0,
    reviewsCount: 48,
    imageMain: "/images/products/09-travancore-lotus-ring.jpg",
    imageLookbook: "/images/products/09-travancore-lotus-ring.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/09-travancore-lotus-ring.jpg" },
      { label: "Side", src: "/images/products/09-travancore-lotus-ring-side.jpg" },
      { label: "Back", src: "/images/products/09-travancore-lotus-ring-back.jpg" },
    ],
    slots: {
      main: "images/products/09-travancore-lotus-ring.jpg",
      lookbook: "images/products/09-travancore-lotus-ring.jpg",
      detail: "images/details/athangudi_belt_tiles_box.webp"
    },
    description: "A monolithic signet ring sculpted by Aranmula bell-metal artisans. Depicts the eight-petal sacred lotus motif from Travancore royal vaults, hand-polished to a warm burnished golden patina.",
    specifications: {
      material: "Solid Architectural Brass with Lost-Wax Finish",
      hardware: "Micro-Carved Floral Mandala Crest Face (22mm)",
      dimensions: "Available in US Ring Sizes 7, 8, 9, 10, 11",
      origin: "Aranmula & Thiruvananthapuram, Kerala"
    },
    craftStory: "Crafted using the ancient cire-perdue (lost wax) technique handed down across seven generations of Kerala temple metalsmiths, ensuring every casting retains unique organic character.",
    stylingModes: [
      { name: "Index Statement", note: "Worn on index finger for bold architectural styling" },
      { name: "Scarf Slide", note: "Thread small silk bandanas through ring band as an ornate scarf slide" }
    ],
    colors: [
      { name: "Antiqued Burnished Gold", hex: "#d4af37" },
      { name: "Dark Patina Bronze", hex: "#423429" }
    ],
    inStock: true,
    isBestseller: true
  },

  // -------------------------------------------------------------
  // KARNATAKA (The Chalukyan Stone & Silk Realm)
  // -------------------------------------------------------------
  {
    id: "mysore-silk-jean",
    season: "international",
    salvagedFrom: "Post-wear selvedge denim with Mysore crepe silk sample yardage",
    audience: "unisex",
    name: "Mysore Silk JEAN",
    subtitle: "Raw Washed Olive Denim × Crimson Mysore Silk Gusset",
    price: 5999,
    originalPrice: 7499,
    stateId: "karnataka",
    stateName: "Karnataka",
    realm: "The Chalukyan Stone & Silk Realm",
    giTag: "GI Tagged: Mysore Silk (KA-01)",
    craft: "Pure Karnataka Mulberry Silk with Zari Slits",
    category: "Denim & Bottoms",
    rating: 5.0,
    reviewsCount: 24,
    imageMain: "/images/products/10-mysore-silk-jean.jpg",
    imageLookbook: "/images/products/10-mysore-silk-jean.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/10-mysore-silk-jean.jpg" },
      { label: "Side", src: "/images/products/10-mysore-silk-jean-side.jpg" },
      { label: "Back", src: "/images/products/10-mysore-silk-jean-back.jpg" },
    ],
    slots: {
      main: "images/products/10-mysore-silk-jean.jpg",
      lookbook: "images/products/10-mysore-silk-jean.jpg",
      detail: "images/details/mysore_silk_jean_swatch_box.webp"
    },
    description: "A bold intersection of utilitarian olive workwear denim and 100% pure royal Mysore silk. Deep outer ankle slits reveal cascading burgundy silk panels edged in micro gold zari and delicate hand-tied thread tassels.",
    specifications: {
      material: "13.5oz Washed Selvedge Cotton Denim & 100% Pure Mysore Crepe Silk Gusset",
      hardware: "Antiqued Brass Shank Buttons with Chalukyan Filigree Engraving",
      dimensions: "Straight Fit with 28cm Ankle Split Opening (Sizes 28 to 38)",
      origin: "Silk from Mysore; Denim tailored in Bengaluru, Karnataka"
    },
    craftStory: "Mysore silk has been royal court attire since the era of Tipu Sultan and the Wadiyars, renowned for its shimmering luster and pure gold zari thread. Here, royal court regalia is deconstructed into street-ready flared movement.",
    stylingModes: [
      { name: "Open Flare", note: "Unbutton lower cuff to reveal full crimson silk drape over boots" },
      { name: "Cuffed Stealth", note: "Invert cuff upward for a subtle flash of gold zari at the ankle" },
      { name: "Sneaker Break", note: "Drapes cleanly over high-top sneakers with intentional pooling" }
    ],
    colors: [
      { name: "Washed Olive × Crimson Zari", hex: "#4a5335" },
      { name: "Deep Charcoal × Royal Gold", hex: "#2b2a29" },
      { name: "Sandstone Khaki × Peacock Blue", hex: "#8c6d3b" }
    ],
    inStock: true,
    isBestseller: true
  },
  {
    id: "chalukyan-belt",
    season: "winter",
    salvagedFrom: "Saddlery leather offcuts; buckle cast from reclaimed brass vessels",
    audience: "men",
    name: "Chalukyan Cast Brass BUCKLE BELT",
    subtitle: "Full-Grain Waxed Harness Leather × Hand-Forged Lion Filigree",
    price: 2799,
    originalPrice: 3499,
    stateId: "karnataka",
    stateName: "Karnataka",
    realm: "The Chalukyan Stone & Silk Realm",
    giTag: "Heritage Craft: Chalukyan Brass Casting",
    craft: "Lost-Wax Bell Metal Relief on Waxed Leather",
    category: "Leather & Belts",
    rating: 4.9,
    reviewsCount: 33,
    imageMain: "/images/products/11-chalukyan-belt.jpg",
    imageLookbook: "/images/products/11-chalukyan-belt.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/11-chalukyan-belt.jpg" },
      { label: "Side", src: "/images/products/11-chalukyan-belt-side.jpg" },
      { label: "Back", src: "/images/products/11-chalukyan-belt-back.jpg" },
    ],
    slots: {
      main: "images/products/11-chalukyan-belt.jpg",
      lookbook: "/images/products/11-chalukyan-belt.jpg",
      detail: "images/details/athangudi_belt_tiles_box.webp"
    },
    description: "Channeling the 6th-century rock-cut temple shrines of Badami and Aihole. A heavyweight monolithic belt featuring a hand-forged Chalukyan lion crest buckle cast in architectural brass on dark chocolate harness leather.",
    specifications: {
      material: "4mm Heavy Vegetable-Tanned Full-Grain Waxed Saddle Leather",
      hardware: "Monolithic Lost-Wax Cast Antique Brass Buckle (65mm × 55mm)",
      dimensions: "Width: 40mm (1.6 inches); Sizes 30 to 42",
      origin: "Bagalkot & Bengaluru, Karnataka"
    },
    craftStory: "Chalukyan artisans were master sculptors who chiseled living red sandstone into monumental temple reliefs. This buckle is cast from wax molds taken directly from stone pillar motifs in northern Karnataka.",
    stylingModes: [
      { name: "Workwear Staple", note: "Pairs with selvedge denim, cargo utility pants, or heavy cords" },
      { name: "Overcoat Cinch", note: "Buckle closed over unstructured trench coats or heavy knitwear" }
    ],
    colors: [
      { name: "Deep Saddle Espresso & Brass", hex: "#423429" },
      { name: "Badami Sandstone Brown & Bronze", hex: "#8c5332" }
    ],
    inStock: true,
    isBestseller: false
  },
  {
    id: "badami-overshirt",
    season: "fall",
    salvagedFrom: "Mysore crepe silk seconds with weaving flaws, mineral-washed",
    audience: "unisex",
    name: "Badami Sandstone SILK OVERSHIRT",
    subtitle: "Pure Mysore Crepe Silk × Sandstone Pigment Mineral Wash",
    price: 4499,
    originalPrice: 5699,
    stateId: "karnataka",
    stateName: "Karnataka",
    realm: "The Chalukyan Stone & Silk Realm",
    giTag: "GI Tagged: Mysore Silk (KA-01)",
    craft: "Heavyweight 100% Pure Mulberry Crepe Silk",
    category: "Outerwear & Tops",
    rating: 4.9,
    reviewsCount: 22,
    imageMain: "/images/products/12-badami-overshirt.jpg",
    imageLookbook: "/images/products/12-badami-overshirt.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/12-badami-overshirt.jpg" },
      { label: "Side", src: "/images/products/12-badami-overshirt-side.jpg" },
      { label: "Back", src: "/images/products/12-badami-overshirt-back.jpg" },
    ],
    slots: {
      main: "images/products/12-badami-overshirt.jpg",
      lookbook: "images/products/12-badami-overshirt.jpg",
      detail: "images/details/mysore_silk_jean_swatch_box.webp"
    },
    description: "A relaxed, fluid overshirt tailored from heavyweight royal Mysore crepe silk. Treated with a mineral-dye process that mimics the striated terracotta red and ochre cliffs of the Badami cave temples.",
    specifications: {
      material: "100% Pure Karnataka Mulberry Crepe Silk (75 GSM heavy drape)",
      hardware: "River-Harvested Mother of Pearl Buttons with Brass Shank Backing",
      dimensions: "Boxy relaxed unisex fit; dropped shoulders with pleated back yoke",
      origin: "Mysore & Ramanagara Silk Clusters, Karnataka"
    },
    craftStory: "Mysore crepe silk is renowned worldwide for its pebbled sand-wash texture and unmatched drape. Combined with natural earthy mineral dyes, it sheds courtly stiffness for lived-in everyday luxury.",
    stylingModes: [
      { name: "Open Shacket", note: "Layered unbuttoned over a ribbed white tank top" },
      { name: "Buttoned High", note: "Concealed top collar buttoned with tailored trousers for dinner" }
    ],
    colors: [
      { name: "Badami Terracotta Sandstone", hex: "#8c4e3b" },
      { name: "Chalukyan Granite Mineral Grey", hex: "#3b3936" }
    ],
    inStock: true,
    isBestseller: true
  },
  {
    id: "hampi-scarf",
    season: "spring",
    salvagedFrom: "End-of-roll silk twill from Mysore filatures",
    audience: "unisex",
    name: "Hampi Archival SILK SCARF",
    subtitle: "65×65cm Royal Silk Twill × Vijayanagara Stone Chariot Mandala",
    price: 1899,
    originalPrice: 2499,
    stateId: "karnataka",
    stateName: "Karnataka",
    realm: "The Chalukyan Stone & Silk Realm",
    giTag: "Heritage Craft: Karnataka Silk Twill",
    craft: "Pure Mysore Mulberry Silk Twill Screen Print",
    category: "Scarves & Modular Accents",
    rating: 4.8,
    reviewsCount: 39,
    imageMain: "/images/products/13-hampi-scarf.jpg",
    imageLookbook: "/images/products/13-hampi-scarf.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/13-hampi-scarf.jpg" },
      { label: "Side", src: "/images/products/13-hampi-scarf-side.jpg" },
      { label: "Back", src: "/images/products/13-hampi-scarf-back.jpg" },
    ],
    slots: {
      main: "images/products/13-hampi-scarf.jpg",
      lookbook: "images/products/13-hampi-scarf.jpg",
      detail: "images/details/kanchi_bandana_styles_box.webp"
    },
    description: "A 65×65cm pure mulberry silk twill square depicting the geometric architectural blueprint of Hampi's famed Vittala Stone Chariot, framed by Chalukyan lotus petal borders in burnished gold and midnight iron.",
    specifications: {
      material: "100% Pure Mulberry Silk Twill (18 momme weight)",
      hardware: "Hand-Rolled and Hand-Stitched Contrast Edges",
      dimensions: "65cm × 65cm (25.6 × 25.6 inches)",
      origin: "Woven in Mysore; tailored in Bengaluru, Karnataka"
    },
    craftStory: "Vijayanagara was celebrated by 15th-century Persian and European travelers as a city of jewel-like splendor. This piece translates its stone temple mathematics into flowing luxury silk.",
    stylingModes: [
      { name: "Ascot Drape", note: "Loosely tucked into open collar shirting for nonchalant tailoring" },
      { name: "Handbag Wrap", note: "Wrapped around leather top-handles to protect against patina" }
    ],
    colors: [
      { name: "Hampi Ochre & Iron Black", hex: "#b8913f" },
      { name: "Tungabhadra Indigo & Sand", hex: "#1b2838" }
    ],
    inStock: true,
    isBestseller: false
  },

  // -------------------------------------------------------------
  // ANDHRA & TELANGANA (The Yarn-Dye & Pen-Lore Realm)
  // -------------------------------------------------------------
  {
    id: "pochampally-skirt",
    season: "spring",
    salvagedFrom: "Pochampally ikat cut-pieces and deadstock cotton denim",
    audience: "women",
    name: "Pochampally Ikat SKIRT",
    subtitle: "Heavy Off-White Denim A-Line × Double-Ikat Pocket Inserts",
    price: 3499,
    originalPrice: 4299,
    stateId: "telangana",
    stateName: "Telangana & Andhra Pradesh",
    realm: "The Yarn-Dye & Pen-Lore Realm",
    giTag: "GI Tagged: Pochampally Ikat (TS-01)",
    craft: "Resist-Dyed Geometric Double-Ikat & Kalamkari Hem",
    category: "Denim & Skirts",
    rating: 4.9,
    reviewsCount: 29,
    imageMain: "/images/products/14-pochampally-skirt.jpg",
    imageLookbook: "/images/products/14-pochampally-skirt.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/14-pochampally-skirt.jpg" },
      { label: "Side", src: "/images/products/14-pochampally-skirt-side.jpg" },
      { label: "Back", src: "/images/products/14-pochampally-skirt-back.jpg" },
    ],
    slots: {
      main: "images/products/14-pochampally-skirt.jpg",
      lookbook: "images/products/14-pochampally-skirt.jpg",
      detail: "images/details/pochampally_skirt_details_box.webp"
    },
    description: "An architectural mini skirt in unbleached cream denim, elevated with Pochampally double-ikat warp-and-weft side pocket gussets and a delicate hand-drawn Srikalahasti Kalamkari floral border along the lower edge.",
    specifications: {
      material: "100% Unbleached Off-White Cotton Denim & Silk-Cotton Ikat Trim",
      hardware: "Hammered Brass Rivets & Center Front Button Shank",
      dimensions: "High-Rise Structured A-Line with deep slash pockets (Sizes 26 to 36)",
      origin: "Bhoodan Pochampally, Yadadri Bhuvanagiri District, Telangana"
    },
    craftStory: "Pochampally Ikat involves mathematical tie-and-dye of both warp and weft threads before they are mounted on the loom. The blurred geometric chevron edges symbolize human precision meeting natural organic dyes.",
    stylingModes: [
      { name: "Street Luxe", note: "Pair with boxy graphic tee and chunky combat boots" },
      { name: "Artisanal Chic", note: "Tuck in the Kasavu Halter Neck for a pan-Southern silhouette" }
    ],
    colors: [
      { name: "Raw Ecru × Black Geometric Ikat", hex: "#f6f2eb" },
      { name: "Terracotta Earth × Madder Red", hex: "#7d251a" }
    ],
    inStock: true,
    isBestseller: false
  },
  {
    id: "kalamkari-kimono",
    season: "international",
    salvagedFrom: "Retired Srikalahasti temple hangings, re-cut panel by panel",
    audience: "unisex",
    name: "Srikalahasti Kalamkari KIMONO JACKET",
    subtitle: "Freehand Bamboo Pen-Drawn Kalamkari × Tree of Life Motif",
    price: 5299,
    originalPrice: 6599,
    stateId: "telangana",
    stateName: "Telangana & Andhra Pradesh",
    realm: "The Yarn-Dye & Pen-Lore Realm",
    giTag: "GI Tagged: Srikalahasti Kalamkari (AP-01)",
    craft: "Freehand Bamboo Kalam Pen Art with Natural Dyes",
    category: "Outerwear & Tops",
    rating: 5.0,
    reviewsCount: 37,
    imageMain: "/images/products/15-kalamkari-kimono.jpg",
    imageLookbook: "/images/products/15-kalamkari-kimono.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/15-kalamkari-kimono-front.jpg" },
      { label: "Side", src: "/images/products/15-kalamkari-kimono-side.jpg" },
      { label: "Back", src: "/images/products/15-kalamkari-kimono.jpg" },
    ],
    slots: {
      main: "images/products/15-kalamkari-kimono.jpg",
      lookbook: "images/products/15-kalamkari-kimono.jpg",
      detail: "images/details/pochampally_skirt_details_box.webp"
    },
    description: "A showpiece haori kimono jacket in handspun cotton. The back panel features the sacred Tree of Life (*Kalpavriksha*), hand-drawn entirely with sharpened bamboo pens using river mud, fermented indigo, and alum mordants.",
    specifications: {
      material: "100% Hand-Spun Organic Khadi Cotton & 100% Natural Organic Plant Dyes",
      hardware: "Reversible Cotton Tie-Cord with Raw Brass Bell Beads",
      dimensions: "Relaxed Wide-Cut Haori Fit; Length: 78cm; One Size Fits All",
      origin: "Srikalahasti River Swarnamukhi cluster, Tirupati, Andhra Pradesh"
    },
    craftStory: "Unlike block printing, Srikalahasti Kalamkari is an entirely freehand painting art practiced near temple rivers. The fabric undergoes up to 17 labor-intensive washes in cow milk and running river currents to fix the dyes.",
    stylingModes: [
      { name: "Robed Over Denim", note: "Worn open as a statement duster over raw jeans and white tee" },
      { name: "Capped with Belt", note: "Cinch waist with the Athangudi Belt for kimono styling" }
    ],
    colors: [
      { name: "Natural Madder Root & Fermented Indigo", hex: "#7d251a" },
      { name: "Alum Ochre & Charcoal Vine", hex: "#d9822b" }
    ],
    inStock: true,
    isBestseller: true
  },
  {
    id: "pedana-overshirt",
    season: "summer",
    salvagedFrom: "Mangalagiri cotton seconds, over-printed by Pedana block carvers",
    audience: "unisex",
    name: "Pedana Indigo BLOCK-PRINT OVERSHIRT",
    subtitle: "Hand-Carved Teakwood Block Prints in Fermented Organic Indigo",
    price: 3699,
    originalPrice: 4599,
    stateId: "telangana",
    stateName: "Telangana & Andhra Pradesh",
    realm: "The Yarn-Dye & Pen-Lore Realm",
    giTag: "GI Tagged: Machilipatnam Kalamkari (AP-02)",
    craft: "Pedana Hand-Carved Teak Block Print",
    category: "Outerwear & Tops",
    rating: 4.8,
    reviewsCount: 26,
    imageMain: "/images/products/16-pedana-overshirt.jpg",
    imageLookbook: "/images/products/16-pedana-overshirt.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/16-pedana-overshirt.jpg" },
      { label: "Side", src: "/images/products/16-pedana-overshirt-side.jpg" },
      { label: "Back", src: "/images/products/16-pedana-overshirt-back.jpg" },
    ],
    slots: {
      main: "images/products/16-pedana-overshirt.jpg",
      lookbook: "images/products/16-pedana-overshirt.jpg",
      detail: "images/details/pochampally_skirt_details_box.webp"
    },
    description: "A tailored boxy overshirt stamped with heritage geometric wave and lotus block prints by master artisans in Pedana. Colored with pure fermented natural indigo vat dyes on crisp Mangalagiri woven cotton.",
    specifications: {
      material: "100% Handloom Mangalagiri Combed Cotton (60s yarn count)",
      hardware: "Cast Raw Coconut Shell Buttons with Natural Grain",
      dimensions: "Boxy camp collar silhouette with twin chest patch pockets",
      origin: "Pedana & Machilipatnam, Krishna District, Andhra Pradesh"
    },
    craftStory: "Pedana is the historic capital of Machilipatnam block printing, famous for teakwood stamps carved with pinpoint chisels. The rich blue hue comes from live bacterial indigo vats fed with dates and limestone.",
    stylingModes: [
      { name: "Camp Collar Solo", note: "Buttoned with relaxed linen trousers for summer daywear" },
      { name: "Indigo on Indigo", note: "Paired over raw dark denim for monochromatic textile contrast" }
    ],
    colors: [
      { name: "Deep Krishna River Indigo", hex: "#1b2838" },
      { name: "Madder Red & Fermented Iron Black", hex: "#7d251a" }
    ],
    inStock: true,
    isBestseller: false
  },
  {
    id: "gadwal-sash",
    season: "fall",
    salvagedFrom: "Gadwal kuttu borders cut from torn heirloom saris",
    audience: "unisex",
    name: "Gadwal Zari CONTRAST SASH",
    subtitle: "Pure Gadwal Cotton-Silk × Interlocked Temple Kuttu Border",
    price: 1599,
    originalPrice: 2199,
    stateId: "telangana",
    stateName: "Telangana & Andhra Pradesh",
    realm: "The Yarn-Dye & Pen-Lore Realm",
    giTag: "GI Tagged: Gadwal Sarees & Fabrics (TS-02)",
    craft: "Kuttu Interlocked Weft Weaving Technique",
    category: "Scarves & Modular Accents",
    rating: 4.9,
    reviewsCount: 35,
    imageMain: "/images/products/17-gadwal-sash.jpg",
    imageLookbook: "/images/products/17-gadwal-sash.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/17-gadwal-sash.jpg" },
      { label: "Side", src: "/images/products/17-gadwal-sash-side.jpg" },
      { label: "Back", src: "/images/products/17-gadwal-sash-back.jpg" },
    ],
    slots: {
      main: "images/products/17-gadwal-sash.jpg",
      lookbook: "images/products/17-gadwal-sash.jpg",
      detail: "images/details/kanchivaram_tie_fabric_box.webp"
    },
    description: "An elongated luxury sash showcasing Gadwal's famed *Kuttu* technique: unbleached featherlight cotton interlocked seamlessly by three weavers with royal silk and antique metallic zari temple borders.",
    specifications: {
      material: "Fine Handloom Cotton Body with 100% Pure Mulberry Silk & Zari Border",
      hardware: "Hand-Knotted Tassel Trim with Antique Copper Beads",
      dimensions: "35cm (W) × 190cm (L) fluid wrap length",
      origin: "Jogulamba Gadwal District, Telangana"
    },
    craftStory: "Gadwal weavers are world-renowned for their ability to weave an unbleached cotton body so fine that an entire nine-yard sari could fold into a matchbox, locked into heavy silk temple borders.",
    stylingModes: [
      { name: "Neck Drape", note: "Draped around tailored blazers as an architectural stole" },
      { name: "Obi Cinch", note: "Wrapped twice around the waist over shirt-dresses as an obi belt" }
    ],
    colors: [
      { name: "Crimson Silk & Gold Zari", hex: "#7d251a" },
      { name: "Midnight Navy & Temple Copper", hex: "#1b2838" }
    ],
    inStock: true,
    isBestseller: true
  },
  // -------------------------------------------------------------
  // REVIVAL ADDITIONS — remade from salvaged cloth for the season collections
  // -------------------------------------------------------------
  {
    id: "narayanpet-camp-shirt",
    season: "spring",
    salvagedFrom: "Faded Narayanpet cotton saris collected from Telangana households",
    audience: "men",
    name: "Narayanpet Blossom CAMP SHIRT",
    subtitle: "Salvaged Narayanpet Checks × Maroon Temple-Border Placket",
    price: 3299,
    originalPrice: 3999,
    stateId: "telangana",
    stateName: "Telangana & Andhra Pradesh",
    realm: "The Yarn-Dye & Pen-Lore Realm",
    giTag: "GI Tagged: Narayanpet Handloom Sarees",
    craft: "Narayanpet Small-Check Handloom with Kotakommu Border",
    category: "Shirts",
    rating: 4.8,
    reviewsCount: 14,
    imageMain: "/images/products/18-narayanpet-camp-shirt.jpg",
    imageLookbook: "/images/products/18-narayanpet-camp-shirt.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/18-narayanpet-camp-shirt.jpg" },
      { label: "Side", src: "/images/products/18-narayanpet-camp-shirt-side.jpg" },
      { label: "Back", src: "/images/products/18-narayanpet-camp-shirt-back.jpg" },
    ],
    slots: {
      main: "images/products/18-narayanpet-camp-shirt.jpg",
      lookbook: "images/products/18-narayanpet-camp-shirt.jpg",
      detail: "",
    },
    description: "A relaxed camp-collar shirt pieced from two salvaged Narayanpet saris — mango-yellow on one side, leaf-green on the other — joined down the front by the sari's own maroon temple border.",
    specifications: {
      material: "Salvaged 100% Narayanpet Handloom Cotton",
      hardware: "Natural Coconut-Shell Buttons",
      dimensions: "Boxy camp-collar fit, short sleeves (Sizes S to XXL)",
      origin: "Narayanpet, Telangana",
    },
    craftStory: "Narayanpet weavers once supplied saris to Maratha courts; today only a few hundred looms remain. Every shirt carries two saris that would otherwise have been torn into rags.",
    stylingModes: [
      { name: "Open Over Tee", note: "Unbuttoned over a white tank for spring mornings" },
      { name: "Tucked Linen", note: "Half-tucked into ecru linen trousers" },
    ],
    colors: [
      { name: "Mango × Leaf × Temple Maroon", hex: "#d9a21b" },
    ],
    inStock: true,
    isBestseller: false,
  },
  {
    id: "ilkal-kasuti-dress",
    season: "spring",
    salvagedFrom: "Ilkal saris with worn bodies, re-cut around their intact tope-teni pallus",
    audience: "women",
    name: "Ilkal Kasuti WRAP DRESS",
    subtitle: "Salvaged Ilkal Sari × Hand-Stitched Kasuti Temple Chariots",
    price: 4899,
    originalPrice: 5999,
    stateId: "karnataka",
    stateName: "Karnataka",
    realm: "The Chalukyan Stone & Silk Realm",
    giTag: "GI Tagged: Ilkal Sarees · Kasuti Embroidery",
    craft: "Ilkal Tope-Teni Weave with Kasuti Cross-Stitch",
    category: "Dresses",
    rating: 4.9,
    reviewsCount: 18,
    imageMain: "/images/products/19-ilkal-kasuti-dress.jpg",
    imageLookbook: "/images/products/19-ilkal-kasuti-dress.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/19-ilkal-kasuti-dress.jpg" },
      { label: "Side", src: "/images/products/19-ilkal-kasuti-dress-side.jpg" },
      { label: "Back", src: "/images/products/19-ilkal-kasuti-dress-back.jpg" },
    ],
    slots: {
      main: "images/products/19-ilkal-kasuti-dress.jpg",
      lookbook: "images/products/19-ilkal-kasuti-dress.jpg",
      detail: "",
    },
    description: "A full-skirted wrap dress in pomegranate-red Ilkal cotton. The striped pallu becomes the hem; Kasuti embroiderers from Dharwad stitch temple chariots and lotuses across the bodice by counting threads.",
    specifications: {
      material: "Salvaged Ilkal Cotton-Silk Sari",
      hardware: "Self-Fabric Wrap Tie",
      dimensions: "Midi length wrap, adjustable (Sizes XS to XL)",
      origin: "Ilkal, Bagalkot & Dharwad, Karnataka",
    },
    craftStory: "Kasuti is stitched from the back without a single knot, so both sides look the same. Once part of every bride's trousseau, it is now practised by a shrinking circle of women in north Karnataka.",
    stylingModes: [
      { name: "Wrapped Midi", note: "Tie at the side with flat kolhapuri sandals" },
      { name: "Open Duster", note: "Worn untied over a slip dress or wide trousers" },
    ],
    colors: [
      { name: "Pomegranate × Tope-Teni Maroon", hex: "#9b1c1f" },
    ],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "kambli-chore-coat",
    season: "winter",
    salvagedFrom: "Retired Kambli blankets from Kuruba shepherd families of the Deccan",
    audience: "unisex",
    name: "Deccani Kambli CHORE COAT",
    subtitle: "Salvaged Shepherd Wool Blanket × Antique Brass Buttons",
    price: 6499,
    originalPrice: 7999,
    stateId: "karnataka",
    stateName: "Karnataka",
    realm: "The Chalukyan Stone & Silk Realm",
    giTag: "Heritage Craft: Deccani Kambli Wool",
    craft: "Hand-Spun Undyed Deccani Sheep Wool on Pit Loom",
    category: "Outerwear & Tops",
    rating: 4.9,
    reviewsCount: 21,
    imageMain: "/images/products/20-kambli-chore-coat.jpg",
    imageLookbook: "/images/products/20-kambli-chore-coat.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/20-kambli-chore-coat.jpg" },
      { label: "Side", src: "/images/products/20-kambli-chore-coat-side.jpg" },
      { label: "Back", src: "/images/products/20-kambli-chore-coat-back.jpg" },
    ],
    slots: {
      main: "images/products/20-kambli-chore-coat.jpg",
      lookbook: "images/products/20-kambli-chore-coat.jpg",
      detail: "",
    },
    description: "A boxy chore coat cut from a retired Kambli — the coarse, undyed wool blanket Deccan shepherds have woven for centuries. Black, grey and cream bands come straight from the sheep; the madder selvedge is kept at the cuffs.",
    specifications: {
      material: "Salvaged 100% Undyed Deccani Wool, Cotton Lining",
      hardware: "Antique Brass Shank Buttons",
      dimensions: "Boxy hip-length fit with three patch pockets (Sizes S to XXL)",
      origin: "Chitradurga & Bellary, Karnataka",
    },
    craftStory: "Deccani sheep are being replaced by meat breeds, and with them the Kambli is vanishing. Buying back old blankets gives shepherd families income — and a reason to keep the looms warm.",
    stylingModes: [
      { name: "Workwear Layer", note: "Over a heavy tee with selvedge denim" },
      { name: "Hill-Station Coat", note: "Over knitwear with the Toda Wrap Shawl" },
    ],
    colors: [
      { name: "Natural Black × Grey × Cream", hex: "#2b2a29" },
    ],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "toda-wrap-shawl",
    season: "winter",
    salvagedFrom: "Undyed cotton blanket ends, embroidered by Toda women of the Nilgiris",
    audience: "unisex",
    name: "Toda Pukhoor WRAP SHAWL",
    subtitle: "Salvaged Cotton Blanket × Red & Black Toda Hand Embroidery",
    price: 4299,
    originalPrice: 5299,
    stateId: "tamilnadu",
    stateName: "Tamil Nadu",
    realm: "The Temple & Loom Realm",
    giTag: "GI Tagged: Toda Embroidery",
    craft: "Pukhoor Darning-Stitch Embroidery Counted on the Weave",
    category: "Scarves & Modular Accents",
    rating: 5.0,
    reviewsCount: 16,
    imageMain: "/images/products/21-toda-wrap-shawl.jpg",
    imageLookbook: "/images/products/21-toda-wrap-shawl.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/21-toda-wrap-shawl.jpg" },
      { label: "Side", src: "/images/products/21-toda-wrap-shawl-side.jpg" },
      { label: "Back", src: "/images/products/21-toda-wrap-shawl-back.jpg" },
    ],
    slots: {
      main: "images/products/21-toda-wrap-shawl.jpg",
      lookbook: "images/products/21-toda-wrap-shawl.jpg",
      detail: "",
    },
    description: "A generous wrap shawl on thick off-white cotton, worked with the red and black geometric bands of Toda pukhoor embroidery and finished with hand-knotted fringe.",
    specifications: {
      material: "Salvaged Heavy Cotton Blanket Cloth, Wool Embroidery Thread",
      hardware: "Hand-Knotted Fringe",
      dimensions: "180cm × 75cm",
      origin: "Toda munds, Nilgiris, Tamil Nadu",
    },
    craftStory: "The Toda are a small pastoral community of the Nilgiri hills; their embroidery is counted thread by thread and never drawn first. Each shawl takes weeks of evening work.",
    stylingModes: [
      { name: "Cape Drape", note: "Over both shoulders like a traditional puthukuli cloak" },
      { name: "Scarf Wrap", note: "Folded lengthways and looped twice at the neck" },
    ],
    colors: [
      { name: "Bone × Toda Red × Black", hex: "#f2ece0" },
    ],
    inStock: true,
    isBestseller: false,
  },
  {
    id: "kandangi-trench",
    season: "international",
    salvagedFrom: "Chettinad Kandangi saris bought back at Karaikudi trunk sales",
    audience: "unisex",
    name: "Chettinad Kandangi TRENCH",
    subtitle: "Salvaged Kandangi Checks × Gold Temple-Border Hem",
    price: 7999,
    originalPrice: 9499,
    stateId: "tamilnadu",
    stateName: "Tamil Nadu",
    realm: "The Temple & Loom Realm",
    giTag: "GI Tagged: Chettinad Kothanbody / Kandangi",
    craft: "Heavy Kandangi Handloom Cotton in Broad Checks",
    category: "Outerwear & Tops",
    rating: 4.9,
    reviewsCount: 12,
    imageMain: "/images/products/22-kandangi-trench.jpg",
    imageLookbook: "/images/products/22-kandangi-trench.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/22-kandangi-trench.jpg" },
      { label: "Side", src: "/images/products/22-kandangi-trench-side.jpg" },
      { label: "Back", src: "/images/products/22-kandangi-trench-back.jpg" },
    ],
    slots: {
      main: "images/products/22-kandangi-trench.jpg",
      lookbook: "images/products/22-kandangi-trench.jpg",
      detail: "",
    },
    description: "The classic double-breasted trench, re-cut from three salvaged Kandangi saris. Rust, mustard and black checks with the sari's gold temple border run around the cuffs and hem.",
    specifications: {
      material: "Salvaged 100% Kandangi Handloom Cotton, Mulmul Lining",
      hardware: "Horn Buttons, Self Belt",
      dimensions: "Full-length relaxed trench (Sizes XS to XXL)",
      origin: "Karaikudi, Sivaganga District, Tamil Nadu",
    },
    craftStory: "Kandangi was the everyday sari of Chettiar women — heavy, bold and built to last generations. Mansion trunks are still full of them; we give them a second life on city streets.",
    stylingModes: [
      { name: "Belted Trench", note: "Cinched over tailoring for the commute" },
      { name: "Open Duster", note: "Worn loose over denim and sneakers" },
    ],
    colors: [
      { name: "Rust × Mustard × Black Kandangi", hex: "#b5531e" },
    ],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "kuthampully-bomber",
    season: "international",
    salvagedFrom: "Kuthampully wedding saris passed on after the ceremony",
    audience: "unisex",
    name: "Kuthampully Zari BOMBER",
    subtitle: "Salvaged Kerala Wedding Sari × Gold Zari Bands",
    price: 5899,
    originalPrice: 6999,
    stateId: "kerala",
    stateName: "Kerala",
    realm: "The Kora & Kasavu Realm",
    giTag: "GI Tagged: Kuthampully Sarees",
    craft: "Kuthampully Handloom Cotton with Broad Zari Border",
    category: "Outerwear & Tops",
    rating: 4.8,
    reviewsCount: 15,
    imageMain: "/images/products/23-kuthampully-bomber.jpg",
    imageLookbook: "/images/products/23-kuthampully-bomber.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/23-kuthampully-bomber.jpg" },
      { label: "Side", src: "/images/products/23-kuthampully-bomber-side.jpg" },
      { label: "Back", src: "/images/products/23-kuthampully-bomber-back.jpg" },
    ],
    slots: {
      main: "images/products/23-kuthampully-bomber.jpg",
      lookbook: "images/products/23-kuthampully-bomber.jpg",
      detail: "",
    },
    description: "A clean-lined bomber in cream Kuthampully cotton, banded with the sari's broad gold zari and finished with maroon rib at collar, cuffs and hem.",
    specifications: {
      material: "Salvaged Kuthampully Cotton & Zari, Organic Cotton Rib",
      hardware: "Antique Brass Zip",
      dimensions: "Regular bomber fit (Sizes S to XXL)",
      origin: "Kuthampully, Thrissur District, Kerala",
    },
    craftStory: "Kuthampully weavers migrated from Karnataka centuries ago at the invitation of the Cochin royal family. A wedding sari is worn once — this bomber is worn every week.",
    stylingModes: [
      { name: "Street Layer", note: "Over a black tee with straight-leg trousers" },
      { name: "Evening Contrast", note: "Zipped over a silk shirt for gallery nights" },
    ],
    colors: [
      { name: "Kora Cream × Gold Zari × Maroon", hex: "#efe6d2" },
    ],
    inStock: true,
    isBestseller: false,
  },
  {
    id: "dharmavaram-nehru-vest",
    season: "fall",
    salvagedFrom: "Dharmavaram wedding silks with torn pallus, borders reclaimed",
    audience: "men",
    name: "Dharmavaram Silk NEHRU VEST",
    subtitle: "Salvaged Peacock Silk × Gold-Zari Gopuram Border",
    price: 4599,
    originalPrice: 5499,
    stateId: "telangana",
    stateName: "Telangana & Andhra Pradesh",
    realm: "The Yarn-Dye & Pen-Lore Realm",
    giTag: "GI Tagged: Dharmavaram Handloom Pattu Sarees",
    craft: "Heavy Mulberry Silk with Contrast Zari Gopuram Border",
    category: "Outerwear & Tops",
    rating: 5.0,
    reviewsCount: 19,
    imageMain: "/images/products/24-dharmavaram-nehru-vest.jpg",
    imageLookbook: "/images/products/24-dharmavaram-nehru-vest.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/24-dharmavaram-nehru-vest.jpg" },
      { label: "Side", src: "/images/products/24-dharmavaram-nehru-vest-side.jpg" },
      { label: "Back", src: "/images/products/24-dharmavaram-nehru-vest-back.jpg" },
    ],
    slots: {
      main: "images/products/24-dharmavaram-nehru-vest.jpg",
      lookbook: "images/products/24-dharmavaram-nehru-vest.jpg",
      detail: "",
    },
    description: "A festival-season Nehru vest in deep peacock silk. The magenta and gold gopuram border — the most precious part of the sari — frames the mandarin collar and hem.",
    specifications: {
      material: "Salvaged 100% Dharmavaram Mulberry Silk & Zari, Cotton Lining",
      hardware: "Antique Brass Buttons",
      dimensions: "Tailored fit, mandarin collar (Sizes 36 to 46)",
      origin: "Dharmavaram, Sri Sathya Sai District, Andhra Pradesh",
    },
    craftStory: "Dharmavaram silks are famous for their heavy contrast borders and temple motifs. When a pallu tears, the border is usually thrown away with it — we cut around the damage and keep the gold.",
    stylingModes: [
      { name: "Festival Kurta", note: "Over an ivory kurta for Deepavali" },
      { name: "Shirt & Trousers", note: "Over a white Oxford for weddings and dinners" },
    ],
    colors: [
      { name: "Peacock Green × Magenta Zari", hex: "#0f4a3c" },
    ],
    inStock: true,
    isBestseller: false,
  },
  {
    id: "kovai-kora-shirt-dress",
    season: "summer",
    salvagedFrom: "Kovai kora cotton saris left unsold at Coimbatore cooperatives",
    audience: "women",
    name: "Kovai Kora SHIRT-DRESS",
    subtitle: "Salvaged Kora Cotton Stripes × Ochre Zari Hem",
    price: 3799,
    originalPrice: 4599,
    stateId: "tamilnadu",
    stateName: "Tamil Nadu",
    realm: "The Temple & Loom Realm",
    giTag: "GI Tagged: Kovai Cora Cotton Sarees",
    craft: "Kora Silk-Cotton Handloom in Fine Stripes",
    category: "Dresses",
    rating: 4.8,
    reviewsCount: 22,
    imageMain: "/images/products/25-kovai-kora-shirt-dress.jpg",
    imageLookbook: "/images/products/25-kovai-kora-shirt-dress.jpg",
    imageDetail: "",
    imageViews: [
      { label: "Front", src: "/images/products/25-kovai-kora-shirt-dress.jpg" },
      { label: "Side", src: "/images/products/25-kovai-kora-shirt-dress-side.jpg" },
      { label: "Back", src: "/images/products/25-kovai-kora-shirt-dress-back.jpg" },
    ],
    slots: {
      main: "images/products/25-kovai-kora-shirt-dress.jpg",
      lookbook: "images/products/25-kovai-kora-shirt-dress.jpg",
      detail: "",
    },
    description: "A breezy sleeveless shirt-dress in airy Kovai kora — sage and ecru stripes, wooden buttons, patch pockets and a thin ochre zari border kept at the hem.",
    specifications: {
      material: "Salvaged Kovai Kora Silk-Cotton",
      hardware: "Natural Wood Buttons, Self Waist Tie",
      dimensions: "Midi length, relaxed fit (Sizes XS to XL)",
      origin: "Coimbatore, Tamil Nadu",
    },
    craftStory: "Kora is woven with a cotton warp and a fine silk weft so it breathes in the Coimbatore heat. Unsold stock sits in cooperative godowns for years — we turn it into summer's lightest dress.",
    stylingModes: [
      { name: "Belted Day Dress", note: "Tied at the waist with leather sandals" },
      { name: "Open Layer", note: "Unbuttoned as a duster over a tank and shorts" },
    ],
    colors: [
      { name: "Sage × Ecru × Ochre Zari", hex: "#b9c4a8" },
    ],
    inStock: true,
    isBestseller: false,
  }
];

export const addOns: AddOn[] = [
  {
    id: "temple-charm-brass",
    name: "Solid Brass Temple Bell & Door-Knocker Charm",
    price: 899,
    category: "Hardware",
    image: "",
    slot: "images/details/athangudi_belt_tiles_box.webp",
    description: "Cast antique brass collectible charm with clasp ring to affix onto any bag or belt loop."
  },
  {
    id: "dravidian-graphic-tee",
    name: "‘Four Realms’ Heavyweight Graphic Tee (240 GSM)",
    price: 1999,
    category: "Streetwear",
    image: "",
    slot: "images/editorial/streetwear_editorial.webp",
    description: "Organic combed cotton oversized boxy tee featuring screen-printed Tree of Life & Tamil typography."
  }
];

export function getProductsByRealm(realmId: string): Product[] {
  return products.filter((p) => p.stateId === realmId);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
