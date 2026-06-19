'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaFacebook, FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { FiStar, FiShoppingBag, FiShare2, FiCheck, FiChevronRight, FiPackage, FiRefreshCw, FiShield, FiZap } from 'react-icons/fi';
import ProductGallery from '@/components/product/ProductGallery';
import ReviewForm from '@/components/product/ReviewForm';
import ProductCard from '@/components/product/ProductCard';
import useCartStore from '@/store/cartStore';
import toast from 'react-hot-toast';
import clsx from 'clsx';

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function ProductSkeleton() {
  return (
    <div className="container-lg py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-3">
          <div className="skeleton aspect-[3/4] w-full" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton w-16 h-20 flex-shrink-0" />)}
          </div>
        </div>
        <div className="space-y-5 pt-4">
          <div className="skeleton h-4 w-1/4 rounded" />
          <div className="skeleton h-9 w-full rounded" />
          <div className="skeleton h-9 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-24 rounded" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton w-12 h-9 rounded" />)}
          </div>
          <div className="skeleton h-12 rounded" />
          <div className="skeleton h-12 rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ rating = 0, size = 16 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half   = !filled && i < rating;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24"
            className={clsx(filled || half ? 'text-accent' : 'text-gray-200')}>
            {half && (
              <defs>
                <linearGradient id={`hg-${i}`}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#e5e7eb" />
                </linearGradient>
              </defs>
            )}
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={half ? `url(#hg-${i})` : 'currentColor'}
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        );
      })}
    </div>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: FiPackage,   label: 'Express Delivery', sub: 'Across UAE' },
  { icon: FiRefreshCw, label: 'Free Returns',      sub: 'Within 30 days' },
  { icon: FiShield,    label: '100% Warranty',     sub: 'Every stitch' },
  { icon: FiZap,       label: 'Custom Orders',     sub: 'Logo printing' },
];

export default function ProductDetailClient({ product, related = [] }) {
  const [activeTab,     setActiveTab]     = useState('description');
  const [selectedSize,  setSelectedSize]  = useState('');
  const [addedToCart,   setAddedToCart]   = useState(false);
  const addItem  = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  if (!product) {
    return (
      <div className="container-lg py-40 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiPackage size={32} className="text-gray-300" />
        </div>
        <h2 className="font-heading text-2xl text-primary mb-3">Product Not Found</h2>
        <p className="text-gray-400 mb-8">This product may have been removed or the link is incorrect.</p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const categories  = product.category ? [product.category] : [];
  
  // Normalize images - extract URLs from image objects
  const normalizedImages = (product.images || []).map(img => {
    if (typeof img === 'string') return { url: img, alt: product.name };
    return { url: img.url || img, alt: img.alt || product.name };
  });
  
  // Normalize specifications
  const normalizedSpecs = (product.specifications || []).map(spec => {
    if (typeof spec === 'object') {
      return { key: spec.key || spec.label || spec.name, value: spec.value || spec.content };
    }
    return spec;
  });
  
  // Get sizes if available
  const sizes = product.sizes || [];
  const hasSizes = sizes.length > 0;
  const whatsappURL = product.whatsappLink || `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '92 305 6687553'}`;
  const shareURL    = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const handleGetQuoteWhatsApp = () => {
    let message = `Hi! I would like to get a quote for the following product:\n\n`;
    message += `Product: ${product.name}\n`;
    if (selectedSize) {
      message += `Size: ${selectedSize}\n`;
    }
    message += `\nPlease provide pricing and availability details. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    addItem(product, 1, selectedSize);
    setAddedToCart(true);
    openCart();
    toast.success('Added to inquiry cart!');
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(shareURL).then(() => toast.success('Link copied!'));
  };

  return (
    <>
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <nav className="bg-[#f9f7f4] border-b border-gray-100 py-3">
        <div className="container-lg flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
          <Link href="/" className="hover:text-accent transition-colors font-medium">Home</Link>
          <FiChevronRight size={12} />
          {categories[0] && (
            <>
              <Link href={`/product-category/${categories[0].slug}`}
                className="hover:text-accent transition-colors font-medium capitalize">
                {categories[0].name}
              </Link>
              <FiChevronRight size={12} />
            </>
          )}
          <span className="text-primary font-semibold truncate max-w-[260px]">{product.name}</span>
        </div>
      </nav>

      {/* ── Main ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

            {/* Gallery — sticky on desktop */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGallery images={normalizedImages} productName={product.name} />
            </div>

            {/* Info */}
            <div className="space-y-7">

              {/* Category chips */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Link key={cat._id} href={`/product-category/${cat.slug}`}
                      className="text-[11px] font-bold uppercase tracking-widest text-accent border border-accent/40 px-3 py-1 hover:bg-accent hover:text-primary transition-all duration-200">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Name + badges */}
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-accent-dark mb-2">
                  {product.name}
                </h1>
                
                {/* Price and Stock */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-3">
                    <Stars rating={product.rating} size={20} />
                    <span className="text-sm text-gray-400">({product.reviewCount || 0} reviews)</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              )}

              {/* Sizes */}
              {hasSizes && (
                <div>
                  <label className="text-sm font-semibold text-accent-dark mb-3 block">Select Size:</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={clsx(
                          'px-4 py-2 border rounded transition-all',
                          selectedSize === size
                            ? 'bg-accent border-accent text-white'
                            : 'border-gray-300 hover:border-accent'
                        )}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  className={clsx(
                    'flex-1 py-3 rounded font-semibold transition-all',
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'btn-primary'
                  )}>
                  <FiShoppingBag className="inline mr-2" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Inquiry'}
                </button>
                <button
                  onClick={handleGetQuoteWhatsApp}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded font-semibold transition-colors flex items-center gap-2">
                  <FaWhatsapp size={20} />
                  Get Quote
                </button>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleShare}
                  className="text-gray-400 hover:text-accent transition-colors">
                  <FiShare2 size={20} />
                </button>
                <span className="text-xs text-gray-400">Share</span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                {trustBadges.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-sm text-accent-dark">{label}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Tabs Section ──────────────────────────────────── */}
      <section className="py-16 bg-[#f9f7f4]">
        <div className="container-lg">
          <div className="max-w-4xl">
            {/* Tab Navigation */}
            <div className="flex gap-8 border-b border-gray-200 mb-12">
              <button
                onClick={() => setActiveTab('description')}
                className={clsx(
                  'pb-4 font-semibold transition-colors relative',
                  activeTab === 'description'
                    ? 'text-accent'
                    : 'text-gray-400 hover:text-gray-600'
                )}>
                DESCRIPTION
                {activeTab === 'description' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent"></div>
                )}
              </button>

              {normalizedSpecs.length > 0 && (
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={clsx(
                    'pb-4 font-semibold transition-colors relative',
                    activeTab === 'specifications'
                      ? 'text-accent'
                      : 'text-gray-400 hover:text-gray-600'
                  )}>
                  SPECIFICATIONS
                  {activeTab === 'specifications' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent"></div>
                  )}
                </button>
              )}

              <button
                onClick={() => setActiveTab('reviews')}
                className={clsx(
                  'pb-4 font-semibold transition-colors relative',
                  activeTab === 'reviews'
                    ? 'text-accent'
                    : 'text-gray-400 hover:text-gray-600'
                )}>
                REVIEWS ({product.reviewCount || 0})
                {activeTab === 'reviews' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent"></div>
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div>
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="space-y-6">
                  {product.shortDescription && (
                    <div>
                      <h3 className="font-heading text-xl font-bold text-accent-dark mb-3">About This Product</h3>
                      <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
                    </div>
                  )}

                  {product.careInstructions && (
                    <div>
                      <h3 className="font-heading text-xl font-bold text-accent-dark mb-3">Care Instructions</h3>
                      <div className="bg-white border-l-4 border-accent p-4 rounded">
                        <p className="text-gray-600 whitespace-pre-line text-sm">{product.careInstructions}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && normalizedSpecs.length > 0 && (
                <div>
                  {normalizedSpecs.length > 0 ? (
                    <div className="bg-white border border-gray-100 overflow-hidden rounded">
                      <table className="w-full text-sm">
                        <tbody>
                          {normalizedSpecs.map((spec, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="py-3 px-4 font-semibold text-gray-700 w-2/5 border-r border-gray-100">
                                {spec.key}
                              </td>
                              <td className="py-3 px-4 text-gray-600">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400">No specifications listed for this product.</p>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      {product.reviews.map((review, i) => (
                        <div key={i} className="bg-white p-6 rounded border border-gray-100">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-semibold text-accent-dark">{review.authorName || 'Anonymous'}</p>
                              <p className="text-xs text-gray-400">
                                {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'}
                              </p>
                            </div>
                            {review.rating && <Stars rating={review.rating} size={16} />}
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review this product!</p>
                  )}

                  {/* Review Form */}
                  <div className="bg-white p-6 rounded border border-gray-100">
                    <h3 className="font-semibold text-accent-dark mb-4">Leave a Review</h3>
                    <ReviewForm slug={product.slug} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ──────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 bg-[#F7F5FB]">
          <div className="container-lg">
            <h2 className="font-heading text-3xl font-bold text-accent-dark mb-12 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {related.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
