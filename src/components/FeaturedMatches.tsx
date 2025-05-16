import React from 'react';
import { ArrowRight } from 'lucide-react';
import { featuredMatches } from '../data/matchesData';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FeaturedMatches: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="py-12" id="featured-matches">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Matches</h2>
        <Link to="/sport/all" className="text-green-400 flex items-center hover:text-green-300 transition-colors">
          View all <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredMatches.map((match) => (
          <div 
            key={match.id} 
            className={`relative rounded-xl overflow-hidden group ${match.sportBgClass} shadow-lg`}
          >
            {/* Spotlight effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <div className="absolute -inset-full w-[200%] h-[200%] rounded-full bg-white blur-3xl group-hover:animate-spotlight"></div>
            </div>
            
            <div className="relative p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${match.sportBadgeClass}`}>
                  {match.sport}
                </span>
                
                {match.trending && (
                  <span className="text-sm font-semibold px-3 py-1 rounded-full bg-yellow-500 text-yellow-900">
                    Trending
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{match.teams}</h3>
              
              <div className="flex items-center text-gray-300 mb-4">
                <span>{match.dateFormatted}</span>
                <span className="mx-2">•</span>
                <span>{match.stadium}</span>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div>
                  <p className="text-sm text-gray-400">Starting from</p>
                  <p className="text-lg font-bold text-white">{match.ticketInfo}</p>
                </div>
                
                <button 
                  onClick={() => addToCart(match)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${match.sportBgButton} hover:shadow-md hover:-translate-y-1`}
                >
                  Get Tickets
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMatches;