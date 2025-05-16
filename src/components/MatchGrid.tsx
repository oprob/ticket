import React, { useState } from 'react';
import MatchCard from './MatchCard';
import { Match } from '../types';

interface MatchGridProps {
  matches: Match[];
}

const MatchGrid: React.FC<MatchGridProps> = ({ matches }) => {
  const [filter, setFilter] = useState('all');

  const filteredMatches = filter === 'all' 
    ? matches 
    : filter === 'trending' 
      ? matches.filter(match => match.trending) 
      : matches.filter(match => !match.soldOut);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Available Matches</h3>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-1 rounded-full text-sm transition-colors ${
              filter === 'all' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('trending')} 
            className={`px-4 py-1 rounded-full text-sm transition-colors ${
              filter === 'trending' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Trending
          </button>
          <button 
            onClick={() => setFilter('available')} 
            className={`px-4 py-1 rounded-full text-sm transition-colors ${
              filter === 'available' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Available
          </button>
        </div>
      </div>
      
      {filteredMatches.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No matches found for the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchGrid;