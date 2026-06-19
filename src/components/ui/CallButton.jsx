'use client';
import { FiPhone } from 'react-icons/fi';

export default function CallButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923056687553';
  return (
    <a
      href={`tel:${number}`}
      aria-label="Call us on"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#2d3748] text-white flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 rounded-full"
    >
      <FiPhone size={26} />
    </a>
  );
}