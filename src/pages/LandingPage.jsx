import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '🏪', title: 'Live Shop Status', desc: 'Know which shops are open or closed in real time.' },
  { icon: '🛒', title: 'Products & Price Updates', desc: 'Explore products, compare prices and choose best.' },
  { icon: '📞', title: 'Direct Calls & WhatsApp', desc: 'Connect with shop owners instantly.' },
  { icon: '📍', title: 'Quick Directions', desc: 'Get accurate directions to reach the store easily.' },
  { icon: '👥', title: 'Trusted Local Stores', desc: 'Support local businesses and build a stronger community.' },
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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* ── LEFT: content panel ── */}
      <div style={{
        width: '60%', minWidth: 340, maxWidth: 620,
        background: '#FAFAF5',
        padding: '32px 28px',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
      }}>

        {/* Logo + brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <svg width="44" height="52" viewBox="0 0 62 74" fill="none">
              <path d="M31 2C16.6 2 5 13.6 5 28C5 46.5 31 72 31 72C31 72 57 46.5 57 28C57 13.6 45.4 2 31 2Z" fill="#1B5E20"/>
              <circle cx="31" cy="28" r="21" fill="#2E7D32"/>
              <polygon points="31,14 18,23 44,23" fill="white"/>
              <rect x="18" y="23" width="26" height="20" rx="1" fill="white"/>
              <rect x="26" y="31" width="10" height="12" rx="1" fill="#2E7D32"/>
              <rect x="19" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
              <rect x="36" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
              <ellipse cx="6" cy="27" rx="5" ry="9" fill="#4CAF50" transform="rotate(-28 6 27)"/>
              <ellipse cx="7" cy="19" rx="3.5" ry="7" fill="#66BB6A" transform="rotate(-45 7 19)"/>
              <ellipse cx="56" cy="27" rx="5" ry="9" fill="#4CAF50" transform="rotate(28 56 27)"/>
              <ellipse cx="55" cy="19" rx="3.5" ry="7" fill="#66BB6A" transform="rotate(45 55 19)"/>
            </svg>
            <div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#1B5E20', lineHeight: 1.1 }}>
                Local<br />Connect
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1a2e10', margin: '0 0 4px', lineHeight: 1.25 }}>
            Bringing Local Businesses<br />
            <span style={{ color: '#2E7D32' }}>Closer to You</span>
          </h1>
          <div style={{ width: 44, height: 3, background: '#2E7D32', borderRadius: 2, margin: '8px 0 12px' }} />

          <p style={{ fontSize: 13, color: '#4a5740', margin: '0 0 18px', lineHeight: 1.65 }}>
            Discover nearby shops, check real-time availability, browse products and
            prices, and connect instantly with trusted local businesses.
          </p>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {features.map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%', background: '#2E7D32',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a2e10' }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7c5e', marginTop: 1 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <button
              onClick={() => navigate('/register?role=CUSTOMER')}
              style={{
                flex: 1, padding: '12px 0',
                background: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
                color: 'white', border: 'none', borderRadius: 12,
                fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 7,
                boxShadow: '0 4px 14px rgba(46,125,50,0.4)',
              }}
            >
              <span style={{ fontSize: 16 }}>👤</span> Customer
            </button>
            <button
              onClick={() => navigate('/register?role=MERCHANT')}
              style={{
                flex: 1, padding: '12px 0',
                background: 'white', color: '#1B5E20',
                border: '2px solid #2E7D32', borderRadius: 12,
                fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 7,
              }}
            >
              <span style={{ fontSize: 16 }}>🏪</span> Shop Owner
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7c5e', margin: '0 0 14px' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}
              style={{ color: '#2E7D32', fontWeight: 700, cursor: 'pointer' }}>
              Login →
            </span>
          </p>

          <div style={{
            background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
            borderRadius: 50, padding: '10px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 14 }}>🤍</span>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>
              Everything You Need. Closer Than Ever.
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: shows only the photo half of the poster ── */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        backgroundImage: 'url(/Designer.jpeg)',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Smooth left-edge fade to match left panel */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: 60,
          background: 'linear-gradient(to right, #FAFAF5, transparent)',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
};

export default LandingPage;
