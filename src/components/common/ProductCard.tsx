import React from 'react';
import { Heart, ShoppingBag, Star, FileText } from 'lucide-react';
import { Product } from '../../types/store';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    viewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    globalSettings 
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div 
      className={`group relative bg-white border border-slate-200/90 hover:border-slate-300 ${globalSettings.borderRadius} p-3.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
    >
      {/* Top Image & Badges */}
      <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-50 mb-3 cursor-pointer" onClick={() => viewProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback gracefully to styled placeholder if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Prescription Tag / Discount Tag */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {product.requiresPrescription ? (
            <span className="bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
              <FileText className="w-3 h-3 text-rose-600" />
              <span>Rx Required</span>
            </span>
          ) : discountPercent > 0 ? (
            <span className="bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
              Save {discountPercent}%
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            isFavorited 
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
              : 'bg-white/85 text-slate-500 hover:text-rose-600 hover:bg-white'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 stroke-rose-500' : ''}`} />
        </button>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col cursor-pointer" onClick={() => viewProduct(product)}>
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium text-slate-500 uppercase tracking-wider text-[10px]">
            {product.categoryName}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-slate-700">
            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors mb-1.5">
          {product.name}
        </h3>

        {/* Package info */}
        <p className="text-[11px] text-slate-500 mb-2">
          {product.packageSize}
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900 tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-500">
              {product.inStock ? (
                <span className="text-emerald-700 font-medium">In Stock</span>
              ) : (
                <span className="text-slate-400">Out of Stock</span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all shadow-xs"
            title="Add item to shopping cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
