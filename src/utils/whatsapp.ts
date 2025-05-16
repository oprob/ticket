import { Match } from '../types';

interface CartItem extends Match {
  quantity: number;
}

export const openWhatsApp = (cartItems: CartItem[]) => {
  const phoneNumber = "1234567890"; // Replace with your actual WhatsApp number
  
  const message = `Hey, I'm interested in tickets for:\n${cartItems
    .map(
      (item) =>
        `- ${item.teams} (${item.dateFormatted})\n  Quantity: ${item.quantity}`
    )
    .join("\n")}\nCan you assist further?`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappURL, "_blank");
};