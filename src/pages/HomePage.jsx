import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Phone, ChevronRight } from 'lucide-react';
import API from '../api/axios';


const CATEGORIES = [
  { name: 'Grocery',    icon: '🛒' },
  { name: 'Vegetables', icon: '🥦' },
  { name: 'Dairy',      icon: '🥛' },
  { name: 'Medicine',   icon: '💊' },
  { name: 'More',       icon: '⋯'  },
];

const ShopRow = ({ shop }) => {
  const navigate = useNavigate();
  const isOpen = shop.currentStatus === 'OPEN';

  const handleCall = (e) => { e.stopPropagation(); if (shop.phone) window.open(`tel:${shop.phone}`); };
  const handleWA   = (e) => { e.stopPropagation(); if (shop.phone) window.open(`https://wa.me/${shop.phone}`); };

  return (
    <div onClick={() => navigate(`/shops/${shop.id}`)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', background: 'white',
        borderBottom: '1px solid #F3F4F6', cursor: 'pointer',
      }}>

      {/* Thumbnail */}
      <div style={{
        width: 62, height: 62, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
        background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26,
      }}>
        {shop.imageUrl
          ? <img src={shop.imageUrl} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span>{shop.category?.icon || '🏪'}</span>
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 3 }}>
          {shop.name}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
          background: isOpen ? '#E8F5E9' : '#FEE2E2',
          color: isOpen ? '#15803D' : '#DC2626',
          display: 'inline-block', marginBottom: 2,
        }}>
          {isOpen ? 'Open' : 'Closed'}
        </span>
        <div style={{ fontSize: 11, color: '#6B7280' }}>
          {isOpen
            ? shop.closeTime ? `Closes ${shop.closeTime}` : ''
            : shop.openTime  ? `Opens ${shop.openTime}`  : ''}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={handleCall} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#2E7D32',
        }}>
          <Phone size={18} />
        </button>
        {isOpen && (
          <button onClick={handleWA} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#25D366',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [shops, setShops]           = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shopsRes, catsRes] = await Promise.all([
          API.get('/public/shops'),
          API.get('/public/categories'),
        ]);
        setShops(shopsRes.data.data || []);
        setCategories(catsRes.data.data || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shops?q=${searchTerm}`);
  };

  const nearbyShops = shops.slice(0, 4);

  return (
    <div style={{ background: '#F3F4F6', minHeight: '100vh', paddingBottom: 80 }}>

      {/* Search + Location bar */}
      <div style={{ background: 'white', padding: '14px 16px 12px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
        <form onSubmit={handleSearch}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#F3F4F6', borderRadius: 50, padding: '11px 16px',
          }}>
            <Search size={16} color="#9CA3AF" />
            <input
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search for shops, products..."
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                fontSize: 14, color: '#374151', fontFamily: 'inherit',
              }}
            />
          </div>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={15} color="#2E7D32" fill="#E8F5E9" />
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 600 }}>All India</span>
          </div>
        </div>
      </div>

      {/* Nearby Shops */}
      <div style={{ marginTop: 14, padding: '0 12px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 10,
        }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#111827' }}>Shops in India</span>
          <button onClick={() => navigate('/shops')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', color: '#2E7D32',
              fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2,
              fontFamily: 'inherit',
            }}>
            View All <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ background: 'white', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          {loading ? (
            <div style={{ padding: 36, textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>Loading shops...</div>
          ) : nearbyShops.length === 0 ? (
            <div style={{ padding: 36, textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>No shops found nearby</div>
          ) : (
            nearbyShops.map(shop => <ShopRow key={shop.id} shop={shop} />)
          )}
        </div>
      </div>

      {/* Popular Categories */}
      <div style={{ marginTop: 20, padding: '0 12px' }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#111827', display: 'block', marginBottom: 12 }}>
          Popular Categories
        </span>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6,
          scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {(categories.length > 0
            ? categories.map(c => ({ name: c.name, icon: c.icon || '🏪', id: c.id }))
            : CATEGORIES
          ).map((cat) => (
            <button key={cat.name}
              onClick={() => navigate(`/shops${cat.id ? `?categoryId=${cat.id}` : ''}`)}
              style={{
                flexShrink: 0, width: 76, background: 'white', borderRadius: 16,
                border: 'none', padding: '14px 8px 12px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)', fontFamily: 'inherit',
              }}>
              <span style={{ fontSize: 26 }}>{cat.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#374151', textAlign: 'center' }}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
