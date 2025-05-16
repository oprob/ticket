import React from 'react';
import Hero from '../components/Hero';
import FeaturedMatches from '../components/FeaturedMatches';
import SportSelector from '../components/SportSelector';
import UpcomingMatches from '../components/UpcomingMatches';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <SportSelector />
        <FeaturedMatches />
        <UpcomingMatches />
      </div>
    </div>
  );
};

export default HomePage;