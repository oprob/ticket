import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSportById } from '../data/sportsData';
import { getMatchesBySportId } from '../data/matchesData';
import SportHeader from '../components/SportHeader';
import MatchGrid from '../components/MatchGrid';
import { Sport, Match } from '../types';

const SportPage: React.FC = () => {
  const { sportId } = useParams<{ sportId: string }>();
  const [sport, setSport] = useState<Sport | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (sportId) {
      const sportData = getSportById(sportId);
      const matchesData = getMatchesBySportId(sportId);
      
      setSport(sportData);
      setMatches(matchesData);
    }
  }, [sportId]);

  if (!sport) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <SportHeader sport={sport} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">{sport.name} Matches</h2>
        <MatchGrid matches={matches} />
      </div>
    </div>
  );
};

export default SportPage;