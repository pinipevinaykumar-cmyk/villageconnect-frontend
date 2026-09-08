import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Phone, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const QUICK_ACTIONS = [
  { icon: '🏪', label: 'Businesses', path: '/shops' },
  { icon: '🏥', label: 'Healthcare', path: '/healthcare' },
  { icon: '🛠', label: 'Services',   path: '/services' },
  { icon: '📢', label: 'Community',  path: '/community' },
  { icon: '🔍', label: 'Discover',   path: '/discover' },
  { icon: '📞', label: 'Emergency',  path: null, action: 'emergency' },
  { icon: '🟢', label: 'Open Now',   path: '/shops?status=open' },
  { icon: '👤', label: 'My Profile', path: null, action: 'profile' },
];

const COMMUNITY_POSTS = [
  { id: 1, icon: '🩸', title: 'Blood Donors Needed', sub: 'B+ required at GGH · Urgent', badge: 'Urgent', badgeBg: '#FEE2E2', badgeColor: '#DC2626' },
  { id: 2, icon: '📢', title: 'Road Closure Alert',  sub: 'MG Road closed until Friday',  badge: 'Alert',  badgeBg: '#FEF3C7', badgeColor: '#D97706' },
  { id: 3, icon: '🤝', title: 'Volunteer Drive',     sub: 'Town Park cleanup Sunday 7AM', badge: 'Event',  badgeBg: '#EFF6FF', badgeColor: '#3B82F6' },
];

const S = {
  hero: {
    background: 'linear-gradient(160deg, #1E7B3B 0%, #2F855A 100%)',
    padding: '52px 18px 24px',
    color: 'white',
  },
  heroRow: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' },
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
  const { user, location } = useAuth();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Promise.all([API.get('/public/shops'), API.get('/public/categories')])
      .then(([s]) => { setShops(s.data.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/discover?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleQuickAction = (a) => {
    if (a.action === 'emergency') {
      toast('Call 112 for Police · 108 for Ambulance · 101 for Fire', { icon: '🚨', duration: 5000, style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } });
      return;
    }
    if (a.action === 'profile') {
      toast(`Logged in as ${user?.name || 'User'} (${user?.role})`, { icon: '👤', style: { fontFamily: 'Inter, sans-serif' } });
      return;
    }
    navigate(a.path);
  };

  const firstName = user?.name?.split(' ')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 5 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const locationName = location?.name?.toLowerCase().trim();
  const nearbyShops = locationName
    ? shops.filter(s => (s.village || '').toLowerCase().trim() === locationName)
    : shops;
  const openShops = nearbyShops.filter(s => s.currentStatus === 'OPEN');

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 90 }}>

      {/* HERO */}
      <div style={S.hero}>
        <div style={S.heroRow}>
          <div>
            <div style={S.greeting}>{greeting} 👋</div>
            <div style={S.name}>{firstName}</div>
            <div style={S.locationPill} onClick={() => navigate('/location')}>
              📍 {location?.name || 'Select Location'}
            </div>
          </div>
          <button
            style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: 4 }}
            onClick={() => toast('Notifications coming soon!', { icon: '🔔' })}>
            <Bell size={18} color="white" />
          </button>
        </div>
        <form onSubmit={handleSearch}>
          <div style={S.searchBox}>
            <Search size={16} color="var(--text-3)" />
            <input
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              placeholder="What are you looking for today?"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: 'var(--text)', background: 'transparent', fontFamily: 'inherit' }}
            />
          </div>
        </form>
      </div>

      {/* QUICK ACCESS */}
      <div style={S.sectionWrap}>
        <div style={S.sectionHead}>
          <div style={S.sectionTitle}>Quick Access</div>
        </div>
        <div style={S.qaGrid}>
          {QUICK_ACTIONS.map(a => (
            <div key={a.label} style={S.qaItem} onClick={() => handleQuickAction(a)}>
              <div style={S.qaIcon}>{a.icon}</div>
              <div style={S.qaLabel}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NEARBY BUSINESSES */}
      <div style={S.sectionWrap}>
        <div style={S.sectionHead}>
          <div style={S.sectionTitle}>
            {location?.name ? `Businesses in ${location.name}` : 'Nearby Businesses'}
          </div>
          <div style={S.seeAll} onClick={() => navigate('/shops')}>View All <ChevronRight size={13} /></div>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-3)', fontSize: 13 }}>Loading...</div>
        ) : nearbyShops.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 20px', background: 'var(--card)', borderRadius: 14, border: '1px dashed var(--border)' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🌱</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>
              Coming soon to {location?.name || 'your area'}!
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6 }}>
              No businesses registered here yet.<br />Be the first to list your shop!
            </div>
            <button onClick={() => navigate('/register')} style={{
              marginTop: 14, background: 'var(--primary)', color: 'white', border: 'none',
              borderRadius: 100, padding: '9px 20px', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Register your Business →</button>
          </div>
        ) : (
          nearbyShops.slice(0, 4).map(shop => <ShopRow key={shop.id} shop={shop} />)
        )}
      </div>

      {/* OPEN NOW */}
      {openShops.length > 0 && (
        <div style={S.sectionWrap}>
          <div style={S.sectionHead}>
            <div style={S.sectionTitle}>Open Now 🟢</div>
            <div style={S.seeAll} onClick={() => navigate('/shops')}>View All <ChevronRight size={13} /></div>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }} className="scroll-hide">
            {openShops.slice(0, 3).map(shop => {
              const isOpen = shop.currentStatus === 'OPEN';
              return (
                <div key={shop.id}
                  onClick={() => navigate(`/shops/${shop.id}`)}
                  style={{ background: 'var(--card)', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', width: 160, flexShrink: 0, cursor: 'pointer', overflow: 'hidden' }}>
                  <div style={{ height: 80, background: 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                    {shop.imageUrl ? <img src={shop.imageUrl} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : shop.category?.icon || '🏪'}
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shop.name}</div>
                    <div style={S.badge(isOpen)}><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} /> Open</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* COMMUNITY UPDATES */}
      <div style={S.sectionWrap}>
        <div style={S.sectionHead}>
          <div style={S.sectionTitle}>Community Updates</div>
          <div style={S.seeAll} onClick={() => navigate('/community')}>View All <ChevronRight size={13} /></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {COMMUNITY_POSTS.map(post => (
            <div key={post.id}
              onClick={() => navigate('/community')}
              style={{ background: 'var(--card)', borderRadius: 14, padding: '14px 16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{post.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{post.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{post.sub}</div>
              </div>
              <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: post.badgeBg, color: post.badgeColor }}>{post.badge}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
