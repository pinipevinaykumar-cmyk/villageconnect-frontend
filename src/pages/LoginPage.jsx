import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const LocalConnectLogo = () => (
  <svg width="62" height="74" viewBox="0 0 62 74" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const LoginPage = () => {
  const [form, setForm] = useState({ emailOrPhone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      const { token, ...userData } = res.data.data;
      login(userData, token);
      toast.success(`Welcome back, ${userData.name}!`);
      if (userData.role === 'MERCHANT') navigate('/merchant/dashboard');
      else if (userData.role === 'ADMIN') navigate('/admin');
      else navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(160deg, #1B5E20 0%, #2E7D32 35%, #388E3C 65%, #558B2F 100%)'
    }}>

      {/* Sunlight glow from top */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 340,
        background: 'radial-gradient(ellipse, rgba(255,220,50,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Floating leaf decorations */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[
          { x: 4,  y: 6,  r: -20, s: 0.9 }, { x: 91, y: 4,  r: 18,  s: 0.8 },
          { x: 12, y: 22, r: 32,  s: 0.65 },{ x: 87, y: 19, r: -28, s: 0.9 },
          { x: 2,  y: 44, r: 12,  s: 0.55 },{ x: 95, y: 38, r: -14, s: 0.6 },
          { x: 7,  y: 64, r: 26,  s: 0.7 }, { x: 90, y: 59, r: -32, s: 0.5 },
          { x: 18, y: 80, r: -10, s: 0.45 },{ x: 82, y: 77, r: 22,  s: 0.45 },
          { x: 50, y: 3,  r: -5,  s: 0.5 }, { x: 35, y: 92, r: 15,  s: 0.4 },
        ].map((leaf, i) => (
          <svg key={i} width="28" height="28" style={{
            position: 'absolute', left: `${leaf.x}%`, top: `${leaf.y}%`,
            opacity: 0.18 + (i % 5) * 0.06,
            transform: `rotate(${leaf.r}deg) scale(${leaf.s})`,
          }}>
            <ellipse cx="14" cy="14" rx="5" ry="11" fill="#A5D6A7" transform="rotate(-30 14 14)" />
            <line x1="14" y1="5" x2="14" y2="22" stroke="#81C784" strokeWidth="1.2" />
          </svg>
        ))}
      </div>

      {/* Bottom tree silhouette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none"
          style={{ width: '100%', height: 160, display: 'block' }}>
          <ellipse cx="65"   cy="135" rx="58" ry="78" fill="rgba(0,0,0,0.18)" />
          <ellipse cx="48"   cy="155" rx="44" ry="62" fill="rgba(21,80,26,0.55)" />
          <rect x="54"  y="175" width="14" height="30" fill="rgba(0,0,0,0.28)" />
          <ellipse cx="205"  cy="122" rx="68" ry="88" fill="rgba(0,0,0,0.14)" />
          <ellipse cx="188"  cy="143" rx="52" ry="72" fill="rgba(21,80,26,0.48)" />
          <rect x="196" y="178" width="16" height="28" fill="rgba(0,0,0,0.28)" />
          <ellipse cx="1135" cy="135" rx="58" ry="78" fill="rgba(0,0,0,0.18)" />
          <ellipse cx="1152" cy="155" rx="44" ry="62" fill="rgba(21,80,26,0.55)" />
          <rect x="1138" y="175" width="14" height="30" fill="rgba(0,0,0,0.28)" />
          <ellipse cx="995"  cy="122" rx="68" ry="88" fill="rgba(0,0,0,0.14)" />
          <ellipse cx="1012" cy="143" rx="52" ry="72" fill="rgba(21,80,26,0.48)" />
          <rect x="1000" y="178" width="16" height="28" fill="rgba(0,0,0,0.28)" />
          <rect x="0" y="188" width="1200" height="16" fill="rgba(0,0,0,0.32)" />
        </svg>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">

        {/* Logo + heading */}
        <div className="text-center mb-7">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10,
                        filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.45))' }}>
            <LocalConnectLogo />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 4,
                       textShadow: '0 2px 8px rgba(0,0,0,0.5)', letterSpacing: '-0.3px' }}>
            Local Connect
          </h1>
          <p style={{ color: '#C8E6C9', fontSize: 14 }}>
            Bringing local businesses closer to you
          </p>
        </div>

        {/* Login card */}
        <div style={{
          width: '100%', maxWidth: 380,
          background: 'white',
          borderRadius: 24,
          padding: '32px 28px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B5E20',
                       marginBottom: 22, textAlign: 'center' }}>
            Welcome back
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600,
                              color: '#374151', marginBottom: 6 }}>
                Username / Phone / Email
              </label>
              <input
                type="text" name="emailOrPhone" value={form.emailOrPhone}
                onChange={handleChange} placeholder="Username, phone or email" required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  border: '1.5px solid #E5E7EB', borderRadius: 12,
                  padding: '12px 14px', fontSize: 14, color: '#111',
                  outline: 'none', fontFamily: 'inherit', background: '#F9FAFB',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = '#2E7D32'; e.target.style.background = 'white'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600,
                              color: '#374151', marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password" name="password" value={form.password}
                onChange={handleChange} placeholder="Enter password" required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  border: '1.5px solid #E5E7EB', borderRadius: 12,
                  padding: '12px 14px', fontSize: 14, color: '#111',
                  outline: 'none', fontFamily: 'inherit', background: '#F9FAFB',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = '#2E7D32'; e.target.style.background = 'white'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
              />
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '13px', borderRadius: 14, border: 'none',
                background: loading ? '#9CA3AF'
                  : 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
                color: 'white', fontWeight: 700, fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 14px rgba(46,125,50,0.45)',
                fontFamily: 'inherit', transition: 'opacity 0.2s',
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginTop: 20 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#2E7D32', fontWeight: 700, textDecoration: 'none' }}>
              Register
            </Link>
          </p>
        </div>

        <p style={{ color: '#A5D6A7', fontSize: 12, marginTop: 22, fontWeight: 500 }}>
          Everything You Need. Closer Than Ever.
        </p>
      </div>

      <div style={{ height: 110 }} />
    </div>
  );
};

export default LoginPage;
