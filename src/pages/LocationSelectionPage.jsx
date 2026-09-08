import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CITIES = [
  { name: 'Chennai',   state: 'Tamil Nadu',   emoji: '🌊' },
  { name: 'Hyderabad', state: 'Telangana',    emoji: '🏰' },
  { name: 'Bangalore', state: 'Karnataka',    emoji: '🌿' },
  { name: 'Mumbai',    state: 'Maharashtra',  emoji: '🌆' },
  { name: 'Delhi',     state: 'Delhi',        emoji: '🕌' },
  { name: 'Kolkata',   state: 'West Bengal',  emoji: '🌉' },
  { name: 'Pune',      state: 'Maharashtra',  emoji: '🎓' },
  { name: 'Ahmedabad', state: 'Gujarat',      emoji: '🦁' },
];

const LocationSelectionPage = () => {
  const navigate = useNavigate();
  const { user, saveLocation } = useAuth();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  if (!user) return <Navigate to="/login" replace />;

  const filtered = CITIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (city) => {
    setSelected(city.name);
    saveLocation({ name: city.name, state: city.state });
    setTimeout(() => navigate('/home'), 300);
  };

  const handleGPS = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        saveLocation({ name: 'Nearby', state: 'GPS' });
        navigate('/home');
      },
      () => {
        toast.error('Could not get your location. Please select manually.');
      }
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0F172A 0%, #1a2744 50%, #1E7B3B 100%)',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '0 0 40px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,123,59,.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Top section */}
      <div style={{ textAlign: 'center', padding: '72px 24px 32px', position: 'relative', zIndex: 10, width: '100%', maxWidth: 440 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>📍</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: '-0.5px', margin: '0 0 10px' }}>Where are you?</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', margin: 0, lineHeight: 1.6 }}>
          Select your location to discover nearby services
        </p>
      </div>

      {/* Content card */}
      <div style={{ width: '100%', maxWidth: 440, padding: '0 20px', position: 'relative', zIndex: 10 }}>

        {/* Search input */}
        <div style={{ marginBottom: 12 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search city or state..."
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(255,255,255,.08)',
              border: '1.5px solid rgba(255,255,255,.15)',
              borderRadius: 14, padding: '14px 18px',
              fontSize: 14, color: 'white', outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* GPS button */}
        <button onClick={handleGPS}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: 'rgba(30,123,59,.35)', border: '1.5px solid rgba(74,222,128,.3)',
            borderRadius: 14, padding: '14px', marginBottom: 20,
            color: '#4ADE80', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', backdropFilter: 'blur(8px)',
          }}>
          <span style={{ fontSize: 20 }}>🎯</span>
          Use Current Location
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.12)' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>Popular Cities</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.12)' }} />
        </div>

        {/* City list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(city => {
            const isSelected = selected === city.name;
            return (
              <button key={city.name} onClick={() => handleSelect(city)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  background: isSelected ? 'rgba(30,123,59,.4)' : 'rgba(255,255,255,.06)',
                  border: isSelected ? '1.5px solid rgba(74,222,128,.5)' : '1.5px solid rgba(255,255,255,.08)',
                  borderRadius: 14, padding: '14px 16px',
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all .15s',
                }}>
                <span style={{ fontSize: 26, flexShrink: 0 }}>{city.emoji}</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{city.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>{city.state}</div>
                </div>
                {isSelected && (
                  <span style={{ fontSize: 18, color: '#4ADE80' }}>✓</span>
                )}
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,.4)', fontSize: 13 }}>
              No cities match your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelectionPage;
