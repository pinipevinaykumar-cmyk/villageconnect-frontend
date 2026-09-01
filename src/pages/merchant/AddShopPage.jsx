import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import API from '../../api/axios';

const VILLAGES = ['Pandalapaka', 'Kadiyam', 'Rajanagaram', 'Kovvur', 'Nidadavolu'];

const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'villageconnect';
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'villageconnect_shops';

const AddShopPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '', ownerName: '', phone: '', whatsapp: '', description: '',
    address: '', village: 'Pandalapaka', district: 'East Godavari',
    state: 'Andhra Pradesh', categoryId: '', openTime: '08:00',
    closeTime: '21:00', is24Hours: false, isDeliveryAvailable: false,
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/public/categories').then(res => setCategories(res.data.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }

    // Show local preview immediately
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      data.append('folder', 'villageconnect/shops');

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: data }
      );

      if (!res.ok) throw new Error('Upload failed');
      const result = await res.json();
      setForm(prev => ({ ...prev, imageUrl: result.secure_url }));
      toast.success('Photo uploaded!');
    } catch {
      toast.error('Photo upload failed. Check Cloudinary setup.');
      setImagePreview(null);
      setForm(prev => ({ ...prev, imageUrl: '' }));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setForm(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) { toast.error('Please wait for photo to finish uploading'); return; }
    setLoading(true);
    try {
      await API.post('/merchant/shops', {
        ...form, categoryId: form.categoryId ? Number(form.categoryId) : null
      });
      toast.success('Shop added successfully!');
      navigate('/merchant/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add shop');
    } finally { setLoading(false); }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-800";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const sectionClass = "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4";

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Add Your Shop</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ── SHOP PHOTO ── */}
        <div className={sectionClass}>
          <h2 className="font-semibold text-gray-700">Shop Photo</h2>
          <p className="text-xs text-gray-400">Upload a photo of your shop — customers will see this</p>

          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Shop preview"
                className="w-full h-52 object-cover rounded-xl border border-gray-200"
              />
              {uploading && (
                <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium text-blue-900">Uploading...</span>
                </div>
              )}
              {!uploading && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full
                             w-7 h-7 flex items-center justify-center text-sm font-bold
                             hover:bg-red-600 transition"
                >
                  ✕
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl
                         flex flex-col items-center justify-center gap-2
                         hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer"
            >
              <span className="text-4xl">📷</span>
              <span className="text-sm font-medium text-gray-600">Tap to upload shop photo</span>
              <span className="text-xs text-gray-400">JPG, PNG up to 5MB</span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        {/* ── BASIC INFO ── */}
        <div className={sectionClass}>
          <h2 className="font-semibold text-gray-700">Basic Information</h2>
          <div>
            <label className={labelClass}>Shop Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
                   required placeholder="Sri Lakshmi Kirana" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Owner Name</label>
            <input type="text" name="ownerName" value={form.ownerName}
                   onChange={handleChange} placeholder="Your name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select name="categoryId" value={form.categoryId}
                    onChange={handleChange} className={inputClass}>
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" value={form.description}
                      onChange={handleChange} rows={3}
                      placeholder="What do you sell?"
                      className={inputClass} />
          </div>
        </div>

        {/* ── CONTACT ── */}
        <div className={sectionClass}>
          <h2 className="font-semibold text-gray-700">Contact Details</h2>
          <div>
            <label className={labelClass}>Phone Number *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                   required placeholder="9999999999" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>WhatsApp Number</label>
            <input type="tel" name="whatsapp" value={form.whatsapp}
                   onChange={handleChange} placeholder="If different from phone"
                   className={inputClass} />
          </div>
        </div>

        {/* ── LOCATION ── */}
        <div className={sectionClass}>
          <h2 className="font-semibold text-gray-700">Location</h2>
          <div>
            <label className={labelClass}>Village *</label>
            <select name="village" value={form.village}
                    onChange={handleChange} className={inputClass}>
              {VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Address / Landmark</label>
            <input type="text" name="address" value={form.address}
                   onChange={handleChange} placeholder="Near temple, main road..."
                   className={inputClass} />
          </div>
        </div>

        {/* ── TIMINGS ── */}
        <div className={sectionClass}>
          <h2 className="font-semibold text-gray-700">Shop Timings</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is24Hours" checked={form.is24Hours}
                   onChange={handleChange} className="w-4 h-4 accent-blue-900" />
            <span className="text-sm text-gray-700">Open 24 Hours</span>
          </label>
          {!form.is24Hours && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Opening Time</label>
                <input type="time" name="openTime" value={form.openTime}
                       onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Closing Time</label>
                <input type="time" name="closeTime" value={form.closeTime}
                       onChange={handleChange} className={inputClass} />
              </div>
            </div>
          )}
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="isDeliveryAvailable"
                   checked={form.isDeliveryAvailable} onChange={handleChange}
                   className="w-4 h-4 accent-blue-900" />
            <span className="text-sm text-gray-700">Delivery Available</span>
          </label>
        </div>

        <button type="submit" disabled={loading || uploading}
          className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold
                     text-base hover:bg-blue-950 transition disabled:opacity-50">
          {loading ? 'Adding shop...' : '🏪 Add Shop'}
        </button>
      </form>
    </div>
  );
};

export default AddShopPage;
