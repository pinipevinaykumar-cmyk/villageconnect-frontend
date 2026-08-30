import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Store } from 'lucide-react';

const VILLAGES = ['Pandalapaka', 'Kadiyam', 'Rajanagaram', 'Kovvur', 'Nidadavolu'];

const HomePage = () => {
  const [selectedVillage, setSelectedVillage] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!selectedVillage) return;
    navigate(`/shops?village=${selectedVillage}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-700">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-white">
        <div className="text-5xl mb-4">🏘️</div>
        <h1 className="text-3xl font-bold mb-2">మన ఊరు, మన షాపులు</h1>
        <p className="text-green-100 mb-8 text-lg">
          Find shops in your village — know who's open right now
        </p>
        <div className="bg-white rounded-2xl p-5 shadow-xl">
          <p className="text-gray-600 text-sm mb-3 font-medium">Select your village</p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {VILLAGES.map((village) => (
              <button key={village} onClick={() => setSelectedVillage(village)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition
                  ${selectedVillage === village
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-green-400'}`}>
                {village}
              </button>
            ))}
          </div>
          <button onClick={handleSearch} disabled={!selectedVillage}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold
                       flex items-center justify-center gap-2 disabled:opacity-40
                       hover:bg-green-700 transition">
            <Search size={18} />
            Find Shops in {selectedVillage || 'your village'}
          </button>
        </div>
      </div>

      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-xl font-bold text-gray-800 mb-8">Why VillageConnect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🟢', title: 'Live Open/Closed Status', desc: 'See which shops are open right now before you go' },
              { icon: '📞', title: 'Call & WhatsApp', desc: 'Contact shops directly with one tap' },
              { icon: '🗺️', title: 'Get Directions', desc: 'Navigate to any shop easily' },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-5 rounded-xl bg-green-50">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-green-800 py-10 px-4 text-center text-white">
        <Store size={32} className="mx-auto mb-3 text-green-300" />
        <h2 className="text-xl font-bold mb-2">Are you a shop owner?</h2>
        <p className="text-green-200 mb-5 text-sm">Register your shop for FREE!</p>
        <a href="/register"
           className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold
                      inline-block hover:bg-green-50 transition">
          Register Your Shop — Free
        </a>
      </div>
    </div>
  );
};

export default HomePage;