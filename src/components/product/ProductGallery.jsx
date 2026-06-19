'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FiZoomIn } from 'react-icons/fi';
import clsx from 'clsx';

export default function ProductGallery({ images = [], productName = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const safeImages =
    images.length > 0 ? images : [{ url: '/images/placeholder-product.jpg', alt: productName }];

  const active = safeImages[activeIndex];

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main Image */}
        <div
          className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden cursor-zoom-in group"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={active.url}
            alt={active.alt || productName}
            priority
            width={600}
            height={800}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-3 right-3 bg-white/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <FiZoomIn size={16} className="text-primary" />
          </div>
        </div>

        {/* Thumbnails */}
        {safeImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {safeImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={clsx(
                  'relative flex-shrink-0 w-16 h-20 overflow-hidden border-2 transition-all duration-200',
                  activeIndex === i ? 'border-accent' : 'border-gray-100 hover:border-gray-300'
                )}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${productName} ${i + 1}`}
                  width={64}
                  height={80}
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative max-w-2xl max-h-[90vh] w-full">
            <Image
              src={active.url}
              alt={active.alt || productName}
              width={700}
              height={900}
              className="object-contain max-h-[90vh] w-auto mx-auto"
            />
          </div>
          <p className="absolute bottom-6 text-white/50 text-sm">Click anywhere to close</p>
        </div>
      )}
    </>
  );
}
