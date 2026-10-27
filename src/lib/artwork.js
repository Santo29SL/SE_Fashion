/**
 * Custom high-fidelity inline SVG artworks for all artifacts in "The Southern Edit".
 * Designed to render edge-to-edge on Throw Deck cards and modal details views,
 * reflecting authentic Dravidian textile geometries, colors, and craftsmanship.
 */

export function getArtifactArtwork(productId, accentColor = '#9e3d2a') {
  const artworks = {
    // -------------------------------------------------------------
    // TAMIL NADU ARTIFACTS
    // -------------------------------------------------------------
    'jamakkalam-tote': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Bhavani Jamakkalam Chevron Art">
        <defs>
          <linearGradient id="jamakkalam-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2a1813" />
            <stop offset="100%" stop-color="#150f0c" />
          </linearGradient>
        </defs>
        <rect width="320" height="320" fill="url(#jamakkalam-bg)" />
        <!-- Pit-loom Chevron stripes -->
        <g stroke="${accentColor}" stroke-width="7" fill="none" stroke-linejoin="round" opacity="0.9">
          <polyline points="0,50 40,30 80,50 120,30 160,50 200,30 240,50 280,30 320,50" />
          <polyline points="0,75 40,55 80,75 120,55 160,75 200,55 240,75 280,55 320,75" />
          <polyline points="0,100 40,80 80,100 120,80 160,100 200,80 240,100 280,80 320,100" />
        </g>
        <g stroke="#c5a059" stroke-width="5" fill="none" stroke-linejoin="round" opacity="0.85">
          <polyline points="0,130 40,110 80,130 120,110 160,130 200,110 240,130 280,110 320,130" />
          <polyline points="0,150 40,130 80,150 120,130 160,150 200,130 240,150 280,130 320,150" />
        </g>
        <g stroke="#1b2838" stroke-width="12" fill="none" stroke-linejoin="round">
          <polyline points="0,185 40,165 80,185 120,165 160,185 200,165 240,185 280,165 320,185" />
        </g>
        <g stroke="${accentColor}" stroke-width="6" fill="none" stroke-linejoin="round" opacity="0.95">
          <polyline points="0,220 40,200 80,220 120,200 160,220 200,200 240,220 280,200 320,220" />
          <polyline points="0,245 40,225 80,245 120,225 160,245 200,225 240,245 280,225 320,245" />
        </g>
        <!-- Brass Door-Knocker Rings -->
        <circle cx="160" cy="275" r="28" stroke="#d4af37" stroke-width="4.5" fill="none" />
        <circle cx="160" cy="275" r="6" fill="#d4af37" />
        <circle cx="160" cy="242" r="4" fill="#d4af37" />
        <rect x="157" y="244" width="6" height="8" fill="#d4af37" rx="2" />
      </svg>
    `,

    'madras-check-vest': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Madras Plaid Yarn-Dye Art">
        <rect width="320" height="320" fill="#1b242e" />
        <!-- Bleeding Madras Warp & Weft Grid -->
        <g opacity="0.35">
          <rect x="0" y="40" width="320" height="48" fill="#d9822b" />
          <rect x="0" y="140" width="320" height="60" fill="${accentColor}" />
          <rect x="0" y="240" width="320" height="40" fill="#4f563b" />
        </g>
        <g opacity="0.45">
          <rect x="40" y="0" width="48" height="320" fill="#d9822b" />
          <rect x="140" y="0" width="60" height="320" fill="${accentColor}" />
          <rect x="240" y="0" width="40" height="320" fill="#4f563b" />
        </g>
        <!-- Fine intersecting yarns -->
        <g stroke="#f4efe6" stroke-width="1.2" stroke-dasharray="3,2" opacity="0.5">
          <line x1="0" y1="44" x2="320" y2="44" />
          <line x1="0" y1="84" x2="320" y2="84" />
          <line x1="0" y1="144" x2="320" y2="144" />
          <line x1="0" y1="196" x2="320" y2="196" />
          <line x1="44" y1="0" x2="44" y2="320" />
          <line x1="84" y1="0" x2="84" y2="320" />
          <line x1="144" y1="0" x2="144" y2="320" />
          <line x1="196" y1="0" x2="196" y2="320" />
        </g>
        <!-- Natural horn button -->
        <circle cx="170" cy="170" r="14" fill="#302b25" stroke="#c5a059" stroke-width="2" />
        <circle cx="166" cy="166" r="1.8" fill="#c5a059" />
        <circle cx="174" cy="166" r="1.8" fill="#c5a059" />
        <circle cx="166" cy="174" r="1.8" fill="#c5a059" />
        <circle cx="174" cy="174" r="1.8" fill="#c5a059" />
      </svg>
    `,

    'athangudi-belt': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Athangudi Tile Mandala Art">
        <rect width="320" height="320" fill="#1e1814" />
        <!-- Tile Frame -->
        <rect x="20" y="20" width="280" height="280" fill="#2d221c" stroke="#8c5332" stroke-width="4" rx="8" />
        <rect x="36" y="36" width="248" height="248" fill="none" stroke="#d4af37" stroke-width="1.5" />
        <!-- Symmetrical 8-Petal Chettinad Lotus -->
        <g transform="translate(160, 160)">
          <circle r="72" fill="#8c3322" opacity="0.8" />
          <path d="M 0,-68 C 24,-45 24,-15 0,0 C -24,-15 -24,-45 0,-68 Z" fill="#c5a059" />
          <path d="M 0,68 C 24,45 24,15 0,0 C -24,15 -24,45 0,68 Z" fill="#c5a059" />
          <path d="M -68,0 C -45,24 -15,24 0,0 C -15,-24 -45,-24 -68,0 Z" fill="#c5a059" />
          <path d="M 68,0 C 45,24 15,24 0,0 C 15,-24 45,-24 68,0 Z" fill="#c5a059" />
          <path d="M -48,-48 C -22,-38 -10,-10 0,0 C -10,-10 -38,-22 -48,-48 Z" fill="#8c3322" />
          <path d="M 48,-48 C 22,-38 10,-10 0,0 C 10,-10 38,-22 48,-48 Z" fill="#8c3322" />
          <path d="M -48,48 C -22,38 -10,10 0,0 C -10,10 -38,22 -48,48 Z" fill="#8c3322" />
          <path d="M 48,48 C 22,38 10,10 0,0 C 10,10 38,22 48,48 Z" fill="#8c3322" />
          <!-- Center Solid Brass Stud -->
          <circle r="18" fill="#d4af37" stroke="#3b2b1b" stroke-width="2" />
          <circle r="6" fill="#3b2b1b" />
        </g>
        <!-- Corner Palmettes -->
        <circle cx="50" cy="50" r="10" fill="#d4af37" opacity="0.7" />
        <circle cx="270" cy="50" r="10" fill="#d4af37" opacity="0.7" />
        <circle cx="50" cy="270" r="10" fill="#d4af37" opacity="0.7" />
        <circle cx="270" cy="270" r="10" fill="#d4af37" opacity="0.7" />
      </svg>
    `,

    'kanchivaram-tie': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Kanchipuram Silk Zari Manga Art">
        <rect width="320" height="320" fill="#131e2b" />
        <!-- Temple Gopuram Zari Border -->
        <polygon points="0,320 20,270 40,320 60,270 80,320 100,270 120,320 140,270 160,320 180,270 200,320 220,270 240,320 260,270 280,320 300,270 320,320" fill="#d4af37" opacity="0.9" />
        <!-- Gold Zari Manga (Paisley) Motif -->
        <g transform="translate(160, 140)">
          <path d="M 0,-70 C 45,-65 75,-25 65,25 C 55,68 0,85 -30,60 C -60,35 -55,-10 -35,-35 C -15,-55 -5,-62 0,-70 Z" fill="none" stroke="#d4af37" stroke-width="4.5" />
          <path d="M 5,-50 C 35,-45 55,-15 48,20 C 40,50 0,62 -20,45 C -40,28 -38,-5 -22,-25 Z" fill="#9e3d2a" opacity="0.8" />
          <!-- Fine floral fill -->
          <circle cx="5" cy="5" r="9" fill="#d4af37" />
          <circle cx="20" cy="-10" r="5" fill="#d4af37" />
          <circle cx="-10" cy="20" r="5" fill="#d4af37" />
        </g>
        <!-- Fine Mulberry Silk Weave Lines -->
        <line x1="0" y1="40" x2="320" y2="40" stroke="#d4af37" stroke-width="1" opacity="0.4" />
        <line x1="0" y1="48" x2="320" y2="48" stroke="#d4af37" stroke-width="1.5" opacity="0.7" />
        <line x1="0" y1="56" x2="320" y2="56" stroke="#d4af37" stroke-width="1" opacity="0.4" />
      </svg>
    `,

    'kanchi-bandana': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="The Kanchi Bandana Silk Square Art">
        <rect width="320" height="320" fill="#4a151f" />
        <!-- Concentric Korvai Silk Borders -->
        <rect x="16" y="16" width="288" height="288" fill="none" stroke="#d4af37" stroke-width="3" />
        <rect x="28" y="28" width="264" height="264" fill="none" stroke="#9e3d2a" stroke-width="6" />
        <rect x="42" y="42" width="236" height="236" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4,3" />
        <!-- Central Sun/Lotus -->
        <circle cx="160" cy="160" r="56" fill="#5c1c28" stroke="#d4af37" stroke-width="2.5" />
        <circle cx="160" cy="160" r="32" fill="#d4af37" opacity="0.9" />
        <circle cx="160" cy="160" r="14" fill="#4a151f" />
        <!-- Corner Temple Spire Accents -->
        <polygon points="46,46 72,46 46,72" fill="#d4af37" />
        <polygon points="274,46 248,46 274,72" fill="#d4af37" />
        <polygon points="46,274 72,274 46,248" fill="#d4af37" />
        <polygon points="274,274 248,274 274,248" fill="#d4af37" />
      </svg>
    `,

    // -------------------------------------------------------------
    // KERALA ARTIFACTS
    // -------------------------------------------------------------
    'kasavu-halter': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Kerala Kasavu Gold on Ivory Art">
        <rect width="320" height="320" fill="#f7f4ed" />
        <!-- Fine Kora cotton texture grain -->
        <g stroke="#e2dcce" stroke-width="0.8" opacity="0.6">
          <line x1="0" y1="30" x2="320" y2="30" />
          <line x1="0" y1="60" x2="320" y2="60" />
          <line x1="0" y1="90" x2="320" y2="90" />
          <line x1="0" y1="120" x2="320" y2="120" />
          <line x1="0" y1="150" x2="320" y2="150" />
          <line x1="0" y1="180" x2="320" y2="180" />
          <line x1="0" y1="210" x2="320" y2="210" />
          <line x1="0" y1="240" x2="320" y2="240" />
          <line x1="0" y1="270" x2="320" y2="270" />
          <line x1="0" y1="300" x2="320" y2="300" />
        </g>
        <!-- Liquid Gold Kasavu Zari Bands -->
        <rect x="0" y="80" width="320" height="18" fill="#d4af37" />
        <rect x="0" y="104" width="320" height="8" fill="#c5a059" opacity="0.8" />
        <rect x="0" y="118" width="320" height="3" fill="#d4af37" />
        <!-- Onam Sun Disc -->
        <circle cx="160" cy="205" r="48" fill="#d4af37" opacity="0.95" />
        <circle cx="160" cy="205" r="32" fill="#f7f4ed" />
        <circle cx="160" cy="205" r="14" fill="#d4af37" />
        <!-- Green Karai thread border -->
        <rect x="0" y="76" width="320" height="3" fill="#4f563b" />
      </svg>
    `,

    'balaramapuram-cape': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Balaramapuram Kora Cape Art">
        <rect width="320" height="320" fill="#f4efe6" />
        <!-- Sweeping cape drapes with metallic gold borders -->
        <path d="M 40,40 Q 160,110 280,40 L 290,280 Q 160,250 30,280 Z" fill="#ebe4d6" stroke="#d4af37" stroke-width="2.5" />
        <path d="M 70,80 Q 160,140 250,80 L 260,260 Q 160,230 60,260 Z" fill="#faf7f1" />
        <!-- Gold Kasavu Temple Diamond Chevron -->
        <g stroke="#d4af37" stroke-width="2" fill="none">
          <polyline points="90,180 110,165 130,180 150,165 170,180 190,165 210,180 230,165" />
          <polyline points="90,195 110,180 130,195 150,180 170,195 190,180 210,195 230,180" />
        </g>
        <circle cx="160" cy="115" r="8" fill="#d4af37" />
      </svg>
    `,

    'chendamangalam-stole': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Chendamangalam Stole Art">
        <rect width="320" height="320" fill="#faf7f1" />
        <!-- Dipped Karai Borders (Red and Green) -->
        <rect x="24" y="0" width="10" height="320" fill="#8c3322" />
        <rect x="38" y="0" width="5" height="320" fill="#4f563b" />
        <rect x="47" y="0" width="18" height="320" fill="#d4af37" />
        <!-- River ripple lines -->
        <g stroke="#d8d0c2" stroke-width="1.5" fill="none">
          <path d="M 90,60 C 130,40 170,80 220,60 C 260,40 280,60 320,50" />
          <path d="M 90,120 C 130,100 170,140 220,120 C 260,100 280,120 320,110" />
          <path d="M 90,180 C 130,160 170,200 220,180 C 260,160 280,180 320,170" />
          <path d="M 90,240 C 130,220 170,260 220,240 C 260,220 280,240 320,230" />
        </g>
        <!-- Gold Kasavu Pullu dots -->
        <circle cx="150" cy="120" r="5" fill="#d4af37" />
        <circle cx="210" cy="180" r="5" fill="#d4af37" />
        <circle cx="170" cy="240" r="5" fill="#d4af37" />
      </svg>
    `,

    'travancore-lotus-ring': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Travancore Lotus Ring Art">
        <rect width="320" height="320" fill="#1b1d19" />
        <!-- Deep granite ground -->
        <circle cx="160" cy="160" r="105" fill="#242822" stroke="#d4af37" stroke-width="1.5" />
        <!-- Solid Lost-Wax Cast Lotus Petals -->
        <g transform="translate(160, 160)">
          <circle r="78" fill="none" stroke="#d4af37" stroke-width="3" stroke-dasharray="6,4" />
          <path d="M 0,-65 Q 18,-35 0,-10 Q -18,-35 0,-65 Z" fill="#d4af37" />
          <path d="M 0,65 Q 18,35 0,10 Q -18,35 0,65 Z" fill="#d4af37" />
          <path d="M -65,0 Q -35,18 -10,0 Q -35,-18 -65,0 Z" fill="#d4af37" />
          <path d="M 65,0 Q 35,18 10,0 Q 35,-18 65,0 Z" fill="#d4af37" />
          <path d="M -45,-45 Q -25,-20 0,0 Q -20,-25 -45,-45 Z" fill="#c5a059" />
          <path d="M 45,-45 Q 25,-20 0,0 Q 20,-25 45,-45 Z" fill="#c5a059" />
          <path d="M -45,45 Q -25,20 0,0 Q -20,25 -45,45 Z" fill="#c5a059" />
          <path d="M 45,45 Q 25,20 0,0 Q 20,25 45,45 Z" fill="#c5a059" />
          <!-- Heavy ring core -->
          <circle r="22" fill="#3b2b1b" stroke="#d4af37" stroke-width="3.5" />
          <circle r="8" fill="#d4af37" />
        </g>
      </svg>
    `,

    // -------------------------------------------------------------
    // KARNATAKA ARTIFACTS
    // -------------------------------------------------------------
    'mysore-silk-jean': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Mysore Silk Jean Denim Art">
        <rect width="320" height="320" fill="#363d27" />
        <!-- Selvedge Denim Weave Texture -->
        <g stroke="#262d1a" stroke-width="2" opacity="0.6">
          <line x1="0" y1="0" x2="320" y2="320" />
          <line x1="40" y1="0" x2="360" y2="320" />
          <line x1="-40" y1="0" x2="280" y2="320" />
          <line x1="80" y1="0" x2="400" y2="320" />
          <line x1="-80" y1="0" x2="240" y2="320" />
        </g>
        <!-- Deep Ankle Slit revealing Crimson Mysore Silk Gusset -->
        <polygon points="120,320 160,90 200,320" fill="#611c28" stroke="#d4af37" stroke-width="2.5" />
        <!-- Flowing silk ripple lines with micro gold zari -->
        <g stroke="#d4af37" stroke-width="1.8" fill="none" opacity="0.85">
          <path d="M 160,110 Q 155,200 140,320" />
          <path d="M 160,110 Q 165,200 180,320" />
        </g>
        <!-- Chalukyan Shank Rivets -->
        <circle cx="160" cy="85" r="8" fill="#c5a059" stroke="#3b2b1b" stroke-width="2" />
        <circle cx="160" cy="85" r="3" fill="#3b2b1b" />
        <circle cx="115" cy="305" r="5" fill="#c5a059" />
        <circle cx="205" cy="305" r="5" fill="#c5a059" />
      </svg>
    `,

    'chalukyan-belt': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Chalukyan Brass Buckle Belt Art">
        <rect width="320" height="320" fill="#241d18" />
        <!-- Waxed Saddle Leather Strap -->
        <rect x="0" y="90" width="320" height="140" fill="#423429" stroke="#635041" stroke-width="2" />
        <!-- Saddle Stitching -->
        <line x1="0" y1="102" x2="320" y2="102" stroke="#d4af37" stroke-width="2" stroke-dasharray="8,5" opacity="0.75" />
        <line x1="0" y1="218" x2="320" y2="218" stroke="#d4af37" stroke-width="2" stroke-dasharray="8,5" opacity="0.75" />
        <!-- Chalukyan Cast Brass Buckle Centerpiece -->
        <rect x="80" y="80" width="160" height="160" rx="16" fill="#b8913f" stroke="#e0c068" stroke-width="4" />
        <rect x="94" y="94" width="132" height="132" rx="10" fill="#7a5e23" />
        <!-- Badami Temple Lion / Floral Filigree -->
        <circle cx="160" cy="160" r="36" fill="#b8913f" stroke="#4a3712" stroke-width="2" />
        <polygon points="160,135 175,170 145,170" fill="#4a3712" />
        <circle cx="152" cy="155" r="3" fill="#e0c068" />
        <circle cx="168" cy="155" r="3" fill="#e0c068" />
      </svg>
    `,

    'badami-overshirt': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Badami Sandstone Silk Overshirt Art">
        <rect width="320" height="320" fill="#8c4e3b" />
        <!-- Sandstone strata bands -->
        <rect x="0" y="50" width="320" height="42" fill="#aa664e" opacity="0.7" />
        <rect x="0" y="130" width="320" height="60" fill="#6e3727" opacity="0.8" />
        <rect x="0" y="230" width="320" height="36" fill="#aa664e" opacity="0.6" />
        <!-- Pure Mysore Silk Sheen Curves -->
        <g stroke="#d4af37" stroke-width="2.5" fill="none" opacity="0.8">
          <path d="M 0,100 Q 160,180 320,100" />
          <path d="M 0,120 Q 160,200 320,120" />
        </g>
        <!-- Mother-of-pearl button placket -->
        <rect x="150" y="0" width="20" height="320" fill="#753a2a" />
        <circle cx="160" cy="70" r="7" fill="#f4efe6" stroke="#c5a059" stroke-width="1.5" />
        <circle cx="160" cy="160" r="7" fill="#f4efe6" stroke="#c5a059" stroke-width="1.5" />
        <circle cx="160" cy="250" r="7" fill="#f4efe6" stroke="#c5a059" stroke-width="1.5" />
      </svg>
    `,

    'hampi-scarf': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Hampi Stone Chariot Scarf Art">
        <rect width="320" height="320" fill="#302a24" />
        <rect x="20" y="20" width="280" height="280" fill="none" stroke="#d4af37" stroke-width="3" />
        <!-- Stone Chariot Wheel Mandapa Motif -->
        <g transform="translate(160, 160)">
          <circle r="85" fill="none" stroke="#c5a059" stroke-width="4" />
          <circle r="72" fill="#423930" stroke="#d4af37" stroke-width="2" />
          <!-- 12 Radiating Spokes -->
          <line x1="0" y1="-72" x2="0" y2="72" stroke="#d4af37" stroke-width="3" />
          <line x1="-72" y1="0" x2="72" y2="0" stroke="#d4af37" stroke-width="3" />
          <line x1="-51" y1="-51" x2="51" y2="51" stroke="#d4af37" stroke-width="2.5" />
          <line x1="-51" y1="51" x2="51" y2="-51" stroke="#d4af37" stroke-width="2.5" />
          <!-- Hub -->
          <circle r="24" fill="#b8913f" stroke="#1f1a14" stroke-width="3" />
          <circle r="9" fill="#1f1a14" />
        </g>
      </svg>
    `,

    // -------------------------------------------------------------
    // TELANGANA & ANDHRA ARTIFACTS
    // -------------------------------------------------------------
    'pochampally-skirt': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Pochampally Double-Ikat Art">
        <rect width="320" height="320" fill="#f5efe6" />
        <!-- Mathematical Double Ikat Diamond Chevrons -->
        <g transform="translate(160, 160)">
          <!-- Outer Ikat Diamond -->
          <polygon points="0,-110 110,0 0,110 -110,0" fill="#1b2838" />
          <!-- Terracotta inner lozenge with resist stepped edges -->
          <polygon points="0,-85 85,0 0,85 -85,0" fill="#7d251a" />
          <polygon points="0,-60 60,0 0,60 -60,0" fill="#f5efe6" />
          <polygon points="0,-35 35,0 0,35 -35,0" fill="#d9822b" />
          <polygon points="0,-15 15,0 0,15 -15,0" fill="#1b2838" />
        </g>
        <!-- Stepped Ikat Feathering on Borders -->
        <g fill="#7d251a">
          <rect x="0" y="20" width="32" height="8" />
          <rect x="40" y="16" width="32" height="16" />
          <rect x="80" y="12" width="32" height="24" />
          <rect x="120" y="8" width="32" height="32" />
          <rect x="160" y="8" width="32" height="32" />
          <rect x="200" y="12" width="32" height="24" />
          <rect x="240" y="16" width="32" height="16" />
          <rect x="280" y="20" width="32" height="8" />
        </g>
        <g fill="#7d251a">
          <rect x="0" y="292" width="32" height="8" />
          <rect x="40" y="288" width="32" height="16" />
          <rect x="80" y="284" width="32" height="24" />
          <rect x="120" y="280" width="32" height="32" />
          <rect x="160" y="280" width="32" height="32" />
          <rect x="200" y="284" width="32" height="24" />
          <rect x="240" y="288" width="32" height="16" />
          <rect x="280" y="292" width="32" height="8" />
        </g>
      </svg>
    `,

    'kalamkari-kimono': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Srikalahasti Pen Kalamkari Tree of Life Art">
        <rect width="320" height="320" fill="#1e2229" />
        <!-- Freehand Pen-drawn Tree of Life & Lotus scrolls -->
        <g stroke="#d9822b" stroke-width="3" fill="none" stroke-linecap="round">
          <path d="M 160,320 C 160,240 130,190 90,150 C 60,120 40,80 70,50 C 100,20 140,50 160,90 C 180,50 220,20 250,50 C 280,80 260,120 230,150 C 190,190 160,240 160,320" />
          <path d="M 160,180 C 120,170 90,190 70,220" />
          <path d="M 160,180 C 200,170 230,190 250,220" />
        </g>
        <!-- Natural Madder Red Lotus Buds -->
        <circle cx="70" cy="50" r="14" fill="#7d251a" stroke="#d9822b" stroke-width="2" />
        <circle cx="250" cy="50" r="14" fill="#7d251a" stroke="#d9822b" stroke-width="2" />
        <circle cx="160" cy="90" r="18" fill="#7d251a" stroke="#d9822b" stroke-width="2.5" />
        <!-- Indigo leaf accents -->
        <ellipse cx="110" cy="130" rx="9" ry="16" transform="rotate(-35, 110, 130)" fill="#1b2838" stroke="#d9822b" stroke-width="1.5" />
        <ellipse cx="210" cy="130" rx="9" ry="16" transform="rotate(35, 210, 130)" fill="#1b2838" stroke="#d9822b" stroke-width="1.5" />
      </svg>
    `,

    'pedana-overshirt': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Pedana Indigo Block Print Art">
        <rect width="320" height="320" fill="#101c2a" />
        <!-- Fermented Indigo Dye Background -->
        <!-- Teakwood Carved Block Wave & Floral Repeating Stamps -->
        <g stroke="#f5efe6" stroke-width="2" fill="none" opacity="0.85">
          <circle cx="80" cy="80" r="32" stroke="#d9822b" stroke-width="2" />
          <circle cx="240" cy="80" r="32" stroke="#d9822b" stroke-width="2" />
          <circle cx="80" cy="240" r="32" stroke="#d9822b" stroke-width="2" />
          <circle cx="240" cy="240" r="32" stroke="#d9822b" stroke-width="2" />
          <circle cx="160" cy="160" r="44" stroke="#d9822b" stroke-width="3" />
        </g>
        <g fill="#f5efe6" opacity="0.9">
          <!-- Center block rosette -->
          <circle cx="160" cy="160" r="14" />
          <circle cx="160" cy="132" r="5" />
          <circle cx="160" cy="188" r="5" />
          <circle cx="132" cy="160" r="5" />
          <circle cx="188" cy="160" r="5" />
          <!-- Corner stamps -->
          <circle cx="80" cy="80" r="8" fill="#7d251a" />
          <circle cx="240" cy="80" r="8" fill="#7d251a" />
          <circle cx="80" cy="240" r="8" fill="#7d251a" />
          <circle cx="240" cy="240" r="8" fill="#7d251a" />
        </g>
      </svg>
    `,

    'gadwal-sash': `
      <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Gadwal Kuttu Interlocked Silk Zari Art">
        <rect width="320" height="320" fill="#f4ede1" />
        <!-- Fine unbleached cotton sash body -->
        <rect x="0" y="80" width="320" height="160" fill="#6e202d" />
        <!-- Interlocked Kuttu Temple Spire Border -->
        <polygon points="0,80 16,60 32,80 48,60 64,80 80,60 96,80 112,60 128,80 144,60 160,80 176,60 192,80 208,60 224,80 240,60 256,80 272,60 288,80 304,60 320,80" fill="#d4af37" />
        <polygon points="0,240 16,260 32,240 48,260 64,240 80,260 96,240 112,260 128,240 144,260 160,240 176,260 192,240 208,260 224,240 240,260 256,240 272,260 288,240 304,260 320,240" fill="#d4af37" />
        <!-- Pure Metallic Zari Medallions -->
        <circle cx="80" cy="160" r="24" fill="#d4af37" stroke="#3b2b1b" stroke-width="2" />
        <circle cx="160" cy="160" r="32" fill="#d4af37" stroke="#3b2b1b" stroke-width="2.5" />
        <circle cx="240" cy="160" r="24" fill="#d4af37" stroke="#3b2b1b" stroke-width="2" />
        <circle cx="160" cy="160" r="10" fill="#6e202d" />
      </svg>
    `
  };

  return artworks[productId] || `
    <svg viewBox="0 0 320 320" class="throw-deck-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="320" fill="#242220" />
      <circle cx="160" cy="160" r="64" fill="${accentColor}" />
      <circle cx="160" cy="160" r="32" fill="#faf7f1" />
    </svg>
  `;
}
