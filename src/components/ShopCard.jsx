import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

const ShopCard = ({ shop }) => {
  const isOpen = shop.currentStatus === 'OPEN';

  return (
    <Link to={`/shops/${shop.id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100
                      hover:shadow-md transition p-4 flex flex-col gap-3">
        <div className="w-full h-32 bg-green-50 rounded-lg flex items-center
                        justify-center text-4xl overflow-hidden">
          {shop.imageUrl ? (
            <img src={shop.imageUrl} alt={shop.name}
                 className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span>{shop.category?.icon || '🏪'}</span>
          )}
        </div>
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-800 text-sm">{shop.name}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap
              ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              {isOpen ? '🟢 OPEN' : '🔴 CLOSED'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{shop.category?.name || 'Shop'}</p>
        </div>
        {shop.openTime && shop.closeTime && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            {shop.openTime} – {shop.closeTime}
          </div>
        )}
        {shop.address && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={12} />
            {shop.address}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ShopCard;