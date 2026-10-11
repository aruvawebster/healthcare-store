import React from 'react';
import { 
  Wrench, 
  Palette, 
  Layout, 
  ShoppingBag, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  CheckCircle2, 
  Plus, 
  ExternalLink 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ElementorAdminBar: React.FC = () => {
  const { 
    globalSettings, 
    isElementorEditing, 
    setIsElementorEditing, 
    viewportMode, 
    setViewportMode,
    setIsGlobalSettingsOpen,
    setIsThemeBuilderOpen,
    setIsWooCommerceManagerOpen,
    orders,
    prescriptions
  } = useStore();

  const pendingRxCount = prescriptions.filter(p => p.status === 'Pending Pharmacist Review').length;

  return (
    <div className="bg-slate-900 text-slate-200 text-xs px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 z-50 sticky top-0 font-sans shadow-md">
      {/* Left: WordPress Brand & Site */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-0.5 rounded text-white font-semibold">
          <span className="w-4 h-4 rounded-full bg-teal-500 text-slate-900 flex items-center justify-center text-[10px] font-black">
            W
          </span>
          <span className="hidden sm:inline">WordPress 6.7</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-100 hidden md:inline">
            {globalSettings.storeName}
          </span>
          <span className="text-[11px] text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/50 hidden lg:inline">
            Hello Elementor Theme
          </span>
        </div>
      </div>

      {/* Center: Builder & Quick Tools */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Toggle Edit with Elementor */}
        <button
          onClick={() => setIsElementorEditing(!isElementorEditing)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-all ${
            isElementorEditing 
              ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-400' 
              : 'bg-teal-600 text-white hover:bg-teal-500'
          }`}
          title="Toggle Elementor Drag-and-Drop Visual Editor"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>{isElementorEditing ? 'Exit Elementor' : 'Edit with Elementor'}</span>
        </button>

        {/* Global Site Settings (Colors & Fonts) */}
        <button
          onClick={() => setIsGlobalSettingsOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
          title="Elementor Global Colors, Fonts & Site Identity"
        >
          <Palette className="w-3.5 h-3.5 text-teal-400" />
          <span className="hidden sm:inline">Site Settings</span>
        </button>

        {/* Theme Builder */}
        <button
          onClick={() => setIsThemeBuilderOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
          title="Elementor Theme Builder (Header, Footer, Single Product)"
        >
          <Layout className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden md:inline">Theme Builder</span>
        </button>

        {/* WooCommerce Admin */}
        <button
          onClick={() => setIsWooCommerceManagerOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors relative"
          title="WooCommerce Products, Orders & Rx Verifications"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
          <span>WooCommerce</span>
          {pendingRxCount > 0 && (
            <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {pendingRxCount} Rx
            </span>
          )}
        </button>
      </div>

      {/* Right: Responsive Viewports & Preview Mode */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-800 p-0.5 rounded border border-slate-700">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`p-1 rounded transition-colors ${
              viewportMode === 'desktop' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop View (1440px)"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            className={`p-1 rounded transition-colors ${
              viewportMode === 'tablet' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`p-1 rounded transition-colors ${
              viewportMode === 'mobile' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile View (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {isElementorEditing && (
          <span className="text-[11px] text-emerald-400 hidden xl:flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Live Drag & Drop Active
          </span>
        )}
      </div>
    </div>
  );
};
