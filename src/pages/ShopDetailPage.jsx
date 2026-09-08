import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Clock, Star, Share2 } from 'lucide-react';
import API from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const ShopDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop,     setShop]     = useState(null);
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([
      API.get(`/public/shops/${id}`),
      API.get(`/public/shops/${id}/products`),
    ]).then(([s, p]) => {
      setShop(s.data.data);
      setProducts(p.data.data || []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!shop)   return (
    <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-3)' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🏪</div>
      <div style={{ fontWeight: 700, fontSize: 16 }}>Shop not found</div>
    </div>
  );

  const isOpen = shop.currentStatus === 'OPEN';

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 90 }}>

      {/* ── COVER ── */}
      <div style={{ position: 'relative' }}>
        <div style={{
          height: 200,
          background: shop.imageUrl
            ? 'transparent'
            : 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 64, overflow: 'hidden',
        }}>
          {shop.imageUrl
            ? <img src={shop.imageUrl} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span>{shop.category?.icon || '🏪'}</span>}
        </div>

        {/* Top bar overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '52px 16px 0' }}>
          <button onClick={() => navigate(-1)}
            style={{ background: 'rgba(0,0,0,.35)', border: 'none', borderRadius: 12, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
            <ArrowLeft size={18} color="white" />
          </button>
          <button onClick={() => navigator.share?.({ title: shop.name, url: window.location.href })}
            style={{ background: 'rgba(0,0,0,.35)', border: 'none', borderRadius: 12, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
            <Share2 size={16} color="white" />
          </button>
        </div>
      </div>

      {/* ── HEADER CARD ── */}
      <div style={{ background: 'var(--card)', margin: '0 0 12px', padding: '20px 18px 18px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', letterSpacing: '-.4px', margin: 0 }}>{shop.name}</h1>
              <span style={{ fontSize: 16 }} title="Verified">✅</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>{shop.category?.name}</div>
          </div>
          <div style={{
            padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 800, flexShrink: 0,
            background: isOpen ? 'var(--green-100)' : 'var(--red-light)',
            color: isOpen ? '#15803D' : 'var(--red)',
          }}>
            {isOpen ? '● Open Now' : '● Closed'}
          </div>
        </div>

        {/* Meta info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
          {shop.openTime && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)' }}>
              <Clock size={14} color="var(--primary)" />
              <span>
                {isOpen ? `Open · Closes ${shop.closeTime}` : `Closed · Opens ${shop.openTime}`}
              </span>
            </div>
          )}
          {(shop.address || shop.village) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)' }}>
              <MapPin size={14} color="var(--primary)" />
              <span>{[shop.address, shop.village].filter(Boolean).join(', ')}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--accent)' }}>
            <Star size={14} fill="var(--accent)" color="var(--accent)" />
            <span style={{ color: 'var(--text-2)' }}>4.5 · <span style={{ color: 'var(--primary)', fontWeight: 700 }}>128 reviews</span></span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          <button onClick={() => shop.phone && window.open(`tel:${shop.phone}`)}
            style={{ padding: '12px 8px', background: 'var(--green-50)', border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <Phone size={18} color="var(--primary)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)' }}>Call</span>
          </button>
          <button onClick={() => window.open(`https://wa.me/91${shop.whatsapp || shop.phone}`)}
            style={{ padding: '12px 8px', background: '#F0FDF4', border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#25D366' }}>WhatsApp</span>
          </button>
          <button onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent([shop.name, shop.village].filter(Boolean).join(' '))}`)}
            style={{ padding: '12px 8px', background: 'var(--blue-light)', border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <MapPin size={18} color="var(--blue)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)' }}>Directions</span>
          </button>
        </div>
      </div>

      {/* ── ABOUT ── */}
      {shop.description && (
        <div style={{ background: 'var(--card)', margin: '0 0 12px', padding: '18px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>About</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{shop.description}</div>
        </div>
      )}

      {/* ── PRODUCTS ── */}
      {products.length > 0 && (
        <div style={{ background: 'var(--card)', margin: '0 0 12px', padding: '18px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
            📦 Products & Prices
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {products.map((p, i) => (
              <div key={p.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i < products.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.name}</div>
                  {p.description && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{p.description}</div>}
                  <span style={{
                    display: 'inline-block', marginTop: 4, fontSize: 10, fontWeight: 700,
                    padding: '2px 8px', borderRadius: 100,
                    background: p.isAvailable ? 'var(--green-100)' : '#F3F4F6',
                    color: p.isAvailable ? '#15803D' : 'var(--text-3)',
                  }}>
                    {p.isAvailable ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
                {p.price && (
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--primary)' }}>₹{p.price}</div>
                    {p.unit && <div style={{ fontSize: 10, color: 'var(--text-3)' }}>per {p.unit}</div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── REVIEWS placeholder ── */}
      <div style={{ background: 'var(--card)', margin: '0 0 12px', padding: '18px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
          ⭐ Reviews
        </div>
        {[
          { name: 'Sai Prasad', stars: 5, text: 'Fresh stock daily. Very helpful owner!' },
          { name: 'Lakshmi Devi', stars: 4, text: 'Good quality goods. Worth the price.' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, paddingBottom: 12, borderBottom: i === 0 ? '1px solid var(--border)' : 'none', marginBottom: i === 0 ? 12 : 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>👤</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 1 }}>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3, lineHeight: 1.5 }}>{r.text}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ShopDetailPage;
