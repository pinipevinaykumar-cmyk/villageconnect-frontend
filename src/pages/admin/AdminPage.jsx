import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import { Users, Store, Package, ArrowLeft, ToggleLeft, ToggleRight } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('users');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, shopsRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/users'),
        API.get('/admin/shops'),
      ]);
      setStats(statsRes.data.data);
      setUsers(usersRes.data.data);
      setShops(shopsRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleUser = async (id) => {
    try {
      await API.put(`/admin/users/${id}/toggle-active`);
      setUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
    } catch (err) { console.error(err); }
  };

  const tabClass = (t) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition ${
      tab === t ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
    }`;

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <button onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-500 hover:text-green-600 mb-4 text-sm font-medium">
        <ArrowLeft size={18} /> Back to Home
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard icon={Users}    label="Total Users"    value={stats.totalUsers}     color="bg-blue-500" />
          <StatCard icon={Users}    label="Merchants"      value={stats.totalMerchants}  color="bg-purple-500" />
          <StatCard icon={Users}    label="Customers"      value={stats.totalCustomers}  color="bg-indigo-400" />
          <StatCard icon={Store}    label="Total Shops"    value={stats.totalShops}      color="bg-green-500" />
          <StatCard icon={Store}    label="Open Now"       value={stats.openShops}       color="bg-emerald-500" />
          <StatCard icon={Package}  label="Products"       value={stats.totalProducts}   color="bg-orange-500" />
        </div>
      )}

      <div className="flex gap-2 mb-5">
        <button className={tabClass('users')} onClick={() => setTab('users')}>
          <span className="flex items-center gap-1"><Users size={14} /> Users ({users.length})</span>
        </button>
        <button className={tabClass('shops')} onClick={() => setTab('shops')}>
          <span className="flex items-center gap-1"><Store size={14} /> Shops ({shops.length})</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : tab === 'users' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Village</th>
                  <th className="px-4 py-3 text-left">Joined</th>
                  <th className="px-4 py-3 text-left">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                    <td className="px-4 py-3 text-gray-600">{u.email}</td>
                    <td className="px-4 py-3 text-gray-600">{u.phone}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                        ${u.role === 'MERCHANT' ? 'bg-purple-100 text-purple-700'
                          : u.role === 'ADMIN' ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{u.village || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleUser(u.id)}
                        className={`transition ${u.isActive ? 'text-green-500 hover:text-red-400' : 'text-gray-400 hover:text-green-500'}`}>
                        {u.isActive ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Shop Name</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Village</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {shops.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                    <td className="px-4 py-3 text-gray-600">{s.ownerName || s.merchant?.name || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{s.phone}</td>
                    <td className="px-4 py-3 text-gray-600">{s.village}</td>
                    <td className="px-4 py-3 text-gray-600">{s.category?.name || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                        ${s.currentStatus === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {s.currentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
