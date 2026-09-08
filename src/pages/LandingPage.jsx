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

const FEATURES = [
  { icon: '🏪', label: 'Shop & Business Discovery' },
  { icon: '🏥', label: 'Healthcare & Doctors' },
  { icon: '🛠', label: 'Local Services' },
  { icon: '📢', label: 'Community Updates' },
  { icon: '🚨', label: 'Emergency Contacts' },
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
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: 'relative', overflow: 'hidden',
      padding: '40px 20px',
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,123,59,.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 10 }}>

        {/* Top: Logo + title */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, filter: 'drop-shadow(0 4px 20px rgba(0,0,0,.4))' }}>
            <Logo />
          </div>
          <div style={{ fontSize: 30, fontWeight: 900, color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            LOCAL CONNECT
          </div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', fontWeight: 500, marginBottom: 8 }}>
            Your Community In One Place
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', fontWeight: 600, letterSpacing: '.06em' }}>
            Discover · Connect · Grow
          </div>
        </div>

        {/* Middle: Feature chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 36 }}>
          {FEATURES.map(f => (
            <div key={f.label} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,255,255,.08)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 100, padding: '8px 14px',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: 15 }}>{f.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.8)', whiteSpace: 'nowrap' }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom: CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => navigate('/register?role=CUSTOMER')}
            style={{
              width: '100%', padding: '16px', borderRadius: 16, border: 'none',
              background: 'linear-gradient(135deg, #1E7B3B, #2F855A)',
              color: 'white', fontSize: 16, fontWeight: 800,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 8px 32px rgba(30,123,59,.5)', letterSpacing: '-0.2px',
            }}>
            Continue as Customer
          </button>
          <button onClick={() => navigate('/register?role=MERCHANT')}
            style={{
              width: '100%', padding: '15px', borderRadius: 16,
              border: '1.5px solid rgba(255,255,255,.25)',
              background: 'rgba(255,255,255,.06)', color: 'white',
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'inherit', backdropFilter: 'blur(8px)',
            }}>
            Continue as Merchant
          </button>
          <div style={{ textAlign: 'center', marginTop: 6 }}>
            <span
              onClick={() => navigate('/login')}
              style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', cursor: 'pointer', fontWeight: 600 }}>
              Already have an account? <span style={{ color: '#4ADE80' }}>Login →</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
