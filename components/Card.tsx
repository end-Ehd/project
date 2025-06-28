import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-2xl border border-gray-200/80 rounded-2xl shadow-xl p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;