import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LocalConnectLogo = () => (
  <svg width="48" height="58" viewBox="0 0 62 74" fill="none" xmlns="http://www.w3.org/2000/svg">
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
);

const features = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="white" strokeWidth="2"/>
        <path d="M3 11h18M8 7V5a2 2 0 014 0v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="15" r="1.5" fill="white"/>
      </svg>
    ),
    title: 'Live Shop Status',
    desc: 'Know which shops are open or closed in real time.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2"/>
        <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Products & Price Updates',
    desc: 'Explore products, compare prices and choose best.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Direct Calls & WhatsApp',
    desc: 'Connect with shop owners instantly.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="white" strokeWidth="2"/>
        <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    title: 'Quick Directions',
    desc: 'Get accurate directions to reach the store easily.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Trusted Local Stores',
    desc: 'Support local businesses and build a stronger community.',
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
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Real photo background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/Designer.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* Subtle dark overlay so content card pops */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'rgba(0,0,0,0.18)',
      }} />

      {/* Scrollable content over the village */}
      <div style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        padding: '28px 16px 24px',
      }}>

        {/* Logo + Brand name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.4))' }}>
            <LocalConnectLogo />
          </div>
          <h1 style={{
            fontSize: 30, fontWeight: 900, color: '#1B5E20', margin: 0,
            lineHeight: 1.1,
            textShadow: '0 1px 6px rgba(255,255,255,0.7)',
          }}>
            Local<br />Connect
          </h1>
        </div>

        {/* Main content card */}
        <div style={{
          width: '100%', maxWidth: 400,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          borderRadius: 20,
          padding: '22px 20px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.22)',
        }}>
          {/* Heading */}
          <h2 style={{
            fontSize: 20, fontWeight: 900, color: '#1a2e10',
            margin: '0 0 4px', lineHeight: 1.3,
          }}>
            Bringing Local Businesses<br />
            <span style={{ color: '#2E7D32' }}>Closer to You</span>
          </h2>
          <div style={{ width: 44, height: 3, background: '#2E7D32', borderRadius: 2, marginBottom: 10 }} />

          <p style={{ fontSize: 13, color: '#4a5740', margin: '0 0 16px', lineHeight: 1.6 }}>
            Discover nearby shops, check real-time availability, browse products and
            prices, and connect instantly with trusted local businesses.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {features.map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#2E7D32',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2e10', marginBottom: 1 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7c5e' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <button
              onClick={() => navigate('/register?role=CUSTOMER')}
              style={{
                flex: 1, padding: '11px 0',
                background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
                color: 'white', border: 'none', borderRadius: 12,
                fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6,
                boxShadow: '0 4px 14px rgba(46,125,50,0.4)',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: 16 }}>👤</span> Customer
            </button>
            <button
              onClick={() => navigate('/register?role=MERCHANT')}
              style={{
                flex: 1, padding: '11px 0',
                background: 'white', color: '#1B5E20',
                border: '2px solid #2E7D32', borderRadius: 12,
                fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6,
                transition: 'transform 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: 16 }}>🏪</span> Shop Owner
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7c5e', margin: 0 }}>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{ color: '#2E7D32', fontWeight: 700, cursor: 'pointer' }}
            >
              Login →
            </span>
          </p>
        </div>

        {/* Bottom tagline */}
        <div style={{
          marginTop: 16,
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
          borderRadius: 50,
          padding: '10px 22px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}>
          <span style={{ fontSize: 15 }}>🤍</span>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>
            Everything You Need. Closer Than Ever.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
