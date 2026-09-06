import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

      {/* Poster — full image, no cropping */}
      <img
        src="/Designer.jpeg"
        alt=""
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          width: '100%', height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          backgroundColor: '#f5f0e8',
        }}
      />

      {/* Light bottom gradient so buttons stay readable */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 160, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
      }} />

      {/* Buttons pinned to bottom */}
      <div style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 20px 36px',
      }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <button
              onClick={() => navigate('/register?role=CUSTOMER')}
              style={{
                flex: 1, padding: '13px 0',
                background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
                color: 'white', border: 'none', borderRadius: 14,
                fontFamily: 'inherit', fontWeight: 700, fontSize: 15,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
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
                flex: 1, padding: '13px 0',
                background: 'rgba(255,255,255,0.92)', color: '#1B5E20',
                border: '2px solid #2E7D32', borderRadius: 14,
                fontFamily: 'inherit', fontWeight: 700, fontSize: 15,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: 17 }}>🏪</span> Shop Owner
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, margin: 0 }}>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              Already have an account?{' '}
            </span>
            <span
              onClick={() => navigate('/login')}
              style={{ color: '#A5D6A7', fontWeight: 800, cursor: 'pointer', fontSize: 14 }}
            >
              Login →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
