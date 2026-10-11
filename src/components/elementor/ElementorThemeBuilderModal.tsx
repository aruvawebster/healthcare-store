import React from 'react';
import { X, Layout, FileText, CheckCircle, ExternalLink, Code2, Download, Layers } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ElementorThemeBuilderModal: React.FC = () => {
  const { 
    isThemeBuilderOpen, 
    setIsThemeBuilderOpen, 
    activeTemplateTab, 
    setActiveTemplateTab,
    setCurrentPage,
    setIsElementorEditing,
    showToast 
  } = useStore();

  if (!isThemeBuilderOpen) return null;

  const templates = [
    {
      id: 'header',
      name: 'Site Header (Theme Builder)',
      type: 'Header Template',
      condition: 'Entire Site',
      status: 'Active',
      description: 'Sticky header with Drug License trust line, Pincode delivery check, Ajax live search, and WooCommerce cart counter.',
      actionPage: 'home'
    },
    {
      id: 'footer',
      name: 'Site Footer (Theme Builder)',
      type: 'Footer Template',
      condition: 'Entire Site',
      status: 'Active',
      description: 'Compliance footer with Government Drug License number, mandatory medical disclaimer, payment badges & WhatsApp button.',
      actionPage: 'home'
    },
    {
      id: 'product-card',
      name: 'Reusable Product Card Loop Item',
      type: 'Loop Item Template',
      condition: 'Shop Grids, Category Archives & Related Products',
      status: 'Active',
      description: 'Standardized card with Rx Prescription tag, Star ratings, Discount calculation, Quick Add to Cart, and Wishlist toggle.',
      actionPage: 'shop'
    },
    {
      id: 'single-product',
      name: 'Single Product Page Template',
      type: 'Single Product (WooCommerce)',
      condition: 'All Products',
      status: 'Active',
      description: 'Contiguous purchase module, active ingredients list, dosage guide, medical precautions, and related pharmaceuticals.',
      actionPage: 'product-detail'
    },
    {
      id: 'shop-archive',
      name: 'Product Archive / Catalog Template',
      type: 'Archive Template',
      condition: 'All Product Categories',
      status: 'Active',
      description: 'Faceted category sidebar, price range slider, Rx vs OTC filter, sort dropdown, and responsive 3-column product grid.',
      actionPage: 'shop'
    }
  ];

  const handleEditTemplate = (page: any, templateName: string) => {
    setCurrentPage(page);
    setIsElementorEditing(true);
    setIsThemeBuilderOpen(false);
    showToast(`Editing "${templateName}" with Elementor Visual Editor.`);
  };

  const handleExportJSON = (templateName: string) => {
    const data = {
      template: templateName,
      builder: 'Elementor Pro 3.24 Theme Builder',
      version: '1.0.0',
      theme: 'Hello Elementor',
      date: new Date().toISOString()
    };
    navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
    showToast(`Copied ${templateName} JSON schema to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold leading-tight">Elementor Theme Builder</h2>
              <p className="text-xs text-slate-300">Manage Reusable Site Templates & Display Conditions</p>
            </div>
          </div>
          <button
            onClick={() => setIsThemeBuilderOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates list */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 text-blue-900 leading-relaxed">
            <span className="font-semibold">Elementor Theme Builder Active:</span> All layouts (Header, Footer, Single Product, Shop Archive, and Product Cards) are modular templates assigned via display conditions. Non-coders can modify any template visually.
          </div>

          <div className="space-y-3">
            {templates.map(tmpl => (
              <div
                key={tmpl.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">{tmpl.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {tmpl.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Conditions: <span className="text-slate-800 font-medium">{tmpl.condition}</span>
                  </div>
                </div>

                <p className="text-slate-600 mb-3 leading-relaxed">
                  {tmpl.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleEditTemplate(tmpl.actionPage, tmpl.name)}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Edit with Elementor</span>
                  </button>

                  <button
                    onClick={() => handleExportJSON(tmpl.name)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Template JSON</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={() => setIsThemeBuilderOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
