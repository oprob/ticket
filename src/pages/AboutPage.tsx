import React from 'react';
import { Users, Trophy, Clock, MessageSquare } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About InsaneMoments</h1>
          <p className="text-gray-300 max-w-2xl">
            Your premier destination for live sports tickets. We connect passionate fans with unforgettable sporting events.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-lg">
            <Users className="text-green-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">For the Fans</h3>
            <p className="text-gray-400">
              Created by sports enthusiasts, for sports enthusiasts. We understand what makes a great live experience.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <Trophy className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Premium Events</h3>
            <p className="text-gray-400">
              Access to the biggest matches and tournaments across all major sports.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <Clock className="text-purple-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Quick Process</h3>
            <p className="text-gray-400">
              Simple and fast ticket booking process through WhatsApp for your convenience.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <MessageSquare className="text-yellow-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Direct Support</h3>
            <p className="text-gray-400">
              Personal assistance through WhatsApp for all your ticket-related queries.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
              InsaneMoments was born from a simple idea: make sports ticket booking as easy as sending a message. We've combined the convenience of WhatsApp with our passion for sports to create a unique ticket booking experience.
            </p>
            <p className="text-gray-300 mb-4">
              Our platform connects you to the most exciting sports events happening around the world. From football matches to cricket tournaments, basketball games to tennis championships, we've got all your favorite sports covered.
            </p>
            <p className="text-gray-300">
              What sets us apart is our personal touch. Instead of complicated checkout processes, we handle your ticket requests through direct WhatsApp communication, ensuring you get exactly what you need with a human touch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;