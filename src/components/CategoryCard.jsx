import React from 'react';

const CategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <button onClick={onClick}
      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2
                  transition min-w-[72px]
                  ${isSelected
                    ? 'border-blue-800 bg-blue-50 text-blue-950'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
                  }`}>
      <span className="text-2xl">{category.icon}</span>
      <span className="text-xs font-medium leading-tight text-center">
        {category.name}
      </span>
    </button>
  );
};

export default CategoryCard;