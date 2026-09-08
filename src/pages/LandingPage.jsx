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

const modules = [
  { icon: '🗂', label: 'Directory', desc: 'Shops, hospitals, schools & more', color: '#DCFCE7', text: '#15803D' },
  { icon: '🛠', label: 'Professionals', desc: 'Plumbers, electricians & 11 more', color: '#EDE9FE', text: '#6D28D9' },
  { icon: '🏥', label: 'Healthcare', desc: 'Doctors with live availability', color: '#DBEAFE', text: '#1D4ED8' },
  { icon: '📢', label: 'Community', desc: 'Alerts, blood requests & news', color: '#FEE2E2', text: '#DC2626' },
  { icon: '⚽', label: 'Sports', desc: 'Grounds, teams & matches', color: '#FEF3C7', text: '#D97706' },
  { icon: '🏪', label: 'Businesses', desc: 'Open/closed + WhatsApp & call', color: '#DCFCE7', text: '#15803D' },
];

const stats = [
  { val: '10K+', label: 'Users' },
  { val: '6', label: 'Modules' },
  { val: '13+', label: 'Professions' },
  { val: '100%', label: 'Free' },
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
      background: 'linear-gradient(160deg, #0F172A 0%, #1a2744 45%, #1E7B3B 100%)',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,123,59,.35) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 100, left: -80,
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── TOP NAV ── */}
      <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo />
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1 }}>Local Connect</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>Community Super App</div>
          </div>
        </div>
        <button onClick={() => navigate('/login')}
          style={{
            padding: '9px 20px', borderRadius: 100, border: '1.5px solid rgba(255,255,255,.25)',
            background: 'rgba(255,255,255,.08)', color: 'white', fontSize: 13, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(8px)',
          }}>
          Login
        </button>
      </div>

      {/* ── HERO ── */}
      <div style={{ padding: '20px 24px 32px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', background: 'rgba(245,158,11,.15)', border: '1px solid rgba(245,158,11,.4)',
          color: '#F59E0B', padding: '5px 16px', borderRadius: 100,
          fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 18,
        }}>
          One Place for Everything
        </div>
        <h1 style={{
          fontSize: 38, fontWeight: 900, color: 'white', letterSpacing: '-1.5px',
          lineHeight: 1.1, margin: '0 0 14px',
        }}>
          Your Community,<br />
          <span style={{ color: '#4ADE80' }}>All in One App</span>
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.6)', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 340, marginLeft: 'auto', marginRight: 'auto' }}>
          Find shops, doctors, plumbers, sports grounds and your whole community — in one place.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODULE CARDS horizontal scroll ── */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: 32 }}>
        <div style={{ paddingLeft: 24, marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>What's inside</div>
        </div>
        <div style={{
          display: 'flex', gap: 12, overflowX: 'auto',
          padding: '4px 24px 16px', scrollbarWidth: 'none',
        }}>
          {modules.map(m => (
            <div key={m.label} style={{
              minWidth: 130, background: 'rgba(255,255,255,.07)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 16, padding: '16px 14px', flexShrink: 0,
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: m.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, marginBottom: 10,
              }}>
                {m.icon}
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', lineHeight: 1.4 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VALUE PROPS ── */}
      <div style={{ padding: '0 24px', position: 'relative', zIndex: 10, marginBottom: 36 }}>
        {[
          { icon: '⚡', title: 'Open/Closed Live Status', desc: 'Know instantly if a shop or doctor is available right now.' },
          { icon: '📞', title: 'One-tap Call & WhatsApp', desc: 'Connect with any business or professional instantly.' },
          { icon: '🔒', title: 'Admin-Verified Listings', desc: 'Every listing verified before going live. 100% trusted.' },
        ].map(f => (
          <div key={f.title} style={{ display: 'flex', gap: 14, marginBottom: 18, alignItems: 'flex-start' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>
              {f.icon}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 3 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA BUTTONS ── */}
      <div style={{ padding: '0 24px 48px', position: 'relative', zIndex: 10, marginTop: 'auto' }}>
        <button onClick={() => navigate('/register')}
          style={{
            width: '100%', padding: '16px', borderRadius: 16, border: 'none',
            background: 'linear-gradient(135deg, #1E7B3B, #2F855A)',
            color: 'white', fontSize: 16, fontWeight: 800,
            cursor: 'pointer', fontFamily: 'inherit', marginBottom: 12,
            boxShadow: '0 8px 32px rgba(30,123,59,.5)',
            letterSpacing: '-.2px',
          }}>
          Get Started — It's Free
        </button>
        <button onClick={() => navigate('/login')}
          style={{
            width: '100%', padding: '15px', borderRadius: 16,
            border: '1.5px solid rgba(255,255,255,.2)',
            background: 'rgba(255,255,255,.07)', color: 'white',
            fontSize: 15, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', backdropFilter: 'blur(8px)',
          }}>
          Already have an account? Login
        </button>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', fontWeight: 600 }}>
            Discover · Connect · Grow
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
