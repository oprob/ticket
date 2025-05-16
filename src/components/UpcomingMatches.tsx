import React from 'react';
import { upcomingMatches } from '../data/matchesData';
import MatchCard from './MatchCard';

const UpcomingMatches: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold mb-6">Upcoming Matches</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {upcomingMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;