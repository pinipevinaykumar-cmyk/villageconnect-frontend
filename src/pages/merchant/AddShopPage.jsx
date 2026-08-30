import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import API from '../../api/axios';

const VILLAGES = ['Pandalapaka', 'Kadiyam', 'Rajanagaram', 'Kovvur', 'Nidadavolu'];

const AddShopPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '', ownerName: '', phone: '', whatsapp: '', description: '',
    address: '', village: 'Pandalapaka', district: 'East Godavari',
    state: 'Andhra Pradesh', categoryId: '', openTime: '08:00',
    closeTime: '21:00', is24Hours: false, isDeliveryAvailable: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/public/categories').then(res => setCategories(res.data.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const sectionClass = "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4";

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Add Your Shop</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

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

        <div className={sectionClass}>
          <h2 className="font-semibold text-gray-700">Shop Timings</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is24Hours" checked={form.is24Hours}
                   onChange={handleChange} className="w-4 h-4 accent-green-600" />
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
                   className="w-4 h-4 accent-green-600" />
            <span className="text-sm text-gray-700">Delivery Available</span>
          </label>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-bold
                     text-base hover:bg-green-700 transition disabled:opacity-50">
          {loading ? 'Adding shop...' : '🏪 Add Shop'}
        </button>
      </form>
    </div>
  );
};

export default AddShopPage;