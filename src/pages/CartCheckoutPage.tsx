import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  UploadCloud, 
  Truck, 
  AlertTriangle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types/store';

export const CartCheckoutPage: React.FC = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    deliveryFee, 
    freeDeliveryThreshold,
    hasPrescriptionRequiredItems,
    createOrder,
    setCurrentPage,
    pincode,
    showToast 
  } = useStore();

  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('checkout');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Address form
  const [fullName, setFullName] = useState('Sunil Kumar Agrawal');
  const [phone, setPhone] = useState('7354260555');
  const [email, setEmail] = useState('sunil.agrawal@example.com');
  const [address, setAddress] = useState('Deviganj Road, Near Clock Tower');
  const [city, setCity] = useState('Ambikapur');
  const [checkoutPincode, setCheckoutPincode] = useState(pincode || '49001');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash on Delivery'>('UPI');
  const [prescriptionAttached, setPrescriptionAttached] = useState<string | null>(
    hasPrescriptionRequiredItems ? 'prescription_scan_nov2026.jpg' : null
  );

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (hasPrescriptionRequiredItems && !prescriptionAttached) {
      showToast('Please attach your doctor prescription to proceed.');
      return;
    }

    const orderData = {
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        requiresPrescription: item.product.requiresPrescription
      })),
      subtotal,
      deliveryFee,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? ('Pending' as const) : ('Paid' as const),
      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        pincode: checkoutPincode
      },
      prescriptionFile: prescriptionAttached || undefined
    };

    const newOrder = createOrder(orderData);
    setCreatedOrder(newOrder);
    setStep('confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 'confirmed' && createdOrder) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl font-sans">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Order Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Thank you, {createdOrder.shippingAddress.fullName}. Your order <strong className="text-slate-900">{createdOrder.id}</strong> has been received.
            </p>
          </div>

          {createdOrder.prescriptionFile && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 text-left flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Pharmacist Review Active:</strong> Prescription <em>{createdOrder.prescriptionFile}</em> has been queued for verification. You will receive an SMS and WhatsApp update once approved.
              </div>
            </div>
          )}

          {/* Receipt Summary Box */}
          <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 text-left text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-semibold text-slate-900">
              <span>Order Details ({createdOrder.id})</span>
              <span className="font-mono">{createdOrder.trackingNumber}</span>
            </div>

            <div className="space-y-1.5 text-slate-600">
              <div><strong className="text-slate-900">Delivery Address:</strong> {createdOrder.shippingAddress.address}, {createdOrder.shippingAddress.city} - {createdOrder.shippingAddress.pincode}</div>
              <div><strong className="text-slate-900">Payment Mode:</strong> {createdOrder.paymentMethod} ({createdOrder.paymentStatus})</div>
              <div><strong className="text-slate-900">Items:</strong> {createdOrder.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}</div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
              <span>Total Paid / Payable</span>
              <span>${createdOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setCurrentPage('account')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Track Order Live
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4 max-w-md">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your Healthcare Bag is Empty</h2>
        <p className="text-xs text-slate-500">
          Add medicines or wellness products to proceed with checkout.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-5 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-semibold"
        >
          Browse Dispensary
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl font-sans space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => setCurrentPage('shop')} className="hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Shop</span>
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-medium">WooCommerce Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-6">
            {/* 1. Delivery Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-teal-600" />
                  <span>1. Delivery & Patient Address</span>
                </h3>
                <span className="text-xs text-slate-400">Step 1 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Patient / Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Phone Number (For Delivery OTP)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-medium mb-1">Email Address (Order Invoice)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-medium mb-1">Street Address, Flat / House No.</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Postal Pincode</label>
                  <input
                    type="text"
                    required
                    value={checkoutPincode}
                    onChange={e => setCheckoutPincode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>
            </div>

            {/* 2. Prescription Attachment (Conditional if cart has Rx items) */}
            {hasPrescriptionRequiredItems && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Prescription Verification Required for Your Medicines</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Your cart includes items regulated under the Drugs and Cosmetics Act. Attach a prescription image (PNG, JPG) or PDF for our registered pharmacist to verify before packing.
                </p>

                <div className="p-3.5 bg-white border border-dashed border-amber-300 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs">
                    <UploadCloud className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {prescriptionAttached ? prescriptionAttached : 'No prescription attached yet'}
                      </div>
                      <div className="text-[11px] text-slate-400">Accepted formats: JPG, PNG, PDF (Max 15MB)</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPrescriptionAttached('prescription_dr_nair_clinic.pdf');
                      showToast('Prescription attached to order!');
                    }}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold"
                  >
                    {prescriptionAttached ? 'Change File' : 'Attach Rx'}
                  </button>
                </div>
              </div>
            )}

            {/* 3. Payment Method Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-teal-600" />
                  <span>2. Payment Method</span>
                </h3>
                <span className="text-xs text-slate-400">Step 2 of 2</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* UPI */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'UPI' ? 'border-teal-600 bg-teal-50/40 ring-1 ring-teal-600' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="mt-0.5 accent-teal-600"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>UPI Instant Payment (Google Pay, PhonePe, Paytm, QR)</span>
                      <span className="text-[10px] text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded font-bold">Fastest</span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">Zero convenience fee · Instant confirmation</p>
                  </div>
                </label>

                {/* Cards */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'Card' ? 'border-teal-600 bg-teal-50/40 ring-1 ring-teal-600' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="mt-0.5 accent-teal-600"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900">Credit / Debit Card (Visa, MasterCard, RuPay)</div>
                    <p className="text-slate-500 text-[11px] mt-0.5">128-bit SSL encrypted bank gateway</p>
                  </div>
                </label>

                {/* COD */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery' ? 'border-teal-600 bg-teal-50/40 ring-1 ring-teal-600' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="mt-0.5 accent-teal-600"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900">Cash on Delivery (COD)</div>
                    <p className="text-slate-500 text-[11px] mt-0.5">Pay via cash or UPI to the delivery courier</p>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Order Summary sticky column */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-5 sticky top-20 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs font-mono text-slate-500">{cart.length} Products</span>
          </h3>

          {/* Line items review */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-lg border border-slate-100 bg-slate-50 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 line-clamp-1">{item.product.name}</div>
                  <div className="text-[11px] text-slate-400">Qty: {item.quantity} · ${item.product.price.toFixed(2)} ea</div>
                </div>
                <div className="font-bold text-slate-900 tabular-nums">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals Calculation */}
          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Doorstep Delivery</span>
              <span>
                {deliveryFee === 0 ? (
                  <strong className="text-emerald-700">FREE</strong>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex items-center justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Grand Total</span>
              <span className="tabular-nums">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Place Healthcare Order (${cartTotal.toFixed(2)})</span>
          </button>

          <div className="text-[11px] text-slate-500 text-center space-y-1">
            <p>Protected by 256-bit bank encryption.</p>
            <p className="text-slate-500">Nishant Medicos Helpline: <strong className="text-slate-800">7354260555</strong> (Deviganj Road, Ambikapur)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
