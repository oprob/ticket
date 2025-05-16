import React from 'react';
import { TrendingUp } from 'lucide-react';
import { upcomingMatches } from '../data/matchesData';
import MatchGrid from '../components/MatchGrid';

const TrendingPage: React.FC = () => {
  const trendingMatches = upcomingMatches.filter(match => match.trending);

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <TrendingUp size={32} className="text-yellow-400 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Trending Matches</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">
            Don't miss out on the most popular matches! These events are trending among fans and tickets are selling fast.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <MatchGrid matches={trendingMatches} />
      </div>
    </div>
  );
};

export default TrendingPage;