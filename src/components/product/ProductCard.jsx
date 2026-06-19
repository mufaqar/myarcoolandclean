'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';

export default function ProductCard({ product, className }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const primaryImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
  const imageUrl = primaryImage?.url || '/images/placeholder-product.jpg';
  const categories = product.categories?.map((c) => c.name || c).join(', ');

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const actionsOverlay = card.querySelector('[data-actions]');

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
        duration: 0.4,
        ease: 'power2.out',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.08,
          duration: 0.5,
          ease: 'power2.out',
        });
      }

      if (actionsOverlay) {
        gsap.to(actionsOverlay, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        duration: 0.4,
        ease: 'power2.out',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      }

      if (actionsOverlay) {
        gsap.to(actionsOverlay, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={clsx('product-card bg-white border border-primary-200 hover:border-accent overflow-hidden transition-all duration-300 flex flex-col h-full', className)} ref={cardRef}>
      {/* Image Container */}
      <div className="relative overflow-hidden bg-slate-100 aspect-square">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            ref={imageRef}
            src={imageUrl}
            alt={primaryImage?.alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover w-full h-full"
          />
        </Link>

        {/* Badges - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNewArrival && (
            <span className="bg-accent text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wide">New</span>
          )}
          {product.isEditorChoice && (
            <span className="bg-primary-900 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wide">Best</span>
          )}
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-primary-900/30 flex items-end justify-center pb-4 opacity-0 pointer-events-none transition-opacity duration-300" data-actions>
          <a
            href={product.whatsappLink || `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-4 py-2 hover:bg-[#128C7E] transition-colors uppercase tracking-wide"
          >
            <FaWhatsapp size={14} /> Chat
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {categories && (
          <p className="text-[10px] text-primary-500 uppercase tracking-widest mb-2 font-bold">{categories}</p>
        )}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-heading text-sm font-semibold text-primary-900 leading-tight hover:text-accent transition-colors line-clamp-2 mb-4 flex-grow">
            {product.name}
          </h3>
        </Link>
        <Link
          href={`/product/${product.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-accent-dark transition-all uppercase tracking-wide mt-auto"
        >
          View <FiArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
