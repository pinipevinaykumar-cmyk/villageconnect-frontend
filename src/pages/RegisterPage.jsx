import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import VillageBg from '../components/VillageBg';

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

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'MERCHANT' ? 'MERCHANT' : 'CUSTOMER';
  const [form, setForm] = useState({
    name: '', password: '', role: initialRole, village: 'Pandalapaka'
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/register', form);
      const { token, ...userData } = res.data.data;
      login(userData, token);
      toast.success('Account created successfully!');
      if (userData.role === 'MERCHANT') navigate('/merchant/add-shop');
      else navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Server may be starting up — please try again in 30 seconds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <VillageBg />

      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        paddingTop: 28, paddingBottom: 0,
        paddingLeft: 16, paddingRight: 16,
      }}>
        {/* Logo + heading */}
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6,
                        filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.35))' }}>
            <LocalConnectLogo />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: 'white', margin: '2px 0 2px',
                       textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}>
            Local Connect
          </h1>
          <p style={{ color: '#F1F8E9', fontSize: 13, fontWeight: 600,
                      textShadow: '0 1px 6px rgba(0,0,0,0.45)', margin: 0 }}>
            Bringing local businesses closer to you
          </p>
        </div>

        {/* Registration card */}
        <div style={{
          width: '100%', maxWidth: 380,
          background: 'white',
          borderRadius: 24,
          padding: '28px 24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1B5E20',
                       marginBottom: 16, textAlign: 'center' }}>
            Create your account
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Role toggle */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600,
                              color: '#374151', marginBottom: 8 }}>
                I am a
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['CUSTOMER', 'MERCHANT'].map((r) => (
                  <button key={r} type="button" onClick={() => setForm({ ...form, role: r })}
                    style={{
                      padding: '10px 0', borderRadius: 12, fontFamily: 'inherit',
                      fontSize: 14, fontWeight: 600, cursor: 'pointer',
                      border: form.role === r ? '2px solid #2E7D32' : '2px solid #E5E7EB',
                      background: form.role === r ? '#F1F8E9' : 'white',
                      color: form.role === r ? '#1B5E20' : '#6B7280',
                      transition: 'all 0.15s',
                    }}>
                    {r === 'CUSTOMER' ? '👤 Customer' : '🏪 Shop Owner'}
                  </button>
                ))}
              </div>
            </div>

            {/* Username */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600,
                              color: '#374151', marginBottom: 6 }}>
                Username
              </label>
              <input
                type="text" name="name" value={form.name}
                onChange={handleChange} placeholder="Choose a username" required
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

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600,
                              color: '#374151', marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password" name="password" value={form.password}
                onChange={handleChange} placeholder="Min 6 characters" required
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
                marginTop: 4,
              }}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginTop: 18 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2E7D32', fontWeight: 700, textDecoration: 'none' }}>
              Login
            </Link>
          </p>
        </div>
      </div>

      <div style={{ height: 220 }} />
    </div>
  );
};

export default RegisterPage;
