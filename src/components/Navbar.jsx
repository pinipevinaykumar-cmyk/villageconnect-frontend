import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Menu, X, LogOut, Home, Store, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  // Hide on auth and landing pages
  if (pathname === '/' || pathname === '/login' || pathname.startsWith('/register') || pathname === '/location') return null;

  const handleLogout = () => { setMenuOpen(false); logout(); navigate('/'); };

  return (
    <>
      <nav style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        {/* Left: hamburger */}
        <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
          onClick={() => setMenuOpen(true)}>
          <Menu size={22} />
        </button>

        {/* Center: brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="22" height="26" viewBox="0 0 62 74" fill="none">
            <path d="M31 2C16.6 2 5 13.6 5 28C5 46.5 31 72 31 72C31 72 57 46.5 57 28C57 13.6 45.4 2 31 2Z" fill="white" fillOpacity="0.9"/>
            <circle cx="31" cy="28" r="21" fill="white" fillOpacity="0.2"/>
            <polygon points="31,14 18,23 44,23" fill="white"/>
            <rect x="18" y="23" width="26" height="20" rx="1" fill="white"/>
            <rect x="26" y="31" width="10" height="12" rx="1" fill="#2E7D32"/>
          </svg>
          <span style={{ color: 'white', fontWeight: 800, fontSize: 17, letterSpacing: '-0.2px' }}>
            Local Connect
          </span>
        </div>

        {/* Right: bell */}
        <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}>
          <Bell size={20} />
        </button>
      </nav>

      {/* Side drawer overlay */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}
          onClick={() => setMenuOpen(false)}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div ref={drawerRef}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 260,
              background: 'white', boxShadow: '4px 0 24px rgba(0,0,0,0.18)',
              display: 'flex', flexDirection: 'column',
            }}>
            {/* Drawer header */}
            <div style={{
              background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
              padding: '20px 16px 16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>Local Connect</div>
                {user && <div style={{ color: '#C8E6C9', fontSize: 12, marginTop: 2 }}>Hi, {user.name}</div>}
              </div>
              <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                onClick={() => setMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {/* Drawer links */}
            <div style={{ flex: 1, padding: '16px 0' }}>
              {[
                { label: 'Home',    icon: Home,  path: '/home' },
                { label: 'Shops',   icon: Store, path: '/shops' },
                { label: 'Profile', icon: User,  path: '/profile' },
              ].map(({ label, icon: Icon, path }) => (
                <button key={label} onClick={() => { navigate(path); setMenuOpen(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '13px 20px', background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit', fontSize: 15,
                    color: pathname === path ? '#1B5E20' : '#374151',
                    fontWeight: pathname === path ? 700 : 400,
                    borderLeft: pathname === path ? '3px solid #2E7D32' : '3px solid transparent',
                  }}>
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>

            {/* Logout */}
            <div style={{ borderTop: '1px solid #F3F4F6', padding: '12px 0' }}>
              <button onClick={handleLogout}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 20px', background: 'none', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: 15,
                  color: '#DC2626',
                }}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
