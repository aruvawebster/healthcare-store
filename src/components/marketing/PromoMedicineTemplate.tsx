import React, { useState } from 'react';
import { 
  Sparkles, 
  Tag, 
  Copy, 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  Percent, 
  Edit3, 
  Clock, 
  ShieldCheck,
  X 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PromoMedicineCampaign } from '../../types/store';

export const PromoMedicineTemplate: React.FC = () => {
  const { 
    promoCampaigns, 
    updatePromoCampaign, 
    products, 
    addToCart, 
    isElementorEditing, 
    showToast 
  } = useStore();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<PromoMedicineCampaign | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast(`Promo code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleQuickAdd = (productName: string) => {
    const prod = products.find(p => p.name.toLowerCase().includes(productName.toLowerCase()) || productName.toLowerCase().includes(p.name.toLowerCase()));
    if (prod) {
      addToCart(prod, 1);
    } else {
      addToCart(products[0], 1);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-0.5 rounded-full mb-1.5">
            <Percent className="w-3.5 h-3.5 text-teal-600" />
            <span>Nishant Medicos Verified Offers & Deals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Promotional Medicine Campaigns
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Pre-configured promotional templates for seasonal health packs, chronic refills, and diagnostic equipment. Easily updated for festivals and medical camps.
          </p>
        </div>

        {isElementorEditing && (
          <button
            onClick={() => setEditingCampaign(promoCampaigns[0])}
            className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Promo Template</span>
          </button>
        )}
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promoCampaigns.map((camp) => (
          <div
            key={camp.id}
            className="relative bg-white rounded-2xl border border-slate-200 hover:border-teal-400 p-5 flex flex-col justify-between transition-all hover:shadow-md space-y-4 group"
          >
            {/* Top Badge & Edit Affordance */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>{camp.badge}</span>
              </span>

              {isElementorEditing ? (
                <button
                  onClick={() => setEditingCampaign(camp)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                  title="Edit this promotion template"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Limited Time</span>
                </span>
              )}
            </div>

            {/* Product Image Thumbnail */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
              <img
                src={camp.image}
                alt={camp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                Save {camp.discountPercentage}%
              </div>
            </div>

            {/* Campaign Title & Copy */}
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm leading-snug">
                {camp.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {camp.subtitle}
              </p>
              <div className="text-[11px] text-slate-400 pt-1">
                {camp.validUntil}
              </div>
            </div>

            {/* Featured Product Price & Coupon Code Box */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-base font-extrabold text-slate-900 tabular-nums">
                    ${camp.featuredProductPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400 line-through tabular-nums ml-1.5">
                    ${camp.featuredProductOriginalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Coupon Code Pill */}
                <button
                  onClick={() => handleCopy(camp.promoCode)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 text-xs font-mono font-bold transition-colors"
                  title="Click to copy coupon code"
                >
                  <Tag className="w-3 h-3 text-teal-600" />
                  <span>{camp.promoCode}</span>
                  {copiedCode === camp.promoCode ? (
                    <Check className="w-3 h-3 text-emerald-600 ml-1" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 ml-1" />
                  )}
                </button>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleQuickAdd(camp.featuredProductName)}
                className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Claim Deal & Add to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Non-Coder Template Customizer Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden font-sans">
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-teal-400" />
                <span className="font-semibold text-sm">Edit Medicine Promotion Template</span>
              </div>
              <button
                onClick={() => setEditingCampaign(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={editingCampaign.title}
                  onChange={e => setEditingCampaign({ ...editingCampaign, title: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Campaign Subtitle / Highlight</label>
                <input
                  type="text"
                  value={editingCampaign.subtitle}
                  onChange={e => setEditingCampaign({ ...editingCampaign, subtitle: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={editingCampaign.badge}
                    onChange={e => setEditingCampaign({ ...editingCampaign, badge: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={editingCampaign.promoCode}
                    onChange={e => setEditingCampaign({ ...editingCampaign, promoCode: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Offer Price ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingCampaign.featuredProductPrice}
                    onChange={e => setEditingCampaign({ ...editingCampaign, featuredProductPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingCampaign.featuredProductOriginalPrice}
                    onChange={e => setEditingCampaign({ ...editingCampaign, featuredProductOriginalPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Validity Notes</label>
                <input
                  type="text"
                  value={editingCampaign.validUntil}
                  onChange={e => setEditingCampaign({ ...editingCampaign, validUntil: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCampaign(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updatePromoCampaign(editingCampaign);
                    setEditingCampaign(null);
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold"
                >
                  Save Promotion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
