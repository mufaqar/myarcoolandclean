'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiMessageCircle } from 'react-icons/fi';
import useCartStore from '@/store/cartStore';
import clsx from 'clsx';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.quantity, 0);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const generateWhatsAppMessage = () => {
    let message = 'Hi! I would like to request a quote for the following items:\n\n';
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}`;
      if (item.size) {
        message += ` - Size: ${item.size}`;
      }
      message += ` (Qty: ${item.quantity})\n`;
    });
    
    message += '\nPlease provide pricing and availability details. Thank you!';
    return encodeURIComponent(message);
  };

  const handleWhatsAppQuote = () => {
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/50 z-[80] transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[90] shadow-2xl flex flex-col transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-heading text-lg font-semibold text-primary">
            Inquiry Cart ({total})
          </h2>
          <button onClick={closeCart} className="p-1 text-gray-400 hover:text-primary transition-colors">
            <FiX size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FiShoppingBag size={48} className="text-gray-200 mb-4" />
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-1">Add products to request a quote</p>
              <button
                onClick={closeCart}
                className="mt-6 btn-primary text-xs"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item) => {
              const img = item.product.images?.find((i) => i.isPrimary) || item.product.images?.[0];
              return (
                <div key={item.key} className="flex gap-3 p-3 border border-gray-100">
                  <div className="relative w-16 h-16 bg-gray-50 flex-shrink-0">
                    <Image
                      src={img?.url || '/images/placeholder-product.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-primary line-clamp-2 leading-tight">
                      {item.product.name}
                    </p>
                    {item.size && (
                      <p className="text-[11px] text-gray-400 mt-0.5">Size: {item.size}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-200 hover:border-accent hover:text-accent transition-colors"
                      >
                        <FiMinus size={10} />
                      </button>
                      <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-200 hover:border-accent hover:text-accent transition-colors"
                      >
                        <FiPlus size={10} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-gray-300 hover:text-red-400 transition-colors self-start"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 space-y-3">
            <p className="text-xs text-gray-500 text-center">
              This is an inquiry cart. We will contact you with pricing.
            </p>
            <button
              onClick={handleWhatsAppQuote}
              className="w-full bg-accent-dark hover:bg-accent text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FiMessageCircle size={18} />
              Request Quote for All Items
            </button>
            <button
              onClick={closeCart}
              className="w-full text-center text-xs text-gray-400 hover:text-primary transition-colors py-1"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </>
  );
}
