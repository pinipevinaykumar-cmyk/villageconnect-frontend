import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LocalConnectLogo = () => (
  <svg width="52" height="62" viewBox="0 0 62 74" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Direct Calls & WhatsApp',
    desc: 'Connect with shop owners instantly.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="white" strokeWidth="2"/>
        <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    title: 'Quick Directions',
    desc: 'Get accurate directions to reach the store easily.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

      {/* Warm village photo-style background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(160deg, #f5e6c0 0%, #e8c878 18%, #c8d890 38%, #7dab50 60%, #4a8030 80%, #2d6020 100%)',
      }} />

      {/* Sunlight glow (top-right like photo) */}
      <div style={{
        position: 'fixed', top: -60, right: -40, width: 420, height: 420,
        background: 'radial-gradient(circle, rgba(255,230,100,0.55) 0%, rgba(255,200,50,0.2) 45%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Tree silhouettes */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"
          style={{ width: '100%', height: '100%' }}>
          {/* Right side big trees like the photo */}
          <ellipse cx="1100" cy="220" rx="130" ry="170" fill="rgba(30,90,20,0.55)" />
          <ellipse cx="1080" cy="200" rx="100" ry="140" fill="rgba(40,110,25,0.45)" />
          <ellipse cx="1140" cy="260" rx="90" ry="120" fill="rgba(55,130,30,0.4)" />
          <rect x="1090" y="360" width="20" height="120" fill="rgba(60,40,20,0.5)" />

          <ellipse cx="980" cy="280" rx="100" ry="130" fill="rgba(35,95,22,0.45)" />
          <ellipse cx="960" cy="260" rx="80" ry="110" fill="rgba(50,120,28,0.4)" />
          <rect x="970" y="370" width="18" height="100" fill="rgba(60,40,20,0.45)" />

          {/* Left side trees */}
          <ellipse cx="80" cy="300" rx="90" ry="120" fill="rgba(30,90,20,0.4)" />
          <ellipse cx="60" cy="280" rx="70" ry="100" fill="rgba(45,115,25,0.35)" />
          <rect x="70" y="380" width="16" height="90" fill="rgba(60,40,20,0.4)" />

          {/* Ground */}
          <rect x="0" y="680" width="1200" height="120" fill="rgba(60,40,15,0.35)" />
          <rect x="0" y="660" width="1200" height="25" fill="rgba(80,60,20,0.3)" />

          {/* Road markings */}
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <rect key={i} x={i * 140 + 20} y="694" width="90" height="7" rx="3"
              fill="rgba(255,230,50,0.5)" />
          ))}

          {/* Distant shops */}
          <rect x="200" y="560" width="80" height="110" fill="rgba(80,60,40,0.3)" rx="3" />
          <rect x="295" y="575" width="70" height="95" fill="rgba(70,50,35,0.28)" rx="3" />
          <rect x="375" y="555" width="90" height="115" fill="rgba(85,65,42,0.28)" rx="3" />
          <rect x="475" y="570" width="75" height="100" fill="rgba(75,55,38,0.25)" rx="3" />
          <rect x="560" y="560" width="80" height="110" fill="rgba(80,60,40,0.25)" rx="3" />

          {/* Haze / atmosphere overlay */}
          <rect x="0" y="0" width="1200" height="800"
            fill="url(#warmHaze)" />
          <defs>
            <linearGradient id="warmHaze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,220,100,0.08)" />
              <stop offset="40%" stopColor="rgba(255,200,80,0.05)" />
              <stop offset="100%" stopColor="rgba(50,30,10,0.15)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Scrollable content */}
      <div style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 16px 24px',
      }}>

        {/* Logo + Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
          <div style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))' }}>
            <LocalConnectLogo />
          </div>
          <div>
            <h1 style={{
              fontSize: 32, fontWeight: 900, color: '#1B5E20', margin: 0,
              textShadow: '0 1px 4px rgba(255,255,255,0.6)',
              lineHeight: 1.1,
            }}>
              Local<br />Connect
            </h1>
          </div>
        </div>

        {/* Main card */}
        <div style={{
          width: '100%', maxWidth: 420,
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(14px)',
          borderRadius: 24,
          padding: '24px 22px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          marginTop: 10,
        }}>
          {/* Heading */}
          <h2 style={{
            fontSize: 22, fontWeight: 900, color: '#1a2e10', margin: '0 0 6px',
            lineHeight: 1.25,
          }}>
            Bringing Local Businesses<br />
            <span style={{ color: '#2E7D32' }}>Closer to You</span>
          </h2>
          <div style={{ width: 48, height: 3, background: '#2E7D32', borderRadius: 2, marginBottom: 10 }} />

          <p style={{ fontSize: 13, color: '#4a5740', margin: '0 0 18px', lineHeight: 1.6 }}>
            Discover nearby shops, check real-time availability, browse products and
            prices, and connect instantly with trusted local businesses.
          </p>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 20 }}>
            {features.map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: '#2E7D32',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a2e10', marginBottom: 1 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7c5e' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
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
              <span style={{ fontSize: 17 }}>👤</span> Customer
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
              <span style={{ fontSize: 17 }}>🏪</span> Shop Owner
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

        {/* Bottom tagline pill */}
        <div style={{
          marginTop: 20,
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
          borderRadius: 50,
          padding: '10px 24px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}>
          <span style={{ fontSize: 16 }}>🤍</span>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>
            Everything You Need. Closer Than Ever.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
