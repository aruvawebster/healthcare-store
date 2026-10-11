import React from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    deliveryFee, 
    freeDeliveryThreshold,
    hasPrescriptionRequiredItems,
    setCurrentPage,
    pincode
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col font-sans animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-sm">Your Healthcare Bag</h3>
            <span className="text-xs text-slate-500 font-mono">({cart.length} items)</span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Progress */}
        <div className="bg-teal-50/70 border-b border-teal-100 p-3 text-xs text-teal-900">
          {remainingForFreeDelivery > 0 ? (
            <div>
              Add <strong className="text-teal-700">${remainingForFreeDelivery.toFixed(2)}</strong> more for <strong>FREE Doorstep Delivery</strong>!
              <div className="w-full bg-teal-200/60 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-teal-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-teal-800 font-semibold">
              <Truck className="w-4 h-4 text-teal-600" />
              <span>You've unlocked FREE Doorstep Delivery!</span>
            </div>
          )}
        </div>

        {/* Prescription Required Alert Banner */}
        {hasPrescriptionRequiredItems && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
            <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-950">Prescription Required (Rx):</span> One or more items in your cart require a valid doctor prescription. You will be prompted to attach it during checkout.
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-slate-900">Your bag is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore genuine medicines, health monitors, vitamins, and healthcare essentials.
              </p>
              <button
                onClick={() => {
                  setCurrentPage('shop');
                  setIsCartDrawerOpen(false);
                }}
                className="mt-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-100 bg-slate-50 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-semibold text-slate-900 text-xs line-clamp-1">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-600 p-0.5"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 mb-2">
                    {item.product.packageSize}
                    {item.product.requiresPrescription && (
                      <span className="text-rose-600 font-semibold ml-1.5">· Rx</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-slate-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900 tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Doorstep Delivery ({pincode})</span>
                <span className="font-medium tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="tabular-nums">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                setCurrentPage('cart-checkout');
              }}
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>100% Genuine Pharmacy Guarantee & Secure Payments</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
