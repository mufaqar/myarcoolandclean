'use client';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923056687553';
  return (
    <a
      href={`https://wa.me/${number}?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20your%20home%20maintenance%20services.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 rounded-full"
    >
      <FaWhatsapp size={26} />
    </a>
  );
}
