import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Search, 
  ShoppingBag, 
  Trash2, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const AccountPage: React.FC = () => {
  const { 
    orders, 
    wishlist, 
    products, 
    addToCart, 
    toggleWishlist, 
    selectedOrderForTracking, 
    setSelectedOrderForTracking,
    trackOrderById,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'tracking' | 'wishlist' | 'profile'>('orders');
  const [trackingSearchInput, setTrackingSearchInput] = useState('');

  const favoritedProducts = products.filter(p => wishlist.includes(p.id));

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingSearchInput.trim()) return;
    const found = trackOrderById(trackingSearchInput);
    if (found) {
      setActiveTab('tracking');
      showToast(`Found tracking details for ${found.id}`);
    } else {
      showToast('Order not found. Please check the Order ID or Tracking Number.');
    }
  };

  const steps = ['Order Placed', 'Pharmacist Review', 'Packed', 'Out for Delivery', 'Delivered'];

  const getStepIndex = (status: string) => {
    const idx = steps.indexOf(status);
    return idx === -1 ? 1 : idx;
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl font-sans space-y-8">
      {/* Account Hero Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl shrink-0">
            SA
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Sunil Kumar Agrawal</h1>
            <p className="text-xs text-slate-500">sunil.agrawal@example.com · 7354260555</p>
            <div className="text-[11px] text-teal-700 font-medium mt-0.5">
              Verified Nishant Medicos Patient Member (Ambikapur, Chhattisgarh)
            </div>
          </div>
        </div>

        {/* Quick Order Tracking Search */}
        <form onSubmit={handleTrackSubmit} className="flex items-center gap-1.5 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Track Order (e.g. ORD-8924)"
            value={trackingSearchInput}
            onChange={e => setTrackingSearchInput(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600 w-full sm:w-56"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shrink-0"
          >
            Track
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 rounded-xl p-1 gap-1 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'orders' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tracking')}
          className={`flex-1 py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'tracking' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Live Order Tracking</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex-1 py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'wishlist' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({favoritedProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'profile' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Saved Addresses & Profile</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* 1. Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{order.id}</span>
                      <span className="text-xs text-slate-500">· Placed {order.date}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Tracking: {order.trackingNumber}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                      {order.status}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedOrderForTracking(order);
                        setActiveTab('tracking');
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Track Shipment
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-12 object-cover rounded-lg border border-slate-100 bg-slate-50"
                        />
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">{item.productName}</div>
                          <div className="text-slate-400 text-[11px]">Qty: {item.quantity} · ${item.price.toFixed(2)}</div>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer summary */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div>
                    Payment: <strong className="text-slate-800">{order.paymentMethod}</strong> ({order.paymentStatus})
                  </div>
                  <div>
                    Total: <strong className="text-slate-900 text-sm font-bold">${order.total.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Live Order Tracking Tab */}
        {activeTab === 'tracking' && selectedOrderForTracking && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Live Dispatch Tracking
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Order {selectedOrderForTracking.id}
                </h2>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Waybill / Tracking: {selectedOrderForTracking.trackingNumber}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500">Current Status</div>
                <div className="text-base font-bold text-teal-700">
                  {selectedOrderForTracking.status}
                </div>
              </div>
            </div>

            {/* Stepper Visualizer */}
            <div className="py-4">
              <div className="relative flex items-center justify-between">
                {/* Connecting line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-600 z-0 transition-all duration-500"
                  style={{
                    width: `${(getStepIndex(selectedOrderForTracking.status) / (steps.length - 1)) * 100}%`
                  }}
                />

                {steps.map((stepName, idx) => {
                  const currentIdx = getStepIndex(selectedOrderForTracking.status);
                  const isCompleted = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={stepName} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        } ${isCurrent ? 'ring-4 ring-teal-100' : ''}`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span
                        className={`mt-2 text-[11px] font-medium text-center hidden sm:block ${
                          isCompleted ? 'text-slate-900 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        {stepName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipment Milestones */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-semibold text-slate-900">Delivery Milestones:</div>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Order placed & payment verified ({selectedOrderForTracking.date})</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Licensed Pharmacist verified medicine batch & expiry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Dispatched with thermal-insulated courier to {selectedOrderForTracking.shippingAddress.pincode}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            {favoritedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-900">Your Wishlist is Empty</h3>
                <p className="text-xs text-slate-500">
                  Click the heart icon on any product in the dispensary to save it for later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoritedProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl">
            <h3 className="font-bold text-slate-900 text-base">Saved Patient & Delivery Address</h3>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
              <div className="font-bold text-slate-900 text-sm">Primary Home Delivery</div>
              <p className="text-slate-700">Sunil Kumar Agrawal · 7354260555</p>
              <p className="text-slate-600">Deviganj Road, Near Clock Tower, Ambikapur, Sarguja, Chhattisgarh 49001</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-100 text-teal-800">
                Default Address
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="font-bold text-slate-900">Emergency Contact & Medical Profile</div>
              <p className="text-slate-600">
                Known Drug Allergies: <strong>None Recorded (Penicillin Safe)</strong>
              </p>
              <p className="text-slate-600">
                Consulting Physician: <strong>Dr. Rajesh Gupta, Nishant Medicos OPD Chamber 1</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
