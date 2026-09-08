import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Logo = () => (
  <svg width="44" height="44" viewBox="0 0 62 74" fill="none">
    <path d="M31 2C16.6 2 5 13.6 5 28C5 46.5 31 72 31 72C31 72 57 46.5 57 28C57 13.6 45.4 2 31 2Z" fill="rgba(255,255,255,0.2)"/>
    <circle cx="31" cy="28" r="21" fill="rgba(255,255,255,0.15)"/>
    <polygon points="31,14 18,23 44,23" fill="white"/>
    <rect x="18" y="23" width="26" height="20" rx="1" fill="white"/>
    <rect x="26" y="31" width="10" height="12" rx="1" fill="#1E7B3B"/>
    <rect x="19" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
    <rect x="36" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
  </svg>
);

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  border: '1.5px solid #E2E8F0', borderRadius: 12,
  padding: '13px 14px', fontSize: 14, color: '#0F172A',
  outline: 'none', fontFamily: 'inherit', background: '#F8FAFC',
  transition: 'all .15s',
};

const LoginPage = () => {
  const [form, setForm] = useState({ emailOrPhone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
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
      if (err.code === 'ECONNABORTED' || !err.response) {
        toast.error('Server is waking up — please wait 30 seconds and try again.');
      } else {
        toast.error(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0F172A 0%, #1a2744 45%, #1E7B3B 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px 20px',
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Background glows */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,123,59,.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Back to landing */}
      <button onClick={() => navigate('/')}
        style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 10, padding: '8px 14px', color: 'rgba(255,255,255,.7)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(8px)' }}>
        ← Back
      </button>

      {/* Logo + brand */}
      <div style={{ textAlign: 'center', marginBottom: 28, position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,.4))' }}>
          <Logo />
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: 'white', letterSpacing: '-0.5px', marginBottom: 4 }}>Local Connect</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>One Place for Everything</div>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 400, position: 'relative', zIndex: 10,
        background: 'white', borderRadius: 24, padding: '32px 28px',
        boxShadow: '0 24px 80px rgba(0,0,0,.4)',
      }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.3px', marginBottom: 4 }}>Welcome back 👋</div>
          <div style={{ fontSize: 13, color: '#94A3B8' }}>Login to your Local Connect account</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              Username / Phone / Email
            </label>
            <input
              type="text" name="emailOrPhone" value={form.emailOrPhone}
              onChange={handleChange} placeholder="Enter your username or email" required
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = '#1E7B3B'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(30,123,59,.12)'; }}
              onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'} name="password" value={form.password}
                onChange={handleChange} placeholder="Enter your password" required
                style={{ ...inputStyle, paddingRight: 46 }}
                onFocus={e => { e.target.style.borderColor = '#1E7B3B'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(30,123,59,.12)'; }}
                onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
              <button type="button" onClick={() => setShow(!show)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#94A3B8' }}>
                {show ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px', borderRadius: 14, border: 'none',
              background: loading ? '#94A3B8' : 'linear-gradient(135deg, #1E7B3B, #2F855A)',
              color: 'white', fontWeight: 800, fontSize: 15,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 6px 20px rgba(30,123,59,.4)',
              fontFamily: 'inherit', letterSpacing: '-0.2px', marginTop: 4,
            }}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <div style={{ marginTop: 22, paddingTop: 20, borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
          <span style={{ fontSize: 14, color: '#94A3B8' }}>Don't have an account? </span>
          <Link to="/register" style={{ fontSize: 14, fontWeight: 700, color: '#1E7B3B', textDecoration: 'none' }}>
            Sign up free →
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 24, fontSize: 11, color: 'rgba(255,255,255,.25)', fontWeight: 600, textAlign: 'center', position: 'relative', zIndex: 10 }}>
        Discover · Connect · Grow
      </div>
    </div>
  );
};

export default LoginPage;
