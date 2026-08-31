import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const LoginPage = () => {
  const [form, setForm] = useState({ emailOrPhone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      const { token, ...userData } = res.data.data;
      login(userData, token);
      toast.success(`Welcome back, ${userData.name}!`);
      if (userData.role === 'MERCHANT') navigate('/merchant/dashboard');
      else if (userData.role === 'ADMIN') navigate('/admin');
      else navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏘️</div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Your village. Your people. Your shops.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone or Email</label>
              <input type="text" name="emailOrPhone" value={form.emailOrPhone}
                     onChange={handleChange} placeholder="9999999999 or email" required
                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                                focus:outline-none focus:border-blue-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" name="password" value={form.password}
                     onChange={handleChange} placeholder="Enter password" required
                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                                focus:outline-none focus:border-blue-800" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold
                         hover:bg-blue-950 transition disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-600 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-900 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;