import React, { useState } from 'react';
import { Calendar, MapPin, TrendingUp, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Match } from '../types';
import CountdownTimer from './CountdownTimer';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { addToCart } = useCart();
  
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(match);
  };

  return (
    <div 
      className="relative h-64 perspective-1000 cursor-pointer group"
      onClick={toggleFlip}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div 
          className={`absolute w-full h-full backface-hidden bg-gray-800 rounded-xl overflow-hidden ${match.sportBgClass} p-4 flex flex-col`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${match.sportColor} mr-2`}></div>
              <span className="text-sm text-gray-300">{match.sport}</span>
            </div>
            {match.trending && (
              <div className="flex items-center text-yellow-400 text-sm">
                <TrendingUp size={14} className="mr-1" />
                <span>Trending</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="flex items-center justify-center w-full mb-4">
              <div className="flex flex-col items-center">
                <img 
                  src={match.team1Logo} 
                  alt={match.team1}
                  className="w-12 h-12 object-contain"
                />
                <span className="mt-1 font-semibold">{match.team1}</span>
              </div>
              
              <div className="mx-4 text-xl font-bold text-gray-400">VS</div>
              
              <div className="flex flex-col items-center">
                <img 
                  src={match.team2Logo} 
                  alt={match.team2}
                  className="w-12 h-12 object-contain"
                />
                <span className="mt-1 font-semibold">{match.team2}</span>
              </div>
            </div>
            
            <CountdownTimer targetDate={match.date} />
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`w-full py-2 mt-2 rounded-md font-bold transition-all duration-300 group-hover:shadow-glow ${match.sportBgButton} hover:opacity-90`}
          >
            Add to Cart
          </button>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-800 rounded-xl overflow-hidden p-4 flex flex-col"
        >
          <h3 className="text-lg font-bold mb-4">{match.teams}</h3>
          
          <div className="flex-1 flex flex-col space-y-3">
            <div className="flex items-start">
              <Calendar size={16} className="mt-1 mr-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-300">Date & Time</p>
                <p className="font-medium">{match.dateFormatted} • {match.time}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={16} className="mt-1 mr-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-300">Venue</p>
                <p className="font-medium">{match.stadium}</p>
                <p className="text-sm text-gray-400">{match.location}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock size={16} className="mt-1 mr-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-300">Duration</p>
                <p className="font-medium">{match.duration}</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`w-full py-2 mt-2 rounded-md font-bold transition-all duration-300 ${match.sportBgButton} hover:opacity-90`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;