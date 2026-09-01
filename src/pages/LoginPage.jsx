import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const NightMarketBg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 700"
    preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0D1B2A" />
        <stop offset="50%" stopColor="#1B2A4A" />
        <stop offset="100%" stopColor="#2C3E6B" />
      </linearGradient>
      <linearGradient id="nightGround" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3B2F2F" />
        <stop offset="100%" stopColor="#1A1212" />
      </linearGradient>
      <radialGradient id="lampGlow1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE082" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFE082" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="lampGlow2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD54F" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#FFD54F" stopOpacity="0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="softglow">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Night sky */}
    <rect width="1200" height="700" fill="url(#nightSky)" />

    {/* Stars */}
    {[
      [60,30],[150,55],[230,20],[310,45],[420,15],[500,40],[580,18],[660,50],[740,25],[820,42],
      [900,18],[970,38],[1050,22],[1120,48],[1180,30],[180,80],[350,70],[530,85],[710,68],[890,78],
      [1100,60],[80,110],[260,95],[440,120],[620,100],[800,115],[1000,90],[1150,108],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1.2} fill="white" opacity={0.6 + (i % 4) * 0.1} />
    ))}

    {/* Moon */}
    <circle cx="1080" cy="75" r="40" fill="#FFF9C4" opacity="0.95" filter="url(#softglow)" />
    <circle cx="1095" cy="65" r="32" fill="#1B2A4A" opacity="0.5" />

    {/* Distant mountains / silhouette */}
    <polygon points="0,380 120,280 240,320 360,250 480,300 600,240 720,290 840,250 960,300 1080,255 1200,290 1200,420 0,420" fill="#0D1520" opacity="0.7" />

    {/* Ground */}
    <rect x="0" y="490" width="1200" height="210" fill="url(#nightGround)" />
    {/* Street */}
    <rect x="0" y="555" width="1200" height="55" fill="#2C2416" />
    {/* Road markings */}
    {[0,1,2,3,4,5,6,7,8,9].map(i => (
      <rect key={i} x={i * 130 + 10} y="578" width="80" height="7" rx="3" fill="#F5E642" opacity="0.5" />
    ))}
    {/* Footpath */}
    <rect x="0" y="546" width="1200" height="12" fill="#4A3728" />
    <rect x="0" y="607" width="1200" height="8" fill="#4A3728" />

    {/* ── FAIRY LIGHTS string across top ── */}
    <path d="M0 180 Q150 195 300 182 Q450 168 600 180 Q750 192 900 178 Q1050 164 1200 178"
      stroke="#555" strokeWidth="1.5" fill="none" />
    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map(i => {
      const x = i * 63 + 10;
      const y = 180 + Math.sin(i * 0.8) * 12;
      const colors = ['#FF5252','#FFD740','#69F0AE','#40C4FF','#FF6D00','#E040FB','#F5FF82'];
      const c = colors[i % colors.length];
      return (
        <g key={i} filter="url(#glow)">
          <line x1={x} y1={y - 10} x2={x} y2={y} stroke="#888" strokeWidth="1" />
          <ellipse cx={x} cy={y + 5} rx="5" ry="7" fill={c} opacity="0.9" />
          <ellipse cx={x} cy={y + 5} rx="10" ry="14" fill={c} opacity="0.2" />
        </g>
      );
    })}

    {/* Second string lower */}
    <path d="M0 215 Q200 228 400 215 Q600 202 800 215 Q1000 228 1200 212"
      stroke="#444" strokeWidth="1.2" fill="none" />
    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(i => {
      const x = i * 75 + 30;
      const y = 215 + Math.sin(i * 0.9) * 10;
      const colors = ['#FF6D00','#69F0AE','#FF5252','#F5FF82','#40C4FF','#E040FB'];
      return (
        <g key={i} filter="url(#glow)">
          <line x1={x} y1={y - 10} x2={x} y2={y} stroke="#777" strokeWidth="1" />
          <ellipse cx={x} cy={y + 4} rx="4" ry="6" fill={colors[i % colors.length]} opacity="0.85" />
          <ellipse cx={x} cy={y + 4} rx="9" ry="12" fill={colors[i % colors.length]} opacity="0.18" />
        </g>
      );
    })}

    {/* ── SHOP 1: GROCERY (night lit) ── */}
    <rect x="15" y="320" width="155" height="230" fill="#1A1200" rx="4" />
    <rect x="15" y="320" width="155" height="230" fill="#2C1F00" rx="4" opacity="0.8" />
    {/* Lit windows */}
    <rect x="25" y="365" width="45" height="40" fill="#FFD54F" rx="3" opacity="0.9" filter="url(#glow)" />
    <rect x="115" y="365" width="45" height="40" fill="#FFD54F" rx="3" opacity="0.9" filter="url(#glow)" />
    <rect x="25" y="365" width="45" height="40" fill="none" rx="3" stroke="#FFE082" strokeWidth="1.5" />
    <rect x="115" y="365" width="45" height="40" fill="none" rx="3" stroke="#FFE082" strokeWidth="1.5" />
    {/* Glow halos on windows */}
    <rect x="10" y="355" width="75" height="60" fill="#FFD54F" rx="10" opacity="0.1" />
    <rect x="100" y="355" width="75" height="60" fill="#FFD54F" rx="10" opacity="0.1" />
    {/* Roof */}
    <polygon points="5,326 92,265 180,326" fill="#3E2723" />
    {/* Sign (lit) */}
    <rect x="30" y="326" width="125" height="28" fill="#2E7D32" rx="4" filter="url(#glow)" />
    <text x="92" y="346" textAnchor="middle" fill="#A5D6A7" fontSize="12" fontWeight="bold" fontFamily="Arial">🥦 GROCERY</text>
    {/* Awning */}
    <rect x="10" y="354" width="165" height="14" fill="#1B5E20" rx="2" opacity="0.9" />
    {/* Door */}
    <rect x="67" y="425" width="50" height="80" fill="#1A0D00" rx="3 3 0 0" />
    <rect x="67" y="425" width="50" height="80" fill="#FF8F00" rx="3 3 0 0" opacity="0.1" />
    {/* Outdoor display */}
    <rect x="15" y="505" width="155" height="20" fill="#1B5E20" rx="2" />
    <text x="92" y="520" textAnchor="middle" fontSize="14">🍅🥦🧅🍋🥕</text>

    {/* ── SHOP 2: CHICKEN SHOP ── */}
    <rect x="183" y="330" width="148" height="220" fill="#1A0008" rx="4" />
    <polygon points="173,336 257,272 331,336" fill="#3E0020" />
    <rect x="195" y="336" width="124" height="28" fill="#B71C1C" rx="4" filter="url(#glow)" />
    <text x="257" y="355" textAnchor="middle" fill="#FFCDD2" fontSize="11" fontWeight="bold" fontFamily="Arial">🍗 CHICKEN</text>
    <rect x="178" y="364" width="158" height="12" fill="#7B1010" rx="2" />
    <rect x="193" y="380" width="40" height="36" fill="#FF8A65" rx="3" opacity="0.8" filter="url(#glow)" />
    <rect x="283" y="380" width="40" height="36" fill="#FF8A65" rx="3" opacity="0.8" filter="url(#glow)" />
    <rect x="193" y="380" width="40" height="36" fill="none" rx="3" stroke="#FFAB91" strokeWidth="1.5" />
    <rect x="283" y="380" width="40" height="36" fill="none" rx="3" stroke="#FFAB91" strokeWidth="1.5" />
    <rect x="215" y="430" width="50" height="75" fill="#0D0005" rx="3 3 0 0" />
    <rect x="215" y="430" width="50" height="75" fill="#FF6D00" opacity="0.08" rx="3 3 0 0" />
    <rect x="183" y="505" width="148" height="20" fill="#4E1010" rx="2" />
    <text x="257" y="520" textAnchor="middle" fontSize="14">🐔🍗🥚🥩</text>

    {/* ── SHOP 3: BUNK ── */}
    <rect x="345" y="315" width="180" height="235" fill="#0D1220" rx="4" />
    <rect x="335" y="305" width="200" height="18" fill="#E65100" rx="3" filter="url(#glow)" />
    <rect x="335" y="319" width="200" height="8" fill="#BF360C" />
    <rect x="348" y="327" width="8" height="200" fill="#37474F" />
    <rect x="519" y="327" width="8" height="200" fill="#37474F" />
    <rect x="360" y="326" width="155" height="26" fill="#0D47A1" rx="4" filter="url(#glow)" />
    <text x="437" y="344" textAnchor="middle" fill="#90CAF9" fontSize="12" fontWeight="bold" fontFamily="Arial">⛽ PETROL BUNK</text>
    {/* Pump glow */}
    <rect x="375" y="385" width="44" height="106" fill="#1565C0" rx="5" />
    <rect x="380" y="393" width="34" height="18" fill="#64B5F6" rx="2" filter="url(#glow)" />
    <rect x="383" y="416" width="28" height="10" fill="#FFD740" rx="2" filter="url(#glow)" />
    <rect x="455" y="385" width="44" height="106" fill="#1976D2" rx="5" />
    <rect x="460" y="393" width="34" height="18" fill="#64B5F6" rx="2" filter="url(#glow)" />
    <rect x="463" y="416" width="28" height="10" fill="#FFD740" rx="2" filter="url(#glow)" />
    <rect x="373" y="355" width="128" height="26" fill="#0A0A0A" rx="3" />
    <text x="437" y="373" textAnchor="middle" fill="#FFD740" fontSize="11" fontFamily="monospace" filter="url(#glow)">₹102.50/L</text>

    {/* ── SHOP 4: VEGETABLE MARKET ── */}
    <rect x="540" y="300" width="158" height="250" fill="#0A1500" rx="4" />
    <polygon points="530,306 619,238 728,306" fill="#1B2E00" />
    <rect x="555" y="305" width="128" height="28" fill="#558B2F" rx="4" filter="url(#glow)" />
    <text x="619" y="324" textAnchor="middle" fill="#DCEDC8" fontSize="11" fontWeight="bold" fontFamily="Arial">🥬 SABZI MART</text>
    <rect x="535" y="333" width="168" height="12" fill="#33691E" rx="2" />
    <rect x="550" y="350" width="40" height="36" fill="#AED581" rx="3" opacity="0.7" filter="url(#glow)" />
    <rect x="648" y="350" width="40" height="36" fill="#AED581" rx="3" opacity="0.7" filter="url(#glow)" />
    <rect x="550" y="350" width="40" height="36" fill="none" rx="3" stroke="#C5E1A5" strokeWidth="1.5" />
    <rect x="648" y="350" width="40" height="36" fill="none" rx="3" stroke="#C5E1A5" strokeWidth="1.5" />
    <rect x="594" y="405" width="50" height="90" fill="#050D00" rx="3 3 0 0" />
    <rect x="540" y="495" width="158" height="22" fill="#1B5E20" rx="2" />
    <rect x="535" y="491" width="168" height="6" fill="#33691E" rx="2" />
    <text x="619" y="512" textAnchor="middle" fontSize="15">🥕🍅🌽🥒🥦</text>

    {/* ── SHOP 5: BAKERY ── */}
    <rect x="712" y="310" width="150" height="240" fill="#1A0800" rx="4" />
    <polygon points="702,316 787,248 862,316" fill="#3E1200" />
    <rect x="725" y="316" width="125" height="28" fill="#BF360C" rx="4" filter="url(#glow)" />
    <text x="787" y="335" textAnchor="middle" fill="#FFCCBC" fontSize="12" fontWeight="bold" fontFamily="Arial">🍞 BAKERY</text>
    <rect x="707" y="344" width="160" height="12" fill="#7C2700" rx="2" />
    <rect x="722" y="360" width="40" height="36" fill="#FF8A65" rx="3" opacity="0.85" filter="url(#glow)" />
    <rect x="812" y="360" width="40" height="36" fill="#FF8A65" rx="3" opacity="0.85" filter="url(#glow)" />
    <rect x="722" y="360" width="40" height="36" fill="none" rx="3" stroke="#FFAB91" strokeWidth="1.5" />
    <rect x="812" y="360" width="40" height="36" fill="none" rx="3" stroke="#FFAB91" strokeWidth="1.5" />
    <rect x="762" y="408" width="50" height="82" fill="#100400" rx="3 3 0 0" />
    <rect x="712" y="490" width="150" height="22" fill="#4E1B00" rx="2" />
    <text x="787" y="507" textAnchor="middle" fontSize="14">🍞🥐🎂🍰🥧</text>

    {/* ── SHOP 6: TEA STALL ── */}
    <rect x="876" y="330" width="138" height="220" fill="#0D0820" rx="4" />
    <polygon points="862,336 945,270 1018,336" fill="#1A0D3E" />
    {/* Colorful tarp */}
    <rect x="862" y="330" width="156" height="10" fill="#7B1FA2" rx="2" />
    {/* Pennant flags */}
    {[0,1,2,3,4,5,6,7].map(i => {
      const colors2 = ['#F44336','#FF9800','#FFEB3B','#4CAF50','#2196F3','#9C27B0','#E91E63','#00BCD4'];
      return <polygon key={i} points={`${866 + i * 19},330 ${874 + i * 19},330 ${870 + i * 19},344`} fill={colors2[i]} opacity="0.9" />;
    })}
    <rect x="890" y="330" width="108" height="26" fill="#4A148C" rx="4" filter="url(#glow)" />
    <text x="944" y="348" textAnchor="middle" fill="#CE93D8" fontSize="11" fontWeight="bold" fontFamily="Arial">☕ CHAI KADAI</text>
    <rect x="886" y="356" width="36" height="32" fill="#CE93D8" rx="3" opacity="0.7" filter="url(#glow)" />
    <rect x="990" y="356" width="20" height="32" fill="#CE93D8" rx="3" opacity="0.7" filter="url(#glow)" />
    <rect x="886" y="356" width="36" height="32" fill="none" rx="3" stroke="#E1BEE7" strokeWidth="1.5" />
    <rect x="915" y="400" width="46" height="80" fill="#0A0510" rx="3 3 0 0" />
    <rect x="876" y="490" width="138" height="22" fill="#1A0A30" rx="2" />
    <text x="945" y="508" textAnchor="middle" fontSize="14">☕🫖🍵🧁</text>

    {/* ── SHOP 7: MEDICAL ── */}
    <rect x="1027" y="315" width="145" height="235" fill="#001810" rx="4" />
    <polygon points="1017,321 1099,255 1182,321" fill="#003020" />
    <rect x="1040" y="315" width="120" height="28" fill="#00695C" rx="4" filter="url(#glow)" />
    <text x="1100" y="334" textAnchor="middle" fill="#B2DFDB" fontSize="11" fontWeight="bold" fontFamily="Arial">💊 MEDICAL</text>
    {/* Glowing green cross */}
    <rect x="1086" y="258" width="28" height="10" fill="#00E676" filter="url(#glow)" />
    <rect x="1095" y="249" width="10" height="28" fill="#00E676" filter="url(#glow)" />
    <rect x="1022" y="343" width="155" height="12" fill="#004D40" rx="2" />
    <rect x="1037" y="360" width="38" height="34" fill="#80CBC4" rx="3" opacity="0.7" filter="url(#glow)" />
    <rect x="1132" y="360" width="30" height="34" fill="#80CBC4" rx="3" opacity="0.7" filter="url(#glow)" />
    <rect x="1037" y="360" width="38" height="34" fill="none" rx="3" stroke="#B2DFDB" strokeWidth="1.5" />
    <rect x="1075" y="410" width="48" height="80" fill="#001008" rx="3 3 0 0" />
    <rect x="1027" y="490" width="145" height="22" fill="#002D22" rx="2" />
    <text x="1100" y="508" textAnchor="middle" fontSize="13">💊💉🩺🩹</text>

    {/* ── LAMP POSTS (glowing) ── */}
    {[90, 330, 620, 860, 1150].map((x, i) => (
      <g key={i}>
        <rect x={x - 3} y="390" width="6" height="150" fill="#455A64" />
        <rect x={x - 20} y="386" width="40" height="7" fill="#37474F" rx="3" />
        <ellipse cx={x} cy="383" rx="30" ry="30" fill="url(#lampGlow1)" />
        <ellipse cx={x} cy="383" rx="55" ry="50" fill="url(#lampGlow2)" />
        <ellipse cx={x} cy="386" rx="10" ry="5" fill="#FFE082" opacity="0.95" filter="url(#glow)" />
      </g>
    ))}

    {/* ── TREES (night silhouette) ── */}
    {[170, 512, 700, 868].map((x, i) => (
      <g key={i}>
        <rect x={x - 6} y="440" width="12" height="60" fill="#1A0D00" />
        <ellipse cx={x} cy="415" rx="35" ry="44" fill="#0D1F08" />
        <ellipse cx={x - 15} cy="405" rx="25" ry="32" fill="#0A1A06" />
        <ellipse cx={x + 18} cy="400" rx="22" ry="28" fill="#0D2208" />
      </g>
    ))}

    {/* People silhouettes */}
    <ellipse cx="302" cy="542" rx="8" ry="8" fill="#1A0A00" />
    <rect x="296" y="550" width="12" height="22" fill="#1A0A00" rx="2" />
    <rect x="293" y="572" width="6" height="14" fill="#1A0A00" rx="2" />
    <rect x="301" y="572" width="6" height="14" fill="#1A0A00" rx="2" />

    <ellipse cx="574" cy="540" rx="7" ry="7" fill="#150008" />
    <rect x="568" y="547" width="12" height="20" fill="#150008" rx="2" />
    <rect x="565" y="567" width="6" height="13" fill="#150008" rx="2" />
    <rect x="573" y="567" width="6" height="13" fill="#150008" rx="2" />

    {/* Auto-rickshaw silhouette */}
    <rect x="418" y="520" width="62" height="30" fill="#0D1A00" rx="8 8 0 0" />
    <rect x="412" y="534" width="74" height="18" fill="#1A2E00" rx="4" />
    {/* Headlight glow */}
    <ellipse cx="415" cy="548" rx="18" ry="10" fill="#FFE082" opacity="0.25" />
    <circle cx="427" cy="550" r="7" fill="#1A1A00" />
    <circle cx="467" cy="550" r="7" fill="#1A1A00" />
    <circle cx="427" cy="550" r="3" fill="#555" />
    <circle cx="467" cy="550" r="3" fill="#555" />
    <rect x="428" y="522" width="26" height="15" fill="#1E3A5F" rx="2" opacity="0.6" />

    {/* Ground glow from lamp posts */}
    {[90, 330, 620, 860, 1150].map((x, i) => (
      <ellipse key={i} cx={x} cy="545" rx="80" ry="20" fill="#FFE082" opacity="0.06" />
    ))}

    {/* Vignette */}
    <defs>
      <radialGradient id="vig" cx="50%" cy="50%" r="70%">
        <stop offset="40%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
      </radialGradient>
    </defs>
    <rect width="1200" height="700" fill="url(#vig)" />
  </svg>
);

const LoginPage = () => {
  const [form, setForm] = useState({ emailOrPhone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      const { token, ...userData } = res.data.data;
      login(userData, token);
      toast.success(`Welcome back, ${userData.name}!`);
      if (userData.role === 'MERCHANT') navigate('/merchant/dashboard');
      else if (userData.role === 'ADMIN') navigate('/admin');
      else navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <NightMarketBg />

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div style={{ fontSize: 52, marginBottom: 8, filter: 'drop-shadow(0 0 12px rgba(255,224,130,0.6))' }}>🏘️</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 4,
                       textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>Welcome back</h1>
          <p style={{ color: '#FFE082', fontSize: 13, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
            Your village. Your people. Your shops.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(10, 10, 20, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '28px 26px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#CFD8DC', marginBottom: 6 }}>
                Phone or Email
              </label>
              <input
                type="text" name="emailOrPhone" value={form.emailOrPhone}
                onChange={handleChange} placeholder="9999999999 or email" required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12, padding: '12px 16px', fontSize: 14, color: 'white',
                  outline: 'none', fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = '#FFE082'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#CFD8DC', marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password" name="password" value={form.password}
                onChange={handleChange} placeholder="Enter password" required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12, padding: '12px 16px', fontSize: 14, color: 'white',
                  outline: 'none', fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = '#FFE082'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>
            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '13px', borderRadius: 14, border: 'none',
                background: loading ? '#555' : 'linear-gradient(135deg, #1565C0, #0D47A1)',
                color: 'white', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(13,71,161,0.5)', fontFamily: 'inherit',
                transition: 'opacity 0.2s',
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#B0BEC5', marginTop: 18,
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#FFE082', fontWeight: 700, textDecoration: 'underline' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
