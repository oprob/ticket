import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { featuredMatches } from '../data/matchesData';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMatches.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToMatches = () => {
    document.getElementById('featured-matches')?.scrollIntoView({ 
      behavior: 'smooth'
    });
  };

  const bgGradients = [
    'from-blue-900 via-purple-900 to-black',
    'from-green-900 via-teal-900 to-black',
    'from-red-900 via-orange-900 to-black'
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background with overlay and animation */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${bgGradients[currentSlide % bgGradients.length]} transition-all duration-1000`}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Animated spotlight effect */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-white opacity-5 blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white leading-tight">
          Experience The <span className="text-green-400">Thrill</span> Live
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          Get tickets to the biggest sports events and feel the energy of the crowd
        </p>

        <div className="relative bg-gray-800 bg-opacity-70 p-6 rounded-xl w-full max-w-3xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 text-left mb-4 md:mb-0 md:mr-8">
              <h3 className="text-xl font-bold text-green-400">Featured Match</h3>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">{featuredMatches[currentSlide].teams}</h2>
              <p className="text-gray-300 mt-1">{featuredMatches[currentSlide].date} • {featuredMatches[currentSlide].stadium}</p>
            </div>
            
            <button 
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={scrollToMatches}
            >
              Find Tickets
            </button>
          </div>
        </div>

        <button 
          onClick={scrollToMatches}
          className="absolute bottom-10 animate-bounce"
        >
          <ChevronDown size={32} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Hero;