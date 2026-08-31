import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', role: 'CUSTOMER', village: 'Pandalapaka'
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/register', form);
      const { token, ...userData } = res.data.data;
      login(userData, token);
      toast.success('Account created successfully!');
      if (userData.role === 'MERCHANT') navigate('/merchant/add-shop');
      else navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Server may be starting up — please try again in 30 seconds.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-800";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏘️</div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
              <div className="grid grid-cols-2 gap-2">
                {['CUSTOMER', 'MERCHANT'].map((r) => (
                  <button key={r} type="button" onClick={() => setForm({ ...form, role: r })}
                    className={`py-2.5 rounded-xl border-2 text-sm font-medium transition
                      ${form.role === r ? 'border-blue-800 bg-blue-50 text-blue-950'
                                        : 'border-gray-200 text-gray-600'}`}>
                    {r === 'CUSTOMER' ? '👤 Customer' : '🏪 Shop Owner'}
                  </button>
                ))}
              </div>
            </div>
            <input type="text" name="name" value={form.name} onChange={handleChange}
                   required placeholder="Full Name" className={inputClass} />
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                   required placeholder="Phone Number" className={inputClass} />
            <input type="email" name="email" value={form.email} onChange={handleChange}
                   required placeholder="Email" className={inputClass} />
            <input type="password" name="password" value={form.password}
                   onChange={handleChange} required placeholder="Password (min 6 chars)"
                   className={inputClass} />
            <button type="submit" disabled={loading}
              className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold
                         hover:bg-blue-950 transition disabled:opacity-50">
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-900 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;