import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };

  // Hide on auth pages
  if (pathname === '/login' || pathname.startsWith('/register')) return null;

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
      padding: '12px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 50,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}>
      {/* Left: hamburger */}
      <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
        onClick={handleLogout}>
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
  );
};

export default Navbar;
