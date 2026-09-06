import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import VillageBg from '../components/VillageBg';

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

      {/* Content in the sky area */}
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
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8,
                        filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.4))' }}>
            <LocalConnectLogo />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', margin: '4px 0 2px',
                       textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            Local Connect
          </h1>
          <p style={{ color: '#F1F8E9', fontSize: 13, fontWeight: 600,
                      textShadow: '0 1px 6px rgba(0,0,0,0.45)', marginBottom: 0 }}>
            Bringing local businesses closer to you
          </p>
        </div>

        {/* Pill buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <button
            onClick={() => navigate('/register?role=CUSTOMER')}
            style={{
              background: 'white', color: '#1B5E20',
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
              background: 'white', color: '#1B5E20',
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

        <div style={{
          background: 'rgba(0,0,0,0.45)',
          borderRadius: 50,
          padding: '8px 20px',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ color: 'white', fontSize: 13, fontWeight: 500 }}>
            Already have an account?
          </span>
          <button onClick={() => navigate('/login')}
            style={{
              color: '#A5D6A7', fontWeight: 800, fontSize: 14,
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', textDecoration: 'none',
              letterSpacing: '0.2px',
            }}>
            Login →
          </button>
        </div>
      </div>

      {/* Village scene fills the rest */}
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
