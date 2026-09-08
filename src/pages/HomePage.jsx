import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Phone } from 'lucide-react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const QUICK_ACTIONS = [
  { icon: '🏥', label: 'Healthcare', path: '/shops?categoryId=4' },
  { icon: '🏫', label: 'Education',  path: '/shops' },
  { icon: '🏪', label: 'Businesses', path: '/shops' },
  { icon: '⚽', label: 'Sports',     path: '/shops' },
  { icon: '📅', label: 'Events',     path: '/shops' },
  { icon: '🛠', label: 'Services',   path: '/shops' },
  { icon: '📢', label: 'Community',  path: '/shops' },
  { icon: '🚨', label: 'Emergency',  path: '/shops' },
];

const S = {
  hero: {
    background: 'linear-gradient(160deg, #1E7B3B 0%, #2F855A 100%)',
    padding: '52px 18px 24px',
    color: 'white',
  },
  greeting:   { fontSize: 13, color: 'rgba(255,255,255,.75)', fontWeight: 500 },
  name:       { fontSize: 24, fontWeight: 900, marginTop: 2, letterSpacing: '-.5px' },
  locationPill: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    background: 'rgba(255,255,255,.18)', borderRadius: 100,
    padding: '5px 14px', marginTop: 10, fontSize: 12, fontWeight: 600,
    backdropFilter: 'blur(8px)', cursor: 'pointer',
  },
  searchBox: {
    background: 'white', borderRadius: 14, padding: '13px 16px',
    display: 'flex', alignItems: 'center', gap: 10, marginTop: 16,
    boxShadow: '0 8px 24px rgba(0,0,0,.18)',
  },
  searchText: { fontSize: 13, color: 'var(--text-3)', flex: 1 },

  emergencyBanner: {
    margin: '16px 16px 0',
    background: 'linear-gradient(135deg, #EF4444, #DC2626)',
    borderRadius: 14, padding: '14px 16px',
    display: 'flex', alignItems: 'center', gap: 12,
    boxShadow: '0 6px 20px rgba(239,68,68,.3)',
  },

  sectionWrap:  { padding: '20px 16px 0' },
  sectionHead:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: 800, color: 'var(--text)' },
  seeAll:       { fontSize: 12, color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 },

  qaGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 },
  qaItem: {
    background: 'var(--card)', borderRadius: 14, padding: '14px 6px 12px',
    textAlign: 'center', boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border)', cursor: 'pointer',
  },
  qaIcon:  { fontSize: 24, lineHeight: 1, marginBottom: 6 },
  qaLabel: { fontSize: 9.5, fontWeight: 600, color: 'var(--text-2)', lineHeight: 1.3 },

  shopRow: {
    background: 'var(--card)', borderRadius: 14, padding: '14px',
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
    boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', cursor: 'pointer',
  },
  shopThumb: {
    width: 54, height: 54, borderRadius: 13, background: 'var(--green-50)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, flexShrink: 0, overflow: 'hidden',
  },
  shopName: { fontSize: 13, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  shopMeta: { fontSize: 11, color: 'var(--text-3)', marginTop: 3 },

  badge: (open) => ({
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 9px', borderRadius: 100, fontSize: 10, fontWeight: 700, marginTop: 3,
    background: open ? 'var(--green-100)' : 'var(--red-light)',
    color: open ? '#15803D' : 'var(--red)',
  }),

  eventCard: {
    background: 'var(--card)', borderRadius: 14, overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)',
    width: 180, flexShrink: 0,
  },
  eventImg: {
    height: 92, background: 'linear-gradient(135deg, var(--primary), var(--accent))',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34,
  },
};

const ShopRow = ({ shop }) => {
  const navigate = useNavigate();
  const isOpen = shop.currentStatus === 'OPEN';
  return (
    <div style={S.shopRow} onClick={() => navigate(`/shops/${shop.id}`)}>
      <div style={S.shopThumb}>
        {shop.imageUrl
          ? <img src={shop.imageUrl} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span>{shop.category?.icon || '🏪'}</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={S.shopName}>{shop.name}</div>
        <div style={S.badge(isOpen)}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
          {isOpen ? 'Open' : 'Closed'}
        </div>
        <div style={S.shopMeta}>{shop.category?.name}{shop.village ? ` · ${shop.village}` : ''}</div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {shop.phone && (
          <button onClick={e => { e.stopPropagation(); window.open(`tel:${shop.phone}`); }}
            style={{ width: 34, height: 34, borderRadius: '50%', border: 'none', background: 'var(--green-50)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={15} color="var(--primary)" />
          </button>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [shops, setShops]         = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    Promise.all([API.get('/public/shops'), API.get('/public/categories')])
      .then(([s, c]) => { setShops(s.data.data || []); setCategories(c.data.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    navigate(`/shops?q=${searchTerm}`);
  };

  const firstName = user?.name?.split(' ')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 90 }}>

      {/* ── HERO ── */}
      <div style={S.hero}>
        <div style={S.greeting}>{greeting} 👋</div>
        <div style={S.name}>{firstName}</div>
        <div style={S.locationPill}>📍 All India</div>
        <form onSubmit={handleSearch}>
          <div style={S.searchBox}>
            <Search size={16} color="var(--text-3)" />
            <input
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              placeholder="What are you looking for today?"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: 'var(--text)', background: 'transparent', fontFamily: 'inherit' }}
            />
            <span style={{ fontSize: 18, cursor: 'pointer' }}>🎙</span>
          </div>
        </form>
      </div>

      {/* ── EMERGENCY BANNER ── */}
      <div style={S.emergencyBanner}>
        <span style={{ fontSize: 24 }}>🩸</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>Urgent: Blood Donors Needed</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.8)', marginTop: 2 }}>B+ required at GGH · Call 108</div>
        </div>
        <button style={{ background: 'white', color: '#DC2626', borderRadius: 100, padding: '6px 14px', fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          Help Now
        </button>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div style={S.sectionWrap}>
        <div style={S.sectionHead}>
          <div style={S.sectionTitle}>Quick Access</div>
        </div>
        <div style={S.qaGrid}>
          {QUICK_ACTIONS.map(a => (
            <div key={a.label} style={S.qaItem} onClick={() => navigate(a.path)}>
              <div style={S.qaIcon}>{a.icon}</div>
              <div style={S.qaLabel}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SHOPS ── */}
      <div style={S.sectionWrap}>
        <div style={S.sectionHead}>
          <div style={S.sectionTitle}>Shops in India</div>
          <div style={S.seeAll} onClick={() => navigate('/shops')}>View All <ChevronRight size={13} /></div>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-3)', fontSize: 13 }}>Loading shops...</div>
        ) : shops.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', background: 'var(--card)', borderRadius: 14, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🏪</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-2)' }}>No shops yet</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>Be the first to add a shop</div>
          </div>
        ) : (
          shops.slice(0, 4).map(shop => <ShopRow key={shop.id} shop={shop} />)
        )}
      </div>

      {/* ── CATEGORIES ── */}
      {categories.length > 0 && (
        <div style={S.sectionWrap}>
          <div style={S.sectionHead}>
            <div style={S.sectionTitle}>Popular Categories</div>
            <div style={S.seeAll} onClick={() => navigate('/shops')}>View All <ChevronRight size={13} /></div>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }} className="scroll-hide">
            {categories.map(cat => (
              <button key={cat.id}
                onClick={() => navigate(`/shops?categoryId=${cat.id}`)}
                style={{
                  flexShrink: 0, width: 80, background: 'var(--card)', borderRadius: 14,
                  border: '1px solid var(--border)', padding: '14px 6px 12px',
                  cursor: 'pointer', textAlign: 'center', boxShadow: 'var(--shadow-sm)',
                  fontFamily: 'inherit',
                }}>
                <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.icon || '🏪'}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-2)', lineHeight: 1.3 }}>{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── TODAY'S EVENTS ── */}
      <div style={S.sectionWrap}>
        <div style={S.sectionHead}>
          <div style={S.sectionTitle}>Today in Your Area</div>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }} className="scroll-hide">
          {[
            { emoji: '🏏', title: 'Cricket Tournament', time: 'Ground 1 · 6 AM' },
            { emoji: '🎭', title: 'Cultural Program',   time: 'Town Hall · 7 PM' },
            { emoji: '🩺', title: 'Free Health Camp',   time: 'PHC Centre · 9 AM' },
          ].map(ev => (
            <div key={ev.title} style={S.eventCard}>
              <div style={S.eventImg}>{ev.emoji}</div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{ev.title}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>Today · {ev.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
