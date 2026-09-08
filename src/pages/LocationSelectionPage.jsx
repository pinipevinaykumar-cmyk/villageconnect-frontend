import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AP_LOCATIONS = [
  // Srikakulam
  { name: 'Srikakulam',       district: 'Srikakulam' },
  { name: 'Palasa',           district: 'Srikakulam' },
  { name: 'Narasannapeta',    district: 'Srikakulam' },
  { name: 'Tekkali',          district: 'Srikakulam' },
  { name: 'Amadalavalasa',    district: 'Srikakulam' },
  { name: 'Kaviti',           district: 'Srikakulam' },
  { name: 'Rajam',            district: 'Srikakulam' },
  { name: 'Ichchapuram',      district: 'Srikakulam' },
  { name: 'Etcherla',         district: 'Srikakulam' },
  { name: 'Pathapatnam',      district: 'Srikakulam' },
  // Vizianagaram
  { name: 'Vizianagaram',     district: 'Vizianagaram' },
  { name: 'Bobbili',          district: 'Vizianagaram' },
  { name: 'Parvathipuram',    district: 'Parvathipuram Manyam' },
  { name: 'Salur',            district: 'Parvathipuram Manyam' },
  { name: 'Gajapathinagaram', district: 'Vizianagaram' },
  { name: 'Cheepurupalli',    district: 'Vizianagaram' },
  { name: 'Nellimarla',       district: 'Vizianagaram' },
  // Visakhapatnam
  { name: 'Visakhapatnam',    district: 'Visakhapatnam' },
  { name: 'Vizag',            district: 'Visakhapatnam' },
  { name: 'Anakapalli',       district: 'Anakapalli' },
  { name: 'Bheemunipatnam',   district: 'Visakhapatnam' },
  { name: 'Gajuwaka',         district: 'Visakhapatnam' },
  { name: 'Narsipatnam',      district: 'Anakapalli' },
  { name: 'Yellamanchili',    district: 'Anakapalli' },
  { name: 'Chodavaram',       district: 'Anakapalli' },
  { name: 'Paderu',           district: 'Alluri Sitarama Raju' },
  { name: 'Payakaraopeta',    district: 'Anakapalli' },
  { name: 'Nakkapalle',       district: 'Anakapalli' },
  { name: 'Madugula',         district: 'Alluri Sitarama Raju' },
  // East Godavari / Kakinada / Konaseema
  { name: 'Kakinada',         district: 'Kakinada' },
  { name: 'Rajahmundry',      district: 'East Godavari' },
  { name: 'Rajamahendravaram',district: 'East Godavari' },
  { name: 'Amalapuram',       district: 'Konaseema' },
  { name: 'Ramachandrapuram', district: 'Konaseema' },
  { name: 'Peddapuram',       district: 'Kakinada' },
  { name: 'Samalkot',         district: 'Kakinada' },
  { name: 'Tuni',             district: 'East Godavari' },
  { name: 'Mandapeta',        district: 'East Godavari' },
  { name: 'Kothapeta',        district: 'East Godavari' },
  { name: 'Ravulapalem',      district: 'Konaseema' },
  { name: 'Razole',           district: 'Konaseema' },
  { name: 'Malkipuram',       district: 'Konaseema' },
  { name: 'Prathipadu',       district: 'Kakinada' },
  { name: 'Gollaprolu',       district: 'Kakinada' },
  // West Godavari / Eluru
  { name: 'Eluru',            district: 'Eluru' },
  { name: 'Bhimavaram',       district: 'West Godavari' },
  { name: 'Tadepalligudem',   district: 'West Godavari' },
  { name: 'Narsapur',         district: 'West Godavari' },
  { name: 'Palakol',          district: 'West Godavari' },
  { name: 'Tanuku',           district: 'West Godavari' },
  { name: 'Jangareddigudem',  district: 'Eluru' },
  { name: 'Kovvur',           district: 'Eluru' },
  { name: 'Unguturu',         district: 'Eluru' },
  { name: 'Penugonda',        district: 'West Godavari' },
  { name: 'Narasapur',        district: 'West Godavari' },
  // NTR / Krishna
  { name: 'Vijayawada',       district: 'NTR' },
  { name: 'Machilipatnam',    district: 'Krishna' },
  { name: 'Gudivada',         district: 'Krishna' },
  { name: 'Nuzvid',           district: 'Krishna' },
  { name: 'Jaggayyapeta',     district: 'NTR' },
  { name: 'Nandigama',        district: 'NTR' },
  { name: 'Tiruvuru',         district: 'NTR' },
  { name: 'Vuyyuru',          district: 'Krishna' },
  { name: 'Gannavaram',       district: 'NTR' },
  { name: 'Ibrahimpatnam',    district: 'NTR' },
  { name: 'Musunuru',         district: 'NTR' },
  { name: 'Bantumilli',       district: 'Krishna' },
  // Guntur / Bapatla / Palnadu
  { name: 'Guntur',           district: 'Guntur' },
  { name: 'Tenali',           district: 'Bapatla' },
  { name: 'Narasaraopet',     district: 'Palnadu' },
  { name: 'Bapatla',          district: 'Bapatla' },
  { name: 'Ponnur',           district: 'Bapatla' },
  { name: 'Sattenapalle',     district: 'Palnadu' },
  { name: 'Chilakaluripet',   district: 'Palnadu' },
  { name: 'Macherla',         district: 'Palnadu' },
  { name: 'Mangalagiri',      district: 'Guntur' },
  { name: 'Tadepalle',        district: 'Guntur' },
  { name: 'Repalle',          district: 'Bapatla' },
  { name: 'Vinukonda',        district: 'Palnadu' },
  { name: 'Piduguralla',      district: 'Palnadu' },
  { name: 'Narsaraopet',      district: 'Palnadu' },
  { name: 'Gurazala',         district: 'Palnadu' },
  { name: 'Karempudi',        district: 'Palnadu' },
  { name: 'Atchampeta',       district: 'Bapatla' },
  // Prakasam
  { name: 'Ongole',           district: 'Prakasam' },
  { name: 'Chirala',          district: 'Prakasam' },
  { name: 'Markapur',         district: 'Prakasam' },
  { name: 'Kandukur',         district: 'Prakasam' },
  { name: 'Giddalur',         district: 'Prakasam' },
  { name: 'Podili',           district: 'Prakasam' },
  { name: 'Darsi',            district: 'Prakasam' },
  { name: 'Addanki',          district: 'Prakasam' },
  { name: 'Parchur',          district: 'Prakasam' },
  { name: 'Inkollu',          district: 'Prakasam' },
  { name: 'Singarayakonda',   district: 'Prakasam' },
  { name: 'Cumbum',           district: 'Prakasam' },
  // Nellore / SPS Nellore
  { name: 'Nellore',          district: 'SPS Nellore' },
  { name: 'Kavali',           district: 'SPS Nellore' },
  { name: 'Gudur',            district: 'SPS Nellore' },
  { name: 'Sullurpeta',       district: 'SPS Nellore' },
  { name: 'Naidupeta',        district: 'SPS Nellore' },
  { name: 'Atmakur',          district: 'SPS Nellore' },
  { name: 'Kovur',            district: 'SPS Nellore' },
  { name: 'Venkatagiri',      district: 'SPS Nellore' },
  { name: 'Podalakur',        district: 'SPS Nellore' },
  { name: 'Buchireddypalem',  district: 'SPS Nellore' },
  // Tirupati / Chittoor / Annamaya
  { name: 'Tirupati',         district: 'Tirupati' },
  { name: 'Chittoor',         district: 'Chittoor' },
  { name: 'Madanapalle',      district: 'Annamaya' },
  { name: 'Puttur',           district: 'Tirupati' },
  { name: 'Srikalahasti',     district: 'Tirupati' },
  { name: 'Nagari',           district: 'Tirupati' },
  { name: 'Kuppam',           district: 'Chittoor' },
  { name: 'Palamaner',        district: 'Chittoor' },
  { name: 'Piler',            district: 'Annamaya' },
  { name: 'Punganur',         district: 'Annamaya' },
  { name: 'Chandragiri',      district: 'Tirupati' },
  { name: 'Tiruchanur',       district: 'Tirupati' },
  { name: 'Pakala',           district: 'Tirupati' },
  // YSR Kadapa
  { name: 'Kadapa',           district: 'YSR Kadapa' },
  { name: 'Proddatur',        district: 'YSR Kadapa' },
  { name: 'Rajampet',         district: 'YSR Kadapa' },
  { name: 'Jammalamadugu',    district: 'YSR Kadapa' },
  { name: 'Badvel',           district: 'YSR Kadapa' },
  { name: 'Pulivendula',      district: 'YSR Kadapa' },
  { name: 'Mydukur',          district: 'YSR Kadapa' },
  { name: 'Yerraguntla',      district: 'YSR Kadapa' },
  { name: 'Rayachoti',        district: 'YSR Kadapa' },
  { name: 'Sidhout',          district: 'YSR Kadapa' },
  // Kurnool / Nandyal
  { name: 'Kurnool',          district: 'Kurnool' },
  { name: 'Nandyal',          district: 'Nandyal' },
  { name: 'Adoni',            district: 'Kurnool' },
  { name: 'Dhone',            district: 'Nandyal' },
  { name: 'Yemmiganur',       district: 'Kurnool' },
  { name: 'Mantralayam',      district: 'Kurnool' },
  { name: 'Nandikotkur',      district: 'Nandyal' },
  { name: 'Banaganapalle',    district: 'Nandyal' },
  { name: 'Koilkuntla',       district: 'Nandyal' },
  { name: 'Atmakur',          district: 'Nandyal' },
  { name: 'Allagadda',        district: 'Nandyal' },
  { name: 'Gospadu',          district: 'Kurnool' },
  // Anantapur / Sri Sathya Sai
  { name: 'Anantapur',        district: 'Sri Sathya Sai' },
  { name: 'Guntakal',         district: 'Anantapur' },
  { name: 'Tadipatri',        district: 'Sri Sathya Sai' },
  { name: 'Dharmavaram',      district: 'Sri Sathya Sai' },
  { name: 'Hindupur',         district: 'Sri Sathya Sai' },
  { name: 'Kadiri',           district: 'Sri Sathya Sai' },
  { name: 'Gooty',            district: 'Anantapur' },
  { name: 'Uravakonda',       district: 'Anantapur' },
  { name: 'Rayadurgam',       district: 'Anantapur' },
  { name: 'Singanamala',      district: 'Sri Sathya Sai' },
  { name: 'Puttaparthi',      district: 'Sri Sathya Sai' },
  { name: 'Pamidi',           district: 'Sri Sathya Sai' },
];

const LocationSelectionPage = () => {
  const navigate = useNavigate();
  const { user, saveLocation } = useAuth();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  if (!user) return <Navigate to="/login" replace />;

  const q = search.trim().toLowerCase();

  const filtered = q.length < 1 ? [] : AP_LOCATIONS
    .filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.district.toLowerCase().includes(q)
    )
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q);
      const bStarts = b.name.toLowerCase().startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 12);

  const handleSelect = (loc) => {
    setSelected(loc.name);
    saveLocation({ name: loc.name, state: 'Andhra Pradesh', district: loc.district });
    setTimeout(() => navigate('/home'), 300);
  };

  const handleGPS = () => {
    if (!navigator.geolocation) { toast.error('GPS not supported on this device'); return; }
    navigator.geolocation.getCurrentPosition(
      () => { saveLocation({ name: 'Nearby', state: 'Andhra Pradesh', district: 'GPS' }); navigate('/home'); },
      () => toast.error('Could not get your location. Please select manually.')
    );
  };

  const showCustom = q.length > 1 && filtered.length === 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0F172A 0%, #1a2744 50%, #1E7B3B 100%)',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '0 0 48px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,123,59,.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '72px 24px 28px', position: 'relative', zIndex: 10, width: '100%', maxWidth: 440 }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>📍</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: '-0.5px', margin: '0 0 8px' }}>
          Where are you?
        </h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.08)', borderRadius: 100, padding: '5px 14px', marginTop: 4 }}>
          <span style={{ fontSize: 14 }}>🗺️</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>Andhra Pradesh — V1</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ width: '100%', maxWidth: 440, padding: '0 20px', position: 'relative', zIndex: 10 }}>

        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Type city, town or village name..."
          autoFocus
          style={{
            width: '100%', boxSizing: 'border-box',
            background: 'rgba(255,255,255,.1)',
            border: '1.5px solid rgba(255,255,255,.2)',
            borderRadius: 14, padding: '15px 18px',
            fontSize: 15, color: 'white', outline: 'none',
            fontFamily: 'inherit', marginBottom: 12,
          }}
        />

        {/* GPS */}
        <button onClick={handleGPS} style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: 'rgba(30,123,59,.3)', border: '1.5px solid rgba(74,222,128,.25)',
          borderRadius: 14, padding: '13px', marginBottom: 20,
          color: '#4ADE80', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <span style={{ fontSize: 18 }}>🎯</span> Use Current Location
        </button>

        {/* Results */}
        {q.length < 1 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,.35)', fontSize: 13 }}>
            Start typing to search 150+ cities &amp; villages in Andhra Pradesh
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(loc => {
              const isSelected = selected === loc.name;
              const idx = loc.name.toLowerCase().indexOf(q);
              return (
                <button key={loc.name} onClick={() => handleSelect(loc)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  background: isSelected ? 'rgba(30,123,59,.45)' : 'rgba(255,255,255,.07)',
                  border: isSelected ? '1.5px solid rgba(74,222,128,.5)' : '1.5px solid rgba(255,255,255,.1)',
                  borderRadius: 14, padding: '13px 16px',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
                }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                    📍
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>
                      {idx >= 0 ? (
                        <>
                          {loc.name.slice(0, idx)}
                          <span style={{ color: '#4ADE80' }}>{loc.name.slice(idx, idx + q.length)}</span>
                          {loc.name.slice(idx + q.length)}
                        </>
                      ) : loc.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 2 }}>
                      {loc.district} · Andhra Pradesh
                    </div>
                  </div>
                  {isSelected ? (
                    <span style={{ color: '#4ADE80', fontSize: 18 }}>✓</span>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,.25)', fontSize: 16 }}>›</span>
                  )}
                </button>
              );
            })}

            {showCustom && (
              <button onClick={() => handleSelect({ name: search.trim(), district: 'Andhra Pradesh' })} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(30,123,59,.2)', border: '1.5px dashed rgba(74,222,128,.3)',
                borderRadius: 14, padding: '13px 16px',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(30,123,59,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📍</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>Use "{search.trim()}"</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 2 }}>Set as my location · Andhra Pradesh</div>
                </div>
                <span style={{ fontSize: 12, color: '#4ADE80', fontWeight: 700 }}>Select →</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelectionPage;
