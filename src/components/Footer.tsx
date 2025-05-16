import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Twitter, Facebook, Ticket } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Ticket size={24} className="text-green-500 mr-2" />
              <span className="font-extrabold text-xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                InsaneMoments
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Experience the thrill of live sports events with the easiest ticket booking platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Sports</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sport/football" className="text-gray-400 hover:text-green-400 transition-colors">
                  Football
                </Link>
              </li>
              <li>
                <Link to="/sport/cricket" className="text-gray-400 hover:text-green-400 transition-colors">
                  Cricket
                </Link>
              </li>
              <li>
                <Link to="/sport/basketball" className="text-gray-400 hover:text-green-400 transition-colors">
                  Basketball
                </Link>
              </li>
              <li>
                <Link to="/sport/tennis" className="text-gray-400 hover:text-green-400 transition-colors">
                  Tennis
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-green-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>support@insanemoments.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} InsaneMoments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;