import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

const StatCard = ({ emoji, label, value, bg }) => (
  <div style={{
    background: 'var(--card)', borderRadius: 14, border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-sm)', padding: '14px',
    display: 'flex', alignItems: 'center', gap: 12,
  }}>
    <div style={{ width: 42, height: 42, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{emoji}</div>
    <div>
      <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{value ?? '—'}</div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3, fontWeight: 500 }}>{label}</div>
    </div>
  </div>
);

const RoleBadge = ({ role }) => {
  const map = { MERCHANT: ['#7C3AED', '#EDE9FE'], ADMIN: ['#DC2626', '#FEE2E2'], CUSTOMER: ['#16A34A', '#DCFCE7'] };
  const [color, bg] = map[role] || map.CUSTOMER;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: bg, color }}>{role}</span>
  );
};

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('users');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') navigate('/home');
  }, [user, navigate]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, shopsRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/users'),
        API.get('/admin/shops'),
      ]);
      setStats(statsRes.data.data);
      setUsers(usersRes.data.data || []);
      setShops(shopsRes.data.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleUser = async (id) => {
    try {
      await API.put(`/admin/users/${id}/toggle-active`);
      setUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
    } catch (err) { console.error(err); }
  };

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 32 }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(160deg, #1E7B3B 0%, #2F855A 100%)', padding: '52px 18px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <button onClick={() => navigate('/home')} style={{
            background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 10,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <span style={{ color: 'white', fontSize: 18 }}>←</span>
          </button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>Admin Dashboard</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>Platform overview &amp; management</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>

        {/* STATS */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 16 }}>
            <StatCard emoji="👥" label="Total Users"   value={stats.totalUsers}    bg="#DCFCE7" />
            <StatCard emoji="🏪" label="Merchants"     value={stats.totalMerchants} bg="#EDE9FE" />
            <StatCard emoji="🛒" label="Customers"     value={stats.totalCustomers} bg="#DBEAFE" />
            <StatCard emoji="🏬" label="Total Shops"   value={stats.totalShops}    bg="#FEF3C7" />
            <StatCard emoji="🟢" label="Open Now"      value={stats.openShops}     bg="#D1FAE5" />
            <StatCard emoji="📦" label="Products"      value={stats.totalProducts} bg="#FFE4E6" />
          </div>
        )}

        {/* TABS */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[['users', '👥', `Users (${users.length})`], ['shops', '🏪', `Shops (${shops.length})`]].map(([key, icon, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              background: tab === key ? 'var(--primary)' : 'var(--card)',
              color: tab === key ? 'white' : 'var(--text-2)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-3)', fontSize: 13 }}>Loading...</div>
        ) : tab === 'users' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {users.map(u => (
              <div key={u.id} style={{
                background: 'var(--card)', borderRadius: 14, border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: u.role === 'MERCHANT' ? '#EDE9FE' : u.role === 'ADMIN' ? '#FEE2E2' : '#DCFCE7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 900, flexShrink: 0,
                  color: u.role === 'MERCHANT' ? '#7C3AED' : u.role === 'ADMIN' ? '#DC2626' : '#16A34A',
                }}>
                  {(u.name || 'U')[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{u.name}</span>
                    <RoleBadge role={u.role} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{u.email || u.phone}</div>
                  {u.village && <div style={{ fontSize: 10, color: 'var(--text-3)' }}>📍 {u.village}</div>}
                </div>
                <button onClick={() => toggleUser(u.id)} style={{
                  width: 44, height: 26, borderRadius: 100, border: 'none', cursor: 'pointer', flexShrink: 0,
                  background: u.isActive ? '#16A34A' : '#D1D5DB', transition: 'background .2s',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: 3, borderRadius: '50%', width: 20, height: 20, background: 'white',
                    transition: 'left .2s', left: u.isActive ? 21 : 3,
                  }} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {shops.map(s => (
              <div key={s.id} style={{
                background: 'var(--card)', borderRadius: 14, border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {s.category?.icon || '🏪'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{s.name}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                      background: s.currentStatus === 'OPEN' ? '#DCFCE7' : '#FEE2E2',
                      color: s.currentStatus === 'OPEN' ? '#16A34A' : '#DC2626',
                    }}>{s.currentStatus}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{s.category?.name || '—'}{s.village ? ` · ${s.village}` : ''}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Owner: {s.ownerName || s.merchant?.name || '—'}</div>
                </div>
                {s.phone && (
                  <a href={`tel:${s.phone}`} style={{
                    width: 36, height: 36, borderRadius: '50%', background: '#DCFCE7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, textDecoration: 'none', flexShrink: 0,
                  }}>📞</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
