import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ─── STYLES injected once ─────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',-apple-system,sans-serif;background:#F8FAFC}

@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes countUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes wave{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.08)}}
@keyframes sunRise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}

.lc-hero-text{animation:fadeUp .8s ease forwards}
.lc-hero-sub{animation:fadeUp .8s .15s ease both}
.lc-hero-btns{animation:fadeUp .8s .3s ease both}
.lc-search-box{animation:fadeUp .8s .45s ease both}
.lc-float{animation:float 4s ease-in-out infinite}
.lc-fade-up{opacity:0;transform:translateY(30px);transition:opacity .6s ease,transform .6s ease}
.lc-fade-up.visible{opacity:1;transform:none}
.lc-nav-link{color:rgba(255,255,255,.75);font-size:14px;font-weight:600;text-decoration:none;padding:8px 4px;transition:color .2s;cursor:pointer}
.lc-nav-link:hover{color:white}
.lc-cat-card{transition:transform .25s ease,box-shadow .25s ease;cursor:pointer}
.lc-cat-card:hover{transform:translateY(-8px);box-shadow:0 24px 64px rgba(0,0,0,.15)!important}
.lc-step-card{transition:transform .2s ease}
.lc-step-card:hover{transform:translateY(-4px)}
.lc-chip{transition:all .2s ease;cursor:pointer}
.lc-chip:hover{background:rgba(30,123,59,.15)!important;border-color:#1E7B3B!important;color:#1E7B3B!important}
.lc-btn-primary{transition:all .2s ease;cursor:pointer}
.lc-btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(30,123,59,.55)!important}
.lc-btn-secondary{transition:all .2s ease;cursor:pointer}
.lc-btn-secondary:hover{background:rgba(255,255,255,.15)!important;transform:translateY(-2px)}
.lc-stat-card{transition:transform .2s ease}
.lc-stat-card:hover{transform:translateY(-4px)}
.lc-testi-card{transition:transform .2s ease}
.lc-testi-card:hover{transform:translateY(-4px)}
.search-suggestion{transition:background .15s ease;cursor:pointer}
.search-suggestion:hover{background:#F0FDF4!important}
.lc-hamburger{display:none}
@media(max-width:768px){
  .lc-nav-links{display:none!important}
  .lc-nav-actions{display:none!important}
  .lc-hamburger{display:flex}
  .hero-h1{font-size:36px!important;line-height:1.15!important}
  .hero-sub{font-size:15px!important}
  .cat-grid{grid-template-columns:repeat(2,1fr)!important}
  .steps-grid{grid-template-columns:1fr!important}
  .stats-grid{grid-template-columns:repeat(2,1fr)!important}
  .why-grid{grid-template-columns:1fr!important}
  .testi-grid{grid-template-columns:1fr!important}
  .footer-grid{grid-template-columns:1fr!important}
  .search-section{padding:0 16px!important}
}
`;

/* ─── SVG LOGO ──────────────────────────────────────────────────── */
const Logo = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 62 74" fill="none">
    <path d="M31 2C16.6 2 5 13.6 5 28C5 46.5 31 72 31 72C31 72 57 46.5 57 28C57 13.6 45.4 2 31 2Z" fill="rgba(255,255,255,0.22)"/>
    <circle cx="31" cy="28" r="21" fill="rgba(255,255,255,0.18)"/>
    <polygon points="31,14 18,23 44,23" fill="white"/>
    <rect x="18" y="23" width="26" height="20" rx="1" fill="white"/>
    <rect x="26" y="31" width="10" height="12" rx="1" fill="#1E7B3B"/>
    <rect x="19" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
    <rect x="36" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
  </svg>
);

/* ─── HERO LANDSCAPE SVG ────────────────────────────────────────── */
const HeroLandscape = () => (
  <svg viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0D1F3C"/>
        <stop offset="40%" stopColor="#1a3a5c"/>
        <stop offset="70%" stopColor="#C06830"/>
        <stop offset="85%" stopColor="#E8923A"/>
        <stop offset="100%" stopColor="#F5C47A"/>
      </linearGradient>
      <radialGradient id="sun" cx="50%" cy="100%" r="60%">
        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9"/>
        <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="field1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2D6A1F"/>
        <stop offset="100%" stopColor="#1a4f12"/>
      </linearGradient>
      <linearGradient id="field2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3A7D2A"/>
        <stop offset="100%" stopColor="#255018"/>
      </linearGradient>
      <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8B7355"/>
        <stop offset="100%" stopColor="#6B5A42"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* Sky */}
    <rect width="1440" height="600" fill="url(#sky)"/>

    {/* Sun glow */}
    <ellipse cx="720" cy="410" rx="500" ry="200" fill="url(#sun)"/>
    <circle cx="720" cy="405" r="38" fill="#FBBF24" opacity=".95" filter="url(#glow)"/>
    <circle cx="720" cy="405" r="28" fill="#FDE68A"/>
    <circle cx="720" cy="405" r="18" fill="white" opacity=".9"/>

    {/* Stars */}
    {[120,280,450,650,900,1100,1300,1380,200,800].map((x,i) => (
      <circle key={i} cx={x} cy={20+i*18} r="1.5" fill="white" opacity={0.4+i*0.04}/>
    ))}

    {/* Distant hills */}
    <ellipse cx="200" cy="410" rx="280" ry="90" fill="#1E4D6B" opacity=".6"/>
    <ellipse cx="600" cy="420" rx="320" ry="80" fill="#1a4260" opacity=".5"/>
    <ellipse cx="1000" cy="415" rx="300" ry="85" fill="#1E4D6B" opacity=".55"/>
    <ellipse cx="1350" cy="425" rx="200" ry="70" fill="#1a4260" opacity=".5"/>

    {/* Temple silhouette (distant) */}
    <rect x="670" y="310" width="100" height="100" fill="#12345A" opacity=".7"/>
    <polygon points="720,270 700,310 740,310" fill="#12345A" opacity=".7"/>
    <rect x="700" y="285" width="40" height="28" fill="#12345A" opacity=".7"/>
    <polygon points="720,265 708,285 732,285" fill="#12345A" opacity=".7"/>
    <rect x="664" y="318" width="16" height="20" fill="#12345A" opacity=".65"/>
    <rect x="760" y="318" width="16" height="20" fill="#12345A" opacity=".65"/>
    <polygon points="672,318 664,308 680,308" fill="#12345A" opacity=".65"/>
    <polygon points="768,318 760,308 776,308" fill="#12345A" opacity=".65"/>

    {/* Far-ground rice fields */}
    <rect x="0" y="400" width="1440" height="80" fill="#2D5A1B" opacity=".9"/>
    <path d="M0,430 Q180,415 360,428 Q540,440 720,425 Q900,412 1080,428 Q1260,443 1440,430 L1440,480 L0,480Z" fill="#336621"/>

    {/* Field rows (rice paddy lines) */}
    {[0,1,2,3,4].map(i => (
      <line key={i} x1="0" y1={440+i*8} x2="1440" y2={442+i*8} stroke="#2A5C17" strokeWidth="2" opacity=".4"/>
    ))}

    {/* Main ground */}
    <rect x="0" y="470" width="1440" height="130" fill="url(#field1)"/>
    <path d="M0,470 Q360,460 720,468 Q1080,476 1440,470 L1440,600 L0,600Z" fill="#2D6A1F"/>

    {/* Road */}
    <path d="M400,600 L550,470 L890,470 L1040,600Z" fill="url(#road)"/>
    <path d="M700,600 L718,470 L722,470 L740,600Z" fill="#C4AA8A" opacity=".5"/>
    {[0,1,2,3].map(i => (
      <rect key={i} x="716" y={480+i*32} width="8" height="18" rx="2" fill="#F5DBA0" opacity=".6"/>
    ))}

    {/* Coconut palms */}
    {/* Palm 1 */}
    <rect x="148" y="360" width="8" height="120" rx="3" fill="#5D3A1A"/>
    <ellipse cx="152" cy="358" rx="35" ry="18" fill="#2D6A1F" opacity=".9" transform="rotate(-15,152,358)"/>
    <ellipse cx="152" cy="355" rx="32" ry="15" fill="#3A8A26" opacity=".85" transform="rotate(10,152,355)"/>
    <ellipse cx="140" cy="348" rx="28" ry="12" fill="#2D6A1F" transform="rotate(-30,140,348)"/>
    <ellipse cx="168" cy="350" rx="26" ry="11" fill="#3A8A26" transform="rotate(25,168,350)"/>
    <circle cx="152" cy="360" r="5" fill="#8B5E2A"/>

    {/* Palm 2 */}
    <rect x="1260" y="370" width="7" height="110" rx="3" fill="#5D3A1A"/>
    <ellipse cx="1263" cy="368" rx="32" ry="16" fill="#2D6A1F" opacity=".9" transform="rotate(-12,1263,368)"/>
    <ellipse cx="1263" cy="365" rx="30" ry="14" fill="#3A8A26" opacity=".85" transform="rotate(8,1263,365)"/>
    <ellipse cx="1250" cy="358" rx="26" ry="11" fill="#2D6A1F" transform="rotate(-28,1250,358)"/>
    <ellipse cx="1278" cy="360" rx="24" ry="10" fill="#3A8A26" transform="rotate(22,1278,360)"/>
    <circle cx="1263" cy="370" r="5" fill="#8B5E2A"/>

    {/* Palm 3 */}
    <rect x="300" y="390" width="6" height="90" rx="2" fill="#5D3A1A"/>
    <ellipse cx="303" cy="388" rx="26" ry="13" fill="#2D6A1F" opacity=".9" transform="rotate(-10,303,388)"/>
    <ellipse cx="303" cy="386" rx="24" ry="12" fill="#3A8A26" transform="rotate(12,303,386)"/>

    {/* Grocery / General store */}
    <rect x="80" y="410" width="120" height="80" rx="4" fill="#F5F0E8"/>
    <rect x="80" y="410" width="120" height="22" rx="4" fill="#1E7B3B"/>
    <text x="140" y="425" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">GENERAL STORE</text>
    <rect x="92" y="440" width="30" height="50" rx="2" fill="#A5D6A7"/>
    <rect x="128" y="445" width="28" height="45" rx="2" fill="#90CAA0"/>
    <rect x="162" y="438" width="26" height="52" rx="2" fill="#B8DEB9"/>
    <rect x="94" y="432" width="112" height="6" fill="#D4EBD4" opacity=".7"/>

    {/* Healthcare clinic */}
    <rect x="230" y="405" width="110" height="85" rx="4" fill="white"/>
    <rect x="230" y="405" width="110" height="22" rx="4" fill="#1E6EBF"/>
    <text x="285" y="420" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">HEALTH CLINIC</text>
    <rect x="278" y="435" width="16" height="4" fill="#E53E3E"/>
    <rect x="283" y="430" width="4" height="14" fill="#E53E3E"/>
    <rect x="245" y="440" width="22" height="50" rx="2" fill="#BEE3F8"/>
    <rect x="273" y="450" width="25" height="40" rx="2" fill="#90CDF4"/>
    <rect x="306" y="445" width="22" height="45" rx="2" fill="#BEE3F8"/>

    {/* School building */}
    <rect x="1080" y="400" width="140" height="90" rx="4" fill="#FFFBF0"/>
    <rect x="1080" y="400" width="140" height="22" rx="4" fill="#D97706"/>
    <text x="1150" y="415" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">GOVT SCHOOL</text>
    <rect x="1090" y="435" width="20" height="30" rx="2" fill="#FED7AA"/>
    <rect x="1116" y="435" width="20" height="30" rx="2" fill="#FED7AA"/>
    <rect x="1142" y="435" width="20" height="30" rx="2" fill="#FED7AA"/>
    <rect x="1168" y="435" width="40" height="55" rx="2" fill="#FDBA74"/>
    <rect x="1178" y="450" width="20" height="45" rx="2" fill="#1E7B3B"/>
    <polygon points="1150,398 1095,410 1205,410" fill="#B45309" opacity=".7"/>

    {/* Market stalls (right side) */}
    <rect x="1290" y="430" width="80" height="60" rx="3" fill="#FFF9F0"/>
    <rect x="1290" y="430" width="80" height="16" rx="3" fill="#E53E3E"/>
    <text x="1330" y="442" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">MARKET</text>
    <path d="M1285,430 L1375,430" stroke="#E53E3E" strokeWidth="2"/>
    <path d="M1290,430 L1290,422 L1310,422 L1310,430" fill="#FECACA"/>
    <path d="M1315,430 L1315,422 L1335,422 L1335,430" fill="#FED7AA"/>
    <path d="M1340,430 L1340,422 L1360,422 L1360,430" fill="#BBF7D0"/>

    {/* People silhouettes */}
    <circle cx="500" cy="470" r="6" fill="#2C3E50" opacity=".7"/>
    <rect x="497" y="476" width="6" height="14" rx="2" fill="#2C3E50" opacity=".7"/>
    <rect x="492" y="480" width="5" height="8" rx="1" fill="#2C3E50" opacity=".65"/>
    <rect x="503" y="480" width="5" height="8" rx="1" fill="#2C3E50" opacity=".65"/>

    <circle cx="540" cy="472" r="5" fill="#3D2B1F" opacity=".7"/>
    <rect x="537" y="477" width="5" height="12" rx="2" fill="#3D2B1F" opacity=".7"/>

    <circle cx="920" cy="468" r="6" fill="#2C3E50" opacity=".7"/>
    <rect x="917" y="474" width="6" height="14" rx="2" fill="#2C3E50" opacity=".7"/>

    <circle cx="958" cy="472" r="5" fill="#3D2B1F" opacity=".65"/>
    <rect x="955" y="477" width="5" height="12" rx="2" fill="#3D2B1F" opacity=".65"/>

    {/* Bullock cart */}
    <ellipse cx="810" cy="488" rx="12" ry="12" fill="none" stroke="#5D3A1A" strokeWidth="3"/>
    <ellipse cx="840" cy="488" rx="12" ry="12" fill="none" stroke="#5D3A1A" strokeWidth="3"/>
    <rect x="810" y="476" width="50" height="12" rx="2" fill="#8B6914"/>
    <rect x="860" y="478" width="30" height="4" rx="1" fill="#5D3A1A"/>

    {/* Birds */}
    <path d="M350,180 Q358,174 366,180" stroke="white" strokeWidth="1.5" fill="none" opacity=".6"/>
    <path d="M380,165 Q388,159 396,165" stroke="white" strokeWidth="1.5" fill="none" opacity=".5"/>
    <path d="M1050,190 Q1058,184 1066,190" stroke="white" strokeWidth="1.5" fill="none" opacity=".55"/>
    <path d="M1080,175 Q1088,169 1096,175" stroke="white" strokeWidth="1.5" fill="none" opacity=".5"/>
  </svg>
);

/* ─── CATEGORY ICONS ────────────────────────────────────────────── */
const icons = {
  healthcare: (
    <svg viewBox="0 0 56 56" width="52" height="52">
      <circle cx="28" cy="28" r="28" fill="#FEE2E2"/>
      <rect x="22" y="14" width="12" height="28" rx="4" fill="#EF4444"/>
      <rect x="14" y="22" width="28" height="12" rx="4" fill="#EF4444"/>
    </svg>
  ),
  business: (
    <svg viewBox="0 0 56 56" width="52" height="52">
      <circle cx="28" cy="28" r="28" fill="#DCFCE7"/>
      <rect x="12" y="28" width="32" height="20" rx="3" fill="#16A34A"/>
      <rect x="18" y="20" width="20" height="12" rx="2" fill="#22C55E"/>
      <rect x="22" y="36" width="12" height="12" rx="2" fill="#BBF7D0"/>
      <polygon points="28,12 12,26 44,26" fill="#15803D"/>
    </svg>
  ),
  services: (
    <svg viewBox="0 0 56 56" width="52" height="52">
      <circle cx="28" cy="28" r="28" fill="#FEF3C7"/>
      <circle cx="28" cy="28" r="10" fill="none" stroke="#D97706" strokeWidth="4"/>
      <rect x="26" y="10" width="4" height="10" rx="2" fill="#D97706"/>
      <rect x="26" y="36" width="4" height="10" rx="2" fill="#D97706"/>
      <rect x="10" y="26" width="10" height="4" rx="2" fill="#D97706"/>
      <rect x="36" y="26" width="10" height="4" rx="2" fill="#D97706"/>
    </svg>
  ),
  community: (
    <svg viewBox="0 0 56 56" width="52" height="52">
      <circle cx="28" cy="28" r="28" fill="#EDE9FE"/>
      <circle cx="20" cy="22" r="7" fill="#7C3AED"/>
      <circle cx="36" cy="22" r="7" fill="#7C3AED"/>
      <path d="M8,42 Q20,34 32,42" stroke="#7C3AED" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M24,42 Q36,34 48,42" stroke="#7C3AED" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  emergency: (
    <svg viewBox="0 0 56 56" width="52" height="52">
      <circle cx="28" cy="28" r="28" fill="#FEE2E2"/>
      <polygon points="28,12 8,44 48,44" fill="#EF4444"/>
      <rect x="26" y="24" width="4" height="11" rx="2" fill="white"/>
      <circle cx="28" cy="39" r="2.5" fill="white"/>
    </svg>
  ),
  education: (
    <svg viewBox="0 0 56 56" width="52" height="52">
      <circle cx="28" cy="28" r="28" fill="#DBEAFE"/>
      <polygon points="28,14 8,26 48,26" fill="#2563EB"/>
      <rect x="14" y="26" width="28" height="20" rx="3" fill="#3B82F6"/>
      <rect x="22" y="34" width="12" height="12" rx="2" fill="#BFDBFE"/>
      <rect x="24" y="22" width="8" height="6" fill="#1D4ED8" opacity=".5"/>
    </svg>
  ),
};

/* ─── CATEGORIES DATA ───────────────────────────────────────────── */
const CATEGORIES = [
  { key:'healthcare', label:'Healthcare', sub:'Doctors, hospitals, clinics & pharmacies', color:'#FEE2E2', accent:'#EF4444', path:'/healthcare' },
  { key:'business', label:'Local Businesses', sub:'Shops, stores, restaurants & supermarkets', color:'#DCFCE7', accent:'#16A34A', path:'/shops' },
  { key:'services', label:'Local Services', sub:'Electricians, plumbers & home services', color:'#FEF3C7', accent:'#D97706', path:'/services' },
  { key:'community', label:'Community', sub:'Announcements, updates & local news', color:'#EDE9FE', accent:'#7C3AED', path:'/community' },
  { key:'emergency', label:'Emergency', sub:'Ambulance, police & fire station contacts', color:'#FEE2E2', accent:'#DC2626', path:'/services' },
  { key:'education', label:'Education', sub:'Schools, colleges & training institutes', color:'#DBEAFE', accent:'#2563EB', path:'/services' },
];

const STEPS = [
  { n:'01', icon:'📍', title:'Choose Your Location', desc:'Select your District → Mandal → Village to personalise your feed.' },
  { n:'02', icon:'🔍', title:'Discover Nearby Services', desc:'Search doctors, businesses, shops and local professionals near you.' },
  { n:'03', icon:'📞', title:'Connect Instantly', desc:'Call, WhatsApp or get directions to any business in seconds.' },
  { n:'04', icon:'🔔', title:'Stay Connected', desc:'Receive local announcements, alerts and community updates.' },
];

const STATS = [
  { value:'10,000+', label:'Local Businesses', icon:'🏪' },
  { value:'500+', label:'Healthcare Providers', icon:'🏥' },
  { value:'100+', label:'Communities', icon:'🏘️' },
  { value:'50+', label:'Service Categories', icon:'⚡' },
];

const TESTIMONIALS = [
  { text:'Local Connect helped me find trusted doctors and medical shops in my village within minutes. This is exactly what we needed.', name:'Ramesh Babu', role:'Customer, Guntur', initials:'RB', color:'#1E7B3B' },
  { text:'My grocery shop now gets customers from the entire mandal! Managing orders and updating my hours is so simple.', name:'Lakshmi Devi', role:'Merchant, Vijayawada', initials:'LD', color:'#7C3AED' },
  { text:'Finally everything local is in one place. Found a plumber, electrician and a great restaurant all in 10 minutes.', name:'Suresh Kumar', role:'Customer, Kakinada', initials:'SK', color:'#D97706' },
];

const SUGGESTIONS = ['Doctor','Hospital','Mechanic','Grocery Shop','Electrician','Restaurant','Medical Store','Plumber'];

/* ─── FADE-IN HOOK ──────────────────────────────────────────────── */
function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll('.lc-fade-up');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────── */
const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchVal, setSearchVal] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useFadeIn();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (user) {
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'MERCHANT') return <Navigate to="/merchant/dashboard" replace />;
    return <Navigate to="/home" replace />;
  }

  const filteredSuggestions = searchVal
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(searchVal.toLowerCase()))
    : SUGGESTIONS;

  return (
    <div style={{ fontFamily:"'Inter',-apple-system,sans-serif", background:'#F8FAFC', overflowX:'hidden' }}>
      <style>{CSS}</style>

      {/* ── STICKY NAV ── */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        background: scrolled ? 'rgba(10,25,48,.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,.1)' : 'none',
        transition:'all .3s ease',
        padding:'0 24px',
      }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:68 }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
            <Logo size={38}/>
            <div>
              <div style={{ fontSize:15, fontWeight:900, color:'white', letterSpacing:'.06em' }}>LOCAL CONNECT</div>
              <div style={{ fontSize:9, color:'rgba(255,255,255,.5)', fontWeight:600, letterSpacing:'.08em', marginTop:-1 }}>EVERYTHING AROUND YOU</div>
            </div>
          </div>

          {/* Links */}
          <div className="lc-nav-links" style={{ display:'flex', gap:28 }}>
            {['Home','Discover','Businesses','Healthcare','Community','Contact'].map(l => (
              <span key={l} className="lc-nav-link">{l}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="lc-nav-actions" style={{ display:'flex', gap:10 }}>
            <button onClick={() => navigate('/login')} style={{
              background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)',
              color:'white', padding:'8px 18px', borderRadius:10, fontSize:13,
              fontWeight:700, cursor:'pointer', fontFamily:'inherit',
              transition:'all .2s',
            }}
            onMouseEnter={e => e.target.style.background='rgba(255,255,255,.18)'}
            onMouseLeave={e => e.target.style.background='rgba(255,255,255,.1)'}>
              Login
            </button>
            <button onClick={() => navigate('/register')} style={{
              background:'linear-gradient(135deg,#1E7B3B,#2F855A)', border:'none',
              color:'white', padding:'8px 20px', borderRadius:10, fontSize:13,
              fontWeight:700, cursor:'pointer', fontFamily:'inherit',
              boxShadow:'0 4px 16px rgba(30,123,59,.4)',
              transition:'all .2s',
            }}
            onMouseEnter={e => { e.target.style.transform='translateY(-1px)'; e.target.style.boxShadow='0 6px 20px rgba(30,123,59,.5)'; }}
            onMouseLeave={e => { e.target.style.transform='none'; e.target.style.boxShadow='0 4px 16px rgba(30,123,59,.4)'; }}>
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="lc-hamburger" style={{ background:'none', border:'none', cursor:'pointer', display:'none' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect y="4" width="24" height="2.5" rx="1.25" fill="white"/>
              <rect y="11" width="24" height="2.5" rx="1.25" fill="white"/>
              <rect y="18" width="24" height="2.5" rx="1.25" fill="white"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position:'relative', height:'100vh', minHeight:600, overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        {/* Landscape */}
        <HeroLandscape/>

        {/* Dark overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(8,18,35,.62) 0%,rgba(8,18,35,.48) 40%,rgba(8,18,35,.72) 100%)', zIndex:1 }}/>

        {/* Content */}
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 20px', maxWidth:760, width:'100%' }}>

          {/* Badge */}
          <div className="lc-hero-text" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(30,123,59,.25)', border:'1px solid rgba(30,123,59,.5)', borderRadius:100, padding:'7px 18px', marginBottom:22, backdropFilter:'blur(12px)' }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#4ADE80', animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:12, color:'#A7F3D0', fontWeight:700, letterSpacing:'.06em' }}>NOW LIVE IN ANDHRA PRADESH</span>
          </div>

          {/* H1 */}
          <h1 className="lc-hero-text hero-h1" style={{ fontSize:58, fontWeight:900, color:'white', lineHeight:1.1, letterSpacing:'-1.5px', marginBottom:20 }}>
            Everything Around You,<br/>
            <span style={{ background:'linear-gradient(135deg,#4ADE80,#F59E0B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>In One Place</span>
          </h1>

          {/* Sub */}
          <p className="lc-hero-sub hero-sub" style={{ fontSize:18, color:'rgba(255,255,255,.75)', lineHeight:1.7, marginBottom:14, maxWidth:580, margin:'0 auto 14px' }}>
            Discover trusted businesses, healthcare services, local professionals, and everyday essentials in your area.
          </p>
          <p className="lc-hero-sub" style={{ fontSize:13, color:'rgba(255,255,255,.45)', marginBottom:36 }}>
            From villages and mandals to towns and cities — connecting communities across Andhra Pradesh.
          </p>

          {/* CTAs */}
          <div className="lc-hero-btns" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:28 }}>
            <button className="lc-btn-primary" onClick={() => navigate('/register')} style={{
              padding:'15px 32px', borderRadius:14, border:'none',
              background:'linear-gradient(135deg,#1E7B3B,#2F855A)',
              color:'white', fontSize:16, fontWeight:800,
              boxShadow:'0 8px 32px rgba(30,123,59,.5)',
              fontFamily:'inherit', letterSpacing:'-0.2px',
            }}>
              Get Started — It's Free →
            </button>
            <button className="lc-btn-secondary" onClick={() => document.getElementById('categories')?.scrollIntoView({behavior:'smooth'})} style={{
              padding:'15px 28px', borderRadius:14,
              border:'1.5px solid rgba(255,255,255,.3)',
              background:'rgba(255,255,255,.08)',
              color:'white', fontSize:15, fontWeight:700,
              backdropFilter:'blur(12px)', fontFamily:'inherit',
            }}>
              Explore Nearby Services
            </button>
          </div>

          {/* Location card */}
          <div className="lc-hero-btns lc-float" style={{
            display:'inline-flex', alignItems:'center', gap:12,
            background:'rgba(255,255,255,.1)', backdropFilter:'blur(16px)',
            border:'1px solid rgba(255,255,255,.2)', borderRadius:16,
            padding:'12px 20px',
          }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'#1E7B3B', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>📍</div>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.5)', fontWeight:600, letterSpacing:'.04em' }}>YOUR LOCATION</div>
              <div style={{ fontSize:14, color:'white', fontWeight:700 }}>Gudivada, Krishna, AP</div>
            </div>
            <button onClick={() => navigate('/location')} style={{ background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.2)', borderRadius:8, padding:'5px 12px', color:'white', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Change</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:10, color:'rgba(255,255,255,.4)', fontWeight:600, letterSpacing:'.08em' }}>SCROLL TO EXPLORE</span>
          <div style={{ width:1.5, height:36, background:'linear-gradient(to bottom,rgba(255,255,255,.5),transparent)', animation:'wave 1.5s ease-in-out infinite' }}/>
        </div>
      </section>

      {/* ── SEARCH ── */}
      <section className="search-section" style={{ background:'white', padding:'0 24px', position:'relative', zIndex:10, boxShadow:'0 8px 40px rgba(0,0,0,.1)' }}>
        <div style={{ maxWidth:760, margin:'0 auto', paddingBottom:32, paddingTop:32 }}>
          <div className="lc-search-box" style={{ position:'relative' }}>
            <div style={{ display:'flex', alignItems:'center', background:searchFocus?'white':'#F8FAFC', border:`2px solid ${searchFocus?'#1E7B3B':'#E2E8F0'}`, borderRadius:18, padding:'14px 20px', gap:12, transition:'all .25s', boxShadow:searchFocus?'0 0 0 4px rgba(30,123,59,.12)':'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#94A3B8" strokeWidth="2"/><path d="M20 20l-3-3" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/></svg>
              <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setTimeout(() => setSearchFocus(false), 150)}
                placeholder="What are you looking for today?"
                style={{ flex:1, border:'none', outline:'none', fontSize:16, color:'#0F172A', background:'transparent', fontFamily:'inherit', fontWeight:500 }}
              />
              <button onClick={() => navigate('/discover')} style={{ background:'linear-gradient(135deg,#1E7B3B,#2F855A)', border:'none', borderRadius:12, padding:'9px 20px', color:'white', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                Search
              </button>
            </div>

            {/* Dropdown */}
            {searchFocus && (
              <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, right:0, background:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,.15)', border:'1px solid #E2E8F0', overflow:'hidden', zIndex:50 }}>
                <div style={{ padding:'10px 16px 6px', fontSize:10, color:'#94A3B8', fontWeight:700, letterSpacing:'.06em' }}>POPULAR SEARCHES</div>
                {filteredSuggestions.slice(0, 6).map(s => (
                  <div key={s} className="search-suggestion" onClick={() => { setSearchVal(s); navigate('/discover'); }} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 16px', borderRadius:0 }}>
                    <span style={{ fontSize:13 }}>🔍</span>
                    <span style={{ fontSize:14, color:'#0F172A', fontWeight:500 }}>{s}</span>
                    <span style={{ marginLeft:'auto', fontSize:11, color:'#94A3B8' }}>near you</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Suggestion chips */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:16 }}>
            {SUGGESTIONS.slice(0, 6).map(s => (
              <span key={s} className="lc-chip" onClick={() => navigate('/discover')} style={{ background:'#F1F5F9', border:'1.5px solid #E2E8F0', borderRadius:100, padding:'6px 14px', fontSize:12, fontWeight:600, color:'#475569', cursor:'pointer' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" style={{ padding:'80px 24px', background:'#F8FAFC' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="lc-fade-up" style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'inline-block', background:'#DCFCE7', borderRadius:100, padding:'5px 16px', fontSize:11, fontWeight:700, color:'#16A34A', letterSpacing:'.06em', marginBottom:14 }}>EXPLORE BY CATEGORY</div>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0F172A', letterSpacing:'-1px', lineHeight:1.15, marginBottom:14 }}>Everything in Your Community</h2>
            <p style={{ fontSize:16, color:'#64748B', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>From healthcare and businesses to emergency services and education — all in one platform.</p>
          </div>
          <div className="cat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {CATEGORIES.map((cat, i) => (
              <div key={cat.key} className="lc-fade-up lc-cat-card" onClick={() => navigate(cat.path)} style={{
                background:'white', borderRadius:22, padding:'28px 24px',
                boxShadow:'0 4px 24px rgba(0,0,0,.07)',
                border:'1.5px solid #F1F5F9',
                animationDelay:`${i*0.07}s`,
              }}>
                <div style={{ marginBottom:16 }}>{icons[cat.key]}</div>
                <div style={{ fontSize:18, fontWeight:800, color:'#0F172A', marginBottom:8 }}>{cat.label}</div>
                <div style={{ fontSize:13, color:'#64748B', lineHeight:1.6, marginBottom:16 }}>{cat.sub}</div>
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:700, color:cat.accent }}>
                  Explore {cat.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke={cat.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:'80px 24px', background:'white' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="lc-fade-up" style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'inline-block', background:'#EDE9FE', borderRadius:100, padding:'5px 16px', fontSize:11, fontWeight:700, color:'#7C3AED', letterSpacing:'.06em', marginBottom:14 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0F172A', letterSpacing:'-1px', lineHeight:1.15, marginBottom:12 }}>Simple as 1, 2, 3, 4</h2>
            <p style={{ fontSize:16, color:'#64748B', maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>Get connected to your community in four simple steps.</p>
          </div>
          <div className="steps-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {STEPS.map((s, i) => (
              <div key={s.n} className="lc-fade-up lc-step-card" style={{ position:'relative', textAlign:'center', padding:'32px 20px 28px', background:'#F8FAFC', borderRadius:22, border:'1.5px solid #E2E8F0' }}>
                {/* Connector line */}
                {i < 3 && <div style={{ position:'absolute', top:48, right:-12, width:24, height:2, background:'linear-gradient(to right,#1E7B3B,#A5D6A7)', zIndex:1, display:'none' }}/>}
                <div style={{ width:52, height:52, borderRadius:16, background:'linear-gradient(135deg,#1E7B3B,#2F855A)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, margin:'0 auto 16px', boxShadow:'0 8px 24px rgba(30,123,59,.3)' }}>
                  {s.icon}
                </div>
                <div style={{ fontSize:11, fontWeight:800, color:'#1E7B3B', letterSpacing:'.08em', marginBottom:8 }}>STEP {s.n}</div>
                <div style={{ fontSize:16, fontWeight:800, color:'#0F172A', marginBottom:10, lineHeight:1.3 }}>{s.title}</div>
                <div style={{ fontSize:13, color:'#64748B', lineHeight:1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding:'72px 24px', background:'linear-gradient(135deg,#0A1929 0%,#0F3A20 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(30,123,59,.3) 0%,transparent 70%)' }}/>
        <div style={{ position:'absolute', bottom:-60, left:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,.12) 0%,transparent 70%)' }}/>
        <div style={{ maxWidth:1000, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="lc-fade-up" style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontSize:34, fontWeight:900, color:'white', letterSpacing:'-0.8px', marginBottom:10 }}>Growing Every Day</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,.5)', maxWidth:400, margin:'0 auto' }}>Trusted by thousands of businesses and families across Andhra Pradesh.</p>
          </div>
          <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
            {STATS.map(stat => (
              <div key={stat.label} className="lc-fade-up lc-stat-card" style={{ background:'rgba(255,255,255,.06)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,.1)', borderRadius:20, padding:'32px 20px', textAlign:'center' }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{stat.icon}</div>
                <div style={{ fontSize:32, fontWeight:900, color:'white', letterSpacing:'-1px', marginBottom:6 }}>{stat.value}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.5)', fontWeight:600 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY LOCAL CONNECT ── */}
      <section style={{ padding:'80px 24px', background:'#F8FAFC' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="lc-fade-up" style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'inline-block', background:'#FEF3C7', borderRadius:100, padding:'5px 16px', fontSize:11, fontWeight:700, color:'#D97706', letterSpacing:'.06em', marginBottom:14 }}>WHY CHOOSE US</div>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0F172A', letterSpacing:'-1px', lineHeight:1.15, marginBottom:12 }}>Built for Real Communities</h2>
            <p style={{ fontSize:16, color:'#64748B', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>We understand local life. Everything we build is designed to help communities thrive.</p>
          </div>
          <div className="why-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {[
              { icon:'🎯', title:'Find Nearby Services', desc:'Discover every business, doctor, and service provider in your village, mandal and district — filtered to what is actually near you.', color:'#DCFCE7', accent:'#16A34A' },
              { icon:'🤝', title:'Connect with Trusted Merchants', desc:'Every listing is verified. Call or WhatsApp any merchant directly — no middlemen, no hidden fees, just direct connections.', color:'#EDE9FE', accent:'#7C3AED' },
              { icon:'📣', title:'Stay Updated', desc:'Get community announcements, emergency alerts, local news and important updates from your district and mandal.', color:'#FEF3C7', accent:'#D97706' },
            ].map(card => (
              <div key={card.title} className="lc-fade-up" style={{ background:'white', borderRadius:24, padding:'36px 28px', boxShadow:'0 4px 28px rgba(0,0,0,.07)', border:'1.5px solid #F1F5F9' }}>
                <div style={{ width:60, height:60, borderRadius:18, background:card.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, marginBottom:20 }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize:20, fontWeight:800, color:'#0F172A', marginBottom:12, letterSpacing:'-0.4px' }}>{card.title}</h3>
                <p style={{ fontSize:14, color:'#64748B', lineHeight:1.75 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY BANNER ── */}
      <section style={{ padding:'72px 24px', background:'linear-gradient(135deg,#1E7B3B 0%,#2F855A 60%,#1a5e30 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:240, height:240, borderRadius:'50%', background:'rgba(255,255,255,.06)' }}/>
        <div style={{ position:'absolute', bottom:-40, left:80, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,.05)' }}/>
        <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ fontSize:40, marginBottom:16 }}>🏘️</div>
          <h2 className="lc-fade-up" style={{ fontSize:36, fontWeight:900, color:'white', letterSpacing:'-0.8px', lineHeight:1.2, marginBottom:18 }}>
            Built for Local Communities
          </h2>
          <p className="lc-fade-up" style={{ fontSize:16, color:'rgba(255,255,255,.8)', lineHeight:1.75, marginBottom:32, maxWidth:580, margin:'0 auto 32px' }}>
            Whether you're searching for a doctor, finding a trusted local business, or staying updated with community information — Local Connect brings everything together in one simple platform.
          </p>
          <div className="lc-fade-up" style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' }}>
            {['Families','Businesses','Healthcare','Markets','Schools','Services'].map(t => (
              <span key={t} style={{ background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.2)', borderRadius:100, padding:'8px 18px', fontSize:13, fontWeight:600, color:'white', backdropFilter:'blur(8px)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:'80px 24px', background:'white' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="lc-fade-up" style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'inline-block', background:'#DBEAFE', borderRadius:100, padding:'5px 16px', fontSize:11, fontWeight:700, color:'#2563EB', letterSpacing:'.06em', marginBottom:14 }}>TESTIMONIALS</div>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0F172A', letterSpacing:'-1px', lineHeight:1.15, marginBottom:12 }}>Loved by Our Community</h2>
          </div>
          <div className="testi-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="lc-fade-up lc-testi-card" style={{ background:'#F8FAFC', borderRadius:22, padding:'28px 26px', border:'1.5px solid #E2E8F0', position:'relative' }}>
                <div style={{ fontSize:36, color:'#E2E8F0', fontWeight:900, lineHeight:1, marginBottom:14 }}>"</div>
                <p style={{ fontSize:14, color:'#374151', lineHeight:1.75, marginBottom:24 }}>{t.text}</p>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:14, background:t.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:'white' }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:800, color:'#0F172A' }}>{t.name}</div>
                    <div style={{ fontSize:12, color:'#94A3B8', fontWeight:500 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'80px 24px', background:'linear-gradient(160deg,#0A1929 0%,#0F3A20 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(30,123,59,.25) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:620, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ fontSize:44, marginBottom:16 }}>🌟</div>
          <h2 className="lc-fade-up" style={{ fontSize:40, fontWeight:900, color:'white', letterSpacing:'-1px', lineHeight:1.15, marginBottom:16 }}>
            Ready to Discover Your Community?
          </h2>
          <p className="lc-fade-up" style={{ fontSize:16, color:'rgba(255,255,255,.6)', lineHeight:1.75, marginBottom:36 }}>
            Find businesses, services, healthcare and local updates all from one place. Join thousands of people across Andhra Pradesh.
          </p>
          <div className="lc-fade-up" style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="lc-btn-primary" onClick={() => navigate('/register')} style={{
              padding:'15px 34px', borderRadius:14, border:'none',
              background:'linear-gradient(135deg,#1E7B3B,#2F855A)',
              color:'white', fontSize:16, fontWeight:800,
              boxShadow:'0 8px 32px rgba(30,123,59,.5)',
              fontFamily:'inherit', cursor:'pointer',
            }}>
              Get Started — Free →
            </button>
            <button className="lc-btn-secondary" onClick={() => navigate('/login')} style={{
              padding:'15px 28px', borderRadius:14,
              border:'1.5px solid rgba(255,255,255,.25)',
              background:'rgba(255,255,255,.07)',
              color:'white', fontSize:15, fontWeight:700,
              fontFamily:'inherit', cursor:'pointer', backdropFilter:'blur(12px)',
            }}>
              Login to Account
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#0A1120', padding:'52px 24px 28px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:44 }}>
            {/* Brand */}
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <Logo size={36}/>
                <div>
                  <div style={{ fontSize:14, fontWeight:900, color:'white', letterSpacing:'.06em' }}>LOCAL CONNECT</div>
                  <div style={{ fontSize:9, color:'rgba(255,255,255,.35)', letterSpacing:'.06em' }}>EVERYTHING AROUND YOU</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,.45)', lineHeight:1.75, maxWidth:260 }}>
                Connecting communities, businesses, services, and people across Andhra Pradesh.
              </p>
            </div>
            {/* Links */}
            {[
              { title:'Platform', links:['Home','Discover','Businesses','Healthcare','Community'] },
              { title:'Company', links:['About','Blog','Careers','Contact'] },
              { title:'Legal', links:['Privacy Policy','Terms of Service','Cookie Policy'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.35)', letterSpacing:'.08em', marginBottom:16 }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize:13, color:'rgba(255,255,255,.55)', marginBottom:10, cursor:'pointer', transition:'color .2s' }}
                    onMouseEnter={e => e.target.style.color='white'}
                    onMouseLeave={e => e.target.style.color='rgba(255,255,255,.55)'}>
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop:'1px solid rgba(255,255,255,.08)', paddingTop:24, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div style={{ fontSize:12, color:'rgba(255,255,255,.3)' }}>© 2026 Local Connect. All rights reserved.</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,.3)' }}>Made with ❤️ for communities in Andhra Pradesh</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
