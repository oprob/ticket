import React from 'react';
import { Link } from 'react-router-dom';
import { sports } from '../data/sportsData';

const SportSelector: React.FC = () => {
  return (
    <div className="py-8" id="sport-selector">
      <h2 className="text-2xl font-bold mb-6">Select Your Sport</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sports.map((sport) => (
          <Link
            key={sport.id}
            to={`/sport/${sport.id}`}
            className={`group relative overflow-hidden rounded-lg p-6 flex flex-col items-center justify-center h-32 transition-all duration-300 ${sport.bgClass} hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:-translate-y-1`}
          >
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <div className={`w-full h-full ${sport.patternClass}`}></div>
            </div>
            
            <sport.icon size={32} className={`mb-2 ${sport.iconColor}`} />
            <span className="font-bold text-white text-lg">{sport.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SportSelector;