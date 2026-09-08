import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_META = {
  CUSTOMER:  { label: 'Customer',          color: '#16A34A', bg: '#DCFCE7', emoji: '🛒' },
  MERCHANT:  { label: 'Business Owner',    color: '#7C3AED', bg: '#EDE9FE', emoji: '🏪' },
  ADMIN:     { label: 'Administrator',     color: '#DC2626', bg: '#FEE2E2', emoji: '🔐' },
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, location } = useAuth();

  const meta = ROLE_META[user?.role] || ROLE_META.CUSTOMER;
  const firstName = user?.name?.split(' ')[0] || 'User';
  const initials = (user?.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 100 }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(160deg, #1E7B3B 0%, #2F855A 100%)', padding: '56px 20px 32px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 900, color: 'white', margin: '0 auto 14px',
            border: '3px solid rgba(255,255,255,.4)',
          }}>
            {initials}
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: '-.3px' }}>{user?.name || 'User'}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 4 }}>{user?.email || user?.phone || ''}</div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: meta.bg, borderRadius: 100, padding: '5px 14px', marginTop: 12,
          }}>
            <span style={{ fontSize: 14 }}>{meta.emoji}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: meta.color }}>{meta.label}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>

        {/* LOCATION CARD */}
        <div style={{
          background: 'var(--card)', borderRadius: 16, border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)', padding: '16px 18px', marginBottom: 14,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>📍</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 3 }}>Current Location</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{location?.name || 'Not set'}</div>
            {location?.district && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{location.district} · Andhra Pradesh</div>}
          </div>
          <button onClick={() => navigate('/location')} style={{
            background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10,
            padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>Change</button>
        </div>

        {/* ROLE-SPECIFIC ACTIONS */}
        {user?.role === 'MERCHANT' && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 10, paddingLeft: 2 }}>Merchant Actions</div>
            {[
              { icon: '📊', label: 'My Dashboard', sub: 'Manage your shop & products', path: '/merchant/dashboard' },
              { icon: '➕', label: 'Add New Shop',  sub: 'Register another business',   path: '/merchant/add-shop' },
            ].map(item => (
              <div key={item.label} onClick={() => navigate(item.path)} style={{
                background: 'var(--card)', borderRadius: 14, border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)', padding: '14px 16px', marginBottom: 10,
                display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{item.sub}</div>
                </div>
                <span style={{ color: 'var(--text-3)', fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>
        )}

        {user?.role === 'ADMIN' && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 10, paddingLeft: 2 }}>Admin</div>
            <div onClick={() => navigate('/admin')} style={{
              background: 'var(--card)', borderRadius: 14, border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)', padding: '14px 16px', marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🔐</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Admin Dashboard</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Manage users, shops &amp; platform</div>
              </div>
              <span style={{ color: 'var(--text-3)', fontSize: 18 }}>›</span>
            </div>
          </div>
        )}

        {/* ACCOUNT INFO */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 10, paddingLeft: 2 }}>Account</div>
          {[
            { icon: '👤', label: 'Full Name', value: user?.name },
            { icon: '📧', label: 'Email',     value: user?.email || '—' },
            { icon: '📱', label: 'Phone',     value: user?.phone || '—' },
            { icon: '🏘️',  label: 'Village',  value: user?.village || location?.name || '—' },
          ].map(row => (
            <div key={row.label} style={{
              background: 'var(--card)', borderRadius: 14, border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)', padding: '12px 16px', marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{row.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{row.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>{row.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* LOGOUT */}
        <button onClick={handleLogout} style={{
          width: '100%', padding: '15px', borderRadius: 14,
          background: '#FEF2F2', border: '1.5px solid #FECACA',
          color: '#DC2626', fontSize: 15, fontWeight: 800,
          cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span>🚪</span> Logout
        </button>

      </div>
    </div>
  );
};

export default ProfilePage;
