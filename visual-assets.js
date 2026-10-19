/**
 * visual-assets.js - 식품 일러스트 및 8대 품질 인증 마크 SVG 엔진
 * [개선] 8대 인증 마크 깨짐 현상 완벽 수정 및 고화질 엠블럼 최적화
 */

const VisualAssets = {
  wrapSvg(content, viewBox = "0 0 200 160", width = "100%", height = "100%") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" style="overflow:hidden; display:block;">${content}</svg>`;
  },

  getGraphic(type) {
    if (!type) return "";

    switch (type) {
      // 🌾 [곡류] 쌀
      case "rice-good":
        return this.wrapSvg(`
          <defs>
            <linearGradient id="riceBowl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#4a6572"/>
              <stop offset="100%" stop-color="#232f34"/>
            </linearGradient>
            <linearGradient id="riceGrain" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="60%" stop-color="#f1f8e9"/>
              <stop offset="100%" stop-color="#dcedc8"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="115" rx="70" ry="25" fill="#cfd8dc"/>
          <path d="M35 110 Q100 155 165 110 L155 140 Q100 165 45 140 Z" fill="url(#riceBowl)"/>
          <ellipse cx="100" cy="105" rx="65" ry="25" fill="#f5f5f5"/>
          <g fill="url(#riceGrain)" stroke="#8bc34a" stroke-width="0.8">
            <ellipse cx="75" cy="95" rx="9" ry="5" transform="rotate(-20 75 95)"/>
            <ellipse cx="95" cy="92" rx="9" ry="5" transform="rotate(15 95 92)"/>
            <ellipse cx="118" cy="96" rx="9" ry="5" transform="rotate(-35 118 96)"/>
            <ellipse cx="85" cy="108" rx="9" ry="5" transform="rotate(40 85 108)"/>
            <ellipse cx="108" cy="106" rx="9" ry="5" transform="rotate(-15 108 106)"/>
            <ellipse cx="130" cy="105" rx="9" ry="5" transform="rotate(25 130 105)"/>
            <ellipse cx="65" cy="106" rx="9" ry="5" transform="rotate(-10 65 106)"/>
            <ellipse cx="100" cy="80" rx="9" ry="5" transform="rotate(5 100 80)"/>
          </g>
          <path d="M100 58 L102 65 L108 68 L102 71 L100 78 L98 71 L92 68 L98 65 Z" fill="#ffd54f"/>
          <path d="M125 70 L127 74 L131 76 L127 78 L125 82 L123 78 L119 76 L123 74 Z" fill="#ffd54f"/>
        `);

      case "rice-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="115" rx="70" ry="25" fill="#cfd8dc"/>
          <path d="M35 110 Q100 155 165 110 L155 140 Q100 165 45 140 Z" fill="#546e7a"/>
          <ellipse cx="100" cy="105" rx="65" ry="25" fill="#fff9c4"/>
          <!-- 하얀 가루와 금 간 싸라기 -->
          <ellipse cx="100" cy="105" rx="55" ry="20" fill="#ffffff" opacity="0.8"/>
          <g fill="#ffe082" stroke="#8d6e63" stroke-width="0.8">
            <ellipse cx="75" cy="95" rx="8" ry="5" transform="rotate(-20 75 95)"/>
            <path d="M71 93 L79 97" stroke="#d32f2f" stroke-width="1.8"/>
            <ellipse cx="95" cy="92" rx="8" ry="4" transform="rotate(15 95 92)"/>
            <path d="M91 92 L98 93" stroke="#d32f2f" stroke-width="1.8"/>
            <circle cx="85" cy="108" r="2.2" fill="#3e2723"/>
            <circle cx="118" cy="96" r="2.2" fill="#3e2723"/>
          </g>
          <!-- 쌀바구미 -->
          <g transform="translate(100, 100)">
            <ellipse cx="0" cy="0" rx="4.5" ry="3" fill="#3e2723"/>
            <circle cx="-4.5" cy="0" r="2.2" fill="#212121"/>
            <path d="M-6.5 0 L-10 -2 M-6.5 0 L-10 2" stroke="#212121" stroke-width="1"/>
            <path d="M-2 -2 L-3 -5 M0 -2 L0 -5 M2 -2 L3 -5" stroke="#3e2723" stroke-width="1"/>
            <path d="M-2 2 L-3 5 M0 2 L0 5 M2 2 L3 5" stroke="#3e2723" stroke-width="1"/>
          </g>
        `);

      // 🌾 [콩류]
      case "bean-good":
        return this.wrapSvg(`
          <defs>
            <linearGradient id="beanGradGood" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fff59d"/>
              <stop offset="40%" stop-color="#fbc02d"/>
              <stop offset="100%" stop-color="#f57f17"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="120" rx="60" ry="15" fill="#e0e0e0"/>
          <ellipse cx="70" cy="85" rx="22" ry="17" fill="url(#beanGradGood)" transform="rotate(-15 70 85)"/>
          <path d="M60 82 Q68 86 75 82" stroke="#fff9c4" stroke-width="2" fill="none"/>
          <ellipse cx="65" cy="75" rx="6" ry="2.5" fill="#ffffff" opacity="0.75" transform="rotate(-15 65 75)"/>

          <ellipse cx="120" cy="90" rx="24" ry="18" fill="url(#beanGradGood)" transform="rotate(20 120 90)"/>
          <path d="M115 85 Q122 90 130 86" stroke="#fff9c4" stroke-width="2" fill="none"/>
          <ellipse cx="115" cy="80" rx="7" ry="3" fill="#ffffff" opacity="0.85" transform="rotate(20 115 80)"/>
          <path d="M135 60 L137 65 L142 67 L137 69 L135 74 L133 69 L128 67 L133 65 Z" fill="#ffd54f"/>
        `);

      case "bean-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="120" rx="60" ry="15" fill="#e0e0e0"/>
          <path d="M50 85 C45 70 85 65 90 80 C95 95 55 100 50 85 Z" fill="#d7ccc8" stroke="#8d6e63" stroke-width="1.5"/>
          <path d="M60 75 Q65 85 62 92 M70 72 Q73 83 72 95" stroke="#5d4037" stroke-width="1.2" fill="none"/>
          <circle cx="70" cy="82" r="3.2" fill="#212121"/>
          <path d="M105 90 C100 75 140 70 145 90 C140 105 110 105 105 90 Z" fill="#bcaaa4" stroke="#6d4c41" stroke-width="1.5"/>
          <circle cx="125" cy="88" r="3.5" fill="#212121"/>
        `);

      // 🍎 [과일류] 사과
      case "apple-good":
        return this.wrapSvg(`
          <defs>
            <radialGradient id="appleGradGood" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#ff7961"/>
              <stop offset="50%" stop-color="#d32f2f"/>
              <stop offset="100%" stop-color="#8e0000"/>
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="130" rx="45" ry="12" fill="#e0e0e0"/>
          <path d="M100 45 Q105 25 118 22" stroke="#5d4037" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <path d="M104 36 Q125 25 130 38 Q115 45 104 36 Z" fill="#4caf50"/>
          <path d="M100 45 C65 42 45 65 45 90 C45 115 70 125 100 125 C130 125 155 115 155 90 C155 65 135 42 100 45 Z" fill="url(#appleGradGood)"/>
          <ellipse cx="75" cy="68" rx="14" ry="25" fill="#ffffff" opacity="0.3" transform="rotate(-30 75 68)"/>
        `);

      case "apple-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="130" rx="45" ry="12" fill="#e0e0e0"/>
          <path d="M95 45 Q92 30 85 26" stroke="#4e342e" stroke-width="3" fill="none"/>
          <path d="M95 45 C60 42 40 60 42 85 C45 110 75 125 95 123 C120 120 160 105 150 80 C140 55 125 48 95 45 Z" fill="#c62828"/>
          <ellipse cx="120" cy="88" rx="18" ry="14" fill="#5d4037" opacity="0.9"/>
          <ellipse cx="120" cy="88" rx="12" ry="8" fill="#3e2723" opacity="0.95"/>
          <path d="M60 75 L72 82 M58 80 L68 88" stroke="#ffeb3b" stroke-width="1.5"/>
        `);

      // 🍉 [과일류] 수박
      case "watermelon-good":
        return this.wrapSvg(`
          <defs>
            <radialGradient id="melonGradGood" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#4caf50"/>
              <stop offset="100%" stop-color="#1b5e20"/>
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="130" rx="55" ry="12" fill="#e0e0e0"/>
          <ellipse cx="100" cy="82" rx="58" ry="46" fill="url(#melonGradGood)"/>
          <g fill="none" stroke="#003300" stroke-width="6.5" stroke-linecap="round">
            <path d="M100 38 Q95 80 100 126"/>
            <path d="M78 42 Q68 80 75 122"/>
            <path d="M122 42 Q132 80 125 122"/>
            <path d="M58 54 Q50 82 58 110"/>
            <path d="M142 54 Q150 82 142 110"/>
          </g>
          <path d="M100 38 Q102 22 108 20 Q115 18 112 26 Q110 32 118 30" stroke="#66bb6a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        `);

      case "watermelon-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="130" rx="55" ry="12" fill="#e0e0e0"/>
          <ellipse cx="100" cy="82" rx="58" ry="46" fill="#81c784"/>
          <g fill="none" stroke="#4caf50" stroke-width="4" opacity="0.55">
            <path d="M100 38 Q95 80 100 126"/>
            <path d="M78 42 Q68 80 75 122"/>
            <path d="M122 42 Q132 80 125 122"/>
          </g>
          <path d="M100 38 Q95 28 90 25 L88 24" stroke="#5d4037" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <ellipse cx="130" cy="100" rx="20" ry="14" fill="#fff59d" opacity="0.6"/>
        `);

      // 🍇 [과일류] 포도
      case "grape-good":
        return this.wrapSvg(`
          <ellipse cx="100" cy="135" rx="45" ry="10" fill="#e0e0e0"/>
          <path d="M100 35 Q102 20 110 15" stroke="#558b2f" stroke-width="3" fill="none"/>
          <path d="M95 30 Q80 22 75 32 Q90 36 95 30 Z" fill="#689f38"/>
          <g fill="#4a148c" stroke="#311b92" stroke-width="1">
            <circle cx="85" cy="45" r="12"/><circle cx="102" cy="43" r="12"/><circle cx="118" cy="48" r="12"/>
            <circle cx="75" cy="62" r="12"/><circle cx="92" cy="60" r="12"/><circle cx="110" cy="62" r="12"/><circle cx="125" cy="65" r="12"/>
            <circle cx="82" cy="80" r="12"/><circle cx="100" cy="78" r="12"/><circle cx="118" cy="80" r="12"/>
            <circle cx="92" cy="97" r="12"/><circle cx="108" cy="98" r="12"/>
            <circle cx="100" cy="114" r="11"/>
          </g>
          <g fill="#ffffff" opacity="0.45">
            <ellipse cx="83" cy="43" rx="4" ry="2"/>
            <ellipse cx="100" cy="41" rx="4" ry="2"/>
            <ellipse cx="90" cy="58" rx="5" ry="2.5"/>
            <ellipse cx="108" cy="60" rx="5" ry="2.5"/>
            <ellipse cx="98" cy="76" rx="5" ry="2.5"/>
          </g>
        `);

      case "grape-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="135" rx="45" ry="10" fill="#e0e0e0"/>
          <path d="M100 35 Q102 22 108 18" stroke="#5d4037" stroke-width="2.5" fill="none"/>
          <path d="M100 35 L90 60 L80 85 M100 35 L110 65 L120 90 M90 60 L100 105" stroke="#795548" stroke-width="2" fill="none"/>
          <g fill="#311b92" stroke="#1a237e" stroke-width="1">
            <circle cx="82" cy="50" r="11"/>
            <circle cx="115" cy="55" r="11"/>
            <circle cx="75" cy="85" r="11"/>
            <ellipse cx="65" cy="128" rx="10" ry="6" fill="#1a237e"/>
            <path d="M60 130 Q65 135 75 132" stroke="#e91e63" stroke-width="2" fill="none"/>
          </g>
        `);

      // 🥔 [채소류] 감자
      case "potato-good":
        return this.wrapSvg(`
          <defs>
            <radialGradient id="potatoGradGood" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#d7ccc8"/>
              <stop offset="60%" stop-color="#a1887f"/>
              <stop offset="100%" stop-color="#6d4c41"/>
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="125" rx="55" ry="14" fill="#e0e0e0"/>
          <path d="M60 60 C45 80 50 105 70 115 C95 125 135 120 150 100 C165 80 150 55 130 50 C105 45 75 45 60 60 Z" fill="url(#potatoGradGood)"/>
          <ellipse cx="80" cy="65" rx="2" ry="1" fill="#4e342e"/>
          <ellipse cx="120" cy="70" rx="2" ry="1" fill="#4e342e"/>
          <ellipse cx="105" cy="95" rx="2" ry="1" fill="#4e342e"/>
        `);

      case "potato-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="125" rx="55" ry="14" fill="#e0e0e0"/>
          <path d="M60 60 C45 80 50 105 70 115 C95 125 135 120 150 100 C165 80 150 55 130 50 C105 45 75 45 60 60 Z" fill="#689f38"/>
          <path d="M65 55 Q110 40 145 55 Q130 85 65 55 Z" fill="#33691e" opacity="0.8"/>
          <g transform="translate(85, 48)">
            <path d="M0 0 Q-5 -15 -2 -22 Q5 -15 3 0 Z" fill="#7cb342"/>
            <path d="M-2 -18 Q-10 -22 -6 -28 Q-2 -24 -2 -18 Z" fill="#9ccc65"/>
            <circle cx="-3" cy="-24" r="2" fill="#d32f2f"/>
          </g>
          <g transform="translate(125, 52)">
            <path d="M0 0 Q5 -12 10 -18 Q3 -10 0 0 Z" fill="#7cb342"/>
          </g>
        `);

      // 🍠 [채소류] 고구마
      case "sweetpotato-good":
        return this.wrapSvg(`
          <defs>
            <radialGradient id="spGradGood" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#c2185b"/>
              <stop offset="60%" stop-color="#880e4f"/>
              <stop offset="100%" stop-color="#4a0072"/>
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="125" rx="55" ry="12" fill="#e0e0e0"/>
          <path d="M40 85 C65 55 135 55 160 85 C140 115 60 115 40 85 Z" fill="url(#spGradGood)"/>
          <ellipse cx="95" cy="70" rx="30" ry="8" fill="#ffffff" opacity="0.25" transform="rotate(-5 95 70)"/>
        `);

      case "sweetpotato-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="125" rx="55" ry="12" fill="#e0e0e0"/>
          <path d="M40 85 C60 65 140 65 160 85 C135 105 65 105 40 85 Z" fill="#6a1b9a"/>
          <ellipse cx="75" cy="80" rx="12" ry="9" fill="#212121"/>
          <ellipse cx="120" cy="86" rx="15" ry="10" fill="#212121"/>
          <g stroke="#3e2723" stroke-width="1.2" fill="none">
            <path d="M55 92 Q50 105 48 112"/>
            <path d="M85 96 Q82 110 80 116"/>
          </g>
        `);

      // 🌿 [채소류] 시금치
      case "spinach-good":
        return this.wrapSvg(`
          <ellipse cx="100" cy="130" rx="50" ry="12" fill="#e0e0e0"/>
          <path d="M96 120 L104 120 L100 132 Z" fill="#e91e63"/>
          <g fill="#2e7d32" stroke="#1b5e20" stroke-width="1.5">
            <path d="M100 120 Q70 90 60 60 Q75 45 90 65 Q96 90 100 120 Z"/>
            <path d="M100 120 Q130 90 140 60 Q125 45 110 65 Q104 90 100 120 Z"/>
            <path d="M100 120 Q90 75 100 40 Q110 75 100 120 Z" fill="#388e3c"/>
          </g>
        `);

      case "spinach-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="130" rx="50" ry="12" fill="#e0e0e0"/>
          <g fill="#c0ca33" stroke="#9e9d24" stroke-width="1.5">
            <path d="M100 120 Q65 115 50 122 Q55 105 75 108 Q90 110 100 120 Z"/>
            <path d="M100 120 Q135 115 150 122 Q145 105 125 108 Q110 110 100 120 Z"/>
          </g>
          <ellipse cx="50" cy="122" rx="8" ry="4" fill="#795548"/>
          <ellipse cx="150" cy="122" rx="8" ry="4" fill="#795548"/>
        `);

      // 🥕 [채소류] 당근
      case "carrot-good":
        return this.wrapSvg(`
          <defs>
            <linearGradient id="carrotGradGood" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ff9800"/>
              <stop offset="50%" stop-color="#f57c00"/>
              <stop offset="100%" stop-color="#e65100"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="132" rx="45" ry="10" fill="#e0e0e0"/>
          <path d="M100 38 Q95 20 85 12 M100 38 Q100 18 102 10 M100 38 Q108 20 115 14" stroke="#4caf50" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M85 40 Q100 36 115 40 L104 125 Q100 132 96 125 Z" fill="url(#carrotGradGood)"/>
        `);

      case "carrot-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="132" rx="45" ry="10" fill="#e0e0e0"/>
          <path d="M82 40 Q100 36 118 40 L115 65 L125 95 L106 125 L90 90 L85 65 Z" fill="#fb8c00"/>
          <path d="M100 50 L96 80 L102 100 L98 115" stroke="#bf360c" stroke-width="3.5" fill="none"/>
        `);

      // 🥩 [축산물] 쇠고기
      case "beef-good":
        return this.wrapSvg(`
          <defs>
            <radialGradient id="beefGradGood" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#ef5350"/>
              <stop offset="70%" stop-color="#c62828"/>
              <stop offset="100%" stop-color="#b71c1c"/>
            </radialGradient>
          </defs>
          <rect x="35" y="35" width="130" height="95" rx="12" fill="#ffffff" stroke="#e0e0e0" stroke-width="2"/>
          <path d="M50 50 Q100 40 148 52 Q155 100 140 115 Q95 125 52 110 Z" fill="url(#beefGradGood)"/>
          <g stroke="#ffffff" stroke-width="2.5" fill="none" opacity="0.85" stroke-linecap="round">
            <path d="M65 65 Q85 70 110 62"/>
            <path d="M80 82 Q105 85 135 78"/>
          </g>
        `);

      case "beef-bad":
        return this.wrapSvg(`
          <rect x="35" y="35" width="130" height="95" rx="12" fill="#ffffff" stroke="#e0e0e0" stroke-width="2"/>
          <ellipse cx="100" cy="105" rx="55" ry="18" fill="#b71c1c" opacity="0.4"/>
          <path d="M50 50 Q100 40 148 52 Q155 100 140 115 Q95 125 52 110 Z" fill="#4e342e"/>
          <ellipse cx="95" cy="78" rx="16" ry="12" fill="#2d1c18"/>
        `);

      // 🥩 [축산물] 돼지고기
      case "pork-good":
        return this.wrapSvg(`
          <rect x="35" y="35" width="130" height="95" rx="12" fill="#ffffff" stroke="#e0e0e0" stroke-width="2"/>
          <g>
            <path d="M50 50 Q100 45 150 52 L148 66 Q100 60 52 65 Z" fill="#fafafa" stroke="#e0e0e0" stroke-width="1"/>
            <path d="M52 65 Q100 60 148 66 L145 95 Q100 90 50 92 Z" fill="#f48fb1"/>
            <path d="M50 92 Q100 90 145 95 L142 104 Q100 100 48 102 Z" fill="#fafafa"/>
            <path d="M48 102 Q100 100 142 104 L140 116 Q100 118 46 112 Z" fill="#f06292"/>
          </g>
        `);

      case "pork-bad":
        return this.wrapSvg(`
          <rect x="35" y="35" width="130" height="95" rx="12" fill="#ffffff" stroke="#e0e0e0" stroke-width="2"/>
          <g>
            <path d="M50 50 Q100 45 150 52 L148 66 Q100 60 52 65 Z" fill="#fff59d" stroke="#fbc02d" stroke-width="1"/>
            <path d="M52 65 Q100 60 148 66 L145 95 Q100 90 50 92 Z" fill="#a1887f"/>
            <path d="M50 92 Q100 90 145 95 L142 104 Q100 100 48 102 Z" fill="#fff59d"/>
            <path d="M48 102 Q100 100 142 104 L140 116 Q100 118 46 112 Z" fill="#8d6e63"/>
          </g>
        `);

      // 🍗 [축산물] 닭고기
      case "chicken-good":
        return this.wrapSvg(`
          <ellipse cx="100" cy="128" rx="55" ry="12" fill="#e0e0e0"/>
          <path d="M60 80 C45 50 80 40 115 55 C135 65 155 100 135 115 C115 125 80 110 60 80 Z" fill="#ffcdd2"/>
          <path d="M60 80 L40 90 Q32 95 38 102 Q45 98 50 90" stroke="#f5f5f5" stroke-width="6" fill="none" stroke-linecap="round"/>
        `);

      case "chicken-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="128" rx="55" ry="12" fill="#e0e0e0"/>
          <path d="M60 80 C45 50 80 40 115 55 C135 65 155 100 135 115 C115 125 80 110 60 80 Z" fill="#cfd8dc"/>
          <path d="M60 80 L40 90 Q32 95 38 102 Q45 98 50 90" stroke="#b0bec5" stroke-width="6" fill="none"/>
          <ellipse cx="105" cy="75" rx="18" ry="12" fill="#880e4f" opacity="0.9"/>
          <ellipse cx="105" cy="75" rx="12" ry="8" fill="#4a148c" opacity="0.95"/>
        `);

      // 🥚 [축산물] 달걀
      case "egg-good":
        return this.wrapSvg(`
          <defs>
            <radialGradient id="eggGradGood" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#fff3e0"/>
              <stop offset="60%" stop-color="#ffe0b2"/>
              <stop offset="100%" stop-color="#ffb74d"/>
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="128" rx="35" ry="10" fill="#e0e0e0"/>
          <!-- 까칠까칠 거칠고 광택 없는 신선란 -->
          <ellipse cx="100" cy="82" rx="36" ry="46" fill="url(#eggGradGood)"/>
          <g fill="#e65100" opacity="0.35">
            <circle cx="85" cy="60" r="1.2"/><circle cx="95" cy="55" r="1.2"/>
            <circle cx="80" cy="80" r="1.2"/><circle cx="105" cy="82" r="1.2"/>
            <circle cx="88" cy="100" r="1.2"/><circle cx="112" cy="98" r="1.2"/>
          </g>
        `);

      case "egg-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="128" rx="35" ry="10" fill="#e0e0e0"/>
          <!-- 번들번들 윤기 나는 오래된 달걀 -->
          <ellipse cx="100" cy="82" rx="36" ry="46" fill="#ffe0b2"/>
          <ellipse cx="85" cy="65" rx="9" ry="22" fill="#ffffff" opacity="0.85" transform="rotate(-25 85 65)"/>
          <ellipse cx="115" cy="75" rx="5" ry="14" fill="#ffffff" opacity="0.65"/>
        `);

      // 🐟 [수산물] 생선
      case "fish-good":
        return this.wrapSvg(`
          <ellipse cx="100" cy="128" rx="65" ry="12" fill="#e0e0e0"/>
          <path d="M35 80 C65 50 145 55 170 80 L185 65 L182 95 L170 80 C145 105 65 110 35 80 Z" fill="#78909c"/>
          <path d="M35 80 C65 50 145 55 170 80 Q100 75 35 80 Z" fill="#37474f"/>
          <!-- 선홍색 아가미 -->
          <path d="M72 68 Q82 80 75 95" stroke="#d32f2f" stroke-width="4.5" fill="none" stroke-linecap="round"/>
          <!-- 맑고 볼록한 눈알 -->
          <circle cx="55" cy="72" r="7" fill="#ffffff" stroke="#263238" stroke-width="1.5"/>
          <circle cx="55" cy="72" r="4.5" fill="#00e676"/>
          <circle cx="55" cy="72" r="3" fill="#000000"/>
          <circle cx="53" cy="70" r="1.5" fill="#ffffff"/>
        `);

      case "fish-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="128" rx="65" ry="12" fill="#e0e0e0"/>
          <path d="M35 80 C65 50 145 55 170 80 L185 65 L182 95 L170 80 C145 105 65 110 35 80 Z" fill="#90a4ae"/>
          <!-- 암갈색 아가미 -->
          <path d="M72 68 Q82 80 75 95" stroke="#3e2723" stroke-width="5" fill="none" stroke-linecap="round"/>
          <!-- 흐리고 꺼진 눈알 -->
          <circle cx="55" cy="72" r="7" fill="#bdbdbd" stroke="#546e7a" stroke-width="1.5"/>
          <circle cx="55" cy="72" r="4" fill="#e0e0e0"/>
          <ellipse cx="55" cy="72" rx="5" ry="2" fill="#757575" opacity="0.6"/>
        `);

      // 🥫 [가공식품] 통조림
      case "can-good":
        return this.wrapSvg(`
          <defs>
            <linearGradient id="canGradGood" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#b0bec5"/>
              <stop offset="50%" stop-color="#eceff1"/>
              <stop offset="100%" stop-color="#90a4ae"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="125" rx="42" ry="12" fill="#e0e0e0"/>
          <path d="M60 55 L60 110 Q100 125 140 110 L140 55 Z" fill="url(#canGradGood)"/>
          <ellipse cx="100" cy="55" rx="40" ry="14" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1.5"/>
          <path d="M60 70 L60 105 Q100 115 140 105 L140 70 Q100 80 60 70 Z" fill="#0288d1"/>
        `);

      case "can-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="125" rx="42" ry="12" fill="#e0e0e0"/>
          <path d="M60 55 L60 75 L75 88 L60 110 Q100 125 140 110 L135 80 L140 55 Z" fill="#90a4ae"/>
          <ellipse cx="65" cy="75" rx="8" ry="5" fill="#e65100" opacity="0.85"/>
          <ellipse cx="130" cy="55" rx="6" ry="4" fill="#bf360c" opacity="0.9"/>
          <path d="M62 72 L70 85" stroke="#bf360c" stroke-width="2"/>
        `);

      // 🥛 [가공식품] 우유
      case "milk-good":
        return this.wrapSvg(`
          <ellipse cx="100" cy="128" rx="40" ry="10" fill="#e0e0e0"/>
          <path d="M70 55 L85 35 L115 35 L130 55 L130 120 L70 120 Z" fill="#ffffff" stroke="#bbdefb" stroke-width="2"/>
          <rect x="71" y="70" width="58" height="30" fill="#1976d2"/>
          <circle cx="120" cy="50" r="9" fill="#e3f2fd"/>
          <text x="120" y="54" font-size="10" text-anchor="middle">❄️</text>
        `);

      case "milk-bad":
        return this.wrapSvg(`
          <ellipse cx="100" cy="128" rx="40" ry="10" fill="#e0e0e0"/>
          <path d="M60 55 Q48 85 60 120 L140 120 Q152 85 140 55 Q115 40 100 42 Q85 40 60 55 Z" fill="#fff9c4" stroke="#fbc02d" stroke-width="2"/>
          <rect x="62" y="70" width="76" height="30" fill="#ef5350" opacity="0.8"/>
        `);

      // 🧊 [냉동식품] 냉동만두
      case "frozen-good":
        return this.wrapSvg(`
          <rect x="50" y="35" width="100" height="90" rx="10" fill="#e1f5fe" stroke="#81d4fa" stroke-width="2" opacity="0.95"/>
          <g fill="#ffffff" stroke="#90caf9" stroke-width="1.5">
            <path d="M65 60 Q75 50 85 60 Q75 70 65 60 Z"/>
            <path d="M110 62 Q120 52 130 62 Q120 72 110 62 Z"/>
            <path d="M85 82 Q95 72 105 82 Q95 92 85 82 Z"/>
          </g>
          <rect x="75" y="40" width="50" height="15" rx="7" fill="#0288d1"/>
          <text x="100" y="51" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">❄️ -18℃</text>
        `);

      case "frozen-bad":
        return this.wrapSvg(`
          <rect x="50" y="35" width="100" height="90" rx="10" fill="#eceff1" stroke="#b0bec5" stroke-width="2"/>
          <path d="M65 55 Q100 45 135 60 Q145 105 130 115 Q90 125 65 110 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="2"/>
          <g fill="#ffffff" stroke="#b0bec5" stroke-width="1">
            <circle cx="80" cy="70" r="12"/>
            <circle cx="110" cy="75" r="14"/>
            <circle cx="95" cy="95" r="16"/>
          </g>
        `);

      default:
        return this.wrapSvg(`<rect width="200" height="150" fill="#f5f5f5"/>`);
    }
  },

  // 8대 정부 품질 인증 마크 고해상도 SVG 엠블럼 (깨짐 완벽 방지)
  getCertMarkSvg(certId) {
    const markStyles = {
      organic: { bg: "#2e7d32", label: "유기농", sub: "ORGANIC", dept: "농림축산식품부" },
      "pesticide-free": { bg: "#388e3c", label: "무농약", sub: "NON PESTICIDE", dept: "농림축산식품부" },
      "antibiotic-free": { bg: "#1b5e20", label: "무항생제", sub: "NON ANTIBIOTIC", dept: "농림축산식품부" },
      "organic-processed": { bg: "#43a047", label: "유기가공식품", sub: "ORGANIC PROCESSED", dept: "농림축산식품부" },
      gap: { bg: "#00796b", label: "GAP", sub: "우수관리인증", dept: "농림축산식품부" },
      "low-carbon": { bg: "#00897b", label: "저탄소", sub: "LOW CARBON", dept: "농림축산식품부" },
      "traditional-food": { bg: "#2e7d32", label: "전통식품", sub: "TRADITIONAL FOOD", dept: "농림축산식품부" },
      haccp: { bg: "#0288d1", label: "HACCP", sub: "식품안전관리인증", dept: "식품의약품안전처" }
    };

    const info = markStyles[certId] || markStyles.organic;

    if (certId === "haccp") {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" style="display:block; margin:auto;">
          <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="${info.bg}" stroke-width="5"/>
          <circle cx="50" cy="50" r="38" fill="${info.bg}"/>
          <text x="50" y="38" fill="#ffffff" font-size="10" font-family="'Noto Sans KR', sans-serif" font-weight="900" text-anchor="middle">안전관리인증</text>
          <text x="50" y="58" fill="#ffffff" font-size="17" font-family="'Noto Sans KR', sans-serif" font-weight="900" text-anchor="middle">HACCP</text>
          <text x="50" y="72" fill="#ffffff" font-size="7.5" font-family="'Noto Sans KR', sans-serif" font-weight="bold" text-anchor="middle">${info.dept}</text>
        </svg>
      `;
    }

    const isLongLabel = info.label.length >= 5;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" style="display:block; margin:auto;">
        <rect x="5" y="5" width="90" height="90" rx="14" fill="#ffffff" stroke="${info.bg}" stroke-width="4"/>
        <rect x="8" y="8" width="84" height="58" rx="10" fill="${info.bg}"/>
        <text x="50" y="${isLongLabel ? 37 : 40}" fill="#ffffff" font-size="${isLongLabel ? 12.5 : 17}" font-family="'Noto Sans KR', sans-serif" font-weight="900" text-anchor="middle">${info.label}</text>
        <text x="50" y="55" fill="#ffffff" font-size="6.5" font-family="'Noto Sans KR', sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="0.3">${info.sub}</text>
        <text x="50" y="83" fill="${info.bg}" font-size="8.5" font-family="'Noto Sans KR', sans-serif" font-weight="900" text-anchor="middle">${info.dept}</text>
      </svg>
    `;
  }
};

if (typeof window !== "undefined") {
  window.VisualAssets = VisualAssets;
}
