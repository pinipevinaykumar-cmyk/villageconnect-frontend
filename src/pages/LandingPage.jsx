import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import VillageBg from '../components/VillageBg';

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

      {/* Content sits in the SKY area — top 42% — so village shops fully visible below */}
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
          <div style={{ fontSize: 46, filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))' }}>🏘️</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', margin: '4px 0 2px',
                       textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            VillageConnect
          </h1>
          <p style={{ color: '#FFF8E1', fontSize: 13, fontWeight: 600,
                      textShadow: '0 1px 6px rgba(0,0,0,0.45)', marginBottom: 0 }}>
            Your village. Your people. Your shops.
          </p>
        </div>

        {/* Compact pill buttons — no blocking card */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <button
            onClick={() => navigate('/register?role=CUSTOMER')}
            style={{
              background: 'white', color: '#1e3a5c',
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
              background: 'white', color: '#1e3a5c',
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
              color: '#FFE082', fontWeight: 800, fontSize: 14,
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', textDecoration: 'none',
              letterSpacing: '0.2px',
            }}>
            Login →
          </button>
        </div>
      </div>

      {/* Village scene takes up the rest — fully visible */}
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
