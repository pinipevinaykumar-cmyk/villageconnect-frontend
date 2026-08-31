import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    if (user.role === 'ADMIN') navigate('/admin');
    else if (user.role === 'MERCHANT') navigate('/merchant/dashboard');
    else navigate('/home');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-white text-center">
        <div className="text-6xl mb-4">🏘️</div>
        <h1 className="text-3xl font-bold mb-2">VillageConnect</h1>
        <p className="text-blue-200 text-lg mb-2">మన ఊరు, మన షాపులు</p>
        <p className="text-blue-300 text-sm mb-12">Find shops in your village — know who's open right now</p>

        <p className="text-blue-100 font-semibold text-lg mb-6">I am a...</p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
          <button
            onClick={() => navigate('/register?role=CUSTOMER')}
            className="bg-white text-blue-900 rounded-2xl p-6 flex flex-col items-center gap-3
                       hover:bg-blue-50 transition shadow-lg active:scale-95">
            <span className="text-4xl">👤</span>
            <span className="font-bold text-base">Customer</span>
            <span className="text-xs text-gray-500 text-center">Find shops & check what's open</span>
          </button>
          <button
            onClick={() => navigate('/register?role=MERCHANT')}
            className="bg-white text-blue-900 rounded-2xl p-6 flex flex-col items-center gap-3
                       hover:bg-blue-50 transition shadow-lg active:scale-95">
            <span className="text-4xl">🏪</span>
            <span className="font-bold text-base">Shop Owner</span>
            <span className="text-xs text-gray-500 text-center">List your shop for FREE</span>
          </button>
        </div>

        <p className="text-blue-200 text-sm">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')}
            className="text-white font-bold underline">
            Login
          </button>
        </p>
      </div>

      <div className="bg-blue-950 py-8 px-4">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-4 text-center text-white">
          {[
            { icon: '🟢', label: 'Live Open/Closed Status' },
            { icon: '📞', label: 'Call & WhatsApp' },
            { icon: '🗺️', label: 'Get Directions' },
          ].map(f => (
            <div key={f.label} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{f.icon}</span>
              <span className="text-xs text-blue-200">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
