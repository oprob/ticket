import React from 'react';
import { Calendar } from 'lucide-react';
import { upcomingMatches } from '../data/matchesData';
import MatchGrid from '../components/MatchGrid';

const UpcomingPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-r from-blue-900 to-cyan-900 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Calendar size={32} className="text-blue-400 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Upcoming Matches</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">
            Plan ahead and secure your tickets for these upcoming sports events. From major leagues to international tournaments, find your next live sports experience here.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <MatchGrid matches={upcomingMatches} />
      </div>
    </div>
  );
};

export default UpcomingPage;