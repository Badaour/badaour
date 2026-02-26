import { useState } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PHONE = "438-988-6682";
const EMAIL = "service@badaour.com";

const G = "#D4AF37";
const DARK = "#1A0A00";
const RED = "#8B1A00";
const CREAM = "#FFF8EE";
const BG = "#FDF6EC";
const BGALT = "#F5ECD9";
const BORDER = "#E8D5B7";
const MUTED = "#8B6A3E";
const GREEN = "#2E8B57";
const BROWN = "#3D1A00";

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  // ── HABILLEMENT HOMME ──
  { id: 1, name: "Grand Boubou Brodé", category: "homme", subcategory: "Boubou", artisan: "Moussa Diallo, Dakar", country: "Sénégal", price: 189, tag: "Bestseller",
    desc: "Broderie main sur bazin riche, teinture naturelle indigo. Tailles S à XXL disponibles.",
    svg: (
      <svg width="160" height="200" viewBox="0 0 160 200">
        <path d="M30,40 Q25,50 15,80 L8,180 Q8,188 18,188 L142,188 Q152,188 152,180 L145,80 Q135,50 130,40 Z" fill="#1A3A6B"/>
        <ellipse cx="80" cy="42" rx="28" ry="16" fill="#0D2550"/>
        <ellipse cx="80" cy="42" rx="16" ry="10" fill={DARK}/>
        <ellipse cx="80" cy="42" rx="26" ry="14" fill="none" stroke={G} stroke-width="2.5"/>
        <polygon points="80,24 86,30 80,36 74,30" fill={G}/>
        <line x1="80" y1="56" x2="80" y2="150" stroke={G} stroke-width="2" stroke-dasharray="7,5"/>
        <path d="M15,80 Q0,90 4,130 Q8,145 20,140 L30,95Z" fill="#1A3A6B"/>
        <path d="M145,80 Q160,90 156,130 Q152,145 140,140 L130,95Z" fill="#1A3A6B"/>
        <path d="M4,130 Q8,145 20,140" fill="none" stroke={G} stroke-width="2.5"/>
        <path d="M156,130 Q152,145 140,140" fill="none" stroke={G} stroke-width="2.5"/>
        <rect x="8" y="178" width="144" height="5" rx="2" fill={G} opacity="0.7"/>
        <path d="M38,110 Q50,100 62,110 Q50,120 38,110Z" fill={G} opacity="0.5"/>
        <path d="M98,110 Q110,100 122,110 Q110,120 98,110Z" fill={G} opacity="0.5"/>
      </svg>
    )
  },
  { id: 2, name: "Dashiki Festif", category: "homme", subcategory: "Chemise", artisan: "Koffi Asante, Accra", country: "Ghana", price: 78, tag: "Nouveau",
    desc: "Coton léger brodé, col en V, manches courtes. Couleurs vives traditionnelles.",
    svg: (
      <svg width="160" height="200" viewBox="0 0 160 200">
        <path d="M35,45 Q30,52 20,75 L18,170 Q18,178 28,178 L132,178 Q142,178 142,170 L140,75 Q130,52 125,45 Z" fill="#E74C3C"/>
        <rect x="18" y="88" width="124" height="10" fill="#F1C40F" opacity="0.8"/>
        <rect x="18" y="115" width="124" height="10" fill="#2ECC71" opacity="0.8"/>
        <rect x="18" y="142" width="124" height="10" fill="#F1C40F" opacity="0.8"/>
        <line x1="60" y1="45" x2="58" y2="178" stroke="#C0392B" stroke-width="5" opacity="0.5"/>
        <line x1="100" y1="45" x2="102" y2="178" stroke="#C0392B" stroke-width="5" opacity="0.5"/>
        <path d="M60,40 Q80,28 100,40" fill="none" stroke="#E74C3C" stroke-width="8"/>
        <path d="M60,40 Q80,32 100,40" fill="none" stroke="#F39C12" stroke-width="5"/>
        <path d="M70,38 Q80,30 90,38" fill="none" stroke="#E74C3C" stroke-width="3"/>
        <path d="M20,75 Q5,82 8,118 Q12,130 22,126 L30,80Z" fill="#E74C3C"/>
        <path d="M140,75 Q155,82 152,118 Q148,130 138,126 L130,80Z" fill="#E74C3C"/>
        <circle cx="80" cy="105" r="18" fill="none" stroke="#F1C40F" stroke-width="2"/>
        <circle cx="80" cy="105" r="10" fill="#F1C40F" opacity="0.3"/>
        <polygon points="80,92 84,100 92,100 86,106 88,114 80,109 72,114 74,106 68,100 76,100" fill="#F1C40F" opacity="0.8"/>
      </svg>
    )
  },
  { id: 3, name: "Agbada Cérémonie", category: "homme", subcategory: "Tenue complète", artisan: "Adebayo Okafor, Lagos", country: "Nigeria", price: 245, tag: "Premium",
    desc: "Ensemble 3 pièces : robe longue, tunique courte et pantalon. Broderie dorée exclusive.",
    svg: (
      <svg width="160" height="200" viewBox="0 0 160 200">
        <path d="M10,35 Q5,50 2,100 L0,185 Q0,194 12,194 L148,194 Q160,194 160,185 L158,100 Q155,50 150,35 Z" fill="#6B2FA0"/>
        <ellipse cx="80" cy="36" rx="35" ry="18" fill="#5A1F8A"/>
        <ellipse cx="80" cy="36" rx="20" ry="11" fill={DARK}/>
        <ellipse cx="80" cy="36" rx="33" ry="16" fill="none" stroke={G} stroke-width="3"/>
        <path d="M52,30 Q80,18 108,30" fill="none" stroke={G} stroke-width="2"/>
        <path d="M52,42 Q80,52 108,42" fill="none" stroke={G} stroke-width="2"/>
        <polygon points="80,18 87,25 80,32 73,25" fill={G}/>
        <polygon points="60,25 65,29 60,33 55,29" fill={G} opacity="0.8"/>
        <polygon points="100,25 105,29 100,33 95,29" fill={G} opacity="0.8"/>
        <line x1="80" y1="54" x2="80" y2="165" stroke={G} stroke-width="3" stroke-dasharray="10,6"/>
        <rect x="30" y="80" width="22" height="90" rx="3" fill="#5A1F8A" opacity="0.6"/>
        <rect x="108" y="80" width="22" height="90" rx="3" fill="#5A1F8A" opacity="0.6"/>
        <rect x="29" y="80" width="4" height="90" fill={G} opacity="0.6"/>
        <rect x="127" y="80" width="4" height="90" fill={G} opacity="0.6"/>
        <path d="M2,100 Q-8,110 -4,150 Q0,165 14,160 L20,105Z" fill="#6B2FA0"/>
        <path d="M158,100 Q168,110 164,150 Q160,165 146,160 L140,105Z" fill="#6B2FA0"/>
        <path d="M-4,150 Q0,165 14,160" fill="none" stroke={G} stroke-width="3"/>
        <path d="M164,150 Q160,165 146,160" fill="none" stroke={G} stroke-width="3"/>
        <rect x="0" y="184" width="160" height="5" rx="2" fill={G}/>
        <path d="M50,115 Q65,105 80,115 Q65,125 50,115Z" fill={G} opacity="0.6"/>
        <path d="M80,115 Q95,105 110,115 Q95,125 80,115Z" fill={G} opacity="0.6"/>
        <path d="M50,145 Q65,135 80,145 Q65,155 50,145Z" fill={G} opacity="0.6"/>
        <path d="M80,145 Q95,135 110,145 Q95,155 80,145Z" fill={G} opacity="0.6"/>
      </svg>
    )
  },

  // ── HABILLEMENT FEMME ──
  { id: 4, name: "Robe Wax Élégance", category: "femme", subcategory: "Robe", artisan: "Fatoumata Koné, Bamako", country: "Mali", price: 134, tag: "Bestseller",
    desc: "Robe droite en wax hollandais, ceinture tissée, col carré. Tailles XS à XL.",
    svg: (
      <svg width="150" height="210" viewBox="0 0 150 210">
        <path d="M45,38 Q30,42 25,60 L15,170 Q15,182 28,183 L122,183 Q135,182 135,170 L125,60 Q120,42 105,38 Z" fill="#E74C3C"/>
        <rect x="16" y="85" width="118" height="9" fill="#F1C40F" opacity="0.75"/>
        <rect x="14" y="108" width="122" height="9" fill="#27AE60" opacity="0.75"/>
        <rect x="13" y="131" width="124" height="9" fill="#F1C40F" opacity="0.75"/>
        <rect x="13" y="154" width="124" height="9" fill="#27AE60" opacity="0.75"/>
        <line x1="56" y1="40" x2="52" y2="183" stroke="#C0392B" stroke-width="5" opacity="0.5"/>
        <line x1="94" y1="40" x2="98" y2="183" stroke="#C0392B" stroke-width="5" opacity="0.5"/>
        <circle cx="42" cy="95" r="6" fill="#C0392B" opacity="0.7"/>
        <circle cx="42" cy="95" r="3" fill="#F1C40F"/>
        <circle cx="75" cy="95" r="6" fill="#27AE60" opacity="0.7"/>
        <circle cx="75" cy="95" r="3" fill="#C0392B"/>
        <circle cx="108" cy="95" r="6" fill="#F1C40F" opacity="0.7"/>
        <circle cx="108" cy="95" r="3" fill="#27AE60"/>
        <circle cx="42" cy="142" r="6" fill="#27AE60"/>
        <circle cx="75" cy="142" r="6" fill="#C0392B"/>
        <circle cx="108" cy="142" r="6" fill="#F1C40F"/>
        <path d="M45,38 Q58,22 75,18 Q92,22 105,38" fill="#C0392B" stroke="#8B1A00" stroke-width="1"/>
        <ellipse cx="75" cy="18" rx="16" ry="10" fill="#8B1A00"/>
        <rect x="28" y="65" width="94" height="10" rx="3" fill="#8B1A00" opacity="0.8"/>
        <path d="M62,65 L75,55 L88,65" fill="#D4AF37"/>
        <rect x="15" y="173" width="120" height="6" rx="2" fill="#8B1A00"/>
      </svg>
    )
  },
  { id: 5, name: "Ensemble Bogolan Chic", category: "femme", subcategory: "Ensemble", artisan: "Awa Traoré, Bamako", country: "Mali", price: 168, tag: "Artisanal",
    desc: "Haut et jupe assortis en bogolan peint à la main. Motifs géométriques uniques.",
    svg: (
      <svg width="150" height="210" viewBox="0 0 150 210">
        <path d="M40,28 Q32,35 30,50 L28,95 Q28,100 40,102 L110,102 Q122,100 122,95 L120,50 Q118,35 110,28 Z" fill="#8B5E3C"/>
        <rect x="30" y="52" width="90" height="7" fill="#C8A96E" opacity="0.7"/>
        <rect x="30" y="68" width="90" height="7" fill="#C8A96E" opacity="0.7"/>
        <rect x="30" y="84" width="90" height="7" fill="#C8A96E" opacity="0.7"/>
        <line x1="60" y1="28" x2="58" y2="102" stroke="#6B3D1A" stroke-width="6" opacity="0.5"/>
        <line x1="90" y1="28" x2="92" y2="102" stroke="#6B3D1A" stroke-width="6" opacity="0.5"/>
        <path d="M45,58 L55,68 M55,58 L45,68" stroke="#2A1000" stroke-width="2.5"/>
        <polygon points="75,53 80,58 75,63 70,58" fill="#2A1000"/>
        <path d="M95,58 L105,68 M105,58 L95,68" stroke="#2A1000" stroke-width="2.5"/>
        <path d="M40,28 Q75,14 110,28" fill="none" stroke="#6B3D1A" stroke-width="3"/>
        <ellipse cx="75" cy="28" rx="18" ry="10" fill="#6B3D1A"/>
        <path d="M25,100 L20,190 Q20,200 33,200 L117,200 Q130,200 130,190 L125,100 Z" fill="#8B5E3C"/>
        <rect x="22" y="115" width="106" height="7" fill="#C8A96E" opacity="0.7"/>
        <rect x="21" y="135" width="108" height="7" fill="#C8A96E" opacity="0.7"/>
        <rect x="20" y="155" width="110" height="7" fill="#C8A96E" opacity="0.7"/>
        <rect x="20" y="175" width="110" height="7" fill="#C8A96E" opacity="0.7"/>
        <line x1="55" y1="100" x2="52" y2="200" stroke="#6B3D1A" stroke-width="6" opacity="0.5"/>
        <line x1="95" y1="100" x2="98" y2="200" stroke="#6B3D1A" stroke-width="6" opacity="0.5"/>
        <circle cx="38" cy="125" r="5" fill="none" stroke="#2A1000" stroke-width="2"/>
        <circle cx="38" cy="125" r="2" fill="#2A1000"/>
        <polygon points="75,120 80,126 75,132 70,126" fill="#2A1000"/>
        <circle cx="112" cy="125" r="5" fill="none" stroke="#2A1000" stroke-width="2"/>
        <circle cx="112" cy="125" r="2" fill="#2A1000"/>
        <rect x="20" y="191" width="110" height="6" rx="2" fill="#6B3D1A"/>
      </svg>
    )
  },
  { id: 6, name: "Kaftan Soirée Brodé", category: "femme", subcategory: "Kaftan", artisan: "Aïcha Diop, Dakar", country: "Sénégal", price: 212, tag: "Premium",
    desc: "Kaftan en voile de coton, broderie florales au fil d'or, ceinture dorée.",
    svg: (
      <svg width="155" height="210" viewBox="0 0 155 210">
        <path d="M20,42 Q16,55 12,90 L8,185 Q8,195 20,196 L135,196 Q147,195 147,185 L143,90 Q139,55 135,42 Z" fill="#1A1060"/>
        <ellipse cx="77" cy="44" rx="30" ry="16" fill="#130C48"/>
        <ellipse cx="77" cy="44" rx="17" ry="10" fill={DARK}/>
        <ellipse cx="77" cy="44" rx="28" ry="14" fill="none" stroke={G} stroke-width="2.5"/>
        <line x1="77" y1="58" x2="77" y2="175" stroke={G} stroke-width="2.5" stroke-dasharray="8,5"/>
        <path d="M50,60 Q60,50 77,48 Q94,50 104,60" fill="none" stroke={G} stroke-width="2"/>
        <path d="M48,75 Q62,65 77,63 Q92,65 106,75" fill="none" stroke={G} stroke-width="1.5" opacity="0.7"/>
        <path d="M48,90 Q62,80 77,78 Q92,80 106,90" fill="none" stroke={G} stroke-width="1.5" opacity="0.5"/>
        <ellipse cx="77" cy="130" rx="22" ry="22" fill="none" stroke={G} stroke-width="1.5" opacity="0.6"/>
        <path d="M77,108 Q90,117 90,130 Q90,143 77,152 Q64,143 64,130 Q64,117 77,108Z" fill={G} opacity="0.15"/>
        <polygon points="77,110 81,118 90,118 84,124 86,133 77,128 68,133 70,124 64,118 73,118" fill={G} opacity="0.7"/>
        <path d="M12,90 Q-2,100 2,138 Q5,153 18,148 L26,95Z" fill="#1A1060"/>
        <path d="M143,90 Q157,100 153,138 Q150,153 137,148 L129,95Z" fill="#1A1060"/>
        <path d="M2,138 Q5,153 18,148" fill="none" stroke={G} stroke-width="2.5"/>
        <path d="M153,138 Q150,153 137,148" fill="none" stroke={G} stroke-width="2.5"/>
        <rect x="8" y="186" width="139" height="5" rx="2" fill={G} opacity="0.8"/>
        <rect x="50" y="155" width="54" height="8" rx="2" fill={G} opacity="0.8"/>
        <rect x="50" y="155" width="54" height="4" rx="2" fill="#F5D060"/>
      </svg>
    )
  },

  // ── HABILLEMENT ENFANT ──
  { id: 7, name: "Mini Boubou Enfant", category: "enfant", subcategory: "Boubou", artisan: "Moussa Diallo, Dakar", country: "Sénégal", price: 64, tag: "Populaire",
    desc: "Version enfant du grand boubou. Tissu doux coton lavable. Tailles 2 à 12 ans.",
    svg: (
      <svg width="145" height="185" viewBox="0 0 145 185">
        <path d="M32,38 Q28,46 20,68 L14,162 Q14,170 24,170 L121,170 Q131,170 131,162 L125,68 Q117,46 113,38 Z" fill="#27AE60"/>
        <ellipse cx="72" cy="40" rx="24" ry="14" fill="#1E8449"/>
        <ellipse cx="72" cy="40" rx="14" ry="8" fill={DARK}/>
        <ellipse cx="72" cy="40" rx="22" ry="12" fill="none" stroke={G} stroke-width="2"/>
        <polygon points="72,26 77,32 72,38 67,32" fill={G}/>
        <line x1="72" y1="54" x2="72" y2="130" stroke={G} stroke-width="2" stroke-dasharray="6,4"/>
        <path d="M20,68 Q8,76 11,106 Q15,118 24,114 L30,72Z" fill="#27AE60"/>
        <path d="M125,68 Q137,76 134,106 Q130,118 121,114 L115,72Z" fill="#27AE60"/>
        <path d="M11,106 Q15,118 24,114" fill="none" stroke={G} stroke-width="2.5"/>
        <path d="M134,106 Q130,118 121,114" fill="none" stroke={G} stroke-width="2.5"/>
        <rect x="14" y="162" width="117" height="4" rx="2" fill={G} opacity="0.7"/>
        <path d="M36,95 Q46,86 58,95 Q46,104 36,95Z" fill={G} opacity="0.5"/>
        <path d="M87,95 Q97,86 109,95 Q97,104 87,95Z" fill={G} opacity="0.5"/>
        <circle cx="72" cy="120" r="8" fill="#F1C40F" opacity="0.7"/>
        <circle cx="72" cy="120" r="4" fill="#27AE60"/>
      </svg>
    )
  },
  { id: 8, name: "Robe Wax Princesse", category: "enfant", subcategory: "Robe", artisan: "Koffi Mensah, Lomé", country: "Togo", price: 52, tag: "Nouveau",
    desc: "Robe à volants en wax coloré. Bretelles réglables. Tailles 3 à 10 ans.",
    svg: (
      <svg width="145" height="185" viewBox="0 0 145 185">
        <path d="M40,35 Q35,40 32,55 L30,95 Q30,100 42,102 L103,102 Q115,100 115,95 L113,55 Q110,40 105,35 Z" fill="#E91E8C"/>
        <rect x="31" y="66" width="83" height="7" fill="#F8BBD9" opacity="0.8"/>
        <rect x="30" y="83" width="85" height="7" fill="#F8BBD9" opacity="0.8"/>
        <line x1="60" y1="36" x2="58" y2="102" stroke="#C2185B" stroke-width="4" opacity="0.5"/>
        <line x1="85" y1="36" x2="87" y2="102" stroke="#C2185B" stroke-width="4" opacity="0.5"/>
        <circle cx="47" cy="75" r="5" fill="#C2185B"/>
        <circle cx="72" cy="75" r="5" fill="#F1C40F"/>
        <circle cx="97" cy="75" r="5" fill="#C2185B"/>
        <path d="M45,35 Q52,25 72,22 Q92,25 100,35" fill="#C2185B"/>
        <ellipse cx="72" cy="22" rx="14" ry="8" fill="#C2185B"/>
        <path d="M30,100 Q18,110 10,130 L5,175 Q5,183 18,183 L127,183 Q140,183 140,175 L135,130 Q127,110 115,100 Z" fill="#E91E8C"/>
        <rect x="8" y="118" width="129" height="6" fill="#F8BBD9" opacity="0.6"/>
        <rect x="6" y="138" width="133" height="6" fill="#F8BBD9" opacity="0.6"/>
        <rect x="5" y="158" width="135" height="6" fill="#F8BBD9" opacity="0.6"/>
        <rect x="5" y="174" width="135" height="5" rx="2" fill="#C2185B"/>
        <circle cx="30" cy="128" r="4" fill="#F1C40F"/>
        <circle cx="72" cy="148" r="4" fill="#F1C40F"/>
        <circle cx="114" cy="128" r="4" fill="#F1C40F"/>
        <path d="M5,172 Q20,180 72,182 Q124,180 140,172" fill="none" stroke="#F8BBD9" stroke-width="3" opacity="0.5"/>
      </svg>
    )
  },
  { id: 9, name: "Ensemble Kente Junior", category: "enfant", subcategory: "Ensemble", artisan: "Kweku Mensah, Kumasi", country: "Ghana", price: 72, tag: "Artisanal",
    desc: "Ensemble tunique + pantalon en tissu kente authentique. 4 à 14 ans.",
    svg: (
      <svg width="145" height="185" viewBox="0 0 145 185">
        <path d="M32,30 Q28,36 26,52 L24,88 Q24,94 36,95 L109,95 Q121,94 121,88 L119,52 Q117,36 113,30 Z" fill="#D4AF37"/>
        <rect x="25" y="44" width="95" height="7" fill="#C0392B" opacity="0.8"/>
        <rect x="24" y="60" width="97" height="7" fill="#1A3A6B" opacity="0.8"/>
        <rect x="24" y="76" width="97" height="7" fill="#C0392B" opacity="0.8"/>
        <line x1="56" y1="30" x2="54" y2="95" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <line x1="89" y1="30" x2="91" y2="95" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <path d="M38,30 Q72,18 107,30" fill="#B8860B"/>
        <ellipse cx="72" cy="30" rx="16" ry="9" fill="#8B6A00"/>
        <path d="M26,92 L20,175 Q20,183 32,183 L113,183 Q125,183 125,175 L119,92 Z" fill="#D4AF37"/>
        <rect x="21" y="108" width="103" height="7" fill="#C0392B" opacity="0.8"/>
        <rect x="20" y="128" width="105" height="7" fill="#1A3A6B" opacity="0.8"/>
        <rect x="20" y="148" width="105" height="7" fill="#C0392B" opacity="0.8"/>
        <rect x="20" y="168" width="105" height="7" fill="#1A3A6B" opacity="0.8"/>
        <line x1="55" y1="92" x2="52" y2="183" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <line x1="90" y1="92" x2="93" y2="183" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <rect x="20" y="175" width="105" height="5" rx="2" fill="#8B6A00"/>
      </svg>
    )
  },

  // ── OEUVRES D'ART ──
  { id: 10, name: "Sculpture Baobab", category: "art", subcategory: "Sculpture", artisan: "Cheikh Ndiaye, Thiès", country: "Sénégal", price: 145, tag: "Unique",
    desc: "Bois de venn sculpté à la main. Pièce unique numérotée. H: 35cm. Symbole d'éternité.",
    svg: (
      <svg width="155" height="205" viewBox="0 0 155 205">
        <ellipse cx="77" cy="195" rx="42" ry="9" fill={BROWN} opacity="0.7"/>
        <rect x="45" y="183" width="64" height="12" rx="2" fill="#4A2800"/>
        <rect x="42" y="180" width="70" height="5" rx="2" fill="#6B3D1A"/>
        <path d="M56,180 Q48,162 46,132 Q42,100 48,78 Q54,62 62,52 Q70,42 77,40 Q84,42 93,52 Q101,62 107,78 Q113,100 109,132 Q107,162 99,180 Z" fill="#8B5E3C"/>
        <path d="M62,180 Q55,160 54,132 Q51,100 57,78" fill="none" stroke="#7A4E2A" stroke-width="1.5" opacity="0.6"/>
        <path d="M72,182 Q65,162 64,132 Q61,100 67,76" fill="none" stroke="#7A4E2A" stroke-width="1.5" opacity="0.6"/>
        <path d="M92,182 Q99,162 100,132 Q103,100 97,78" fill="none" stroke="#7A4E2A" stroke-width="1.5" opacity="0.6"/>
        <path d="M56,52 Q34,36 12,28" stroke="#6B3D1A" stroke-width="10" stroke-linecap="round" fill="none"/>
        <path d="M56,52 Q34,36 12,28" stroke="#8B5E3C" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M77,40 Q67,18 58,4" stroke="#6B3D1A" stroke-width="9" stroke-linecap="round" fill="none"/>
        <path d="M77,40 Q67,18 58,4" stroke="#8B5E3C" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M77,40 Q87,18 96,4" stroke="#6B3D1A" stroke-width="9" stroke-linecap="round" fill="none"/>
        <path d="M77,40 Q87,18 96,4" stroke="#8B5E3C" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M98,52 Q120,36 143,28" stroke="#6B3D1A" stroke-width="10" stroke-linecap="round" fill="none"/>
        <path d="M98,52 Q120,36 143,28" stroke="#8B5E3C" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M34,42 Q22,30 14,28" stroke="#8B5E3C" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M34,42 Q24,28 18,16" stroke="#8B5E3C" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M120,42 Q132,28 140,28" stroke="#8B5E3C" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M120,42 Q130,28 136,16" stroke="#8B5E3C" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M64,16 Q54,8 48,4" stroke="#8B5E3C" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M90,16 Q100,8 106,4" stroke="#8B5E3C" stroke-width="4" stroke-linecap="round" fill="none"/>
        <circle cx="12" cy="28" r="4" fill="#2E8B57"/>
        <circle cx="18" cy="16" r="3" fill="#2E8B57"/>
        <circle cx="48" cy="4" r="4" fill="#2E8B57"/>
        <circle cx="58" cy="4" r="3" fill="#27AE60"/>
        <circle cx="96" cy="4" r="4" fill="#2E8B57"/>
        <circle cx="106" cy="4" r="3" fill="#27AE60"/>
        <circle cx="136" cy="16" r="3" fill="#2E8B57"/>
        <circle cx="140" cy="28" r="4" fill="#2E8B57"/>
        <rect x="50" y="188" width="54" height="13" rx="2" fill={G}/>
        <text x="77" y="198" textAnchor="middle" fontSize="8" fill={DARK} fontFamily="Georgia" letterSpacing="1">PIÈCE UNIQUE N°7</text>
      </svg>
    )
  },
  { id: 11, name: "Masque Danseur Dogon", category: "art", subcategory: "Masque", artisan: "Sékou Traoré, Mopti", country: "Mali", price: 185, tag: "Unique",
    desc: "Masque cérémoniel Dogon sculpté dans le bois de karité. Peintures naturelles.",
    svg: (
      <svg width="155" height="205" viewBox="0 0 155 205">
        <ellipse cx="77" cy="198" rx="38" ry="8" fill={BROWN} opacity="0.5"/>
        <path d="M30,55 Q28,30 40,18 Q52,6 77,4 Q102,6 114,18 Q126,30 124,55 L130,140 Q130,160 120,168 Q110,176 77,176 Q44,176 34,168 Q24,160 24,140 Z" fill="#8B5E3C"/>
        <ellipse cx="77" cy="55" rx="46" ry="50" fill="#A07040"/>
        <path d="M30,55 Q28,30 40,18 Q52,6 77,4 Q102,6 114,18 Q126,30 124,55" fill="none" stroke="#6B3D1A" stroke-width="3"/>
        <ellipse cx="58" cy="68" rx="12" ry="9" fill="#5A2000"/>
        <ellipse cx="96" cy="68" rx="12" ry="9" fill="#5A2000"/>
        <ellipse cx="58" cy="68" rx="7" ry="5" fill="#1A0A00"/>
        <ellipse cx="96" cy="68" rx="7" ry="5" fill="#1A0A00"/>
        <circle cx="57" cy="67" r="2" fill="white" opacity="0.5"/>
        <circle cx="95" cy="67" r="2" fill="white" opacity="0.5"/>
        <path d="M53,58 Q58,52 63,58" fill="none" stroke="#6B3D1A" stroke-width="2.5"/>
        <path d="M91,58 Q96,52 101,58" fill="none" stroke="#6B3D1A" stroke-width="2.5"/>
        <path d="M60,94 Q69,88 77,86 Q85,88 94,94" fill="none" stroke="#6B3D1A" stroke-width="3"/>
        <path d="M60,94 Q69,100 77,101 Q85,100 94,94" fill="#8B5E3C" stroke="#5A2000" stroke-width="1.5"/>
        <path d="M58,115 Q68,112 77,111 Q86,112 96,115" fill="none" stroke="#6B3D1A" stroke-width="2"/>
        <line x1="77" y1="86" x2="77" y2="66" stroke="#6B3D1A" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="77" cy="63" rx="6" ry="4" fill="#6B3D1A"/>
        <path d="M32,80 Q14,75 10,95 Q8,112 22,115 L28,88Z" fill="#8B5E3C"/>
        <path d="M122,80 Q140,75 144,95 Q146,112 132,115 L126,88Z" fill="#8B5E3C"/>
        <path d="M42,28 Q30,50 28,80" fill="none" stroke="#6B3D1A" stroke-width="2" opacity="0.6"/>
        <path d="M112,28 Q124,50 126,80" fill="none" stroke="#6B3D1A" stroke-width="2" opacity="0.6"/>
        <path d="M77,4 L77,0 L70,10 L77,6 L84,10 L77,0Z" fill="#D4AF37"/>
        <rect x="72" y="0" width="10" height="4" fill="#D4AF37"/>
        <path d="M34,160 Q44,172 77,175 Q110,172 120,160" fill="none" stroke="#6B3D1A" stroke-width="2"/>
        <line x1="77" y1="112" x2="77" y2="165" stroke="#6B3D1A" stroke-width="2.5" stroke-dasharray="5,4"/>
      </svg>
    )
  },
  { id: 12, name: "Tableau Tissu Kente", category: "art", subcategory: "Tableau", artisan: "Kwame Asante, Accra", country: "Ghana", price: 224, tag: "Premium",
    desc: "Panneau de tissu kente authentique encadré. 40×60cm. Chaque couleur a une signification.",
    svg: (
      <svg width="165" height="200" viewBox="0 0 165 200">
        <rect x="8" y="8" width="149" height="184" rx="4" fill="#4A2800"/>
        <rect x="12" y="12" width="141" height="176" rx="2" fill="#8B6A00"/>
        <rect x="14" y="14" width="137" height="172" fill={DARK}/>
        <rect x="18" y="18" width="129" height="164" fill="#D4AF37"/>
        <rect x="18" y="18" width="129" height="11" fill="#C0392B"/>
        <rect x="18" y="36" width="129" height="11" fill="#D4AF37"/>
        <rect x="18" y="54" width="129" height="11" fill="#1A3A6B"/>
        <rect x="18" y="72" width="129" height="11" fill="#27AE60"/>
        <rect x="18" y="90" width="129" height="11" fill="#C0392B"/>
        <rect x="18" y="108" width="129" height="11" fill="#D4AF37"/>
        <rect x="18" y="126" width="129" height="11" fill="#1A3A6B"/>
        <rect x="18" y="144" width="129" height="11" fill="#27AE60"/>
        <rect x="18" y="162" width="129" height="11" fill="#C0392B"/>
        <line x1="36" y1="18" x2="36" y2="182" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <line x1="54" y1="18" x2="54" y2="182" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <line x1="72" y1="18" x2="72" y2="182" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <line x1="83" y1="18" x2="83" y2="182" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <line x1="101" y1="18" x2="101" y2="182" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <line x1="119" y1="18" x2="119" y2="182" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <line x1="137" y1="18" x2="137" y2="182" stroke="#B8860B" stroke-width="5" opacity="0.6"/>
        <rect x="8" y="8" width="149" height="184" rx="4" fill="none" stroke="#6B3D1A" stroke-width="4"/>
        <polygon points="8,8 20,8 8,20" fill="#8B6A00"/>
        <polygon points="157,8 145,8 157,20" fill="#8B6A00"/>
        <polygon points="8,192 20,192 8,180" fill="#8B6A00"/>
        <polygon points="157,192 145,192 157,180" fill="#8B6A00"/>
      </svg>
    )
  },

  // ── DIVERS / ACCESSOIRES ──
  { id: 13, name: "Collier Krobo Beads", category: "divers", subcategory: "Bijoux", artisan: "Abena Asante, Accra", country: "Ghana", price: 74, tag: "Nouveau",
    desc: "Perles de verre recyclé fondues à la flamme. Tradition centenaire Krobo. Pièce unique.",
    svg: (
      <svg width="155" height="190" viewBox="0 0 155 190">
        <ellipse cx="77" cy="168" rx="52" ry="12" fill={DARK} opacity="0.6"/>
        <rect x="30" y="158" width="94" height="16" rx="5" fill="#1A0D00" opacity="0.9"/>
        <path d="M77,32 Q42,40 22,72 Q14,96 22,118 Q38,152 77,160 Q116,152 132,118 Q140,96 132,72 Q112,40 77,32Z" fill="none" stroke="#6B3D1A" stroke-width="2"/>
        <circle cx="77" cy="32" r="8" fill="#E74C3C"/>
        <circle cx="77" cy="32" r="5" fill="#FF6B6B"/>
        <circle cx="57" cy="38" r="7" fill={G}/>
        <circle cx="57" cy="38" r="4" fill="#FFE878"/>
        <circle cx="38" cy="52" r="8" fill="#27AE60"/>
        <circle cx="38" cy="52" r="5" fill="#52C97A"/>
        <circle cx="24" cy="72" r="7" fill="#E74C3C"/>
        <circle cx="24" cy="72" r="4" fill="#FF8870"/>
        <circle cx="18" cy="96" r="8" fill={G}/>
        <circle cx="18" cy="96" r="5" fill="#F5D060"/>
        <circle cx="22" cy="118" r="7" fill="#8B1A00"/>
        <circle cx="22" cy="118" r="4" fill="#C0392B"/>
        <circle cx="36" cy="140" r="8" fill="#1A3A6B"/>
        <circle cx="36" cy="140" r="5" fill="#3498DB"/>
        <circle cx="58" cy="155" r="7" fill={G}/>
        <circle cx="58" cy="155" r="4" fill="#FFE878"/>
        <circle cx="97" cy="38" r="7" fill="#1A3A6B"/>
        <circle cx="97" cy="38" r="4" fill="#5DADE2"/>
        <circle cx="116" cy="52" r="8" fill="#E74C3C"/>
        <circle cx="116" cy="52" r="5" fill="#FF8870"/>
        <circle cx="131" cy="72" r="7" fill={G}/>
        <circle cx="131" cy="72" r="4" fill="#F5D060"/>
        <circle cx="137" cy="96" r="8" fill="#27AE60"/>
        <circle cx="137" cy="96" r="5" fill="#52C97A"/>
        <circle cx="133" cy="118" r="7" fill="#6A0572"/>
        <circle cx="133" cy="118" r="4" fill="#AF7AC5"/>
        <circle cx="119" cy="140" r="8" fill="#E74C3C"/>
        <circle cx="119" cy="140" r="5" fill="#FF6B6B"/>
        <circle cx="96" cy="155" r="7" fill="#1A3A6B"/>
        <circle cx="96" cy="155" r="4" fill="#3498DB"/>
        <circle cx="77" cy="160" r="13" fill={G}/>
        <circle cx="77" cy="160" r="9" fill="#8B6A00"/>
        <circle cx="77" cy="160" r="5" fill={G}/>
        <circle cx="77" cy="160" r="2.5" fill="#FFE878"/>
        <rect x="52" y="170" width="50" height="12" rx="3" fill={G}/>
        <text x="77" y="180" textAnchor="middle" fontSize="7.5" fill={DARK} fontFamily="Georgia" letterSpacing="1">KROBO BEADS</text>
      </svg>
    )
  },
  { id: 14, name: "Sac Bogolan Cuir", category: "divers", subcategory: "Sac", artisan: "Fatoumata Koné, Bamako", country: "Mali", price: 112, tag: "Artisanal",
    desc: "Sac bogolan traditionnel, cuir véritable tannage végétal. Motifs géométriques peints à la boue.",
    svg: (
      <svg width="155" height="195" viewBox="0 0 155 195">
        <path d="M28,65 Q26,58 32,50 L40,43 Q52,38 77,38 L102,43 L115,50 Q121,58 119,65 L124,185 Q124,193 111,193 L32,193 Q19,193 19,185 Z" fill="#8B5E3C"/>
        <rect x="22" y="80" width="110" height="9" fill="#C8A96E" opacity="0.6"/>
        <rect x="21" y="102" width="112" height="9" fill="#C8A96E" opacity="0.6"/>
        <rect x="21" y="124" width="112" height="9" fill="#C8A96E" opacity="0.6"/>
        <rect x="21" y="146" width="112" height="9" fill="#C8A96E" opacity="0.6"/>
        <rect x="21" y="168" width="112" height="9" fill="#C8A96E" opacity="0.6"/>
        <line x1="53" y1="65" x2="51" y2="192" stroke="#6B3D1A" stroke-width="6" opacity="0.5"/>
        <line x1="77" y1="65" x2="77" y2="192" stroke="#6B3D1A" stroke-width="6" opacity="0.5"/>
        <line x1="101" y1="65" x2="103" y2="192" stroke="#6B3D1A" stroke-width="6" opacity="0.5"/>
        <path d="M36,89 L46,99 M46,89 L36,99" stroke="#2A1000" stroke-width="2.5"/>
        <polygon points="77,86 83,92 77,98 71,92" fill="#2A1000"/>
        <path d="M108,89 L118,99 M118,89 L108,99" stroke="#2A1000" stroke-width="2.5"/>
        <circle cx="36" cy="115" r="5" fill="#2A1000"/>
        <circle cx="77" cy="112" r="4" fill="none" stroke="#2A1000" stroke-width="2"/>
        <circle cx="119" cy="115" r="5" fill="#2A1000"/>
        <path d="M48,55 Q48,24 58,14 Q68,6 77,6 Q86,6 96,14 Q106,24 106,55" fill="none" stroke="#6B2800" stroke-width="10" stroke-linecap="round"/>
        <path d="M48,55 Q48,24 58,14 Q68,6 77,6 Q86,6 96,14 Q106,24 106,55" fill="none" stroke="#A0522D" stroke-width="6" stroke-linecap="round"/>
        <rect x="64" y="50" width="26" height="14" rx="4" fill="#B8860B"/>
        <rect x="66" y="53" width="22" height="8" rx="2" fill={G}/>
        <rect x="19" y="61" width="116" height="8" rx="2" fill="#6B2800"/>
        <rect x="19" y="61" width="116" height="4" rx="2" fill="#A0522D"/>
        <ellipse cx="77" cy="192" rx="56" ry="5" fill="#6B2800" opacity="0.7"/>
        <rect x="51" y="176" width="52" height="12" rx="2" fill={G}/>
        <text x="77" y="186" textAnchor="middle" fontSize="7" fill={DARK} fontFamily="Georgia" letterSpacing="1.5">BADAOUR</text>
      </svg>
    )
  },
  { id: 15, name: "Huile de Karité Pure", category: "divers", subcategory: "Beauté", artisan: "Mariam Ouédraogo, Ouaga", country: "Burkina Faso", price: 34, tag: "Bio",
    desc: "Karité brut non raffiné, récolte coopérative de femmes. 100% naturel. 200ml.",
    svg: (
      <svg width="140" height="200" viewBox="0 0 140 200">
        <ellipse cx="70" cy="190" rx="40" ry="8" fill={DARK} opacity="0.4"/>
        <path d="M30,72 Q28,65 32,57 L36,52 Q44,44 70,42 Q96,44 104,52 L108,57 Q112,65 110,72 L112,180 Q112,190 104,192 Q96,195 70,195 Q44,195 36,192 Q28,190 28,180 Z" fill="#E8D5A0"/>
        <path d="M38,72 Q36,65 40,57 L44,53 Q52,46 70,44" fill="none" stroke="white" stroke-width="3" opacity="0.3"/>
        <rect x="34" y="105" width="72" height="72" rx="3" fill="#FFF8EE" opacity="0.95"/>
        <rect x="34" y="105" width="72" height="5" fill={G}/>
        <rect x="34" y="172" width="72" height="5" fill={G}/>
        <text x="70" y="122" textAnchor="middle" fontSize="7" fill={RED} fontFamily="Georgia" letterSpacing="2">BADAOUR</text>
        <line x1="42" y1="127" x2="98" y2="127" stroke={G} stroke-width="1"/>
        <text x="70" y="143" textAnchor="middle" fontSize="12" fill={DARK} fontFamily="Georgia" fontWeight="bold">KARITÉ</text>
        <text x="70" y="156" textAnchor="middle" fontSize="9" fill={MUTED} fontFamily="Georgia" fontStyle="italic">Beurre Pur</text>
        <circle cx="70" cy="167" r="8" fill="#8B6A3E"/>
        <path d="M64,164 Q70,158 76,164 Q70,170 64,164Z" fill="#C8956C"/>
        <path d="M36,54 Q40,40 70,36 Q100,40 104,54 L108,72 Q104,82 70,83 Q36,82 32,72Z" fill="#8B6A3E"/>
        <ellipse cx="70" cy="54" rx="34" ry="11" fill="#A07820"/>
        <ellipse cx="70" cy="50" rx="30" ry="9" fill="#C8956C"/>
        <ellipse cx="70" cy="48" rx="24" ry="6" fill="none" stroke={G} stroke-width="2"/>
        <ellipse cx="70" cy="40" rx="10" ry="5" fill="#8B6A3E"/>
        <ellipse cx="70" cy="38" rx="8" ry="4" fill="#A07820"/>
        <rect x="50" y="182" width="40" height="12" rx="3" fill="#27AE60"/>
        <text x="70" y="192" textAnchor="middle" fontSize="8" fill="white" fontFamily="Georgia" letterSpacing="1">200ml · BIO</text>
        <line x1="105" y1="78" x2="110" y2="158" stroke="white" stroke-width="2" opacity="0.1"/>
      </svg>
    )
  },
  { id: 16, name: "Tissu Wax 6 yards", category: "divers", subcategory: "Tissu", artisan: "Koffi Mensah, Lomé", country: "Togo", price: 58, tag: "Populaire",
    desc: "Wax hollandais authentique double face. Motifs exclusifs. 6 yards, tenue complète adulte.",
    svg: (
      <svg width="165" height="190" viewBox="0 0 165 190">
        <path d="M10,135 L155,135 L155,178 L10,178Z" fill="#C0392B"/>
        <path d="M10,135 L155,135 L152,141 L13,141Z" fill="#A93226"/>
        <path d="M8,22 Q12,14 22,16 L153,16 Q162,14 160,24 L154,132 Q152,140 140,140 L22,140 Q10,140 8,132 Z" fill="#E74C3C"/>
        <rect x="10" y="30" width="145" height="11" fill="#F1C40F" opacity="0.8"/>
        <rect x="9" y="56" width="148" height="11" fill="#27AE60" opacity="0.8"/>
        <rect x="8" y="82" width="150" height="11" fill="#F1C40F" opacity="0.8"/>
        <rect x="8" y="108" width="150" height="11" fill="#27AE60" opacity="0.8"/>
        <line x1="48" y1="16" x2="46" y2="140" stroke="#C0392B" stroke-width="5" opacity="0.5"/>
        <line x1="82" y1="16" x2="82" y2="140" stroke="#C0392B" stroke-width="5" opacity="0.5"/>
        <line x1="118" y1="16" x2="120" y2="140" stroke="#C0392B" stroke-width="5" opacity="0.5"/>
        <circle cx="28" cy="46" r="6" fill="#C0392B" opacity="0.7"/><circle cx="28" cy="46" r="3" fill="#F1C40F"/>
        <circle cx="65" cy="46" r="6" fill="#27AE60" opacity="0.8"/><circle cx="65" cy="46" r="3" fill="#C0392B"/>
        <circle cx="100" cy="46" r="6" fill="#F1C40F" opacity="0.8"/><circle cx="100" cy="46" r="3" fill="#27AE60"/>
        <circle cx="138" cy="46" r="6" fill="#C0392B" opacity="0.7"/><circle cx="138" cy="46" r="3" fill="#F1C40F"/>
        <polygon points="28,96 34,102 28,108 22,102" fill="#C0392B" opacity="0.8"/>
        <polygon points="65,96 71,102 65,108 59,102" fill="#F1C40F" opacity="0.8"/>
        <polygon points="100,96 106,102 100,108 94,102" fill="#27AE60" opacity="0.8"/>
        <polygon points="138,96 144,102 138,108 132,102" fill="#C0392B" opacity="0.8"/>
        <ellipse cx="82" cy="16" rx="73" ry="8" fill="#F39C12"/>
        <ellipse cx="82" cy="12" rx="71" ry="7" fill="#E67E22"/>
        <ellipse cx="82" cy="8" rx="69" ry="6" fill="#D4AC0D"/>
        <ellipse cx="82" cy="4" rx="67" ry="5" fill="#E74C3C"/>
        <rect x="55" y="152" width="54" height="16" rx="3" fill={G}/>
        <text x="82" y="164" textAnchor="middle" fontSize="9" fill={DARK} fontFamily="Georgia" fontWeight="bold" letterSpacing="1">6 YARDS WAX</text>
        <line x1="8" y1="16" x2="6" y2="140" stroke="#F1C40F" stroke-width="3"/>
        <line x1="157" y1="16" x2="160" y2="140" stroke="#F1C40F" stroke-width="3"/>
      </svg>
    )
  },
];

const CATEGORIES = [
  { key: "homme", label: "Habillement Homme", emoji: "👘", color: "#1A3A6B", desc: "Boubous, dashikis, agbadas, tenues de cérémonie" },
  { key: "femme", label: "Habillement Femme", emoji: "👗", color: "#8B1A00", desc: "Robes wax, kaftans, ensembles bogolan, tenues festives" },
  { key: "enfant", label: "Habillement Enfant", emoji: "🧒", color: "#27AE60", desc: "Boubous, robes, ensembles kente pour 2 à 14 ans" },
  { key: "art", label: "Oeuvres d'Art", emoji: "🏺", color: "#6A0572", desc: "Sculptures, masques, tableaux, pièces uniques" },
  { key: "divers", label: "Divers & Accessoires", emoji: "✨", color: "#D4AF37", desc: "Bijoux, sacs, tissus, beauté, produits africains" },
];

const TRACKING_STEPS = [
  { key: "confirmed", label: "Commande confirmée", icon: "✅", desc: "Reçue et validée" },
  { key: "preparation", label: "En préparation", icon: "🧵", desc: "L'artisan prépare votre commande" },
  { key: "shipped", label: "Expédiée", icon: "📦", desc: "Colis parti du pays d'origine" },
  { key: "transit", label: "En transit", icon: "✈️", desc: "Vol Afrique → Canada en cours" },
  { key: "customs", label: "Dédouanement", icon: "🛃", desc: "Passage des douanes canadiennes" },
  { key: "delivery", label: "En livraison", icon: "🚚", desc: "En route chez vous" },
  { key: "delivered", label: "Livré !", icon: "🎉", desc: "Votre colis a été livré" },
];

const tagColors = { "Bestseller": "#D4AF37", "Nouveau": "#2E8B57", "Artisanal": "#8B4513", "Populaire": "#C0392B", "Unique": "#6A0572", "Bio": "#228B22", "Premium": "#1A3A6B" };

const DEMO_ORDERS = [
  {
    id: "BDR-2025-0042", date: "2025-01-10", status: "transit",
    items: [{ ...PRODUCTS[0], qty: 1 }, { ...PRODUCTS[3], qty: 1 }],
    total: 355.25, shipping: 18, client: "Mamadou Diallo",
    address: "4500 Rue Sherbrooke, Montréal, QC H3Z 1E3", payMethod: "Interac",
    events: [
      { step: "confirmed", date: "10 jan 2025, 09:14", note: "Paiement reçu par Interac" },
      { step: "preparation", date: "11 jan 2025, 14:30", note: "Artisan a commencé le travail" },
      { step: "shipped", date: "15 jan 2025, 11:00", note: "Colis remis DHL Express Dakar – N° DHL: 1234567890" },
      { step: "transit", date: "16 jan 2025, 03:22", note: "Vol AF722 Dakar → Paris → Montréal" },
    ]
  },
];

function genId() { return "BDR-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 9000) + 1000); }

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const m = { confirmed:{l:"Confirmée",c:GREEN}, preparation:{l:"Préparation",c:"#8B4513"}, shipped:{l:"Expédiée",c:"#1A5276"}, transit:{l:"En transit ✈️",c:"#6A0572"}, customs:{l:"Dédouanement",c:"#B7950B"}, delivery:{l:"En livraison",c:"#1A5276"}, delivered:{l:"Livré ✓",c:GREEN} };
  const s = m[status] || { l: status, c: "#666" };
  return <span style={{ background: s.c, color: "white", padding: "4px 11px", fontSize: 11, fontWeight: "bold", letterSpacing: 1, borderRadius: 2 }}>{s.l}</span>;
}

function TrackingTimeline({ order, verbose }) {
  const ci = TRACKING_STEPS.findIndex(s => s.key === order.status);
  return (
    <div>
      {TRACKING_STEPS.map((step, i) => {
        const done = i < ci, active = i === ci;
        const ev = order.events?.find(e => e.step === step.key);
        return (
          <div key={step.key} style={{ display: "flex", gap: 14, position: "relative" }}>
            {i < TRACKING_STEPS.length - 1 && <div style={{ position: "absolute", left: 17, top: 38, width: 2, height: 30, background: done ? GREEN : BORDER, zIndex: 0 }} />}
            <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, zIndex: 1, background: done ? GREEN : active ? G : BORDER, color: done || active ? DARK : "#aaa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: done ? 16 : 14, fontWeight: "bold", border: active ? `3px solid ${DARK}` : "none", marginBottom: 30 }}>
              {done ? "✓" : step.icon}
            </div>
            <div style={{ paddingTop: 5, paddingBottom: 22 }}>
              <div style={{ fontSize: 13, fontWeight: active ? "bold" : "normal", color: done || active ? DARK : "#aaa" }}>{step.label}</div>
              {active && !ev && <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{step.desc}</div>}
              {ev && <div style={{ fontSize: 11, color: "#666", marginTop: 1 }}><span style={{ color: MUTED, marginRight: 6 }}>📅 {ev.date}</span>{verbose && ev.note && `— ${ev.note}`}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FInp({ label, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 5, fontFamily: "Georgia" }}>{label}</label>}
      <input {...props} style={{ width: "100%", padding: "10px 13px", background: BG, border: `2px solid ${BORDER}`, color: DARK, fontSize: 14, fontFamily: "Georgia", outline: "none", boxSizing: "border-box", borderRadius: 2, ...(props.style || {}) }} />
    </div>
  );
}

function Row({ label, val }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
      <span style={{ color: MUTED }}>{label}</span><span>{val}</span>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function BADAOUR() {
  const [page, setPage] = useState("home");
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notif, setNotif] = useState(null);
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [payStep, setPayStep] = useState("cart");
  const [payMethod, setPayMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackErr, setTrackErr] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "Montréal", province: "QC", postal: "" });
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  // Account state
  const [authMode, setAuthMode] = useState("login"); // login | register
  const [authForm, setAuthForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [accounts, setAccounts] = useState([{ firstName: "Mamadou", lastName: "Diallo", email: "mamadou@test.com", password: "test123", orders: DEMO_ORDERS }]);

  const cartQty = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = cart.length > 0 ? 18 : 0;
  const taxes = +(subtotal * 0.14975).toFixed(2);
  const total = +(subtotal + shipping + taxes).toFixed(2);

  const toast = (msg, type = "ok") => { setNotif({ msg, type }); setTimeout(() => setNotif(null), 3500); };

  const addToCart = (p) => {
    setCart(prev => { const ex = prev.find(i => i.id === p.id); return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }]; });
    toast(`"${p.name}" ajouté au panier ✓`);
  };
  const updateQty = (id, d) => setCart(p => p.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const removeItem = (id) => { setCart(p => p.filter(i => i.id !== id)); toast("Article retiré", "info"); };
  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const o = { id: genId(), date: new Date().toLocaleDateString("fr-CA"), status: "confirmed", items: [...cart], total, shipping, client: form.name, address: `${form.address}, ${form.city}, ${form.province} ${form.postal}`, payMethod: payMethod === "card" ? "Carte crédit" : payMethod === "paypal" ? "PayPal" : "Interac", events: [{ step: "confirmed", date: new Date().toLocaleString("fr-CA"), note: `Paiement reçu – ${payMethod === "card" ? "Carte crédit" : payMethod === "paypal" ? "PayPal" : "Interac"}` }] };
      setOrders(p => [o, ...p]);
      if (currentUser) setAccounts(a => a.map(u => u.email === currentUser.email ? { ...u, orders: [o, ...(u.orders || [])] } : u));
      setLastOrder(o); setCart([]); setPayStep("cart"); setProcessing(false); setPage("confirmation");
    }, 2800);
  };

  const doTrack = () => {
    setTrackErr(""); setTrackResult(null);
    const allOrders = currentUser ? (accounts.find(u => u.email === currentUser.email)?.orders || []).concat(orders) : orders;
    const found = allOrders.find(o => o.id.toLowerCase() === trackId.toLowerCase().trim());
    found ? setTrackResult(found) : setTrackErr("Aucune commande trouvée. Vérifiez le numéro.");
  };

  const handleLogin = () => {
    const user = accounts.find(u => u.email === authForm.email && u.password === authForm.password);
    if (user) { setCurrentUser(user); setPage("compte"); toast(`Bienvenue, ${user.firstName} !`); }
    else toast("Email ou mot de passe incorrect", "info");
  };

  const handleRegister = () => {
    if (!authForm.firstName || !authForm.email || !authForm.password) { toast("Remplissez tous les champs", "info"); return; }
    if (authForm.password !== authForm.confirm) { toast("Les mots de passe ne correspondent pas", "info"); return; }
    if (accounts.find(u => u.email === authForm.email)) { toast("Cet email est déjà utilisé", "info"); return; }
    const newUser = { firstName: authForm.firstName, lastName: authForm.lastName, email: authForm.email, password: authForm.password, orders: [] };
    setAccounts(a => [...a, newUser]); setCurrentUser(newUser); setPage("compte"); toast(`Bienvenue, ${newUser.firstName} ! Compte créé ✓`);
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = activeCategory ? p.category === activeCategory : true;
    const q = searchQuery.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.artisan.toLowerCase().includes(q) || p.country.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const navItems = [
    { k: "home", l: "Accueil" }, { k: "boutique", l: "Boutique" }, { k: "artisans", l: "Artisans" }, { k: "suivi", l: "Suivi" }, { k: "commande", l: "Sur mesure" }
  ];

  const Btn = ({ label, onClick, variant = "dark", full, sm }) => (
    <button onClick={onClick} style={{ background: variant === "dark" ? DARK : variant === "gold" ? G : variant === "red" ? RED : "transparent", color: variant === "dark" || variant === "red" ? G : variant === "gold" ? DARK : DARK, border: variant === "outline" ? `2px solid ${DARK}` : "none", padding: sm ? "7px 16px" : full ? "14px" : "12px 26px", fontFamily: "Georgia", fontWeight: "bold", letterSpacing: 1.5, fontSize: sm ? 12 : 13, cursor: "pointer", textTransform: "uppercase", width: full ? "100%" : "auto", boxSizing: "border-box" }}>{label}</button>
  );

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: BG, minHeight: "100vh", color: DARK }}>
      <style>{`
        @keyframes fadeSlide { from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        input:focus,textarea:focus,select:focus { border-color:${G}!important; outline:none; }
        .hover-card:hover { transform:translateY(-5px); box-shadow:0 16px 40px rgba(26,10,0,0.14); }
        .hover-row:hover { border-color:${G}!important; }
        button { transition:opacity .15s,background .2s; cursor:pointer; }
        button:hover:not(:disabled) { opacity:.87; }
        .cat-pill:hover { background:${DARK}!important; color:${G}!important; }
      `}</style>

      {/* TOAST */}
      {notif && <div style={{ position:"fixed", top:18, right:18, zIndex:9999, background:notif.type==="info"?"#1A5276":RED, color:CREAM, padding:"12px 22px", borderRadius:3, fontSize:13, boxShadow:"0 4px 24px rgba(0,0,0,.3)", animation:"fadeSlide .3s ease", maxWidth:320 }}>{notif.msg}</div>}

      {/* ── HEADER ── */}
      <header style={{ background:DARK, borderBottom:`3px solid ${G}`, position:"sticky", top:0, zIndex:100, padding:"0 36px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #3A1F00", padding:"6px 0", fontSize:11, color:G, letterSpacing:1 }}>
          <span>🌍 Livraison Afrique → Canada · 14–21 jours</span>
          <span>Commerce éthique · Artisanat 100% authentique</span>
          <span>📞 {PHONE} · ✉️ {EMAIL}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0" }}>
          <div onClick={()=>setPage("home")} style={{ cursor:"pointer" }}>
            <div style={{ fontSize:28, fontWeight:"bold", color:G, letterSpacing:6, textTransform:"uppercase", textShadow:"0 0 26px rgba(212,175,55,.4)" }}>BADAOUR</div>
            <div style={{ fontSize:9, color:"#A0845C", letterSpacing:3, marginTop:-2 }}>L'AFRIQUE À VOTRE PORTE</div>
          </div>
          <div style={{ flex:1, maxWidth:320, margin:"0 28px", position:"relative" }}>
            <input value={searchQuery} onChange={e=>{setSearchQuery(e.target.value);setPage("boutique");setActiveCategory(null);}} placeholder="Rechercher un produit, un artisan, un pays..."
              style={{ width:"100%", padding:"8px 13px 8px 38px", background:"#2A1000", border:`1px solid ${G}`, borderRadius:2, color:CREAM, fontSize:12, fontFamily:"Georgia", outline:"none", boxSizing:"border-box" }}/>
            <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13 }}>🔍</span>
          </div>
          <nav style={{ display:"flex", gap:16, alignItems:"center" }}>
            {navItems.map(({k,l})=>(
              <button key={k} onClick={()=>setPage(k)} style={{ background:"none", border:"none", cursor:"pointer", color:page===k?G:"#A0845C", fontSize:12, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"Georgia", borderBottom:page===k?`2px solid ${G}`:"2px solid transparent", paddingBottom:2 }}>{l}</button>
            ))}
            {/* Account */}
            <button onClick={()=>setPage(currentUser?"compte":"auth")} style={{ background:"none", border:`1px solid #3A1F00`, borderRadius:2, padding:"6px 12px", color:currentUser?G:"#A0845C", fontFamily:"Georgia", fontSize:11, letterSpacing:1, cursor:"pointer" }}>
              {currentUser ? `👤 ${currentUser.firstName}` : "👤 Connexion"}
            </button>
            {/* Cart */}
            <button onClick={()=>{setPayStep("cart");setPage("panier");}} style={{ background:G, border:"none", borderRadius:2, padding:"7px 13px", cursor:"pointer", color:DARK, fontFamily:"Georgia", fontSize:12, fontWeight:"bold", letterSpacing:1, position:"relative" }}>
              🛒 Panier
              {cartQty>0&&<span style={{ position:"absolute", top:-7, right:-7, background:"#C0392B", color:"white", borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:"bold" }}>{cartQty}</span>}
            </button>
          </nav>
        </div>
      </header>

      {/* ════════ HOME ════════ */}
      {page==="home"&&(
        <>
          {/* Hero */}
          <div style={{ background:`linear-gradient(135deg,${DARK},${BROWN},${DARK})`, padding:"80px 60px", position:"relative", overflow:"hidden", borderBottom:`4px solid ${G}` }}>
            <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"40%", backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(212,175,55,.04) 10px,rgba(212,175,55,.04) 20px)" }}/>
            <div style={{ maxWidth:580, position:"relative", animation:"fadeUp .6s ease" }}>
              <div style={{ fontSize:10, letterSpacing:5, color:G, textTransform:"uppercase", marginBottom:14, borderLeft:`3px solid ${G}`, paddingLeft:12 }}>ARTISANAT AFRICAIN · COMMERCE ÉTHIQUE · MONTRÉAL</div>
              <h1 style={{ fontSize:54, fontWeight:"bold", color:CREAM, lineHeight:1.1, margin:"0 0 18px", textShadow:"0 2px 16px rgba(0,0,0,.5)" }}>
                L'âme de l'Afrique,<br/><span style={{ color:G }}>livrée chez vous.</span>
              </h1>
              <p style={{ fontSize:16, color:"#C4945C", lineHeight:1.8, maxWidth:440, marginBottom:30 }}>
                Habillement traditionnel, oeuvres d'art et produits africains authentiques. De l'Afrique au Canada, portés par des artisans passionnés.
              </p>
              <div style={{ display:"flex", gap:12 }}>
                <button onClick={()=>setPage("boutique")} style={{ background:G, color:DARK, border:"none", padding:"14px 30px", fontSize:13, fontFamily:"Georgia", fontWeight:"bold", letterSpacing:2, cursor:"pointer", textTransform:"uppercase" }}>Découvrir la boutique</button>
                <button onClick={()=>setPage("suivi")} style={{ background:"transparent", color:G, border:`2px solid ${G}`, padding:"14px 28px", fontSize:13, fontFamily:"Georgia", letterSpacing:2, cursor:"pointer", textTransform:"uppercase" }}>Suivre ma commande</button>
              </div>
            </div>
            <div style={{ display:"flex", gap:48, marginTop:50, borderTop:"1px solid #3A1F00", paddingTop:30 }}>
              {[["50+","Artisans partenaires"],["10+","Pays africains"],["100%","Éthique & Durable"],["4.9★","Note clients"]].map(([v,l])=>(
                <div key={l}><div style={{ fontSize:26, color:G, fontWeight:"bold" }}>{v}</div><div style={{ fontSize:10, color:"#A0845C", letterSpacing:1, textTransform:"uppercase", marginTop:2 }}>{l}</div></div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div style={{ padding:"56px 60px 42px" }}>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <div style={{ fontSize:10, letterSpacing:5, color:RED, textTransform:"uppercase", marginBottom:8 }}>EXPLORER PAR UNIVERS</div>
              <h2 style={{ fontSize:34, color:DARK, margin:0, fontWeight:"bold" }}>Nos 5 univers</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:18 }}>
              {CATEGORIES.map(cat=>(
                <div key={cat.key} className="hover-card" onClick={()=>{setActiveCategory(cat.key);setPage("boutique");setSearchQuery("");}}
                  style={{ background:CREAM, border:"1px solid "+BORDER, borderTop:`5px solid ${cat.color}`, padding:"24px 20px", cursor:"pointer", textAlign:"center", transition:"transform .2s,box-shadow .2s" }}>
                  <div style={{ fontSize:32, marginBottom:10 }}>{cat.emoji}</div>
                  <div style={{ fontSize:15, fontWeight:"bold", color:DARK, marginBottom:5 }}>{cat.label}</div>
                  <div style={{ fontSize:11, color:MUTED, lineHeight:1.5 }}>{cat.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured products — sample from each category */}
          <div style={{ padding:"36px 60px 70px", background:BGALT }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:30 }}>
              <div>
                <div style={{ fontSize:10, letterSpacing:5, color:RED, textTransform:"uppercase", marginBottom:7 }}>COUP DE CŒUR</div>
                <h2 style={{ fontSize:32, color:DARK, margin:0 }}>Sélection de la semaine</h2>
              </div>
              <button onClick={()=>{setPage("boutique");setActiveCategory(null);setSearchQuery("");}} style={{ background:"none", border:`2px solid ${RED}`, color:RED, padding:"8px 20px", cursor:"pointer", fontFamily:"Georgia", fontSize:12 }}>Voir tout →</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:22 }}>
              {[PRODUCTS[0],PRODUCTS[3],PRODUCTS[9],PRODUCTS[13]].map(p=><ProductCard key={p.id} p={p} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist}/>)}
            </div>
          </div>

          {/* Story */}
          <div style={{ background:DARK, padding:"70px 60px", borderTop:`3px solid ${G}` }}>
            <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center" }}>
              <div style={{ fontSize:10, letterSpacing:5, color:G, textTransform:"uppercase", marginBottom:14 }}>NOTRE HISTOIRE</div>
              <h2 style={{ fontSize:36, color:CREAM, lineHeight:1.3, marginBottom:20 }}>Né en Afrique,<br/>construit à <span style={{ color:G }}>Montréal.</span></h2>
              <p style={{ fontSize:15, color:"#C4945C", lineHeight:2, marginBottom:30 }}>
                BADAOUR est né d'un désir profond : relier la diaspora africaine à ses racines et offrir au monde la richesse de l'artisanat du continent. Chaque achat soutient directement un artisan, une famille, une communauté.
              </p>
              <div style={{ display:"flex", gap:36, justifyContent:"center" }}>
                {[["Commerce éthique","Rémunération juste"],["Impact direct","Soutien aux familles"],["Authenticité","Zéro intermédiaire"]].map(([t,s])=>(
                  <div key={t} style={{ textAlign:"center" }}>
                    <div style={{ width:38, height:2, background:G, margin:"0 auto 10px" }}/>
                    <div style={{ color:CREAM, fontWeight:"bold", marginBottom:2, fontSize:13 }}>{t}</div>
                    <div style={{ color:"#A0845C", fontSize:11 }}>{s}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:34, display:"flex", justifyContent:"center", gap:16 }}>
                <div style={{ background:"#1A1A00", border:`1px solid ${G}`, padding:"12px 20px", color:G, fontSize:12 }}>📞 {PHONE}</div>
                <div style={{ background:"#1A1A00", border:`1px solid ${G}`, padding:"12px 20px", color:G, fontSize:12 }}>✉️ {EMAIL}</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ════════ BOUTIQUE ════════ */}
      {page==="boutique"&&(
        <div style={{ padding:"46px 56px" }}>
          <div style={{ marginBottom:28 }}>
            <div style={{ fontSize:10, letterSpacing:5, color:RED, textTransform:"uppercase", marginBottom:4 }}>BADAOUR</div>
            <h1 style={{ fontSize:36, color:DARK, margin:"0 0 20px" }}>Notre Boutique</h1>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
              <button className="cat-pill" onClick={()=>setActiveCategory(null)} style={{ background:!activeCategory?DARK:"transparent", color:!activeCategory?G:DARK, border:`2px solid ${DARK}`, padding:"6px 16px", fontFamily:"Georgia", fontSize:12, letterSpacing:1, transition:"background .2s,color .2s" }}>Tout</button>
              {CATEGORIES.map(cat=>(
                <button key={cat.key} className="cat-pill" onClick={()=>setActiveCategory(activeCategory===cat.key?null:cat.key)} style={{ background:activeCategory===cat.key?DARK:"transparent", color:activeCategory===cat.key?G:DARK, border:`2px solid ${DARK}`, padding:"6px 16px", fontFamily:"Georgia", fontSize:12, letterSpacing:1, display:"flex", alignItems:"center", gap:5, transition:"background .2s,color .2s" }}>
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>
          {activeCategory&&(
            <div style={{ background:CREAM, border:`2px solid ${G}`, borderLeft:`6px solid ${CATEGORIES.find(c=>c.key===activeCategory)?.color}`, padding:"14px 20px", marginBottom:24 }}>
              <div style={{ fontSize:11, color:MUTED }}>{CATEGORIES.find(c=>c.key===activeCategory)?.emoji} {CATEGORIES.find(c=>c.key===activeCategory)?.desc}</div>
            </div>
          )}
          {filteredProducts.length===0
            ?<div style={{ textAlign:"center", padding:70, color:MUTED }}><div style={{ fontSize:44 }}>🔍</div><div style={{ fontSize:17, marginTop:12 }}>Aucun produit trouvé</div></div>
            :<div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:22 }}>
              {filteredProducts.map(p=><ProductCard key={p.id} p={p} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist}/>)}
            </div>
          }
        </div>
      )}

      {/* ════════ ARTISANS ════════ */}
      {page==="artisans"&&(
        <div style={{ padding:"56px 60px" }}>
          <div style={{ marginBottom:40 }}>
            <div style={{ fontSize:10, letterSpacing:5, color:RED, textTransform:"uppercase", marginBottom:4 }}>CEUX QUI CRÉENT</div>
            <h1 style={{ fontSize:36, color:DARK, margin:0 }}>Nos Artisans</h1>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, marginBottom:50 }}>
            {[
              { n:"Moussa Diallo", m:"Tailleur brodeur", v:"Dakar, Sénégal", e:"✂️", a:"23 ans", h:"Formé par son père, Moussa perpétue l'art du grand boubou. Chaque broderie prend 4 jours de travail." },
              { n:"Fatoumata Koné", m:"Artisane bogolan", v:"Bamako, Mali", e:"🎨", a:"18 ans", h:"Fatoumata ressuscite les motifs anciens du bogolan peint à la boue. Son travail est exposé en France et au Canada." },
              { n:"Abena Asante", m:"Perlière Krobo", v:"Accra, Ghana", e:"🔮", a:"15 ans", h:"Abena dirige une coopérative de 12 femmes artisanes. Chaque collier prend 3 jours de fabrication à la flamme." },
              { n:"Cheikh Ndiaye", m:"Sculpteur sur bois", v:"Thiès, Sénégal", e:"🌳", a:"30 ans", h:"Maître sculpteur, Cheikh crée des pièces uniques en bois de venn. Ses baobabs sont collectionnés au Canada et en Europe." },
              { n:"Kweku Mensah", m:"Tisserand kente", v:"Kumasi, Ghana", e:"🧵", a:"25 ans", h:"Tisserand royal, Kweku est gardien de la tradition kente du peuple Ashanti. Chaque couleur a une signification précise." },
              { n:"Aïcha Diop", m:"Couturière haute couture", v:"Dakar, Sénégal", e:"👗", a:"20 ans", h:"Aïcha allie couture traditionnelle africaine et tendances contemporaines. Ses kaftans sont portés lors des plus grandes fêtes." },
            ].map(a=>(
              <div key={a.n} className="hover-card" style={{ background:CREAM, border:"1px solid "+BORDER, padding:"28px 26px", transition:"transform .2s,box-shadow .2s" }}>
                <div style={{ width:66, height:66, background:DARK, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, marginBottom:14, border:`3px solid ${G}` }}>{a.e}</div>
                <div style={{ fontSize:9, letterSpacing:3, color:RED, textTransform:"uppercase", marginBottom:4 }}>{a.m}</div>
                <h3 style={{ fontSize:18, color:DARK, margin:"0 0 4px" }}>{a.n}</h3>
                <div style={{ fontSize:12, color:MUTED, marginBottom:3 }}>📍 {a.v}</div>
                <div style={{ fontSize:11, color:G, marginBottom:10, fontWeight:"bold" }}>⭐ {a.a} d'expérience</div>
                <div style={{ height:1, background:BORDER, margin:"10px 0" }}/>
                <p style={{ fontSize:12, color:"#666", lineHeight:1.7, margin:0 }}>{a.h}</p>
              </div>
            ))}
          </div>
          <div style={{ background:DARK, padding:"48px", textAlign:"center", border:`3px solid ${G}` }}>
            <h2 style={{ color:G, fontSize:26, marginBottom:10 }}>Vous êtes artisan en Afrique ?</h2>
            <p style={{ color:"#C4945C", fontSize:14, maxWidth:440, margin:"0 auto 22px", lineHeight:1.8 }}>BADAOUR cherche des partenaires sérieux dans toute l'Afrique. Rejoignez notre réseau.</p>
            <button onClick={()=>toast("Merci ! Envoyez votre dossier à "+EMAIL)} style={{ background:G, color:DARK, border:"none", padding:"13px 34px", fontSize:13, fontFamily:"Georgia", fontWeight:"bold", letterSpacing:2, cursor:"pointer" }}>DEVENIR PARTENAIRE</button>
          </div>
        </div>
      )}

      {/* ════════ AUTH ════════ */}
      {page==="auth"&&(
        <div style={{ padding:"60px 40px", maxWidth:480, margin:"0 auto" }}>
          <div style={{ marginBottom:30, textAlign:"center" }}>
            <div style={{ fontSize:10, letterSpacing:5, color:RED, textTransform:"uppercase", marginBottom:5 }}>ESPACE CLIENT</div>
            <h1 style={{ fontSize:34, color:DARK, margin:0 }}>{authMode==="login"?"Connexion":"Créer un compte"}</h1>
          </div>
          {/* Tabs */}
          <div style={{ display:"flex", marginBottom:28 }}>
            {[["login","Se connecter"],["register","Créer un compte"]].map(([m,l])=>(
              <button key={m} onClick={()=>setAuthMode(m)} style={{ flex:1, padding:"12px", fontFamily:"Georgia", fontSize:13, cursor:"pointer", background:authMode===m?DARK:"transparent", color:authMode===m?G:DARK, border:`2px solid ${DARK}`, fontWeight:authMode===m?"bold":"normal", letterSpacing:1 }}>{l}</button>
            ))}
          </div>
          <div style={{ background:CREAM, border:"1px solid "+BORDER, padding:"32px 36px" }}>
            {authMode==="login"?(
              <>
                <FInp label="Adresse email" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})}/>
                <FInp label="Mot de passe" type="password" placeholder="••••••••" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})}/>
                <div style={{ fontSize:11, color:MUTED, marginBottom:16, textAlign:"right", cursor:"pointer" }} onClick={()=>toast("Réinitialisation envoyée à "+authForm.email)}>Mot de passe oublié ?</div>
                <button onClick={handleLogin} style={{ width:"100%", background:DARK, color:G, border:"none", padding:"14px", fontSize:14, fontFamily:"Georgia", fontWeight:"bold", letterSpacing:2, cursor:"pointer", textTransform:"uppercase" }}>SE CONNECTER</button>
                <div style={{ textAlign:"center", marginTop:16, fontSize:12, color:MUTED }}>
                  <span style={{ fontSize:11, color:"#999" }}>Démo : mamadou@test.com / test123</span>
                </div>
              </>
            ):(
              <>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <FInp label="Prénom *" placeholder="Mamadou" value={authForm.firstName} onChange={e=>setAuthForm({...authForm,firstName:e.target.value})}/>
                  <FInp label="Nom" placeholder="Diallo" value={authForm.lastName} onChange={e=>setAuthForm({...authForm,lastName:e.target.value})}/>
                </div>
                <FInp label="Adresse email *" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})}/>
                <FInp label="Mot de passe *" type="password" placeholder="Min. 6 caractères" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})}/>
                <FInp label="Confirmer le mot de passe" type="password" placeholder="Répétez le mot de passe" value={authForm.confirm} onChange={e=>setAuthForm({...authForm,confirm:e.target.value})}/>
                <button onClick={handleRegister} style={{ width:"100%", background:RED, color:G, border:"none", padding:"14px", fontSize:14, fontFamily:"Georgia", fontWeight:"bold", letterSpacing:2, cursor:"pointer", textTransform:"uppercase" }}>CRÉER MON COMPTE</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ════════ COMPTE CLIENT ════════ */}
      {page==="compte"&&currentUser&&(
        <div style={{ padding:"50px 60px", maxWidth:900, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:36 }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:5, color:RED, textTransform:"uppercase", marginBottom:4 }}>MON ESPACE</div>
              <h1 style={{ fontSize:34, color:DARK, margin:0 }}>Bonjour, {currentUser.firstName} 👋</h1>
              <div style={{ fontSize:13, color:MUTED, marginTop:5 }}>📧 {currentUser.email}</div>
            </div>
            <button onClick={()=>{setCurrentUser(null);setPage("home");toast("Déconnexion réussie","info");}} style={{ background:"transparent", border:`2px solid ${BORDER}`, color:MUTED, padding:"9px 18px", fontFamily:"Georgia", fontSize:12, cursor:"pointer" }}>Se déconnecter</button>
          </div>

          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18, marginBottom:36 }}>
            {[
              ["📦", "Commandes", (accounts.find(u=>u.email===currentUser.email)?.orders||[]).length+""],
              ["❤️", "Liste de souhaits", wishlist.length+" article(s)"],
              ["🌍", "Pays livrés", "Afrique → Canada"],
            ].map(([e,l,v])=>(
              <div key={l} style={{ background:CREAM, border:"1px solid "+BORDER, padding:"22px 24px" }}>
                <div style={{ fontSize:26, marginBottom:8 }}>{e}</div>
                <div style={{ fontSize:10, letterSpacing:2, color:MUTED, textTransform:"uppercase", marginBottom:4 }}>{l}</div>
                <div style={{ fontSize:20, fontWeight:"bold", color:DARK }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Orders */}
          <div style={{ background:CREAM, border:"1px solid "+BORDER, padding:"26px 28px", marginBottom:24 }}>
            <h3 style={{ fontSize:16, color:DARK, margin:"0 0 18px", letterSpacing:1, textTransform:"uppercase" }}>📋 Mes commandes</h3>
            {(accounts.find(u=>u.email===currentUser.email)?.orders||[]).length===0
              ?<div style={{ textAlign:"center", padding:"30px 0", color:MUTED }}><div style={{ fontSize:30 }}>📦</div><div style={{ marginTop:10 }}>Aucune commande pour l'instant</div><button onClick={()=>setPage("boutique")} style={{ marginTop:14, background:DARK, color:G, border:"none", padding:"9px 20px", cursor:"pointer", fontFamily:"Georgia", fontSize:12, letterSpacing:1 }}>DÉCOUVRIR LA BOUTIQUE</button></div>
              :(accounts.find(u=>u.email===currentUser.email)?.orders||[]).map(o=>(
                <div key={o.id} className="hover-row" onClick={()=>{setTrackId(o.id);setTrackResult(o);setTrackErr("");setPage("suivi");}}
                  style={{ border:"1px solid "+BORDER, padding:"14px 18px", marginBottom:10, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", transition:"border-color .2s" }}>
                  <div>
                    <div style={{ fontWeight:"bold", fontSize:14, letterSpacing:1, color:DARK }}>{o.id}</div>
                    <div style={{ fontSize:11, color:MUTED, marginTop:2 }}>{o.date} · {o.items.length} article(s) · {o.payMethod}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <StatusBadge status={o.status}/>
                    <div style={{ fontWeight:"bold", color:RED, marginTop:5, fontSize:14 }}>{o.total.toFixed(2)} $CA</div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Wishlist */}
          {wishlist.length>0&&(
            <div style={{ background:CREAM, border:"1px solid "+BORDER, padding:"26px 28px" }}>
              <h3 style={{ fontSize:16, color:DARK, margin:"0 0 18px", letterSpacing:1, textTransform:"uppercase" }}>❤️ Ma liste de souhaits</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
                {PRODUCTS.filter(p=>wishlist.includes(p.id)).map(p=>(
                  <div key={p.id} style={{ border:"1px solid "+BORDER, padding:"14px", textAlign:"center" }}>
                    <div style={{ width:60, height:60, background:`linear-gradient(135deg,${BROWN},${RED})`, margin:"0 auto 8px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="40" height="40" viewBox="0 0 155 190" style={{ overflow:"visible" }}>{p.svg}</svg>
                    </div>
                    <div style={{ fontSize:12, fontWeight:"bold", color:DARK, marginBottom:3 }}>{p.name}</div>
                    <div style={{ fontSize:13, color:RED, fontWeight:"bold", marginBottom:8 }}>{p.price} $CA</div>
                    <button onClick={()=>addToCart(p)} style={{ background:DARK, color:G, border:"none", padding:"6px 12px", cursor:"pointer", fontFamily:"Georgia", fontSize:11, width:"100%" }}>Ajouter</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════ PANIER / CHECKOUT ════════ */}
      {page==="panier"&&(
        <div style={{ padding:"44px 50px", maxWidth:1020, margin:"0 auto" }}>
          {/* Steps */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom:40, gap:0 }}>
            {["cart","info","payment"].map((k,i)=>{
              const labels=["Panier","Livraison","Paiement"],cur=["cart","info","payment"].indexOf(payStep),done=i<cur,active=i===cur;
              return(
                <div key={k} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:32,height:32,borderRadius:"50%",background:done?GREEN:active?G:BORDER,color:done||active?DARK:"#aaa",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:13 }}>{done?"✓":i+1}</div>
                    <span style={{ fontSize:12,color:active?DARK:"#aaa",fontWeight:active?"bold":"normal",letterSpacing:1 }}>{labels[i]}</span>
                  </div>
                  {i<2&&<div style={{ width:48,height:2,background:done?GREEN:BORDER,margin:"0 10px" }}/>}
                </div>
              );
            })}
          </div>

          {payStep==="cart"&&(
            <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:26 }}>
              <div>
                <h2 style={{ fontSize:26, color:DARK, marginBottom:18 }}>Mon Panier</h2>
                {cart.length===0
                  ?<div style={{ textAlign:"center", padding:"52px 32px", background:CREAM, border:"1px solid "+BORDER }}>
                    <div style={{ fontSize:46 }}>🛒</div>
                    <div style={{ fontSize:16, color:MUTED, marginTop:12, marginBottom:20 }}>Votre panier est vide</div>
                    <button onClick={()=>setPage("boutique")} style={{ background:DARK, color:G, border:"none", padding:"11px 24px", cursor:"pointer", fontFamily:"Georgia", letterSpacing:2, fontSize:12 }}>DÉCOUVRIR LA BOUTIQUE</button>
                  </div>
                  :cart.map(item=>(
                    <div key={item.id} style={{ background:CREAM, border:"1px solid "+BORDER, padding:"16px 20px", marginBottom:10, display:"flex", alignItems:"center", gap:16 }}>
                      <div style={{ width:60, height:60, background:`linear-gradient(135deg,${BROWN},${RED})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <div style={{ transform:"scale(0.35)", transformOrigin:"center", width:155, height:190, display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="155" height="190" viewBox="0 0 155 190">{item.svg}</svg></div>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:"bold", color:DARK, marginBottom:1 }}>{item.name}</div>
                        <div style={{ fontSize:11, color:MUTED }}>Par {item.artisan}</div>
                        <div style={{ fontSize:10, color:RED, marginTop:1 }}>🌍 {item.country}</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <button onClick={()=>updateQty(item.id,-1)} style={{ width:26,height:26,border:"1px solid "+BORDER,background:"white",cursor:"pointer",fontSize:14 }}>−</button>
                        <span style={{ fontSize:14,fontWeight:"bold",minWidth:20,textAlign:"center" }}>{item.qty}</span>
                        <button onClick={()=>updateQty(item.id,1)} style={{ width:26,height:26,border:"1px solid "+BORDER,background:"white",cursor:"pointer",fontSize:14 }}>+</button>
                      </div>
                      <div style={{ minWidth:72, textAlign:"right" }}>
                        <div style={{ fontSize:16, fontWeight:"bold", color:RED }}>{(item.price*item.qty).toFixed(2)} $</div>
                        <button onClick={()=>removeItem(item.id)} style={{ background:"none", border:"none", color:MUTED, cursor:"pointer", fontSize:11, marginTop:2 }}>Retirer ✕</button>
                      </div>
                    </div>
                  ))
                }
              </div>
              <MiniSummary cart={cart} subtotal={subtotal} shipping={shipping} taxes={taxes} total={total} onContinue={()=>{if(!cart.length){toast("Ajoutez des articles","info");return;}setPayStep("info");}}/>
            </div>
          )}

          {payStep==="info"&&(
            <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:26 }}>
              <div>
                <h2 style={{ fontSize:26, color:DARK, marginBottom:18 }}>Informations de livraison</h2>
                <div style={{ background:CREAM, border:"1px solid "+BORDER, padding:"28px 32px" }}>
                  <FInp label="Nom complet *" placeholder="Ex: Mamadou Diallo" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                  <FInp label="Email *" type="email" placeholder={EMAIL} value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                  <FInp label="Téléphone (WhatsApp)" type="tel" placeholder={PHONE} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                  <FInp label="Adresse *" placeholder="Numéro et rue" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
                  <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:10 }}>
                    <FInp label="Ville" placeholder="Montréal" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
                    <FInp label="Province" placeholder="QC" value={form.province} onChange={e=>setForm({...form,province:e.target.value})}/>
                    <FInp label="Code postal" placeholder="H3Z 1E3" value={form.postal} onChange={e=>setForm({...form,postal:e.target.value})}/>
                  </div>
                  <div style={{ display:"flex", gap:10, marginTop:6 }}>
                    <button onClick={()=>setPayStep("cart")} style={{ flex:1,background:"transparent",color:DARK,border:"2px solid "+BORDER,padding:"12px",fontFamily:"Georgia",cursor:"pointer",fontSize:13 }}>← Retour</button>
                    <button onClick={()=>{if(!form.name||!form.email||!form.address){toast("Remplissez les champs obligatoires (*)","info");return;}setPayStep("payment");}} style={{ flex:2,background:DARK,color:G,border:"none",padding:"12px",fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,cursor:"pointer",fontSize:13,textTransform:"uppercase" }}>Vers le paiement →</button>
                  </div>
                </div>
              </div>
              <MiniSummary cart={cart} subtotal={subtotal} shipping={shipping} taxes={taxes} total={total}/>
            </div>
          )}

          {payStep==="payment"&&(
            <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:26 }}>
              <div>
                <h2 style={{ fontSize:26, color:DARK, marginBottom:18 }}>Mode de paiement</h2>
                <div style={{ background:CREAM, border:"1px solid "+BORDER, padding:"28px 32px" }}>
                  <div style={{ display:"flex", gap:10, marginBottom:24 }}>
                    {[["card","💳 Carte"],["paypal","🅿️ PayPal"],["interac","🏦 Interac"]].map(([m,l])=>(
                      <button key={m} onClick={()=>setPayMethod(m)} style={{ flex:1,padding:"10px 6px",fontFamily:"Georgia",fontSize:12,cursor:"pointer",background:payMethod===m?DARK:"white",color:payMethod===m?G:DARK,border:payMethod===m?`2px solid ${DARK}`:"2px solid "+BORDER,fontWeight:payMethod===m?"bold":"normal" }}>{l}</button>
                    ))}
                  </div>
                  {payMethod==="card"&&(
                    <>
                      <div style={{ marginBottom:14 }}>
                        <label style={{ fontSize:10,letterSpacing:2,color:RED,display:"block",marginBottom:5,textTransform:"uppercase" }}>Numéro de carte</label>
                        <input placeholder="1234  5678  9012  3456" maxLength={19} value={card.number} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,16);v=v.replace(/(.{4})/g,"$1 ").trim();setCard({...card,number:v});}} style={{ width:"100%",padding:"10px 13px",background:BG,border:"2px solid "+BORDER,fontFamily:"Georgia",fontSize:15,letterSpacing:2,boxSizing:"border-box",outline:"none" }}/>
                      </div>
                      <FInp label="Nom sur la carte" placeholder="MAMADOU DIALLO" value={card.name} onChange={e=>setCard({...card,name:e.target.value.toUpperCase()})}/>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                        <FInp label="Expiration (MM/AA)" placeholder="12/27" value={card.expiry} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,4);if(v.length>2)v=v.slice(0,2)+"/"+v.slice(2);setCard({...card,expiry:v});}}/>
                        <FInp label="CVV" placeholder="•••" type="password" maxLength={4} value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value.replace(/\D/g,"").slice(0,4)})}/>
                      </div>
                      <div style={{ background:"#F0FFF4",border:"1px solid "+GREEN,padding:"9px 13px",fontSize:11,color:GREEN }}>🔒 Chiffrement SSL 256-bit · Données protégées</div>
                    </>
                  )}
                  {payMethod==="paypal"&&(
                    <div style={{ textAlign:"center",padding:"26px 16px",background:"#F7F9FC",border:"1px dashed "+BORDER }}>
                      <div style={{ fontSize:44 }}>🅿️</div>
                      <div style={{ fontSize:15,color:DARK,marginTop:10,marginBottom:6,fontWeight:"bold" }}>PayPal</div>
                      <div style={{ fontSize:12,color:MUTED }}>Vous serez redirigé vers PayPal pour finaliser votre paiement.</div>
                    </div>
                  )}
                  {payMethod==="interac"&&(
                    <div>
                      <FInp label="Votre email Interac" type="email" placeholder="votre@email.com"/>
                      <div style={{ background:"#FFFBF0",border:"1px solid "+G,padding:"10px 13px",fontSize:11,color:MUTED }}>
                        💡 Envoyez le transfert à : <strong>{EMAIL}</strong><br/>La question secrète sera communiquée par email.
                      </div>
                    </div>
                  )}
                  <div style={{ background:BGALT,border:"1px solid "+BORDER,padding:"12px 15px",marginTop:16,borderLeft:`4px solid ${G}` }}>
                    <div style={{ fontSize:12,fontWeight:"bold",color:DARK,marginBottom:2 }}>📦 Estimation de livraison</div>
                    <div style={{ fontSize:11,color:MUTED }}>Afrique → Montréal · DHL Express · <strong>14 à 21 jours ouvrables</strong></div>
                  </div>
                  <div style={{ display:"flex",gap:10,marginTop:20 }}>
                    <button onClick={()=>setPayStep("info")} style={{ flex:1,background:"transparent",color:DARK,border:"2px solid "+BORDER,padding:"12px",fontFamily:"Georgia",cursor:"pointer",fontSize:12 }}>← Retour</button>
                    <button onClick={handlePay} disabled={processing} style={{ flex:2,background:processing?BROWN:RED,color:G,border:"none",padding:"12px",fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,cursor:processing?"wait":"pointer",fontSize:12,textTransform:"uppercase" }}>
                      {processing?"⏳ Traitement...":`PAYER ${total} $CA`}
                    </button>
                  </div>
                  <div style={{ textAlign:"center",marginTop:9,fontSize:10,color:MUTED }}>En payant vous acceptez nos conditions générales de vente.</div>
                </div>
              </div>
              <MiniSummary cart={cart} subtotal={subtotal} shipping={shipping} taxes={taxes} total={total} address={form}/>
            </div>
          )}
        </div>
      )}

      {/* ════════ CONFIRMATION ════════ */}
      {page==="confirmation"&&lastOrder&&(
        <div style={{ padding:"64px 50px", maxWidth:680, margin:"0 auto", textAlign:"center" }}>
          <div style={{ width:72,height:72,background:GREEN,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 20px" }}>✓</div>
          <h1 style={{ fontSize:34,color:DARK,marginBottom:8 }}>Commande confirmée !</h1>
          <p style={{ fontSize:15,color:MUTED,lineHeight:1.8,marginBottom:8 }}>Merci <strong>{lastOrder.client}</strong> ! Confirmation envoyée par email.<br/>Payé via <strong>{lastOrder.payMethod}</strong>.</p>
          <div style={{ background:DARK,color:G,display:"inline-block",padding:"9px 24px",fontSize:20,fontWeight:"bold",letterSpacing:3,marginBottom:28,borderRadius:2 }}>{lastOrder.id}</div>
          <div style={{ background:CREAM,border:"1px solid "+BORDER,padding:"24px 30px",textAlign:"left",marginBottom:20 }}>
            <div style={{ fontSize:13,fontWeight:"bold",color:DARK,marginBottom:16 }}>📦 Suivi de votre commande</div>
            <TrackingTimeline order={lastOrder}/>
          </div>
          <div style={{ background:"#F0FFF4",border:"1px solid "+GREEN,padding:"11px 17px",fontSize:12,color:GREEN,marginBottom:22,textAlign:"left" }}>🔔 Vous recevrez des notifications email à chaque étape. Pour toute question : {PHONE}</div>
          <div style={{ display:"flex",gap:12,justifyContent:"center" }}>
            <button onClick={()=>{setTrackId(lastOrder.id);setTrackResult(lastOrder);setTrackErr("");setPage("suivi");}} style={{ background:DARK,color:G,border:"none",padding:"11px 24px",fontFamily:"Georgia",cursor:"pointer",fontSize:12,letterSpacing:1 }}>Suivre ma commande →</button>
            <button onClick={()=>setPage("boutique")} style={{ background:"transparent",color:DARK,border:"2px solid "+DARK,padding:"11px 24px",fontFamily:"Georgia",cursor:"pointer",fontSize:12 }}>Continuer les achats</button>
          </div>
        </div>
      )}

      {/* ════════ SUIVI ════════ */}
      {page==="suivi"&&(
        <div style={{ padding:"56px 60px", maxWidth:820, margin:"0 auto" }}>
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:10,letterSpacing:5,color:RED,textTransform:"uppercase",marginBottom:4 }}>EN TEMPS RÉEL</div>
            <h1 style={{ fontSize:36,color:DARK,margin:"0 0 8px" }}>Suivi de commande</h1>
            <p style={{ color:MUTED,fontSize:14,lineHeight:1.7 }}>Entrez votre numéro de commande (format <strong>BDR-YYYY-XXXX</strong>).</p>
          </div>
          <div style={{ display:"flex",gap:0,marginBottom:32 }}>
            <input value={trackId} onChange={e=>setTrackId(e.target.value.toUpperCase())} onKeyDown={e=>e.key==="Enter"&&doTrack()} placeholder="Ex: BDR-2025-0042"
              style={{ flex:1,padding:"13px 17px",background:CREAM,border:"2px solid "+DARK,borderRight:"none",fontFamily:"Georgia",fontSize:15,letterSpacing:2,outline:"none" }}/>
            <button onClick={doTrack} style={{ background:DARK,color:G,border:"none",padding:"13px 26px",fontFamily:"Georgia",fontWeight:"bold",fontSize:13,letterSpacing:2,cursor:"pointer",textTransform:"uppercase" }}>SUIVRE →</button>
          </div>
          {trackErr&&<div style={{ background:"#FFF0F0",border:"2px solid "+RED,padding:"12px 16px",color:RED,marginBottom:22,fontSize:13 }}>❌ {trackErr}</div>}
          {trackResult&&(
            <>
              <div style={{ background:DARK,padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`3px solid ${G}` }}>
                <div><div style={{ fontSize:8,color:"#A0845C",letterSpacing:3,marginBottom:2 }}>COMMANDE</div><div style={{ fontSize:18,color:G,fontWeight:"bold",letterSpacing:2 }}>{trackResult.id}</div></div>
                <div style={{ textAlign:"center" }}><div style={{ fontSize:8,color:"#A0845C",letterSpacing:2,marginBottom:2 }}>DATE</div><div style={{ color:CREAM,fontSize:13 }}>{trackResult.date}</div></div>
                <div style={{ textAlign:"center" }}><div style={{ fontSize:8,color:"#A0845C",letterSpacing:2,marginBottom:2 }}>TOTAL</div><div style={{ color:G,fontSize:16,fontWeight:"bold" }}>{trackResult.total.toFixed(2)} $CA</div></div>
                <StatusBadge status={trackResult.status}/>
              </div>
              <div style={{ background:CREAM,border:"1px solid "+BORDER,borderTop:"none",padding:"26px 30px",marginBottom:18 }}>
                <div style={{ fontSize:13,fontWeight:"bold",color:DARK,marginBottom:18 }}>🗺️ Progression de votre livraison</div>
                <TrackingTimeline order={trackResult} verbose/>
              </div>
              <div style={{ background:CREAM,border:"1px solid "+BORDER,padding:"22px 30px",marginBottom:18 }}>
                <div style={{ fontSize:13,fontWeight:"bold",color:DARK,marginBottom:14 }}>📋 Articles commandés</div>
                {trackResult.items.map(item=>(
                  <div key={item.id} style={{ display:"flex",alignItems:"center",gap:12,paddingBottom:10,marginBottom:10,borderBottom:"1px solid "+BORDER }}>
                    <div style={{ width:44,height:44,background:`linear-gradient(135deg,${BROWN},${RED})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <div style={{ transform:"scale(0.3)",transformOrigin:"center",width:155,height:190,display:"flex",alignItems:"center",justifyContent:"center" }}><svg width="155" height="190" viewBox="0 0 155 190">{item.svg}</svg></div>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:"bold",fontSize:13 }}>{item.name}</div>
                      <div style={{ fontSize:11,color:MUTED }}>Par {item.artisan} · Qté : {item.qty||1}</div>
                    </div>
                    <div style={{ fontWeight:"bold",color:RED,fontSize:13 }}>{(item.price*(item.qty||1)).toFixed(2)} $CA</div>
                  </div>
                ))}
                <div style={{ display:"flex",justifyContent:"space-between",paddingTop:6,fontSize:12,color:MUTED }}><span>Livraison internationale Afrique → Canada</span><span>{trackResult.shipping.toFixed(2)} $CA</span></div>
              </div>
              <div style={{ background:CREAM,border:"1px solid "+BORDER,padding:"20px 30px" }}>
                <div style={{ fontSize:13,fontWeight:"bold",color:DARK,marginBottom:8 }}>📍 Adresse de livraison</div>
                <div style={{ fontSize:13,color:MUTED,lineHeight:1.8 }}><strong style={{ color:DARK }}>{trackResult.client}</strong><br/>{trackResult.address}</div>
              </div>
            </>
          )}
          {!trackResult&&orders.length>0&&(
            <div style={{ marginTop:40 }}>
              <div style={{ fontSize:11,fontWeight:"bold",color:DARK,marginBottom:12,letterSpacing:1,textTransform:"uppercase" }}>📜 Commandes récentes</div>
              {orders.map(o=>(
                <div key={o.id} className="hover-row" onClick={()=>{setTrackId(o.id);setTrackResult(o);setTrackErr("");}}
                  style={{ background:CREAM,border:"1px solid "+BORDER,padding:"14px 20px",marginBottom:10,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"border-color .2s" }}>
                  <div><div style={{ fontWeight:"bold",color:DARK,fontSize:13,letterSpacing:1 }}>{o.id}</div><div style={{ fontSize:11,color:MUTED,marginTop:2 }}>{o.date} · {o.items.length} article(s)</div></div>
                  <div style={{ textAlign:"right" }}><StatusBadge status={o.status}/><div style={{ fontWeight:"bold",color:RED,marginTop:5,fontSize:13 }}>{o.total.toFixed(2)} $CA</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════ COMMANDE SUR MESURE ════════ */}
      {page==="commande"&&(
        <div style={{ padding:"56px 60px", maxWidth:740, margin:"0 auto" }}>
          <div style={{ marginBottom:28 }}>
            <div style={{ fontSize:10,letterSpacing:5,color:RED,textTransform:"uppercase",marginBottom:4 }}>PERSONNALISÉ</div>
            <h1 style={{ fontSize:36,color:DARK,margin:"0 0 8px" }}>Commande sur mesure</h1>
            <p style={{ color:MUTED,fontSize:14,lineHeight:1.8 }}>Un boubou à vos mesures, un tableau unique, un produit spécifique ? Remplissez ce formulaire et nous vous répondrons sous 48h.</p>
          </div>
          <div style={{ background:CREAM,border:"1px solid "+BORDER,padding:"34px 38px" }}>
            <FInp label="Votre nom complet" placeholder="Ex: Mamadou Diallo"/>
            <FInp label="Adresse email" type="email" placeholder={EMAIL}/>
            <FInp label="Téléphone / WhatsApp" type="tel" placeholder={PHONE}/>
            <FInp label="Ville de livraison" placeholder="Montréal, QC"/>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:10,letterSpacing:2,color:RED,textTransform:"uppercase",display:"block",marginBottom:5 }}>Catégorie de produit</label>
              <select style={{ width:"100%",padding:"10px 13px",background:BG,border:"2px solid "+BORDER,color:DARK,fontSize:14,fontFamily:"Georgia",outline:"none" }}>
                <option>Habillement Homme (boubou, dashiki, agbada...)</option>
                <option>Habillement Femme (robe, kaftan, ensemble...)</option>
                <option>Habillement Enfant (boubou, robe, ensemble...)</option>
                <option>Oeuvre d'art (sculpture, masque, tableau...)</option>
                <option>Divers / Accessoires (bijoux, sac, tissu, beauté...)</option>
              </select>
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:10,letterSpacing:2,color:RED,textTransform:"uppercase",display:"block",marginBottom:5 }}>Détails de votre commande</label>
              <textarea placeholder="Décrivez précisément : couleurs, taille, matières, quantité, occasion, pays d'origine souhaité..." rows={5} style={{ width:"100%",padding:"10px 13px",background:BG,border:"2px solid "+BORDER,color:DARK,fontSize:14,fontFamily:"Georgia",outline:"none",boxSizing:"border-box",resize:"vertical" }}/>
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:10,letterSpacing:2,color:RED,textTransform:"uppercase",display:"block",marginBottom:5 }}>Budget estimé</label>
              <select style={{ width:"100%",padding:"10px 13px",background:BG,border:"2px solid "+BORDER,color:DARK,fontSize:14,fontFamily:"Georgia",outline:"none" }}>
                {["Moins de 50 $CA","50 – 150 $CA","150 – 300 $CA","300 – 500 $CA","Plus de 500 $CA"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <button onClick={()=>toast("Demande reçue ! Réponse sous 48h ✓")} style={{ width:"100%",background:DARK,color:G,border:"none",padding:"15px",fontSize:13,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:3,cursor:"pointer",textTransform:"uppercase" }}>ENVOYER MA DEMANDE</button>
            <div style={{ textAlign:"center",marginTop:12,fontSize:11,color:MUTED }}>🔒 Données protégées · Réponse sous 48h · {EMAIL}</div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background:"#0D0500",color:"#A0845C",padding:"44px 56px 24px",borderTop:"3px solid #3A1F00",marginTop:60 }}>
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:32,marginBottom:30 }}>
          <div>
            <div style={{ fontSize:20,color:G,letterSpacing:4,fontWeight:"bold",marginBottom:12 }}>BADAOUR</div>
            <p style={{ fontSize:12,lineHeight:1.9,color:MUTED }}>L'Afrique à votre porte. Commerce éthique, artisanat authentique, livraison partout au Canada.</p>
            <div style={{ marginTop:12,fontSize:12,color:MUTED }}>
              <div style={{ marginBottom:5 }}>📞 {PHONE}</div>
              <div>✉️ {EMAIL}</div>
            </div>
            <div style={{ marginTop:12,fontSize:20,display:"flex",gap:10 }}>
              {["📘","📸","▶️","📌"].map(i=><span key={i} style={{ cursor:"pointer" }} onClick={()=>toast("Réseaux sociaux bientôt !")}>{i}</span>)}
            </div>
          </div>
          {[
            ["Boutique",["Habillement Homme","Habillement Femme","Habillement Enfant","Oeuvres d'art","Divers & Accessoires"]],
            ["BADAOUR",["Notre histoire","Nos artisans","Blog","Contact","Devenir partenaire"]],
            ["Aide",["Livraison Afrique→Canada","Retours & échanges","FAQ","Sur mesure","Mon compte"]],
          ].map(([title,links])=>(
            <div key={title}>
              <div style={{ color:G,fontWeight:"bold",letterSpacing:2,fontSize:10,textTransform:"uppercase",marginBottom:12 }}>{title}</div>
              {links.map(l=><div key={l} style={{ color:MUTED,fontSize:12,marginBottom:7,cursor:"pointer" }} onMouseEnter={e=>e.target.style.color=G} onMouseLeave={e=>e.target.style.color=MUTED}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid #3A1F00",paddingTop:17,display:"flex",justifyContent:"space-between",fontSize:10 }}>
          <span>© 2025 BADAOUR · Montréal, Québec · Canada</span>
          <span style={{ color:G }}>Fait avec ❤️ pour la diaspora africaine</span>
        </div>
      </footer>
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ p, addToCart, wishlist, toggleWishlist }) {
  const [added, setAdded] = useState(false);
  const handle = () => { addToCart(p); setAdded(true); setTimeout(()=>setAdded(false),1500); };
  const catColors = { homme:"#1A3A6B", femme:"#8B1A00", enfant:"#27AE60", art:"#6A0572", divers:"#D4AF37" };
  return (
    <div className="hover-card" style={{ background:"#FFF8EE", border:"1px solid #E8D5B7", overflow:"hidden", transition:"transform .2s,box-shadow .2s" }}>
      <div style={{ height:195, background:`linear-gradient(145deg,${BROWN},${RED})`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ transform:"scale(0.85)", transformOrigin:"center" }}>
          <svg width="155" height="190" viewBox="0 0 155 190">{p.svg}</svg>
        </div>
        <div style={{ position:"absolute", top:12, left:12, background:tagColors[p.tag]||"#666", color:"white", padding:"3px 10px", fontSize:9, letterSpacing:1, fontWeight:"bold" }}>{p.tag}</div>
        <div style={{ position:"absolute", top:12, right:12, background:"rgba(26,10,0,.6)", color:G, padding:"2px 8px", fontSize:9, letterSpacing:1 }}>🌍 {p.country}</div>
        <button onClick={()=>toggleWishlist(p.id)} style={{ position:"absolute", bottom:10, right:10, background:"rgba(0,0,0,.4)", border:"none", borderRadius:"50%", width:30, height:30, cursor:"pointer", fontSize:15 }}>{wishlist.includes(p.id)?"❤️":"🤍"}</button>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:`linear-gradient(transparent,${catColors[p.category]}44)`, height:40 }}/>
      </div>
      <div style={{ padding:"14px 18px" }}>
        <div style={{ fontSize:9, letterSpacing:2, color:catColors[p.category]||RED, textTransform:"uppercase", marginBottom:3 }}>{p.subcategory}</div>
        <div style={{ fontSize:15, fontWeight:"bold", color:DARK, marginBottom:3 }}>{p.name}</div>
        <div style={{ fontSize:11, color:MUTED, marginBottom:3, fontStyle:"italic" }}>✂️ {p.artisan}</div>
        <div style={{ fontSize:11, color:"#666", marginBottom:11, lineHeight:1.5 }}>{p.desc}</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:19, fontWeight:"bold", color:RED }}>{p.price} $CA</span>
          <button onClick={handle} style={{ background:added?GREEN:DARK, color:G, border:"none", padding:"7px 15px", cursor:"pointer", fontFamily:"Georgia", fontSize:11, letterSpacing:1, transition:"background .3s" }}>
            {added?"✓ Ajouté":"Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniSummary({ cart, subtotal, shipping, taxes, total, onContinue, address }) {
  return (
    <div style={{ background:"#FFF8EE", border:"1px solid #E8D5B7", padding:"22px 22px", alignSelf:"start" }}>
      <h3 style={{ fontSize:14,color:DARK,marginTop:0,marginBottom:14,borderBottom:"1px solid #E8D5B7",paddingBottom:10 }}>Récapitulatif</h3>
      {cart.map(i=><div key={i.id} style={{ display:"flex",justifyContent:"space-between",marginBottom:7,fontSize:11,color:MUTED }}><span>{i.name} ×{i.qty}</span><span style={{ fontWeight:"bold",color:DARK }}>{(i.price*i.qty).toFixed(2)} $</span></div>)}
      <div style={{ borderTop:"1px solid #E8D5B7",paddingTop:9,marginTop:9 }}>
        <Row label="Sous-total" val={`${subtotal.toFixed(2)} $CA`}/>
        <Row label="Livraison" val={`${shipping} $CA`}/>
        <Row label="Taxes (14.975%)" val={`${taxes} $CA`}/>
      </div>
      <div style={{ borderTop:`2px solid ${DARK}`,paddingTop:10,marginTop:8,display:"flex",justifyContent:"space-between" }}>
        <span style={{ fontSize:15,fontWeight:"bold" }}>Total</span>
        <span style={{ fontSize:18,fontWeight:"bold",color:RED }}>{total} $CA</span>
      </div>
      {onContinue&&<button onClick={onContinue} style={{ width:"100%",background:cart.length?DARK:BORDER,color:G,border:"none",padding:"12px",marginTop:16,fontSize:12,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,cursor:cart.length?"pointer":"not-allowed",textTransform:"uppercase" }}>Continuer →</button>}
      {address?.name&&<div style={{ marginTop:14,fontSize:11,color:MUTED,borderTop:"1px solid #E8D5B7",paddingTop:10 }}><div style={{ fontWeight:"bold",color:DARK,marginBottom:3 }}>📍 Livraison à :</div><div>{address.name}<br/>{address.address}, {address.city} {address.province}</div></div>}
      <div style={{ textAlign:"center",marginTop:12,fontSize:10,color:MUTED }}>🔒 Paiement sécurisé SSL</div>
    </div>
  );
}
