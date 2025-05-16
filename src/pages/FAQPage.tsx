import React from 'react';
import { HelpCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "How does the ticket booking process work?",
      answer: "Our booking process is simple: Browse events, add tickets to cart, and click 'Proceed to WhatsApp'. You'll be connected with our team who will assist you with finalizing your ticket purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "Payment details and available methods will be discussed directly through WhatsApp when finalizing your ticket purchase. We ensure secure transaction methods for your convenience."
    },
    {
      question: "How do I receive my tickets?",
      answer: "Once your payment is confirmed, tickets will be delivered electronically to your email or through WhatsApp, depending on the event and ticket type."
    },
    {
      question: "Can I cancel or modify my ticket request?",
      answer: "Yes, you can discuss modifications or cancellations through WhatsApp before finalizing the purchase. Specific policies may vary by event."
    },
    {
      question: "Are the tickets guaranteed to be authentic?",
      answer: "Yes, we only deal with verified ticket sources and guarantee the authenticity of all tickets sold through our platform."
    },
    {
      question: "What if an event gets cancelled or postponed?",
      answer: "In case of cancellation or postponement, we'll contact you directly through WhatsApp with information about refunds or rescheduling options."
    },
    {
      question: "Can I purchase tickets for multiple events?",
      answer: "Yes, you can add tickets for multiple events to your cart and discuss all purchases in a single WhatsApp conversation."
    },
    {
      question: "Do you offer group bookings?",
      answer: "Yes, we handle group bookings! Add your desired quantity to cart or contact us directly through WhatsApp for special group arrangements."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-r from-yellow-900 to-orange-900 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <HelpCircle size={32} className="text-yellow-400 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">
            Find answers to common questions about our ticket booking process and services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-4">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <a 
              href="/contact"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;