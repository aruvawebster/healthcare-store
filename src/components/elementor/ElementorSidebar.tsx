import React, { useState } from 'react';
import { 
  Search, 
  Type, 
  Image as ImageIcon, 
  FileText, 
  Square, 
  Divide, 
  ShoppingBag, 
  SlidersHorizontal, 
  Settings, 
  History, 
  Layers, 
  Check, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  UploadCloud, 
  HelpCircle,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ElementorSidebar: React.FC = () => {
  const { 
    isElementorEditing, 
    setIsElementorEditing, 
    globalSettings, 
    updateGlobalSettings,
    showToast,
    currentPage,
    setCurrentPage
  } = useStore();

  const [activeTab, setActiveTab] = useState<'elements' | 'page-settings' | 'style'>('elements');
  const [widgetSearch, setWidgetSearch] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  if (!isElementorEditing) return null;

  const basicWidgets = [
    { id: 'heading', name: 'Heading', icon: Type, category: 'Basic' },
    { id: 'text', name: 'Text Editor', icon: FileText, category: 'Basic' },
    { id: 'button', name: 'Button', icon: Square, category: 'Basic' },
    { id: 'image', name: 'Image', icon: ImageIcon, category: 'Basic' },
    { id: 'divider', name: 'Divider', icon: Divide, category: 'Basic' }
  ];

  const wooWidgets = [
    { id: 'woo-products', name: 'Products Grid', icon: ShoppingBag, category: 'WooCommerce' },
    { id: 'woo-categories', name: 'Categories Box', icon: SlidersHorizontal, category: 'WooCommerce' },
    { id: 'woo-cart-cta', name: 'Add to Cart CTA', icon: ShoppingBag, category: 'WooCommerce' }
  ];

  const healthcareWidgets = [
    { id: 'rx-upload', name: 'Prescription Uploader', icon: UploadCloud, category: 'Healthcare Pro' },
    { id: 'license-badge', name: 'Pharmacist License Box', icon: ShieldCheck, category: 'Healthcare Pro' },
    { id: 'trust-points', name: 'Why Choose Us Strip', icon: HeartHandshake, category: 'Healthcare Pro' },
    { id: 'doc-carousel', name: 'Doctors OPD Carousel', icon: HeartHandshake, category: 'Clinic & Doctors' },
    { id: 'doc-ad', name: 'Doctor Health Camp Ad', icon: Sparkles, category: 'Clinic & Doctors' },
    { id: 'promo-template', name: 'Medicine Promo Template', icon: ShoppingBag, category: 'Promotions' }
  ];

  const allWidgets = [...basicWidgets, ...wooWidgets, ...healthcareWidgets].filter(w =>
    w.name.toLowerCase().includes(widgetSearch.toLowerCase())
  );

  const handleWidgetDropNotice = (name: string) => {
    showToast(`Elementor widget "${name}" selected. Click on page elements to edit directly!`);
  };

  const handleSave = () => {
    setIsSaved(true);
    showToast('Elementor: Changes published and live!');
  };

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col h-[calc(100vh-36px)] sticky top-[36px] z-40 shrink-0 select-none shadow-2xl font-sans text-xs">
      {/* Elementor Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-rose-600 flex items-center justify-center font-bold text-white text-[13px] tracking-tighter">
            E
          </div>
          <div>
            <div className="font-semibold text-slate-100 leading-tight">Elementor Editor</div>
            <div className="text-[10px] text-slate-400 capitalize">Editing: {currentPage} page</div>
          </div>
        </div>
        <button
          onClick={() => setIsElementorEditing(false)}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          title="Close Elementor Editor"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs: Elements, Page Settings, Style */}
      <div className="flex items-center border-b border-slate-800 bg-slate-900 text-[11px]">
        <button
          onClick={() => setActiveTab('elements')}
          className={`flex-1 py-2 font-medium text-center border-b-2 transition-colors ${
            activeTab === 'elements'
              ? 'border-rose-500 text-rose-400 bg-slate-800/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Widgets
        </button>
        <button
          onClick={() => setActiveTab('page-settings')}
          className={`flex-1 py-2 font-medium text-center border-b-2 transition-colors ${
            activeTab === 'page-settings'
              ? 'border-rose-500 text-rose-400 bg-slate-800/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Page Copy
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-2 font-medium text-center border-b-2 transition-colors ${
            activeTab === 'style'
              ? 'border-rose-500 text-rose-400 bg-slate-800/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Layout
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {activeTab === 'elements' && (
          <>
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <input
                type="text"
                value={widgetSearch}
                onChange={e => setWidgetSearch(e.target.value)}
                placeholder="Search Widget..."
                className="w-full bg-slate-800 border border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Widget Grid */}
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Healthcare & WooCommerce Widgets
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {allWidgets.map(widget => {
                    const Icon = widget.icon;
                    return (
                      <button
                        key={widget.id}
                        onClick={() => handleWidgetDropNotice(widget.name)}
                        className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-rose-500/80 transition-all text-center group cursor-grab active:cursor-grabbing"
                      >
                        <Icon className="w-5 h-5 text-rose-400 mb-1.5 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-medium text-slate-200 group-hover:text-white leading-tight">
                          {widget.name}
                        </span>
                        <span className="text-[9px] text-slate-500 mt-0.5">{widget.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <div className="flex items-center gap-1.5 text-rose-400 font-medium mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Live Editing</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  While Elementor mode is active, you can directly click on hero headlines, subheadings, and promotional banners to edit text in real time!
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'page-settings' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">
                Hero Headline
              </label>
              <textarea
                rows={3}
                value={globalSettings.heroHeadline}
                onChange={e => {
                  updateGlobalSettings({ heroHeadline: e.target.value });
                  setIsSaved(false);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">
                Hero Subheadline
              </label>
              <textarea
                rows={3}
                value={globalSettings.heroSubheadline}
                onChange={e => {
                  updateGlobalSettings({ heroSubheadline: e.target.value });
                  setIsSaved(false);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">
                Top Announcement Bar
              </label>
              <input
                type="text"
                value={globalSettings.promoBannerText}
                onChange={e => {
                  updateGlobalSettings({ promoBannerText: e.target.value });
                  setIsSaved(false);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">
                Store Mobile / WhatsApp (Ambikapur)
              </label>
              <input
                type="text"
                value={globalSettings.phone}
                onChange={e => {
                  updateGlobalSettings({ phone: e.target.value, whatsappNumber: e.target.value });
                  setIsSaved(false);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">
                Store Address (Deviganj Road)
              </label>
              <input
                type="text"
                value={globalSettings.storeAddress}
                onChange={e => {
                  updateGlobalSettings({ storeAddress: e.target.value });
                  setIsSaved(false);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">
                Store Drug License Number
              </label>
              <input
                type="text"
                value={globalSettings.drugLicenseNumber}
                onChange={e => {
                  updateGlobalSettings({ drugLicenseNumber: e.target.value });
                  setIsSaved(false);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">
                Page Template Layout
              </label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none">
                <option>Elementor Full Width (Default)</option>
                <option>Elementor Canvas (No Header/Footer)</option>
                <option>Theme Default</option>
              </select>
            </div>

            <div className="bg-slate-800/40 p-3 rounded border border-slate-700/40 space-y-2">
              <div className="font-semibold text-slate-300">Theme Global Container</div>
              <div className="text-[11px] text-slate-400">Content Width: 1200px</div>
              <div className="text-[11px] text-slate-400">Column Gaps: 24px (generous medical spacing)</div>
              <div className="text-[11px] text-slate-400">Card Elevation: Single-Level Soft Shadow</div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">
                Switch Preview Page
              </label>
              <select
                value={currentPage}
                onChange={e => setCurrentPage(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none"
              >
                <option value="home">Home Page</option>
                <option value="shop">Shop / Category Catalog</option>
                <option value="product-detail">Product Detail Page</option>
                <option value="cart-checkout">Cart & Checkout Page</option>
                <option value="upload-prescription">Upload Prescription Page</option>
                <option value="about-contact">About & Contact Page</option>
                <option value="policies">FAQ & Store Policies</option>
                <option value="account">My Account & Orders</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Elementor Bottom Action Bar */}
      <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-slate-400">
          <button className="p-1.5 hover:text-white rounded hover:bg-slate-800" title="Settings">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:text-white rounded hover:bg-slate-800" title="Navigator">
            <Layers className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:text-white rounded hover:bg-slate-800" title="Revision History">
            <History className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded text-xs transition-colors shadow-sm"
        >
          <Check className="w-3.5 h-3.5" />
          <span>{isSaved ? 'Published' : 'Update'}</span>
        </button>
      </div>
    </aside>
  );
};
