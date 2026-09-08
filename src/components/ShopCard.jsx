import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';

const ShopCard = ({ shop }) => {
  const isOpen = shop.currentStatus === 'OPEN';

  return (
    <Link to={`/shops/${shop.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'var(--card)', borderRadius: 'var(--radius)',
        border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden', transition: 'transform .15s, box-shadow .15s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
      >
        {/* Image */}
        <div style={{
          height: 110, background: 'var(--green-50)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, overflow: 'hidden',
        }}>
          {shop.imageUrl
            ? <img src={shop.imageUrl} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span>{shop.category?.icon || '🏪'}</span>}
        </div>

        {/* Body */}
        <div style={{ padding: '12px 12px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {shop.name}
            </div>
            <span style={{
              flexShrink: 0, fontSize: 9.5, fontWeight: 700, padding: '3px 8px',
              borderRadius: 100, whiteSpace: 'nowrap',
              background: isOpen ? 'var(--green-100)' : 'var(--red-light)',
              color: isOpen ? '#15803D' : 'var(--red)',
            }}>
              {isOpen ? '● Open' : '● Closed'}
            </span>
          </div>

          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>
            {shop.category?.name || 'Shop'}
          </div>

          {shop.openTime && shop.closeTime && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--text-3)' }}>
              <Clock size={10} />
              {shop.openTime} – {shop.closeTime}
            </div>
          )}

          {shop.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--text-3)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <MapPin size={10} />
              {shop.address}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
