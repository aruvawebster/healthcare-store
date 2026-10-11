import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  FileUp, 
  Menu, 
  X, 
  Check, 
  ChevronRight, 
  User 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    globalSettings, 
    cartCount, 
    setIsCartDrawerOpen, 
    setIsSearchOpen, 
    wishlist,
    pincode,
    checkPincode,
    pincodeStatus
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPincodeInput, setShowPincodeInput] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkPincode(tempPincode);
    setShowPincodeInput(false);
  };

  return (
    <div className="w-full bg-white border-b border-slate-200 sticky top-0 sm:top-0 z-30 font-sans shadow-xs">
      {/* 1. Slim Promotional & Compliance Strip (at most 36px) */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-teal-400">Offer:</span>
            <span className="text-slate-300 truncate">{globalSettings.promoBannerText}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0 text-slate-400 text-[11px]">
            {/* Pincode Quick Checker */}
            <div className="relative">
              {!showPincodeInput ? (
                <button
                  onClick={() => setShowPincodeInput(true)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                  title="Check delivery to your pincode"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>Deliver to: <strong className="text-slate-200">{pincode}</strong></span>
                </button>
              ) : (
                <form onSubmit={handlePincodeSubmit} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempPincode}
                    onChange={(e) => setTempPincode(e.target.value)}
                    placeholder="Enter pincode"
                    className="w-24 px-1.5 py-0.5 bg-slate-800 text-white rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1 bg-teal-600 hover:bg-teal-500 text-white rounded text-[10px]"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPincodeInput(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>

            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline font-mono text-[10px] text-slate-400">
              {globalSettings.drugLicenseNumber}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top Bar Contract: 3-Zone Header */}
      <header className="container mx-auto px-4 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face, whitespace-nowrap shrink-0) */}
        <button
          onClick={() => setCurrentPage('home')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center text-base font-extrabold shadow-xs">
            +
          </span>
          <span>{globalSettings.storeName}</span>
        </button>

        {/* Zone 2: 4-5 Navigation Links (1-2 word labels, single line) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700">
          <button
            onClick={() => setCurrentPage('home')}
            className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'home' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage('shop')}
            className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'shop' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => setCurrentPage('upload-prescription')}
            className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentPage === 'upload-prescription' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            <FileUp className="w-3.5 h-3.5 text-teal-600" />
            <span>Upload Rx</span>
          </button>
          <button
            onClick={() => setCurrentPage('about-contact')}
            className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'about-contact' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            About & Contact
          </button>
          <button
            onClick={() => setCurrentPage('account')}
            className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              currentPage === 'account' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>My Account</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Bag */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Ajax Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
            title="Search medicines, devices & supplements"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
            <span className="text-xs text-slate-400 hidden xl:inline">Search store...</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setCurrentPage('account')}
            className="p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors relative"
            title="Wishlist items"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
            )}
          </button>

          {/* Cart Bag Action Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-xs active:scale-95"
            title="Open Shopping Bag"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="bg-teal-800 text-teal-100 px-1.5 py-0.5 rounded-full text-[11px] font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-sm animate-in slide-in-from-top-2">
          <button
            onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 px-3 rounded-lg ${currentPage === 'home' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700'}`}
          >
            Home
          </button>
          <button
            onClick={() => { setCurrentPage('shop'); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 px-3 rounded-lg ${currentPage === 'shop' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700'}`}
          >
            Shop All Categories
          </button>
          <button
            onClick={() => { setCurrentPage('upload-prescription'); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 px-3 rounded-lg ${currentPage === 'upload-prescription' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700'}`}
          >
            Upload Prescription (Rx)
          </button>
          <button
            onClick={() => { setCurrentPage('about-contact'); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 px-3 rounded-lg ${currentPage === 'about-contact' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700'}`}
          >
            About & Contact
          </button>
          <button
            onClick={() => { setCurrentPage('account'); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 px-3 rounded-lg ${currentPage === 'account' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700'}`}
          >
            My Account & Orders
          </button>
          <button
            onClick={() => { setCurrentPage('policies'); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 px-3 rounded-lg ${currentPage === 'policies' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700'}`}
          >
            FAQ & Store Policies
          </button>
        </div>
      )}
    </div>
  );
};
