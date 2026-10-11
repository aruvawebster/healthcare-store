import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { ElementorAdminBar } from './components/elementor/ElementorAdminBar';
import { ElementorSidebar } from './components/elementor/ElementorSidebar';
import { ElementorGlobalSettingsModal } from './components/elementor/ElementorGlobalSettingsModal';
import { ElementorThemeBuilderModal } from './components/elementor/ElementorThemeBuilderModal';
import { WooCommerceManagerModal } from './components/elementor/WooCommerceManagerModal';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { DoctorAppointmentModal } from './components/doctors/DoctorAppointmentModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { UploadPrescriptionPage } from './pages/UploadPrescriptionPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AccountPage } from './pages/AccountPage';

function StoreAppContent() {
  const { 
    currentPage, 
    viewportMode, 
    isElementorEditing, 
    toastMessage, 
    globalSettings 
  } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart-checkout':
        return <CartCheckoutPage />;
      case 'upload-prescription':
        return <UploadPrescriptionPage />;
      case 'about-contact':
        return <AboutContactPage />;
      case 'policies':
        return <PoliciesPage />;
      case 'account':
        return <AccountPage />;
      default:
        return <HomePage />;
    }
  };

  // Dynamically set font family on root container
  const fontStyle = {
    fontFamily: globalSettings.fontFamily === 'Outfit'
      ? '"Outfit", sans-serif'
      : globalSettings.fontFamily === 'Inter'
      ? '"Inter", sans-serif'
      : '"Plus Jakarta Sans", sans-serif'
  };

  return (
    <div 
      className="min-h-screen bg-slate-100 flex flex-col text-slate-800"
      style={fontStyle}
    >
      {/* 1. WordPress Admin Bar */}
      <ElementorAdminBar />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Elementor Drag & Drop Left Sidebar (when active) */}
        {isElementorEditing && <ElementorSidebar />}

        {/* Viewport Frame Container */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center bg-slate-100/80">
          <div
            className={`w-full min-h-full flex flex-col bg-white shadow-xl transition-all duration-300 ${
              viewportMode === 'mobile'
                ? 'max-w-[420px] my-6 rounded-3xl border-8 border-slate-900 shadow-2xl overflow-hidden'
                : viewportMode === 'tablet'
                ? 'max-w-[768px] my-6 rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden'
                : 'max-w-full'
            }`}
          >
            {/* Elementor Visual Editing Badge Banner */}
            {isElementorEditing && (
              <div className="bg-rose-600 text-white text-xs py-1.5 px-4 font-semibold flex items-center justify-between">
                <span>Elementor Drag & Drop Builder Active</span>
                <span className="text-[10px] opacity-90">Click any text on page to edit</span>
              </div>
            )}

            {/* Header (Elementor Theme Builder Template) */}
            <Header />

            {/* Page Content */}
            <main className="flex-1">
              {renderCurrentPage()}
            </main>

            {/* Footer (Elementor Theme Builder Template) */}
            <Footer />
          </div>
        </div>
      </div>

      {/* 3. Floating WhatsApp Support Button */}
      <FloatingWhatsApp />

      {/* 4. Slide-Out Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <DoctorAppointmentModal />
      <ElementorGlobalSettingsModal />
      <ElementorThemeBuilderModal />
      <WooCommerceManagerModal />

      {/* 5. Toast Notification Popover */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreAppContent />
    </StoreProvider>
  );
}
