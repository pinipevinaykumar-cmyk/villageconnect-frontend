import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Store, ShoppingBag, User } from 'lucide-react';

const tabs = [
  { label: 'Home',   icon: Home,        path: '/home' },
  { label: 'Shops',  icon: Store,       path: '/shops' },
  { label: 'Orders', icon: ShoppingBag, path: '/orders' },
  { label: 'Profile',icon: User,        path: '/profile' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: 'white',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.08)',
    }}>
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = pathname === path || (path === '/shops' && pathname.startsWith('/shops'));
        return (
          <button key={label} onClick={() => navigate(path)}
            style={{
              flex: 1, padding: '10px 0 8px',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: active ? '#2E7D32' : '#9CA3AF',
              fontFamily: 'inherit',
              position: 'relative',
            }}>
            {active && (
              <div style={{
                position: 'absolute', top: 0, left: '25%', right: '25%',
                height: 2, background: '#2E7D32', borderRadius: '0 0 2px 2px',
              }} />
            )}
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 400 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
