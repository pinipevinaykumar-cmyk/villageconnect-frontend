import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Plus, Package, ToggleLeft, ToggleRight } from 'lucide-react';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const MerchantDashboard = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'MERCHANT') { navigate('/login'); return; }
    fetchShops();
  }, [navigate, user]);

  const fetchShops = async () => {
    try {
      const res = await API.get('/merchant/shops');
      setShops(res.data.data);
    } catch (err) { toast.error('Failed to load shops'); }
    finally { setLoading(false); }
  };

  const toggleStatus = async (shopId) => {
    try {
      const res = await API.put(`/merchant/shops/${shopId}/toggle-status`);
      setShops(shops.map((s) => s.id === shopId ? res.data.data : s));
      toast.success('Status updated!');
    } catch (err) { toast.error('Failed to update status'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">My Shops</h1>
          <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
        </div>
        <Link to="/merchant/add-shop"
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2.5
                     rounded-xl text-sm font-semibold hover:bg-blue-950 transition">
          <Plus size={16} /> Add Shop
        </Link>
      </div>

      {shops.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-5xl mb-4">🏪</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">No shops yet</h2>
          <p className="text-sm text-gray-500 mb-5">Add your first shop!</p>
          <Link to="/merchant/add-shop"
            className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-semibold
                       hover:bg-blue-950 transition">
            Add Your Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {shops.map((shop) => {
            const isOpen = shop.currentStatus === 'OPEN';
            return (
              <div key={shop.id}
                   className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg">{shop.name}</h2>
                    <p className="text-sm text-gray-500">
                      {shop.category?.name} • {shop.village}
                    </p>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full
                    ${isOpen ? 'bg-blue-100 text-blue-950' : 'bg-red-100 text-red-600'}`}>
                    {isOpen ? '🟢 OPEN' : '🔴 CLOSED'}
                  </span>
                </div>
                {shop.openTime && (
                  <p className="text-sm text-gray-500 mb-4">
                    🕒 {shop.openTime} – {shop.closeTime}
                  </p>
                )}
                <div className="flex gap-3 flex-wrap">
                  <button onClick={() => toggleStatus(shop.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                                font-semibold transition
                                ${isOpen ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                         : 'bg-blue-50 text-blue-900 hover:bg-blue-100'}`}>
                    {isOpen ? <><ToggleRight size={16} /> Mark Closed</>
                             : <><ToggleLeft size={16} /> Mark Open</>}
                  </button>
                  <Link to={`/merchant/shops/${shop.id}/products`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                               font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                    <Package size={16} /> Manage Products
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MerchantDashboard;