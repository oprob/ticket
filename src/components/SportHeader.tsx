import React from 'react';
import { Sport } from '../types';

interface SportHeaderProps {
  sport: Sport;
}

const SportHeader: React.FC<SportHeaderProps> = ({ sport }) => {
  return (
    <div className={`relative ${sport.headerBgClass} py-20`}>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-70"></div>
      
      <div className="container mx-auto px-4 relative flex items-center">
        <div className="mr-6">
          <sport.icon size={48} className={`${sport.iconColor}`} />
        </div>
        
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{sport.name}</h1>
          <p className="text-gray-300 mt-2">{sport.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SportHeader;