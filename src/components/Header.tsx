import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Ticket, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <header 
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <Ticket size={28} className="text-green-500 mr-2" />
              <span className="font-extrabold text-2xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                InsaneMoments
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="nav-link py-2">Home</Link>
              
              <div className="relative group">
                <button 
                  onClick={() => handleDropdown('sports')}
                  className="flex items-center space-x-1 nav-link py-2"
                >
                  <span>Sports</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${
                    activeDropdown === 'sports' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {activeDropdown === 'sports' && (
                  <div className="absolute top-full left-0 w-48 py-2 mt-1 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                    <Link to="/sport/football" className="block px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                      Football
                    </Link>
                    <Link to="/sport/cricket" className="block px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                      Cricket
                    </Link>
                    <Link to="/sport/basketball" className="block px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                      Basketball
                    </Link>
                    <Link to="/sport/tennis" className="block px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                      Tennis
                    </Link>
                    <Link to="/sport/esports" className="block px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                      eSports
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/trending" className="nav-link py-2">Trending</Link>
              <Link to="/upcoming" className="nav-link py-2">Upcoming</Link>
              
              <div className="relative group">
                <button 
                  onClick={() => handleDropdown('help')}
                  className="flex items-center space-x-1 nav-link py-2"
                >
                  <span>Help</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${
                    activeDropdown === 'help' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {activeDropdown === 'help' && (
                  <div className="absolute top-full left-0 w-48 py-2 mt-1 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                    <Link to="/faq" className="block px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                      FAQ
                    </Link>
                    <Link to="/contact" className="block px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                      Contact Us
                    </Link>
                    <Link to="/about" className="block px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleCart}
                className="relative p-2 text-white hover:text-green-400 transition-colors bg-gray-800 rounded-full"
              >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <button
                onClick={toggleMenu}
                className="p-2 text-white lg:hidden hover:text-green-400 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden bg-gray-800 shadow-xl">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                <div className="border-b border-gray-700 pb-4">
                  <div className="font-semibold text-gray-400 mb-2 px-4">Sports</div>
                  <Link 
                    to="/sport/football" 
                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Football
                  </Link>
                  <Link 
                    to="/sport/cricket" 
                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cricket
                  </Link>
                  <Link 
                    to="/sport/basketball" 
                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Basketball
                  </Link>
                  <Link 
                    to="/sport/tennis" 
                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tennis
                  </Link>
                  <Link 
                    to="/sport/esports" 
                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    eSports
                  </Link>
                </div>
                
                <Link 
                  to="/trending" 
                  className="py-2 px-4 hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Trending
                </Link>
                <Link 
                  to="/upcoming" 
                  className="py-2 px-4 hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Upcoming
                </Link>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="font-semibold text-gray-400 mb-2 px-4">Help & Support</div>
                  <Link 
                    to="/faq" 
                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link 
                    to="/about" 
                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Shopping Cart Sidebar - Moved outside header for better z-index handling */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;