import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VillageBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
    {/* Sky gradient */}
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(to bottom, #87CEEB 0%, #FDB97D 40%, #F4A261 55%, #4a7c59 55%, #3d6b4a 100%)'
    }} />

    {/* Sun */}
    <div className="absolute" style={{
      top: '6%', left: '72%',
      width: 64, height: 64,
      background: 'radial-gradient(circle, #FFE566 60%, #FDB97D 100%)',
      borderRadius: '50%',
      boxShadow: '0 0 40px 15px rgba(255,229,102,0.4)'
    }} />

    {/* Clouds */}
    {[
      { top: '8%', left: '5%', scale: 1 },
      { top: '12%', left: '35%', scale: 0.7 },
      { top: '5%', left: '55%', scale: 0.85 },
    ].map((c, i) => (
      <div key={i} className="absolute" style={{ top: c.top, left: c.left, transform: `scale(${c.scale})`, transformOrigin: 'left top' }}>
        <div style={{ position: 'relative', width: 90, height: 36 }}>
          <div style={{ position: 'absolute', bottom: 0, left: 10, width: 70, height: 22, background: 'rgba(255,255,255,0.9)', borderRadius: 20 }} />
          <div style={{ position: 'absolute', bottom: 12, left: 18, width: 40, height: 28, background: 'rgba(255,255,255,0.9)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: 10, left: 38, width: 30, height: 24, background: 'rgba(255,255,255,0.9)', borderRadius: '50%' }} />
        </div>
      </div>
    ))}

    {/* Ground / road */}
    <div className="absolute" style={{ bottom: 0, left: 0, right: 0, height: '45%', background: '#4a7c59' }} />
    <div className="absolute" style={{ bottom: '10%', left: 0, right: 0, height: 28, background: '#8B7355', opacity: 0.9 }} />
    {/* Road dashes */}
    {[0,1,2,3,4,5,6,7].map(i => (
      <div key={i} className="absolute" style={{
        bottom: '10.7%', left: `${i * 14 + 2}%`, width: '8%', height: 6,
        background: '#F5E642', borderRadius: 3, opacity: 0.85
      }} />
    ))}

    {/* ── GROCERY SHOP (left) ── */}
    <div className="absolute" style={{ bottom: '22%', left: '3%' }}>
      {/* Building */}
      <div style={{ width: 90, height: 70, background: '#E8D5B7', border: '2px solid #8B7355', borderRadius: '4px 4px 0 0', position: 'relative' }}>
        {/* Roof */}
        <div style={{ position: 'absolute', top: -22, left: -6, width: 0, height: 0, borderLeft: '51px solid transparent', borderRight: '51px solid transparent', borderBottom: '24px solid #C0392B' }} />
        {/* Door */}
        <div style={{ position: 'absolute', bottom: 0, left: 32, width: 24, height: 35, background: '#8B4513', borderRadius: '3px 3px 0 0' }} />
        {/* Window */}
        <div style={{ position: 'absolute', top: 10, left: 8, width: 20, height: 18, background: '#AED6F1', border: '2px solid #8B7355' }} />
        <div style={{ position: 'absolute', top: 10, right: 8, width: 20, height: 18, background: '#AED6F1', border: '2px solid #8B7355' }} />
        {/* Sign */}
        <div style={{ position: 'absolute', top: -8, left: 8, right: 8, background: '#27AE60', borderRadius: 3, textAlign: 'center', fontSize: 8, color: 'white', fontWeight: 'bold', padding: '1px 0' }}>GROCERY</div>
      </div>
      {/* Produce display */}
      <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
        {['🍅','🥦','🧅','🍋'].map((e,i) => <span key={i} style={{ fontSize: 12 }}>{e}</span>)}
      </div>
    </div>

    {/* ── CHICKEN SHOP (center-left) ── */}
    <div className="absolute" style={{ bottom: '22%', left: '22%' }}>
      <div style={{ width: 85, height: 65, background: '#FAD7A0', border: '2px solid #8B7355', borderRadius: '4px 4px 0 0', position: 'relative' }}>
        {/* Roof */}
        <div style={{ position: 'absolute', top: -20, left: -5, width: 0, height: 0, borderLeft: '47px solid transparent', borderRight: '47px solid transparent', borderBottom: '22px solid #884EA0' }} />
        {/* Door */}
        <div style={{ position: 'absolute', bottom: 0, left: 29, width: 24, height: 32, background: '#6D4C41', borderRadius: '3px 3px 0 0' }} />
        {/* Window */}
        <div style={{ position: 'absolute', top: 10, left: 7, width: 18, height: 16, background: '#AED6F1', border: '2px solid #8B7355' }} />
        <div style={{ position: 'absolute', top: 10, right: 7, width: 18, height: 16, background: '#AED6F1', border: '2px solid #8B7355' }} />
        {/* Sign */}
        <div style={{ position: 'absolute', top: -7, left: 5, right: 5, background: '#E74C3C', borderRadius: 3, textAlign: 'center', fontSize: 7, color: 'white', fontWeight: 'bold', padding: '1px 0' }}>🍗 CHICKEN</div>
      </div>
      <div style={{ fontSize: 14, marginTop: 2, textAlign: 'center' }}>🐔</div>
    </div>

    {/* ── BUNK / PETROL ── */}
    <div className="absolute" style={{ bottom: '22%', left: '42%' }}>
      {/* Canopy */}
      <div style={{ width: 95, height: 12, background: '#F39C12', borderRadius: '3px 3px 0 0', marginBottom: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
      {/* Pump body */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {[0,1].map(i => (
          <div key={i} style={{ width: 22, height: 50, background: '#2980B9', borderRadius: 4, border: '2px solid #1A5276', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 6, left: 3, right: 3, height: 10, background: '#85C1E9', borderRadius: 2 }} />
            <div style={{ position: 'absolute', bottom: 4, left: 4, right: 4, height: 8, background: '#1A5276', borderRadius: 2 }} />
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', fontSize: 9, fontWeight: 'bold', color: '#F39C12', background: '#1A1A1A', borderRadius: 2, marginTop: 1, padding: '1px 4px' }}>BUNK</div>
    </div>

    {/* ── GENERAL STORE ── */}
    <div className="absolute" style={{ bottom: '22%', right: '20%' }}>
      <div style={{ width: 88, height: 68, background: '#D5E8D4', border: '2px solid #6D8B74', borderRadius: '4px 4px 0 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -20, left: -5, width: 0, height: 0, borderLeft: '49px solid transparent', borderRight: '49px solid transparent', borderBottom: '22px solid #E67E22' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 30, width: 26, height: 36, background: '#795548', borderRadius: '3px 3px 0 0' }} />
        <div style={{ position: 'absolute', top: 10, left: 7, width: 18, height: 16, background: '#AED6F1', border: '2px solid #6D8B74' }} />
        <div style={{ position: 'absolute', top: 10, right: 7, width: 18, height: 16, background: '#AED6F1', border: '2px solid #6D8B74' }} />
        <div style={{ position: 'absolute', top: -7, left: 4, right: 4, background: '#27AE60', borderRadius: 3, textAlign: 'center', fontSize: 7, color: 'white', fontWeight: 'bold', padding: '1px 0' }}>GENERAL</div>
      </div>
      <div style={{ fontSize: 12, marginTop: 2, textAlign: 'center' }}>🧴🪣</div>
    </div>

    {/* ── TEA STALL (far right) ── */}
    <div className="absolute" style={{ bottom: '22%', right: '4%' }}>
      {/* Tarp roof */}
      <div style={{ width: 75, height: 10, background: '#E74C3C', borderRadius: '3px 3px 0 0', opacity: 0.9 }} />
      <div style={{ width: 75, height: 55, background: '#FFF9C4', border: '2px solid #F9A825', borderRadius: '0 0 3px 3px', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 24, width: 24, height: 30, background: '#A1887F', borderRadius: '3px 3px 0 0' }} />
        <div style={{ position: 'absolute', top: 8, left: 6, width: 16, height: 14, background: '#AED6F1', border: '1px solid #F9A825' }} />
        <div style={{ position: 'absolute', top: 8, right: 6, width: 16, height: 14, background: '#AED6F1', border: '1px solid #F9A825' }} />
        <div style={{ position: 'absolute', top: -8, left: 0, right: 0, textAlign: 'center', fontSize: 7, fontWeight: 'bold', color: '#7B1FA2' }}>☕ TEA</div>
      </div>
      <div style={{ fontSize: 12, marginTop: 2, textAlign: 'center' }}>☕🫖</div>
    </div>

    {/* Trees */}
    {[
      { bottom: '28%', left: '16%' },
      { bottom: '28%', left: '34%' },
      { bottom: '28%', right: '13%' },
    ].map((pos, i) => (
      <div key={i} className="absolute" style={{ ...pos }}>
        <div style={{ width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderBottom: '40px solid #2ECC71', marginLeft: -2 }} />
        <div style={{ width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderBottom: '32px solid #27AE60', marginLeft: 2, marginTop: -20 }} />
        <div style={{ width: 10, height: 16, background: '#795548', margin: '0 auto' }} />
      </div>
    ))}

    {/* Lamp posts */}
    {['18%', '50%', '80%'].map((left, i) => (
      <div key={i} className="absolute" style={{ bottom: '18%', left }}>
        <div style={{ width: 4, height: 40, background: '#555', margin: '0 auto' }} />
        <div style={{ width: 16, height: 8, background: '#FFD700', borderRadius: '50% 50% 0 0', margin: '0 auto', marginTop: -4, boxShadow: '0 0 8px 4px rgba(255,215,0,0.3)' }} />
      </div>
    ))}

    {/* Birds */}
    <div className="absolute" style={{ top: '15%', left: '25%', fontSize: 12, opacity: 0.7 }}>🐦</div>
    <div className="absolute" style={{ top: '18%', left: '30%', fontSize: 10, opacity: 0.6 }}>🐦</div>
    <div className="absolute" style={{ top: '13%', right: '28%', fontSize: 11, opacity: 0.7 }}>🐦</div>
  </div>
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
    <div className="min-h-screen flex flex-col relative" style={{ fontFamily: 'inherit' }}>
      <VillageBackground />

      {/* Content overlay */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        {/* Glassmorphism card */}
        <div style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '32px 28px',
          maxWidth: 380,
          width: '100%',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}>
          <div className="text-6xl mb-3">🏘️</div>
          <h1 className="text-3xl font-bold mb-1">VillageConnect</h1>
          <p className="text-yellow-200 text-base font-medium mb-1">Your village. Your people. Your shops.</p>
          <p className="text-gray-300 text-sm mb-8">Know who's open right now, right in your village</p>

          <p className="text-yellow-100 font-semibold text-lg mb-5">I am a...</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => navigate('/register?role=CUSTOMER')}
              className="rounded-2xl p-5 flex flex-col items-center gap-2 transition active:scale-95"
              style={{ background: 'rgba(255,255,255,0.92)', color: '#1e3a5f', boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }}>
              <span className="text-4xl">👤</span>
              <span className="font-bold text-base">Customer</span>
              <span className="text-xs text-gray-500 text-center">Find shops & check what's open</span>
            </button>
            <button
              onClick={() => navigate('/register?role=MERCHANT')}
              className="rounded-2xl p-5 flex flex-col items-center gap-2 transition active:scale-95"
              style={{ background: 'rgba(255,255,255,0.92)', color: '#1e3a5f', boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }}>
              <span className="text-4xl">🏪</span>
              <span className="font-bold text-base">Shop Owner</span>
              <span className="text-xs text-gray-500 text-center">List your shop for FREE</span>
            </button>
          </div>

          <p className="text-gray-300 text-sm">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-yellow-300 font-bold underline">
              Login
            </button>
          </p>
        </div>
      </div>

      {/* Bottom feature strip */}
      <div className="relative z-10 py-5 px-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}>
        <div className="max-w-md mx-auto grid grid-cols-3 gap-4 text-center text-white">
          {[
            { icon: '🟢', label: 'Live Open/Closed Status' },
            { icon: '📞', label: 'Call & WhatsApp' },
            { icon: '🗺️', label: 'Get Directions' },
          ].map(f => (
            <div key={f.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{f.icon}</span>
              <span className="text-xs text-gray-300">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
