import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Store, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Store size={24} />
          VillageConnect
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm hidden md:block">Hi, {user.name}</span>
              {user.role === 'MERCHANT' && (
                <Link to="/merchant/dashboard"
                  className="flex items-center gap-1 bg-white text-green-700
                             px-3 py-1.5 rounded-lg text-sm font-semibold
                             hover:bg-green-50 transition">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              )}
              <button onClick={handleLogout}
                className="flex items-center gap-1 text-sm hover:text-green-200">
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-green-200">
                Login
              </Link>
              <Link to="/register"
                className="bg-white text-green-700 px-3 py-1.5 rounded-lg
                           text-sm font-semibold hover:bg-green-50 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;