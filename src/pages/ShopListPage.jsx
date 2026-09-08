import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import API from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ShopCard from '../components/ShopCard';

const ShopListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const village        = searchParams.get('village') || '';
  const initCategory   = searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : null;

  const [shops,          setShops]          = useState([]);
  const [categories,     setCategories]     = useState([]);
  const [selectedCat,    setSelectedCat]    = useState(initCategory);
  const [searchTerm,     setSearchTerm]     = useState(searchParams.get('q') || '');
  const [loading,        setLoading]        = useState(true);
  const [filterOpen,     setFilterOpen]     = useState(false);
  const [filterStatus,   setFilterStatus]   = useState('all');

  useEffect(() => {
    API.get('/public/categories').then(r => setCategories(r.data.data || [])).catch(console.error);
  }, []);

  const fetchShops = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (village)     params.village    = village;
      if (selectedCat) params.categoryId = selectedCat;
      const res = await API.get('/public/shops', { params });
      setShops(res.data.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [village, selectedCat]);

  useEffect(() => { fetchShops(); }, [fetchShops]);

  const handleSearch = async e => {
    e.preventDefault();
    if (!searchTerm.trim()) { fetchShops(); return; }
    setLoading(true);
    try {
      const params = { keyword: searchTerm };
      if (village) params.village = village;
      const res = await API.get('/public/shops/search', { params });
      setShops(res.data.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const displayed = filterStatus === 'open'
    ? shops.filter(s => s.currentStatus === 'OPEN')
    : shops;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 90 }}>

      {/* ── HEADER ── */}
      <div style={{
        background: 'linear-gradient(160deg, #1E7B3B 0%, #2F855A 100%)',
        padding: '52px 18px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <button onClick={() => navigate(-1)}
            style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
            <ArrowLeft size={18} color="white" />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>
              {village || 'All India'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)', marginTop: 2 }}>
              {loading ? 'Loading...' : `${displayed.length} shops found`}
            </div>
          </div>
          <button onClick={() => setFilterOpen(f => !f)}
            style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SlidersHorizontal size={16} color="white" />
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch}>
          <div style={{ background: 'white', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 16px rgba(0,0,0,.15)' }}>
            <Search size={16} color="var(--text-3)" />
            <input
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search shops, products..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: 'var(--text)', background: 'transparent', fontFamily: 'inherit' }}
            />
            {searchTerm && (
              <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Go
              </button>
            )}
          </div>
        </form>

        {/* Filter strip (open/closed) */}
        {filterOpen && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {['all', 'open'].map(f => (
              <button key={f} onClick={() => setFilterStatus(f)}
                style={{
                  padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  background: filterStatus === f ? 'white' : 'rgba(255,255,255,.15)',
                  color: filterStatus === f ? 'var(--primary)' : 'white',
                  border: 'none',
                }}>
                {f === 'all' ? '🏪 All' : '🟢 Open Now'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── CATEGORY CHIPS ── */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="scroll-hide">
          <button onClick={() => setSelectedCat(null)}
            style={{
              flexShrink: 0, padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              background: !selectedCat ? 'var(--primary)' : 'var(--card)',
              color: !selectedCat ? 'white' : 'var(--text-2)',
              border: !selectedCat ? 'none' : '1.5px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
            }}>
            🏪 All
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCat(selectedCat === cat.id ? null : cat.id)}
              style={{
                flexShrink: 0, padding: '8px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 5,
                background: selectedCat === cat.id ? 'var(--primary)' : 'var(--card)',
                color: selectedCat === cat.id ? 'white' : 'var(--text-2)',
                border: selectedCat === cat.id ? 'none' : '1.5px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}>
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div style={{ padding: '14px 16px 0' }}>
        {loading ? (
          <LoadingSpinner />
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--card)', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏪</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>No shops found</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6 }}>Try a different search or category</div>
            <button onClick={() => { setSelectedCat(null); setSearchTerm(''); fetchShops(); }}
              style={{ marginTop: 16, background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 100, padding: '10px 24px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {displayed.map(shop => <ShopCard key={shop.id} shop={shop} />)}
          </div>
        )}
      </div>

    </div>
  );
};

export default ShopListPage;
