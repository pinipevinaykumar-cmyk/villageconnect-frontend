import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VillageBg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 700"
    preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#87CEEB" />
        <stop offset="60%" stopColor="#FDB97D" />
        <stop offset="100%" stopColor="#F4845F" />
      </linearGradient>
      <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8B7355" />
        <stop offset="100%" stopColor="#6B5335" />
      </linearGradient>
      <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5D8A3C" />
        <stop offset="100%" stopColor="#3E6B27" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Sky */}
    <rect width="1200" height="700" fill="url(#sky)" />

    {/* Sun */}
    <circle cx="980" cy="90" r="55" fill="#FFE566" opacity="0.95" />
    <circle cx="980" cy="90" r="70" fill="#FFE566" opacity="0.2" />
    <circle cx="980" cy="90" r="85" fill="#FFE566" opacity="0.1" />

    {/* Clouds */}
    <g opacity="0.9">
      <ellipse cx="120" cy="80" rx="70" ry="28" fill="white" />
      <ellipse cx="90" cy="72" rx="45" ry="32" fill="white" />
      <ellipse cx="155" cy="68" rx="40" ry="28" fill="white" />
    </g>
    <g opacity="0.85">
      <ellipse cx="420" cy="60" rx="80" ry="26" fill="white" />
      <ellipse cx="390" cy="50" rx="50" ry="30" fill="white" />
      <ellipse cx="460" cy="48" rx="45" ry="28" fill="white" />
    </g>
    <g opacity="0.8">
      <ellipse cx="700" cy="95" rx="60" ry="22" fill="white" />
      <ellipse cx="675" cy="87" rx="38" ry="26" fill="white" />
      <ellipse cx="730" cy="84" rx="35" ry="24" fill="white" />
    </g>

    {/* Birds */}
    <g fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round">
      <path d="M200 140 Q205 136 210 140" />
      <path d="M215 135 Q220 131 225 135" />
      <path d="M320 120 Q326 116 332 120" />
      <path d="M338 115 Q344 111 350 115" />
      <path d="M830 110 Q836 106 842 110" />
    </g>

    {/* Grass / ground base */}
    <rect x="0" y="460" width="1200" height="240" fill="url(#grass)" />

    {/* Road */}
    <rect x="0" y="540" width="1200" height="60" fill="url(#ground)" />
    {/* Road markings */}
    {[0,1,2,3,4,5,6,7,8,9].map(i => (
      <rect key={i} x={i * 130 + 10} y="566" width="80" height="8" rx="4" fill="#F5E642" opacity="0.8" />
    ))}
    {/* Footpath */}
    <rect x="0" y="530" width="1200" height="14" fill="#C4A882" />
    <rect x="0" y="596" width="1200" height="8" fill="#C4A882" />

    {/* ─── SHOP 1: VEGETABLE & GROCERY (leftmost) ─── */}
    {/* Building body */}
    <rect x="20" y="290" width="160" height="245" fill="#FFF3E0" rx="4" filter="url(#shadow)" />
    {/* Coloured facade stripe */}
    <rect x="20" y="290" width="160" height="20" fill="#E53935" rx="4" />
    {/* Roof / Triangle */}
    <polygon points="10,295 100,230 190,295" fill="#C62828" />
    <polygon points="10,295 100,230 190,295" fill="none" stroke="#B71C1C" strokeWidth="2" />
    {/* Chimney */}
    <rect x="130" y="240" width="18" height="30" fill="#8D6E63" />
    {/* Awning */}
    <rect x="15" y="330" width="170" height="18" fill="#F44336" rx="3" />
    <line x1="15" y1="348" x2="185" y2="348" stroke="#D32F2F" strokeWidth="1" />
    {/* Awning stripes */}
    {[0,1,2,3,4,5].map(i => (
      <line key={i} x1={15 + i * 28} y1="330" x2={15 + i * 28} y2="348" stroke="#D32F2F" strokeWidth="2" opacity="0.5" />
    ))}
    {/* Shop sign */}
    <rect x="35" y="295" width="130" height="28" fill="#2E7D32" rx="4" />
    <text x="100" y="315" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">🥦 GROCERY</text>
    {/* Windows */}
    <rect x="30" y="360" width="45" height="40" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <line x1="52" y1="360" x2="52" y2="400" stroke="#90CAF9" strokeWidth="1.5" />
    <line x1="30" y1="380" x2="75" y2="380" stroke="#90CAF9" strokeWidth="1.5" />
    <rect x="125" y="360" width="45" height="40" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <line x1="147" y1="360" x2="147" y2="400" stroke="#90CAF9" strokeWidth="1.5" />
    <line x1="125" y1="380" x2="170" y2="380" stroke="#90CAF9" strokeWidth="1.5" />
    {/* Door */}
    <rect x="75" y="415" width="50" height="80" fill="#795548" rx="4 4 0 0" />
    <circle cx="121" cy="458" r="4" fill="#FFD54F" />
    {/* Produce display shelf */}
    <rect x="20" y="495" width="160" height="22" fill="#A5D6A7" rx="2" />
    <text x="100" y="511" textAnchor="middle" fontSize="16">🍅🥦🧅🍋🥕🍆</text>

    {/* ─── SHOP 2: CHICKEN SHOP ─── */}
    <rect x="195" y="300" width="155" height="235" fill="#FFF8E1" rx="4" filter="url(#shadow)" />
    <rect x="195" y="300" width="155" height="20" fill="#6A1B9A" rx="4" />
    <polygon points="185,306 272,245 360,306" fill="#4A148C" />
    {/* Roof tiles detail */}
    {[0,1,2,3,4].map(i => (
      <ellipse key={i} cx={200 + i * 32} cy="275" rx="18" ry="8" fill="#38006b" opacity="0.5" />
    ))}
    <rect x="190" y="338" width="165" height="18" fill="#AB47BC" rx="3" />
    {[0,1,2,3,4,5].map(i => (
      <line key={i} x1={190 + i * 27} y1="338" x2={190 + i * 27} y2="356" stroke="#7B1FA2" strokeWidth="2" opacity="0.5" />
    ))}
    <rect x="210" y="305" width="125" height="28" fill="#E53935" rx="4" />
    <text x="272" y="325" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">🍗 CHICKEN SHOP</text>
    <rect x="205" y="368" width="42" height="38" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <line x1="226" y1="368" x2="226" y2="406" stroke="#90CAF9" strokeWidth="1.5" />
    <line x1="205" y1="387" x2="247" y2="387" stroke="#90CAF9" strokeWidth="1.5" />
    <rect x="303" y="368" width="42" height="38" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <line x1="324" y1="368" x2="324" y2="406" stroke="#90CAF9" strokeWidth="1.5" />
    <line x1="303" y1="387" x2="345" y2="387" stroke="#90CAF9" strokeWidth="1.5" />
    <rect x="248" y="418" width="50" height="77" fill="#8D6E63" rx="3 3 0 0" />
    <circle cx="294" cy="460" r="4" fill="#FFD54F" />
    <rect x="195" y="495" width="155" height="22" fill="#FFCCBC" rx="2" />
    <text x="272" y="511" textAnchor="middle" fontSize="15">🐔🍗🥚🥩</text>

    {/* ─── SHOP 3: PETROL BUNK ─── */}
    <rect x="364" y="310" width="175" height="225" fill="#E3F2FD" rx="4" filter="url(#shadow)" />
    {/* Flat canopy roof */}
    <rect x="354" y="300" width="195" height="22" fill="#F39C12" rx="4" />
    <rect x="354" y="318" width="195" height="8" fill="#E67E22" />
    {/* Support pillars */}
    <rect x="368" y="318" width="10" height="200" fill="#BDC3C7" />
    <rect x="525" y="318" width="10" height="200" fill="#BDC3C7" />
    {/* Bunk sign */}
    <rect x="385" y="318" width="133" height="30" fill="#1565C0" rx="4" />
    <text x="451" y="339" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">⛽ PETROL BUNK</text>
    {/* Pump units */}
    <rect x="395" y="380" width="42" height="110" fill="#2196F3" rx="6" />
    <rect x="400" y="388" width="32" height="20" fill="#64B5F6" rx="3" />
    <rect x="403" y="412" width="26" height="12" fill="#1565C0" rx="2" />
    <rect x="408" y="428" width="16" height="8" fill="#FFD54F" rx="2" />
    <path d="M437 430 Q450 420 452 440" stroke="#555" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="462" y="380" width="42" height="110" fill="#1976D2" rx="6" />
    <rect x="467" y="388" width="32" height="20" fill="#64B5F6" rx="3" />
    <rect x="470" y="412" width="26" height="12" fill="#0D47A1" rx="2" />
    <rect x="475" y="428" width="16" height="8" fill="#FFD54F" rx="2" />
    <path d="M504 430 Q517 420 519 440" stroke="#555" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Price board */}
    <rect x="390" y="348" width="120" height="28" fill="#263238" rx="3" />
    <text x="450" y="367" textAnchor="middle" fill="#FFD54F" fontSize="11" fontFamily="monospace">₹102.50/L</text>

    {/* ─── SHOP 4: VEGETABLES / SABZI ─── */}
    <rect x="553" y="295" width="160" height="240" fill="#F1F8E9" rx="4" filter="url(#shadow)" />
    <rect x="553" y="295" width="160" height="20" fill="#558B2F" rx="4" />
    <polygon points="543,300 633,235 723,300" fill="#33691E" />
    {/* Roof detail */}
    {[0,1,2,3].map(i => (
      <rect key={i} x={548 + i * 44} y="258" width="40" height="14" fill="#1B5E20" rx="7" opacity="0.5" />
    ))}
    <rect x="568" y="295" width="130" height="30" fill="#F9A825" rx="4" />
    <text x="633" y="316" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="bold" fontFamily="Arial">🥬 SABZI MART</text>
    <rect x="568" y="333" width="165" height="18" fill="#8BC34A" rx="3" />
    {[0,1,2,3,4,5].map(i => (
      <line key={i} x1={568 + i * 27} y1="333" x2={568 + i * 27} y2="351" stroke="#558B2F" strokeWidth="2" opacity="0.5" />
    ))}
    <rect x="563" y="362" width="40" height="36" fill="#B3E5FC" rx="3" stroke="#81D4FA" strokeWidth="2" />
    <line x1="583" y1="362" x2="583" y2="398" stroke="#81D4FA" strokeWidth="1.5" />
    <rect x="663" y="362" width="40" height="36" fill="#B3E5FC" rx="3" stroke="#81D4FA" strokeWidth="2" />
    <line x1="683" y1="362" x2="683" y2="398" stroke="#81D4FA" strokeWidth="1.5" />
    <rect x="608" y="410" width="50" height="75" fill="#6D4C41" rx="3 3 0 0" />
    <circle cx="654" cy="450" r="4" fill="#FFD54F" />
    {/* Outdoor stall */}
    <rect x="553" y="488" width="160" height="26" fill="#A5D6A7" rx="3" />
    <rect x="548" y="484" width="170" height="6" fill="#558B2F" rx="2" />
    <text x="633" y="506" textAnchor="middle" fontSize="16">🥕🍅🌽🥒🥦🍆</text>

    {/* ─── SHOP 5: BAKERY / HOTEL ─── */}
    <rect x="727" y="285" width="155" height="250" fill="#FFF3E0" rx="4" filter="url(#shadow)" />
    <rect x="727" y="285" width="155" height="20" fill="#BF360C" rx="4" />
    <polygon points="717,292 804,222 892,292" fill="#870000" />
    <rect x="742" y="288" width="125" height="30" fill="#FF7043" rx="4" />
    <text x="804" y="308" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">🍞 BAKERY</text>
    <rect x="722" y="323" width="165" height="18" fill="#FF8A65" rx="3" />
    {[0,1,2,3,4,5].map(i => (
      <line key={i} x1={722 + i * 27} y1="323" x2={722 + i * 27} y2="341" stroke="#BF360C" strokeWidth="2" opacity="0.5" />
    ))}
    <rect x="737" y="350" width="42" height="40" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <line x1="758" y1="350" x2="758" y2="390" stroke="#90CAF9" strokeWidth="1.5" />
    <line x1="737" y1="370" x2="779" y2="370" stroke="#90CAF9" strokeWidth="1.5" />
    <rect x="837" y="350" width="42" height="40" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <line x1="858" y1="350" x2="858" y2="390" stroke="#90CAF9" strokeWidth="1.5" />
    <line x1="837" y1="370" x2="879" y2="370" stroke="#90CAF9" strokeWidth="1.5" />
    <rect x="779" y="408" width="50" height="77" fill="#795548" rx="3 3 0 0" />
    <circle cx="825" cy="450" r="4" fill="#FFD54F" />
    {/* Display shelf */}
    <rect x="727" y="485" width="155" height="26" fill="#FFECB3" rx="3" />
    <rect x="722" y="481" width="165" height="6" fill="#FF8A65" rx="2" />
    <text x="804" y="503" textAnchor="middle" fontSize="15">🍞🥐🎂🍰🥧</text>

    {/* ─── SHOP 6: TEA STALL (right) ─── */}
    <rect x="896" y="320" width="140" height="215" fill="#FFF9C4" rx="4" filter="url(#shadow)" />
    {/* Tarp/tent roof */}
    <polygon points="882,326 966,265 1050,326" fill="#E91E63" />
    <rect x="882" y="322" width="168" height="10" fill="#C2185B" />
    {/* Hanging decorations */}
    {[0,1,2,3,4,5,6].map(i => (
      <polygon key={i} points={`${886 + i * 24},332 ${894 + i * 24},332 ${890 + i * 24},344`} fill={['#F44336','#FF9800','#FFEB3B','#4CAF50','#2196F3','#9C27B0','#F44336'][i]} />
    ))}
    <rect x="910" y="320" width="112" height="28" fill="#880E4F" rx="4" />
    <text x="966" y="339" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">☕ CHAI KADAI</text>
    <rect x="906" y="356" width="38" height="34" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <line x1="925" y1="356" x2="925" y2="390" stroke="#90CAF9" strokeWidth="1.5" />
    <rect x="1000" y="356" width="28" height="34" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <rect x="920" y="400" width="46" height="75" fill="#A1887F" rx="3 3 0 0" />
    <circle cx="962" cy="440" r="4" fill="#FFD54F" />
    {/* Bench outside */}
    <rect x="896" y="490" width="140" height="12" fill="#8D6E63" rx="3" />
    <rect x="910" y="502" width="8" height="18" fill="#6D4C41" />
    <rect x="1020" y="502" width="8" height="18" fill="#6D4C41" />
    <text x="966" y="510" textAnchor="middle" fontSize="15">☕🫖🍵</text>

    {/* ─── SHOP 7: MEDICINE / PHARMACY (far right) ─── */}
    <rect x="1048" y="300" width="145" height="235" fill="#E8F5E9" rx="4" filter="url(#shadow)" />
    <rect x="1048" y="300" width="145" height="20" fill="#00695C" rx="4" />
    <polygon points="1038,306 1120,244 1203,306" fill="#004D40" />
    <rect x="1063" y="300" width="115" height="28" fill="#00897B" rx="4" />
    <text x="1120" y="319" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">💊 MEDICAL</text>
    {/* Green cross */}
    <rect x="1106" y="244" width="28" height="10" fill="#4CAF50" />
    <rect x="1115" y="235" width="10" height="28" fill="#4CAF50" />
    <rect x="1058" y="336" width="165" height="18" fill="#80CBC4" rx="3" />
    {[0,1,2,3,4,5].map(i => (
      <line key={i} x1={1058 + i * 27} y1="336" x2={1058 + i * 27} y2="354" stroke="#00695C" strokeWidth="2" opacity="0.5" />
    ))}
    <rect x="1058" y="365" width="38" height="36" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <line x1="1077" y1="365" x2="1077" y2="401" stroke="#90CAF9" strokeWidth="1.5" />
    <rect x="1152" y="365" width="33" height="36" fill="#B3E5FC" rx="3" stroke="#90CAF9" strokeWidth="2" />
    <rect x="1073" y="412" width="48" height="78" fill="#546E7A" rx="3 3 0 0" />
    <circle cx="1117" cy="454" r="4" fill="#FFD54F" />
    <rect x="1048" y="490" width="145" height="22" fill="#B2DFDB" rx="3" />
    <text x="1120" y="507" textAnchor="middle" fontSize="13">💊💉🩺🩹</text>

    {/* ─── TREES ─── */}
    {/* Tree 1 */}
    <rect x="170" y="430" width="14" height="70" fill="#5D4037" />
    <ellipse cx="177" cy="400" rx="38" ry="48" fill="#388E3C" />
    <ellipse cx="163" cy="390" rx="28" ry="36" fill="#43A047" />
    <ellipse cx="195" cy="385" rx="25" ry="32" fill="#2E7D32" />

    {/* Tree 2 */}
    <rect x="518" y="440" width="12" height="60" fill="#5D4037" />
    <ellipse cx="524" cy="410" rx="34" ry="44" fill="#43A047" />
    <ellipse cx="510" cy="400" rx="26" ry="34" fill="#388E3C" />
    <ellipse cx="540" cy="395" rx="22" ry="30" fill="#2E7D32" />

    {/* Tree 3 */}
    <rect x="695" y="445" width="12" height="55" fill="#5D4037" />
    <ellipse cx="701" cy="415" rx="32" ry="42" fill="#388E3C" />
    <ellipse cx="688" cy="405" rx="24" ry="32" fill="#43A047" />
    <ellipse cx="718" cy="400" rx="22" ry="28" fill="#2E7D32" />

    {/* Tree 4 - big right */}
    <rect x="860" y="430" width="14" height="70" fill="#5D4037" />
    <ellipse cx="867" cy="398" rx="38" ry="48" fill="#43A047" />
    <ellipse cx="852" cy="388" rx="28" ry="36" fill="#388E3C" />
    <ellipse cx="885" cy="382" rx="25" ry="32" fill="#2E7D32" />

    {/* ─── LAMP POSTS ─── */}
    {[100, 350, 640, 1050].map((x, i) => (
      <g key={i}>
        <rect x={x - 3} y="390" width="6" height="140" fill="#546E7A" />
        <rect x={x - 25} y="385" width="50" height="8" fill="#455A64" rx="3" />
        <ellipse cx={x} cy="385" rx="12" ry="6" fill="#FFE082" opacity="0.9" />
        <ellipse cx={x} cy="385" rx="22" ry="12" fill="#FFE082" opacity="0.2" />
      </g>
    ))}

    {/* People on street */}
    {/* Person 1 */}
    <circle cx="310" cy="530" r="10" fill="#FFCC80" />
    <rect x="304" y="540" width="12" height="22" fill="#1565C0" rx="2" />
    <rect x="300" y="562" width="6" height="16" fill="#37474F" rx="2" />
    <rect x="308" y="562" width="6" height="16" fill="#37474F" rx="2" />
    {/* Person 2 */}
    <circle cx="580" cy="528" r="9" fill="#FFAB91" />
    <rect x="574" y="537" width="12" height="20" fill="#E91E63" rx="2" />
    <rect x="570" y="557" width="6" height="14" fill="#4E342E" rx="2" />
    <rect x="578" y="557" width="6" height="14" fill="#4E342E" rx="2" />
    {/* Person 3 with basket */}
    <circle cx="820" cy="526" r="9" fill="#D7CCC8" />
    <rect x="814" y="535" width="12" height="20" fill="#FF7043" rx="2" />
    <rect x="810" y="555" width="6" height="14" fill="#3E2723" rx="2" />
    <rect x="818" y="555" width="6" height="14" fill="#3E2723" rx="2" />
    <ellipse cx="828" cy="548" rx="8" ry="6" fill="#A5D6A7" stroke="#388E3C" strokeWidth="1" />

    {/* Auto-rickshaw */}
    <rect x="430" y="510" width="60" height="30" fill="#FFEB3B" rx="8 8 0 0" />
    <rect x="425" y="526" width="70" height="18" fill="#F9A825" rx="4" />
    <circle cx="440" cy="544" r="7" fill="#333" />
    <circle cx="478" cy="544" r="7" fill="#333" />
    <circle cx="440" cy="544" r="3" fill="#888" />
    <circle cx="478" cy="544" r="3" fill="#888" />
    <rect x="445" y="512" width="24" height="16" fill="#B3E5FC" rx="2" opacity="0.7" />
    <text x="458" y="536" textAnchor="middle" fontSize="8" fill="#333" fontWeight="bold">AUTO</text>

    {/* Bicycle */}
    <circle cx="1160" cy="540" r="12" fill="none" stroke="#333" strokeWidth="3" />
    <circle cx="1130" cy="540" r="12" fill="none" stroke="#333" strokeWidth="3" />
    <path d="M1130 540 L1145 520 L1160 540" stroke="#555" strokeWidth="2" fill="none" />
    <line x1="1145" y1="520" x2="1145" y2="512" stroke="#555" strokeWidth="2" />
    <rect x="1139" y="510" width="12" height="4" fill="#555" rx="2" />

    {/* Far background hills */}
    <ellipse cx="150" cy="465" rx="200" ry="80" fill="#4CAF50" opacity="0.3" />
    <ellipse cx="1050" cy="470" rx="200" ry="70" fill="#388E3C" opacity="0.25" />

    {/* Vignette overlay for depth */}
    <defs>
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="50%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
      </radialGradient>
    </defs>
    <rect width="1200" height="700" fill="url(#vignette)" />
  </svg>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'MERCHANT') return <Navigate to="/merchant/dashboard" replace />;
    return <Navigate to="/home" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <VillageBg />

      {/* Content sits in the SKY area — top 42% — so village shops fully visible below */}
      <div style={{
        position: 'relative', zIndex: 10,
        height: '42%', minHeight: 280,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '16px 16px 0',
        textAlign: 'center',
      }}>
        {/* Logo + title */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 46, filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))' }}>🏘️</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', margin: '4px 0 2px',
                       textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            VillageConnect
          </h1>
          <p style={{ color: '#FFF8E1', fontSize: 13, fontWeight: 600,
                      textShadow: '0 1px 6px rgba(0,0,0,0.45)', marginBottom: 0 }}>
            Your village. Your people. Your shops.
          </p>
        </div>

        {/* Compact pill buttons — no blocking card */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <button
            onClick={() => navigate('/register?role=CUSTOMER')}
            style={{
              background: 'white', color: '#1e3a5c',
              border: 'none', borderRadius: 50, padding: '10px 22px',
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
              boxShadow: '0 4px 16px rgba(0,0,0,0.22)', transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.28)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.22)'; }}
          >
            <span style={{ fontSize: 20 }}>👤</span> Customer
          </button>
          <button
            onClick={() => navigate('/register?role=MERCHANT')}
            style={{
              background: 'white', color: '#1e3a5c',
              border: 'none', borderRadius: 50, padding: '10px 22px',
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
              boxShadow: '0 4px 16px rgba(0,0,0,0.22)', transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.28)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.22)'; }}
          >
            <span style={{ fontSize: 20 }}>🏪</span> Shop Owner
          </button>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13,
                    textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')}
            style={{ color: '#FFE082', fontWeight: 700, textDecoration: 'underline',
                     background: 'none', border: 'none', cursor: 'pointer',
                     fontSize: 13, fontFamily: 'inherit' }}>
            Login
          </button>
        </p>
      </div>

      {/* Village scene takes up the rest — fully visible */}
      <div style={{ flex: 1 }} />

      {/* Bottom feature strip */}
      <div style={{
        position: 'relative', zIndex: 10,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
        padding: '12px 16px',
      }}>
        <div style={{ maxWidth: 420, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, textAlign: 'center', color: 'white' }}>
          {[
            { icon: '🟢', label: 'Live Open/Closed' },
            { icon: '📞', label: 'Call & WhatsApp' },
            { icon: '🗺️', label: 'Get Directions' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <span style={{ fontSize: 18 }}>{f.icon}</span>
              <span style={{ fontSize: 10, color: '#ccc' }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
