import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

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
      background: 'linear-gradient(160deg, #1a237e 0%, #283593 30%, #1565C0 60%, #0277BD 100%)'
    }}>

      {/* Decorative top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 300,
        background: 'radial-gradient(ellipse, rgba(255,224,130,0.18) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Stars */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[
          [8,6],[15,12],[25,4],[38,9],[52,5],[65,11],[78,6],[88,14],[95,8],
          [12,22],[30,18],[48,25],[62,19],[75,23],[90,17],
          [5,35],[20,32],[42,38],[58,30],[80,36],[96,33],
        ].map(([x, y], i) => (
          <div key={i} style={{
            position: 'absolute', left: `${x}%`, top: `${y}%`,
            width: i % 4 === 0 ? 3 : 2, height: i % 4 === 0 ? 3 : 2,
            borderRadius: '50%', background: 'white',
            opacity: 0.4 + (i % 5) * 0.12,
          }} />
        ))}
      </div>

      {/* Village rooftop silhouette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1200 220" preserveAspectRatio="none"
          style={{ width: '100%', height: 180, display: 'block' }}>
          {/* Back row — lighter */}
          <polygon points="0,180 60,120 120,180 180,100 240,180 300,130 360,180 420,110 480,180 540,125 600,180 660,115 720,180 780,105 840,180 900,120 960,180 1020,110 1080,180 1140,125 1200,180 1200,220 0,220" fill="rgba(255,255,255,0.06)" />
          {/* Front row — darker */}
          <polygon points="0,200 80,150 130,200 190,135 250,200 310,155 370,200 440,140 510,200 570,148 630,200 700,142 760,200 820,150 890,200 950,145 1010,200 1080,155 1140,200 1200,158 1200,220 0,220" fill="rgba(0,0,0,0.25)" />
          {/* Tiny chimney details */}
          <rect x="95" y="148" width="8" height="20" fill="rgba(0,0,0,0.2)" />
          <rect x="255" y="160" width="8" height="18" fill="rgba(0,0,0,0.2)" />
          <rect x="445" y="148" width="8" height="20" fill="rgba(0,0,0,0.2)" />
          <rect x="705" y="150" width="8" height="18" fill="rgba(0,0,0,0.2)" />
          <rect x="955" y="152" width="8" height="18" fill="rgba(0,0,0,0.2)" />
        </svg>
      </div>

      {/* Moon */}
      <div style={{
        position: 'absolute', top: 28, right: 60,
        width: 52, height: 52,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 40%, #FFF9C4, #FFE082)',
        boxShadow: '0 0 30px 10px rgba(255,224,130,0.2)',
        pointerEvents: 'none'
      }} />

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">

        {/* Logo + heading */}
        <div className="text-center mb-7">
          <div style={{ fontSize: 54, marginBottom: 8,
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>🏘️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 4,
                       textShadow: '0 2px 8px rgba(0,0,0,0.5)', letterSpacing: '-0.3px' }}>
            Welcome back
          </h1>
          <p style={{ color: '#B3D1FF', fontSize: 14 }}>
            Your village. Your people. Your shops.
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600,
                              color: '#374151', marginBottom: 6 }}>
                Phone or Email
              </label>
              <input
                type="text" name="emailOrPhone" value={form.emailOrPhone}
                onChange={handleChange} placeholder="9999999999 or email" required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  border: '1.5px solid #E5E7EB', borderRadius: 12,
                  padding: '12px 14px', fontSize: 14, color: '#111',
                  outline: 'none', fontFamily: 'inherit', background: '#F9FAFB',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = '#1565C0'; e.target.style.background = 'white'; }}
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
                onFocus={e => { e.target.style.borderColor = '#1565C0'; e.target.style.background = 'white'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
              />
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '13px', borderRadius: 14, border: 'none',
                background: loading ? '#9CA3AF'
                  : 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                color: 'white', fontWeight: 700, fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 14px rgba(21,101,192,0.4)',
                fontFamily: 'inherit', transition: 'opacity 0.2s',
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginTop: 20 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1565C0', fontWeight: 700,
                                          textDecoration: 'none' }}>
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom padding so card doesn't sit on silhouette */}
      <div style={{ height: 100 }} />
    </div>
  );
};

export default LoginPage;
