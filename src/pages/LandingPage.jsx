import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 62 74" fill="none">
    <path d="M31 2C16.6 2 5 13.6 5 28C5 46.5 31 72 31 72C31 72 57 46.5 57 28C57 13.6 45.4 2 31 2Z" fill="rgba(255,255,255,0.25)"/>
    <circle cx="31" cy="28" r="21" fill="rgba(255,255,255,0.2)"/>
    <polygon points="31,14 18,23 44,23" fill="white"/>
    <rect x="18" y="23" width="26" height="20" rx="1" fill="white"/>
    <rect x="26" y="31" width="10" height="12" rx="1" fill="#1E7B3B"/>
    <rect x="19" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
    <rect x="36" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
  </svg>
);

const features = [
  {
    icon: '🏪',
    label: 'Business Listings',
    desc: 'Find every shop, hotel, medical store & local business near you.',
    badge: 'Live Now',
    badgeColor: '#DCFCE7',
    badgeText: '#15803D',
    highlight: true,
  },
  {
    icon: '🟢',
    label: 'Live Open / Closed Status',
    desc: 'Know in real time if a shop is open before you travel there.',
    badge: 'Live Now',
    badgeColor: '#DCFCE7',
    badgeText: '#15803D',
    highlight: true,
  },
  {
    icon: '📦',
    label: 'Products & Prices',
    desc: 'Browse what each shop sells and at what price — before you visit.',
    badge: 'Live Now',
    badgeColor: '#DCFCE7',
    badgeText: '#15803D',
    highlight: true,
  },
  {
    icon: '📞',
    label: 'One-tap Call & WhatsApp',
    desc: 'Connect directly with any shop owner instantly.',
    badge: 'Live Now',
    badgeColor: '#DCFCE7',
    badgeText: '#15803D',
    highlight: false,
  },
  {
    icon: '📍',
    label: 'Get Directions',
    desc: 'Open Google Maps to any shop with one tap.',
    badge: 'Live Now',
    badgeColor: '#DCFCE7',
    badgeText: '#15803D',
    highlight: false,
  },
  {
    icon: '🛠',
    label: 'Professionals',
    desc: 'Plumbers, electricians, mechanics & more — coming soon.',
    badge: 'Coming Soon',
    badgeColor: '#FEF3C7',
    badgeText: '#D97706',
    highlight: false,
  },
  {
    icon: '🏥',
    label: 'Healthcare',
    desc: 'Find doctors with live availability — coming soon.',
    badge: 'Coming Soon',
    badgeColor: '#FEF3C7',
    badgeText: '#D97706',
    highlight: false,
  },
  {
    icon: '📢',
    label: 'Community Feed',
    desc: 'Local alerts, blood requests & announcements — coming soon.',
    badge: 'Coming Soon',
    badgeColor: '#FEF3C7',
    badgeText: '#D97706',
    highlight: false,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'MERCHANT') return <Navigate to="/merchant/dashboard" replace />;
    return <Navigate to="/home" replace />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0F172A 0%, #1a2744 50%, #1E7B3B 100%)',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Background glows */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,123,59,.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ── TOP NAV ── */}
      <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo />
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1 }}>Local Connect</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.45)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>Community Super App</div>
          </div>
        </div>
        <button onClick={() => navigate('/login')}
          style={{ padding: '9px 20px', borderRadius: 100, border: '1.5px solid rgba(255,255,255,.25)', background: 'rgba(255,255,255,.08)', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(8px)' }}>
          Login
        </button>
      </div>

      {/* ── HERO ── */}
      <div style={{ padding: '16px 24px 32px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1, margin: '0 0 14px' }}>
          Find Every Shop<br />
          <span style={{ color: '#4ADE80' }}>Near You — Instantly</span>
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, margin: '0 auto', maxWidth: 320 }}>
          Check if it's open, see products &amp; prices, then call or WhatsApp — all in one place.
        </p>
      </div>

      {/* ── FEATURE CARDS ── */}
      <div style={{ padding: '0 16px', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        {features.map((f) => (
          <div key={f.label} style={{
            background: f.highlight ? 'rgba(30,123,59,.18)' : 'rgba(255,255,255,.05)',
            border: f.highlight ? '1px solid rgba(74,222,128,.25)' : '1px solid rgba(255,255,255,.08)',
            borderRadius: 16, padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 14,
            backdropFilter: 'blur(12px)',
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              {f.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 3 }}>{f.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', lineHeight: 1.45 }}>{f.desc}</div>
            </div>
            <span style={{ padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, background: f.badgeColor, color: f.badgeText, flexShrink: 0, whiteSpace: 'nowrap' }}>
              {f.badge}
            </span>
          </div>
        ))}
      </div>

      {/* ── CTA BUTTONS ── */}
      <div style={{ padding: '0 16px 48px', position: 'relative', zIndex: 10, marginTop: 'auto' }}>
        <button onClick={() => navigate('/register')}
          style={{
            width: '100%', padding: '16px', borderRadius: 16, border: 'none',
            background: 'linear-gradient(135deg, #1E7B3B, #2F855A)',
            color: 'white', fontSize: 16, fontWeight: 800,
            cursor: 'pointer', fontFamily: 'inherit', marginBottom: 10,
            boxShadow: '0 8px 32px rgba(30,123,59,.5)', letterSpacing: '-0.2px',
          }}>
          Get Started — It's Free
        </button>
        <button onClick={() => navigate('/login')}
          style={{
            width: '100%', padding: '15px', borderRadius: 16,
            border: '1.5px solid rgba(255,255,255,.18)',
            background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.8)',
            fontSize: 15, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', backdropFilter: 'blur(8px)',
          }}>
          Already have an account? Login
        </button>

        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.25)', fontWeight: 600 }}>
            Discover · Connect · Grow with your community
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
