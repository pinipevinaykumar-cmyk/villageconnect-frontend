import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Phone } from 'lucide-react';
import API from '../api/axios';

const HEALTH_KEYWORDS = ['health', 'hospital', 'clinic', 'doctor', 'pharmacy', 'medical'];
const SUB_CATS = ['All', 'Doctors', 'Hospitals', 'Clinics', 'Pharmacies'];

const HealthcarePage = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSub, setActiveSub] = useState('All');

  useEffect(() => {
    const load = async () => {
      try {
        const catRes = await API.get('/public/categories');
        const cats = catRes.data.data || [];
        const healthCats = cats.filter(c =>
          HEALTH_KEYWORDS.some(kw => c.name.toLowerCase().includes(kw))
        );
        let allShops = [];
        if (healthCats.length > 0) {
          const results = await Promise.all(
            healthCats.map(c => API.get('/public/shops', { params: { categoryId: c.id } }))
          );
          results.forEach(r => { allShops = allShops.concat(r.data.data || []); });
          // deduplicate by id
          const seen = new Set();
          allShops = allShops.filter(s => { if (seen.has(s.id)) return false; seen.add(s.id); return true; });
        } else {
          const res = await API.get('/public/shops');
          allShops = res.data.data || [];
        }
        setShops(allShops);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const subFilter = (shop) => {
    if (activeSub === 'All') return true;
    const name = (shop.category?.name || '').toLowerCase();
    if (activeSub === 'Doctors') return name.includes('doctor') || name.includes('physician');
    if (activeSub === 'Hospitals') return name.includes('hospital');
    if (activeSub === 'Clinics') return name.includes('clinic');
    if (activeSub === 'Pharmacies') return name.includes('pharma') || name.includes('medical');
    return true;
  };

  const displayed = shops.filter(s => {
    const q = searchTerm.toLowerCase();
    return (
      (!q || s.name.toLowerCase().includes(q) || (s.category?.name || '').toLowerCase().includes(q)) &&
      subFilter(s)
    );
  });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 90 }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(160deg, #1E7B3B 0%, #2F855A 100%)', padding: '52px 18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <button onClick={() => navigate(-1)}
            style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={18} color="white" />
          </button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>Healthcare</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>Doctors · Hospitals · Clinics · Pharmacies</div>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 16px rgba(0,0,0,.15)', marginTop: 14 }}>
          <Search size={16} color="var(--text-3)" />
          <input
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search healthcare services..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: 'var(--text)', background: 'transparent', fontFamily: 'inherit' }}
          />
        </div>
      </div>

      {/* SUB-CATEGORY CHIPS */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="scroll-hide">
          {SUB_CATS.map(sub => (
            <button key={sub} onClick={() => setActiveSub(sub)}
              style={{
                flexShrink: 0, padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                background: activeSub === sub ? 'var(--primary)' : 'var(--card)',
                color: activeSub === sub ? 'white' : 'var(--text-2)',
                border: activeSub === sub ? 'none' : '1.5px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}>
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* SHOP LIST */}
      <div style={{ padding: '14px 16px 0' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-3)', fontSize: 13 }}>Loading...</div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--card)', borderRadius: 16, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏥</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>No healthcare services listed yet</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6 }}>Check back soon</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {displayed.map(shop => {
              const isOpen = shop.currentStatus === 'OPEN';
              return (
                <div key={shop.id}
                  onClick={() => navigate(`/shops/${shop.id}`)}
                  style={{ background: 'var(--card)', borderRadius: 14, padding: '14px 16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 13, background: 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, overflow: 'hidden' }}>
                    {shop.imageUrl ? <img src={shop.imageUrl} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>{shop.category?.icon || '🏥'}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shop.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{shop.category?.name}</div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 9px', borderRadius: 100, fontSize: 10, fontWeight: 700, marginTop: 4, background: isOpen ? 'var(--green-100)' : 'var(--red-light)', color: isOpen ? '#15803D' : 'var(--red)' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                      {isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  {shop.phone && (
                    <button onClick={e => { e.stopPropagation(); window.open(`tel:${shop.phone}`); }}
                      style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'var(--green-50)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={15} color="var(--primary)" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthcarePage;
