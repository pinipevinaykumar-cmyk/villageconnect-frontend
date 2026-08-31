import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Store, LogOut, LayoutDashboard, Home, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-green-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Store size={24} />
          <span className="hidden sm:inline">VillageConnect</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/"
            className="flex items-center gap-1 bg-green-500 hover:bg-green-400
                       px-3 py-1.5 rounded-lg text-sm font-medium transition">
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          {user ? (
            <>
              <span className="text-sm hidden md:block px-1">Hi, {user.name}</span>
              {user.role === 'MERCHANT' && (
                <Link to="/merchant/dashboard"
                  className="flex items-center gap-1 bg-white text-green-700
                             px-3 py-1.5 rounded-lg text-sm font-semibold
                             hover:bg-green-50 transition">
                  <LayoutDashboard size={16} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              )}
              {user.role === 'ADMIN' && (
                <Link to="/admin"
                  className="flex items-center gap-1 bg-white text-red-600
                             px-3 py-1.5 rounded-lg text-sm font-semibold
                             hover:bg-red-50 transition">
                  <ShieldCheck size={16} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}
              <button onClick={handleLogout}
                className="flex items-center gap-1 text-sm hover:text-green-200 px-2">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-green-200 px-2">
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