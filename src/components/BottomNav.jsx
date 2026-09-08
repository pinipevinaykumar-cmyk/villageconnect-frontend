import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const tabs = [
  { label: 'Home',      emoji: '🏠', path: '/home' },
  { label: 'Discover',  emoji: '🔍', path: '/discover' },
  { label: 'Community', emoji: '📢', path: '/community' },
  { label: 'Services',  emoji: '🛠', path: '/services' },
  { label: 'Profile',   emoji: '👤', path: null },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTab = (tab) => {
    if (!tab.path) {
      toast('Profile coming soon! 🚀', { icon: '✨', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } });
      return;
    }
    navigate(tab.path);
  };

  const isActive = (tab) => {
    if (!tab.path) return false;
    if (tab.path === '/home') return pathname === '/home';
    return pathname === tab.path || pathname.startsWith(tab.path);
  };

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      boxShadow: '0 -4px 20px rgba(0,0,0,.08)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {tabs.map(tab => {
        const active = isActive(tab);
        return (
          <button key={tab.label} onClick={() => handleTab(tab)}
            style={{
              flex: 1, padding: '10px 0 8px',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              fontFamily: 'inherit', position: 'relative',
            }}>
            {active && (
              <span style={{
                position: 'absolute', top: 0, left: '30%', right: '30%',
                height: 3, background: 'var(--primary)', borderRadius: '0 0 3px 3px',
              }} />
            )}
            <span style={{ fontSize: 21, lineHeight: 1 }}>{tab.emoji}</span>
            <span style={{
              fontSize: 9.5, fontWeight: active ? 700 : 500,
              color: active ? 'var(--primary)' : 'var(--text-3)',
              letterSpacing: '.01em',
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
