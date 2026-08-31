import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock, Package, ArrowLeft } from 'lucide-react';
import API from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const ShopDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const [shopRes, productsRes] = await Promise.all([
          API.get(`/public/shops/${id}`),
          API.get(`/public/shops/${id}/products`)
        ]);
        setShop(shopRes.data.data);
        setProducts(productsRes.data.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchShopDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!shop) return <div className="text-center py-20 text-gray-500">Shop not found</div>;

  const isOpen = shop.currentStatus === 'OPEN';

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <button onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-green-600
                   mb-4 text-sm font-medium transition">
        <ArrowLeft size={18} /> Back
      </button>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="w-full h-40 bg-green-50 flex items-center justify-center text-6xl">
          {shop.imageUrl
            ? <img src={shop.imageUrl} alt={shop.name} className="w-full h-full object-cover" />
            : <span>{shop.category?.icon || '🏪'}</span>
          }
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{shop.name}</h1>
              <p className="text-sm text-gray-500">{shop.category?.name}</p>
            </div>
            <span className={`text-sm font-bold px-3 py-1.5 rounded-full
              ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              {isOpen ? '🟢 OPEN NOW' : '🔴 CLOSED'}
            </span>
          </div>
          {shop.openTime && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Clock size={15} /> Today: {shop.openTime} – {shop.closeTime}
            </div>
          )}
          {shop.address && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin size={15} /> {shop.address}, {shop.village}
            </div>
          )}
          {shop.description && (
            <p className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg">
              {shop.description}
            </p>
          )}
          <div className="grid grid-cols-3 gap-3 mt-5">
            <button onClick={() => window.open(`tel:${shop.phone}`)}
              className="flex flex-col items-center gap-1 py-3 bg-blue-50 text-blue-600
                         rounded-xl hover:bg-blue-100 transition">
              <Phone size={20} /><span className="text-xs font-medium">Call</span>
            </button>
            <button onClick={() => window.open(`https://wa.me/91${shop.whatsapp || shop.phone}`)}
              className="flex flex-col items-center gap-1 py-3 bg-green-50 text-green-600
                         rounded-xl hover:bg-green-100 transition">
              <MessageCircle size={20} /><span className="text-xs font-medium">WhatsApp</span>
            </button>
            <button onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(shop.name + ' ' + shop.village)}`)}
              className="flex flex-col items-center gap-1 py-3 bg-orange-50 text-orange-600
                         rounded-xl hover:bg-orange-100 transition">
              <MapPin size={20} /><span className="text-xs font-medium">Directions</span>
            </button>
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Package size={20} /> Products & Prices
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {products.map((product) => (
              <div key={product.id}
                   className="bg-white rounded-xl border border-gray-100 p-4
                              flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  {product.description && (
                    <p className="text-xs text-gray-500 mt-0.5">{product.description}</p>
                  )}
                  <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full
                    ${product.isAvailable ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {product.isAvailable ? 'Available' : 'Not available'}
                  </span>
                </div>
                {product.price && (
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                    {product.unit && <p className="text-xs text-gray-500">per {product.unit}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopDetailPage;