import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  FileText, 
  AlertTriangle, 
  Plus, 
  Minus, 
  CheckCircle2, 
  ArrowLeft, 
  MapPin, 
  Share2 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    setCurrentPage, 
    addToCart, 
    products, 
    pincode, 
    checkPincode, 
    pincodeStatus,
    toggleWishlist,
    isInWishlist,
    showToast 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'usage' | 'precautions'>('description');
  const [tempPin, setTempPin] = useState(pincode);

  if (!selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">No Product Selected</h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(selectedProduct.id);
  const discountPercent = selectedProduct.originalPrice
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    checkPincode(tempPin);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans space-y-12">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => setCurrentPage('shop')}
          className="flex items-center gap-1 hover:text-slate-900 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shop</span>
        </button>
        <span className="text-slate-300">/</span>
        <span>{selectedProduct.categoryName}</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-medium truncate max-w-xs">{selectedProduct.name}</span>
      </div>

      {/* Main PDP Grid: Gallery Left + Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {selectedProduct.requiresPrescription && (
                <span className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                  <FileText className="w-3.5 h-3.5 text-rose-600" />
                  <span>Prescription Required (Rx)</span>
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                  Save {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-md transition-colors ${
                isFavorited
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-white/90 text-slate-500 hover:text-rose-600 hover:bg-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 stroke-rose-500' : ''}`} />
            </button>
          </div>

          {/* Clinical Assurance Strip */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-teal-600 mx-auto" />
              <div className="font-semibold text-slate-800">100% Genuine</div>
              <div className="text-[10px] text-slate-400">Direct from pharma lab</div>
            </div>
            <div className="space-y-1">
              <Truck className="w-5 h-5 text-teal-600 mx-auto" />
              <div className="font-semibold text-slate-800">Cold Chain Safe</div>
              <div className="text-[10px] text-slate-400">Monitored packaging</div>
            </div>
            <div className="space-y-1">
              <CheckCircle2 className="w-5 h-5 text-teal-600 mx-auto" />
              <div className="font-semibold text-slate-800">Pharmacist Checked</div>
              <div className="text-[10px] text-slate-400">Dosage verification</div>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Header info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider text-teal-700">
                {selectedProduct.brand} · {selectedProduct.categoryName}
              </span>
              <span className="font-mono text-[11px]">SKU: {selectedProduct.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {selectedProduct.name}
            </h1>

            {/* Ratings & reviews count */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(selectedProduct.rating)
                        ? 'fill-amber-400 stroke-amber-400'
                        : 'stroke-amber-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-slate-900">{selectedProduct.rating}</span>
              <span className="text-slate-400">· ({selectedProduct.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  ${selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="text-right text-xs">
              <div className="font-semibold text-emerald-700">In Stock ({selectedProduct.stockCount} units)</div>
              <div className="text-[11px] text-slate-500">{selectedProduct.packageSize}</div>
            </div>
          </div>

          {/* Prescription Warning (if required) */}
          {selectedProduct.requiresPrescription && (
            <div className="p-3.5 bg-rose-50/80 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-rose-950">Valid Doctor's Prescription Mandatory:</strong> This medicine cannot be dispensed without verification by our licensed pharmacist. You can upload your prescription file at checkout or on our Upload Rx page.
              </div>
            </div>
          )}

          {/* Short description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {selectedProduct.shortDescription}
          </p>

          {/* Quantity & Buy Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-bold text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2.5 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={() => addToCart(selectedProduct, quantity)}
                className="flex-1 py-3 px-6 bg-teal-600 hover:bg-teal-700 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Healthcare Bag</span>
              </button>
            </div>
          </div>

          {/* Delivery Pincode Check */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-teal-600" />
              <span>Check Delivery Speed to Your Pincode</span>
            </div>

            <form onSubmit={handlePincodeCheck} className="flex items-center gap-2">
              <input
                type="text"
                value={tempPin}
                onChange={e => setTempPin(e.target.value)}
                placeholder="Enter 6-digit postal code"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Check
              </button>
            </form>

            {pincodeStatus.checked && (
              <p className="text-xs text-emerald-700 font-medium flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{pincodeStatus.message}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: Description, Ingredients, Dosage, Precautions */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-3.5 px-6 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'description'
                ? 'border-teal-600 text-teal-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Clinical Overview
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`py-3.5 px-6 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'ingredients'
                ? 'border-teal-600 text-teal-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Composition
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`py-3.5 px-6 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'usage'
                ? 'border-teal-600 text-teal-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Dosage & Administration
          </button>
          <button
            onClick={() => setActiveTab('precautions')}
            className={`py-3.5 px-6 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'precautions'
                ? 'border-teal-600 text-teal-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Precautions & Safety
          </button>
        </div>

        <div className="p-6 sm:p-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-base">Product Description</h3>
              <p>{selectedProduct.description}</p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-base">Active Ingredients & Salt Composition</h3>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
                {selectedProduct.activeIngredients}
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-base">Recommended Usage & Administration</h3>
              <p>{selectedProduct.dosageUsage}</p>
              <div className="p-3 bg-teal-50 rounded-lg text-teal-900 text-xs">
                Note: Always adhere to the specific regimen designated by your treating physician.
              </div>
            </div>
          )}

          {activeTab === 'precautions' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-base">Contraindications & Warnings</h3>
              <p>{selectedProduct.precautions}</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Related Healthcare Essentials</h3>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              Browse Category
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
