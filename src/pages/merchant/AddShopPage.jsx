import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import API from '../../api/axios';

const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'villageconnect';
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'villageconnect_shops';

// Category type → form label overrides
const CATEGORY_LABELS = {
  medical:    { name: 'Clinic / Hospital Name', desc: 'Services offered (e.g. General medicine, Paediatrics)', nameEx: 'e.g. Sri Sai Clinic, City Hospital' },
  hospital:   { name: 'Hospital Name',          desc: 'Departments & specialities',                           nameEx: 'e.g. Govt. General Hospital' },
  clinic:     { name: 'Clinic Name',            desc: 'Services offered',                                     nameEx: 'e.g. Dr. Rao Eye Clinic' },
  pharmacy:   { name: 'Pharmacy Name',          desc: 'Medicines & services available',                        nameEx: 'e.g. Apollo Pharmacy, Medplus' },
  doctor:     { name: 'Doctor / Practice Name', desc: 'Specialisation & services',                            nameEx: 'e.g. Dr. K. Rao — Cardiologist' },
  hotel:      { name: 'Hotel / Restaurant Name',desc: 'Cuisine & specialities',                               nameEx: 'e.g. Srinivasa Mess, Hotel Annapoorna' },
  salon:      { name: 'Salon / Parlour Name',   desc: 'Services offered',                                     nameEx: 'e.g. Style Hub, Lakshmi Beauty Parlour' },
  hardware:   { name: 'Store Name',             desc: 'Products available',                                   nameEx: 'e.g. Ravi Hardware & Electricals' },
  default:    { name: 'Business Name',          desc: 'What products or services do you offer?',              nameEx: 'e.g. Sri Lakshmi Stores' },
};

const AP_VILLAGES = [
  'Srikakulam','Palasa','Narasannapeta','Tekkali','Amadalavalasa','Kaviti','Rajam','Ichchapuram',
  'Vizianagaram','Bobbili','Parvathipuram','Salur','Gajapathinagaram','Cheepurupalli',
  'Visakhapatnam','Vizag','Anakapalli','Bheemunipatnam','Gajuwaka','Narsipatnam','Yellamanchili','Paderu',
  'Kakinada','Rajahmundry','Rajamahendravaram','Amalapuram','Ramachandrapuram','Peddapuram','Samalkot','Tuni','Mandapeta',
  'Eluru','Bhimavaram','Tadepalligudem','Narsapur','Palakol','Tanuku','Jangareddigudem','Kovvur',
  'Vijayawada','Machilipatnam','Gudivada','Nuzvid','Jaggayyapeta','Nandigama','Vuyyuru','Gannavaram',
  'Guntur','Tenali','Narasaraopet','Bapatla','Ponnur','Sattenapalle','Chilakaluripet','Macherla','Mangalagiri',
  'Ongole','Chirala','Markapur','Kandukur','Giddalur','Podili','Darsi','Addanki',
  'Nellore','Kavali','Gudur','Sullurpeta','Naidupeta','Atmakur','Kovur','Venkatagiri',
  'Tirupati','Chittoor','Madanapalle','Puttur','Srikalahasti','Nagari','Kuppam','Palamaner','Chandragiri',
  'Kadapa','Proddatur','Rajampet','Jammalamadugu','Badvel','Pulivendula','Rayachoti',
  'Kurnool','Nandyal','Adoni','Dhone','Yemmiganur','Mantralayam','Nandikotkur','Banaganapalle',
  'Anantapur','Guntakal','Tadipatri','Dharmavaram','Hindupur','Kadiri','Gooty','Puttaparthi',
  'Pandalapaka','Kadiyam','Rajanagaram','Anaparthi','Razole','Malkipuram','Ravulapalem',
];

const getLabels = (categoryName = '') => {
  const key = categoryName.toLowerCase();
  return Object.entries(CATEGORY_LABELS).find(([k]) => key.includes(k))?.[1] || CATEGORY_LABELS.default;
};

const AddShopPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '', ownerName: '', phone: '', whatsapp: '', description: '',
    address: '', village: '', district: 'Andhra Pradesh',
    state: 'Andhra Pradesh', categoryId: '', openTime: '08:00',
    closeTime: '21:00', is24Hours: false, isDeliveryAvailable: false,
    imageUrl: '',
  });
  const [villageSearch, setVillageSearch] = useState('');
  const [showVillageDrop, setShowVillageDrop] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/public/categories').then(res => setCategories(res.data.data || []));
  }, []);

  const selectedCategory = categories.find(c => String(c.id) === String(form.categoryId));
  const labels = getLabels(selectedCategory?.name || '');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const filteredVillages = villageSearch.trim().length < 1 ? [] :
    AP_VILLAGES.filter(v => v.toLowerCase().includes(villageSearch.toLowerCase()))
      .sort((a, b) => {
        const q = villageSearch.toLowerCase();
        return (a.toLowerCase().startsWith(q) ? 0 : 1) - (b.toLowerCase().startsWith(q) ? 0 : 1) || a.localeCompare(b);
      }).slice(0, 8);

  const selectVillage = (v) => {
    setForm(f => ({ ...f, village: v }));
    setVillageSearch(v);
    setShowVillageDrop(false);
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      data.append('folder', 'villageconnect/shops');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: data });
      if (!res.ok) throw new Error();
      const result = await res.json();
      setForm(f => ({ ...f, imageUrl: result.secure_url }));
      toast.success('Photo uploaded!');
    } catch {
      toast.error('Photo upload failed. Check Cloudinary setup.');
      setImagePreview(null);
      setForm(f => ({ ...f, imageUrl: '' }));
    } finally { setUploading(false); }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setForm(f => ({ ...f, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) { toast.error('Please wait for photo to finish uploading'); return; }
    if (!form.village.trim()) { toast.error('Please enter your village or city'); return; }
    setLoading(true);
    try {
      await API.post('/merchant/shops', { ...form, categoryId: form.categoryId ? Number(form.categoryId) : null });
      toast.success('Business registered successfully!');
      navigate('/merchant/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to register business');
    } finally { setLoading(false); }
  };

  const inp = {
    width: '100%', boxSizing: 'border-box',
    border: '1.5px solid #E5E7EB', borderRadius: 12,
    padding: '12px 14px', fontSize: 14, outline: 'none',
    fontFamily: 'inherit', color: '#111827', background: 'white',
  };
  const lbl = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };
  const card = { background: 'white', borderRadius: 18, border: '1px solid #F3F4F6', boxShadow: '0 1px 6px rgba(0,0,0,.06)', padding: '20px', marginBottom: 16 };
  const cardTitle = { fontSize: 14, fontWeight: 700, color: '#1F2937', marginBottom: 16 };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', paddingBottom: 32 }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(160deg, #1E7B3B 0%, #2F855A 100%)', padding: '52px 18px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span style={{ color: 'white', fontSize: 18 }}>←</span>
          </button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>Register Your Business</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>Shop · Clinic · Hospital · Service</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 560, margin: '0 auto', padding: '16px 16px 0' }}>

        {/* PHOTO */}
        <div style={card}>
          <div style={cardTitle}>Business Photo</div>
          <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14 }}>Upload a photo — customers will see this first</p>
          {imagePreview ? (
            <div style={{ position: 'relative' }}>
              <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 12, border: '1px solid #E5E7EB' }} />
              {uploading && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,.8)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 20, border: '2px solid #1E7B3B', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1E7B3B' }}>Uploading...</span>
                </div>
              )}
              {!uploading && (
                <button type="button" onClick={handleRemoveImage} style={{ position: 'absolute', top: 8, right: 8, background: '#EF4444', color: 'white', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>✕</button>
              )}
            </div>
          ) : (
            <button type="button" onClick={() => fileInputRef.current?.click()} style={{ width: '100%', height: 140, border: '2px dashed #D1D5DB', borderRadius: 12, background: '#F9FAFB', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontSize: 36 }}>📷</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>Tap to upload photo</span>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>JPG, PNG up to 5MB</span>
            </button>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleImageSelect} style={{ display: 'none' }} />
        </div>

        {/* BASIC INFO */}
        <div style={card}>
          <div style={cardTitle}>Basic Information</div>

          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Category</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} style={inp}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>{labels.name} *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              required placeholder={labels.nameEx} style={inp} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Owner / Doctor Name</label>
            <input type="text" name="ownerName" value={form.ownerName} onChange={handleChange}
              placeholder="Your full name" style={inp} />
          </div>

          <div>
            <label style={lbl}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
              placeholder={labels.desc}
              style={{ ...inp, resize: 'vertical', minHeight: 80 }} />
          </div>
        </div>

        {/* CONTACT */}
        <div style={card}>
          <div style={cardTitle}>Contact Details</div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Phone Number *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              required placeholder="9999999999" style={inp} />
          </div>
          <div>
            <label style={lbl}>WhatsApp Number</label>
            <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange}
              placeholder="If different from phone" style={inp} />
          </div>
        </div>

        {/* LOCATION */}
        <div style={card}>
          <div style={cardTitle}>Location</div>

          {/* Village search */}
          <div style={{ marginBottom: 14, position: 'relative' }}>
            <label style={lbl}>Village / Town / City *</label>
            <input
              type="text"
              value={villageSearch}
              onChange={e => { setVillageSearch(e.target.value); setForm(f => ({ ...f, village: e.target.value })); setShowVillageDrop(true); }}
              onFocus={() => setShowVillageDrop(true)}
              onBlur={() => setTimeout(() => setShowVillageDrop(false), 150)}
              placeholder="Type your village or city..."
              style={inp}
            />
            {showVillageDrop && filteredVillages.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,.12)', zIndex: 50, marginTop: 4, overflow: 'hidden' }}>
                {filteredVillages.map(v => (
                  <div key={v} onMouseDown={() => selectVillage(v)} style={{ padding: '11px 14px', fontSize: 13, cursor: 'pointer', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>📍</span> {v}
                  </div>
                ))}
              </div>
            )}
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5 }}>Type to search — or enter your village name if not listed</div>
          </div>

          <div>
            <label style={lbl}>Address / Landmark</label>
            <input type="text" name="address" value={form.address} onChange={handleChange}
              placeholder="Near temple, main road, ward no..." style={inp} />
          </div>
        </div>

        {/* TIMINGS */}
        <div style={card}>
          <div style={cardTitle}>Timings</div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 14 }}>
            <input type="checkbox" name="is24Hours" checked={form.is24Hours} onChange={handleChange} style={{ width: 16, height: 16, accentColor: '#1E7B3B' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Open 24 Hours</span>
          </label>
          {!form.is24Hours && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <label style={lbl}>Opening Time</label>
                <input type="time" name="openTime" value={form.openTime} onChange={handleChange} style={inp} />
              </div>
              <div>
                <label style={lbl}>Closing Time</label>
                <input type="time" name="closeTime" value={form.closeTime} onChange={handleChange} style={inp} />
              </div>
            </div>
          )}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox" name="isDeliveryAvailable" checked={form.isDeliveryAvailable} onChange={handleChange} style={{ width: 16, height: 16, accentColor: '#1E7B3B' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Home Delivery Available</span>
          </label>
        </div>

        <button type="submit" disabled={loading || uploading} style={{
          width: '100%', padding: '15px', borderRadius: 14, border: 'none',
          background: loading || uploading ? '#9CA3AF' : '#1E7B3B',
          color: 'white', fontSize: 15, fontWeight: 800, cursor: loading || uploading ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', marginBottom: 24,
        }}>
          {loading ? 'Registering...' : '✅ Register Business'}
        </button>
      </form>
    </div>
  );
};

export default AddShopPage;
