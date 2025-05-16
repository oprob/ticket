import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { openWhatsApp } from '../utils/whatsapp';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      openWhatsApp(cartItems);
      setIsSubmitting(false);
      clearCart();
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute top-0 right-0 h-full w-full sm:w-96 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart size={20} className="text-green-400 mr-2" />
              <h2 className="text-xl font-bold">Your Cart</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:text-gray-400 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold">{item.teams}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-400 mb-3">
                      {item.dateFormatted} • {item.stadium}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className={`text-sm font-semibold ${item.sportColor}`}>
                        {item.sport}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="mb-4 bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">WhatsApp Message Preview:</p>
              <p className="text-sm">
                Hey, I'm interested in tickets for:
                {cartItems.map((item) => (
                  <span key={item.id} className="block ml-2 mt-1">
                    • {item.teams} ({item.dateFormatted}) - Qty: {item.quantity}
                  </span>
                ))}
                {cartItems.length > 0 && <span className="block mt-1">Can you assist further?</span>}
              </p>
            </div>
            
            <button 
              onClick={handleWhatsAppCheckout}
              disabled={cartItems.length === 0 || isSubmitting}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center ${
                cartItems.length === 0 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } transition-colors`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Proceed to WhatsApp'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;