import type { JournalPost } from "./types";

export const journalPosts: JournalPost[] = [
  {
    id: 'korvai-temple-border',
    realmId: 'tamilnadu',
    native: 'கோர்வை',
    readTime: '6 min read',
    pullQuote: 'Two silks, one interlock — a join the eye reads as a single cloth.',
    kicker: 'Tamil · கோர்வை',
    title: 'Korvai and the temple border',
    excerpt: 'How Kanchipuram weavers lock contrasting silks at the pallu — and why that join still shapes a necktie and a bandana.',
    slot: 'images/journal/korvai-temple-border.webp',
    image: '/images/journal/korvai-temple-border.jpg',
    imageAlt: 'Maroon Kanchipuram silk locked to a gold temple border on a wooden handloom',
    relatedProductIds: ['kanchivaram-tie', 'kanchi-bandana']
  },
  {
    id: 'kasavu-onam-gold',
    realmId: 'kerala',
    native: 'കസവ്',
    readTime: '5 min read',
    pullQuote: 'Unbleached on purpose: the cream is the cotton, the gold is the light.',
    kicker: 'Malayalam · കസവ്',
    title: 'Kasavu, kora, and Onam white-gold',
    excerpt: 'Unbleached cotton, liquid zari, and the Travancore pit-loom — worn now as a halter rather than a nine-yard drape.',
    slot: 'images/journal/kasavu-onam-gold.webp',
    image: '/images/journal/kasavu-onam-gold.jpg',
    imageAlt: 'Folded kora cotton with a broad gold kasavu border beside an Onam flower bowl',
    relatedProductIds: ['kasavu-halter']
  },
  {
    id: 'pochampally-double-ikat',
    realmId: 'telangana',
    native: 'ఇకత్',
    readTime: '7 min read',
    pullQuote: 'The pattern is decided before the loom ever moves.',
    kicker: 'Telugu · ఇకత్',
    title: 'The mathematics of double ikat',
    excerpt: 'Warp and weft tied before they meet the loom. Blurred geometry from Bhoodan Pochampally, set into denim pockets.',
    slot: 'images/journal/pochampally-double-ikat.webp',
    image: '/images/journal/pochampally-double-ikat.jpg',
    imageAlt: 'Resist-dyed ikat yarn hanks beside a draped Pochampally double-ikat cloth',
    relatedProductIds: ['pochampally-skirt']
  }
];

/** Short craft glossary shown under the essays. */
export const craftGlossary: { term: string; native: string; meaning: string }[] = [
  { term: 'Korvai', native: 'கோர்வை', meaning: 'Interlocked weft joining a contrasting border to the body of a Kanchipuram silk.' },
  { term: 'Kasavu', native: 'കസവ്', meaning: 'The gold zari band woven into Kerala’s unbleached kora cotton.' },
  { term: 'Ikat', native: 'ఇకత్', meaning: 'Resist-dyeing the yarn before weaving so the pattern emerges on the loom.' },
  { term: 'Jamakkalam', native: 'ஜமக்காளம்', meaning: 'Bhavani’s striped pit-loom floor rug, rebuilt here as tote yardage.' },
  { term: 'Kalamkari', native: 'కలంకారి', meaning: 'Pen-drawn, vegetable-dyed narrative painting on cotton.' },
  { term: 'Zari', native: 'ஜரி', meaning: 'Metallic thread — silver core, gold wash — that outlines temple borders.' },
];
