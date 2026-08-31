import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import API from '../api/axios';
import ShopCard from '../components/ShopCard';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';

const ShopListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const village = searchParams.get('village') || 'Pandalapaka';
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await API.get('/public/categories');
      setCategories(res.data.data);
    } catch (err) { console.error(err); }
  }, []);

  const fetchShops = useCallback(async () => {
    setLoading(true);
    try {
      const params = { village };
      if (selectedCategory) params.categoryId = selectedCategory;
      const res = await API.get('/public/shops', { params });
      setShops(res.data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [village, selectedCategory]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchShops(); }, [fetchShops]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) { fetchShops(); return; }
    setLoading(true);
    try {
      const res = await API.get('/public/shops/search', { params: { village, keyword: searchTerm } });
      setShops(res.data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-5">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-900
                     mb-3 text-sm font-medium transition">
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="text-xl font-bold text-gray-800">📍 {village}</h1>
        <p className="text-sm text-gray-500">{shops.length} shops found</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-5">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search shops..."
                 className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm
                            focus:outline-none focus:border-blue-800" />
        </div>
        <button type="submit"
          className="bg-blue-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium
                     hover:bg-blue-950 transition">
          Search
        </button>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        <button onClick={() => setSelectedCategory(null)}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition min-w-[72px]
            ${!selectedCategory ? 'border-blue-800 bg-blue-50 text-blue-950'
                                : 'border-gray-200 bg-white text-gray-600'}`}>
          <span className="text-2xl">🏪</span>
          <span className="text-xs font-medium">All</span>
        </button>
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat}
            isSelected={selectedCategory === cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)} />
        ))}
      </div>

      {loading ? <LoadingSpinner /> : shops.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">🏪</div>
          <p>No shops found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {shops.map((shop) => <ShopCard key={shop.id} shop={shop} />)}
        </div>
      )}
    </div>
  );
};

export default ShopListPage;