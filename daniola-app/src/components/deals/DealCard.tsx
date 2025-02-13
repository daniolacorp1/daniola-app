import React from 'react';

interface DealCardProps {
  id: number;
  title: string;
  status: string;
  description: string;
  image: string;
  icon: React.FC<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
  category: string;
  price: number;
  discount: number;
  gradientColors?: string;
  onViewDeal: (id: number) => void;
}

export const DealCard: React.FC<DealCardProps> = ({
  id,
  title,
  status,
  description,
  image,
  icon,
  iconBgColor,
  iconColor,
  category,
  price,
  discount,
  gradientColors,
  onViewDeal,
}) => {
  return (
    <div className={`p-4 rounded-lg ${gradientColors}`} onClick={() => onViewDeal(id)}>
      {image && (
        <img src={image} alt={title} className="w-full h-32 object-cover rounded-lg mb-4" />
      )}
      <div className={`p-2 rounded-full ${iconBgColor} w-10 h-10 flex items-center justify-center`}>
        {React.createElement(icon, { className: `w-6 h-6 ${iconColor}` })}
      </div>
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-sm">{description}</p>
      <div className="mt-2">
        <span className="text-sm">{category}</span>
        <span className="text-sm ml-2">{status}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg font-bold">${price - discount}</span>
        {discount > 0 && (
          <span className="text-sm line-through ml-2">${price}</span>
        )}
      </div>
    </div>
  );
};
