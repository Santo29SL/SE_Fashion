export const realms = [
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    native: 'தமிழ்நாடு',
    tagline: 'The Temple & Loom Realm',
    subtitle: 'Kanchipuram, Athangudi, Bhavani, Madras',
    description:
      'Granite gopurams, Chettinad floor geometry, and pit-looms weaving three-ply mulberry silk with Korvai temple borders.',
    moodboard: '',
    lookbookBg: '',
    slots: {
      moodboard: 'images/states/tamilnadu_moodboard.webp',
      lookbook: 'images/states/tamilnadu_lookbook.webp'
    },
    accentColor: '#9e3d2a',
    colors: ['#9e3d2a', '#c5a059', '#1b2838', '#d9822b'],
    crafts: ['Kanchipuram Silk GI', 'Bhavani Jamakkalam GI', 'Madras Checks GI', 'Athangudi Tile Art'],
    artisanNote: 'Partnered with weaver cooperatives across Kanchipuram and Bhavani.'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    native: 'കേരളം',
    tagline: 'The Kora & Kasavu Realm',
    subtitle: 'Balaramapuram, Chendamangalam',
    description:
      'Monsoon-washed kora cotton and liquid gold kasavu — temple white worn as everyday structure rather than festival drape.',
    moodboard: '',
    lookbookBg: '',
    slots: {
      moodboard: 'images/states/kerala_moodboard.webp',
      lookbook: 'images/states/kerala_lookbook.webp'
    },
    accentColor: '#d4af37',
    colors: ['#f6f2eb', '#d4af37', '#4f563b'],
    crafts: ['Balaramapuram Handloom GI', 'Kasavu Gold Zari', 'Panchavarna Pigments'],
    artisanNote: 'Handspun on pit-looms by Travancore handloom societies.'
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    native: 'ಕರ್ನಾಟಕ',
    tagline: 'The Chalukyan Stone & Silk Realm',
    subtitle: 'Badami, Mysore, Hampi',
    description:
      'Red sandstone of Badami against royal Mysore crepe — court silk opened into workwear denim and brass hardware.',
    moodboard: '',
    lookbookBg: '',
    slots: {
      moodboard: 'images/states/karnataka_moodboard.webp',
      lookbook: 'images/states/karnataka_lookbook.webp'
    },
    accentColor: '#4a5335',
    colors: ['#4a5335', '#611c28', '#8c6d3b'],
    crafts: ['Mysore Crepe Silk GI', 'Chalukyan Brass Casting', 'Selvedge Denim'],
    artisanNote: 'Silk from certified filatures in Mysore and Ramanagara.'
  },
  {
    id: 'telangana',
    name: 'Andhra & Telangana',
    native: 'ఆంధ్ర · తెలంగాణ',
    tagline: 'The Yarn-Dye & Pen-Lore Realm',
    subtitle: 'Pochampally, Srikalahasti, Pedana',
    description:
      'Double ikat resist dyeing meeting freehand Kalamkari — madder, indigo, and sap mordants written into cloth.',
    moodboard: '',
    lookbookBg: '',
    slots: {
      moodboard: 'images/states/telangana_moodboard.webp',
      lookbook: 'images/states/telangana_lookbook.webp'
    },
    accentColor: '#7d251a',
    colors: ['#1b2838', '#7d251a', '#e8dcc4'],
    crafts: ['Pochampally Double Ikat GI', 'Srikalahasti Pen Kalamkari GI', 'Pedana Block Print'],
    artisanNote: 'Vegetable dyes and river-wash drying with certified clusters.'
  }
];

export const heritagePillars = [
  {
    id: 'origin',
    index: '01',
    label: 'Archival origin',
    badge: 'Deconstruction',
    traditional: {
      title: 'Ritual past',
      body: 'Temple rugs and ceremonial wedding silks reserved for sacred halls.'
    },
    contemporary: {
      title: 'Everyday form',
      body: 'Rebuilt as totes, selvedge denim with silk gussets, and modular neckwear.'
    }
  },
  {
    id: 'modular',
    index: '02',
    label: 'Modular versatility',
    badge: 'Adaptability',
    traditional: {
      title: 'Fixed wear',
      body: 'Nine-yard unstitched cloth that needs elaborate drape and dry-clean care.'
    },
    contemporary: {
      title: 'Four-way modular',
      body: 'Headscarf, collar tie, tote accent, or wrist wrap — one square, four lives.'
    }
  },
  {
    id: 'value',
    index: '03',
    label: 'Direct artisan value',
    badge: 'Fair trade',
    traditional: {
      title: 'Intermediary markups',
      body: 'Weavers historically received under 15% of the luxury retail tag.'
    },
    contemporary: {
      title: 'Cluster model',
      body: '65% of net margin funds master weavers and pit-loom restoration.'
    }
  }
];
