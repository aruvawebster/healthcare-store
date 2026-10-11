import React from 'react';
import { X, Palette, Type, Shield, MapPin, Building2, Phone, Mail, Check, RotateCcw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ElementorGlobalSettingsModal: React.FC = () => {
  const { 
    isGlobalSettingsOpen, 
    setIsGlobalSettingsOpen, 
    globalSettings, 
    updateGlobalSettings,
    resetGlobalSettings,
    showToast 
  } = useStore();

  if (!isGlobalSettingsOpen) return null;

  const colorPresets = [
    { name: 'teal', label: 'Medical Teal', hex: '#0d9488', bgClass: 'bg-teal-600' },
    { name: 'emerald', label: 'Clinical Emerald', hex: '#059669', bgClass: 'bg-emerald-600' },
    { name: 'blue', label: 'Trust Blue', hex: '#2563eb', bgClass: 'bg-blue-600' },
    { name: 'cyan', label: 'Wellness Cyan', hex: '#0891b2', bgClass: 'bg-cyan-600' },
    { name: 'indigo', label: 'Pharma Indigo', hex: '#4f46e5', bgClass: 'bg-indigo-600' },
  ];

  const fontOptions = [
    { label: 'Plus Jakarta Sans (Medical & Modern)', value: 'Plus Jakarta Sans' as const },
    { label: 'Outfit (Friendly & Clean)', value: 'Outfit' as const },
    { label: 'Inter (High-Legibility Neutral)', value: 'Inter' as const },
  ];

  const radiusOptions = [
    { label: 'Subtle (8px)', value: 'rounded-lg' as const },
    { label: 'Smooth (12px - Recommended)', value: 'rounded-xl' as const },
    { label: 'Soft Pill (16px)', value: 'rounded-2xl' as const },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold leading-tight">Elementor Site Settings</h2>
              <p className="text-xs text-slate-300">Global Colors, Global Fonts & Store Identity</p>
            </div>
          </div>
          <button
            onClick={() => setIsGlobalSettingsOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Section 1: Global Brand Colors */}
          <div>
            <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
              <Palette className="w-4 h-4 text-teal-600" />
              <span>Global Colors (Affects All Buttons, Badges & Accents)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {colorPresets.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => {
                    updateGlobalSettings({
                      primaryColor: preset.hex,
                      primaryColorName: preset.name as any
                    });
                  }}
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                    globalSettings.primaryColorName === preset.name
                      ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/10'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full ${preset.bgClass} mb-2 shadow-inner flex items-center justify-center text-white`}>
                    {globalSettings.primaryColorName === preset.name && <Check className="w-4 h-4 stroke-[3]" />}
                  </span>
                  <span className="text-xs font-medium text-slate-800">{preset.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">{preset.hex}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Global Fonts & Card Radius */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 font-semibold text-slate-900 mb-1.5">
                <Type className="w-4 h-4 text-teal-600" />
                <span>Global Typography</span>
              </label>
              <select
                value={globalSettings.fontFamily}
                onChange={e => updateGlobalSettings({ fontFamily: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1.5 font-semibold text-slate-900 mb-1.5">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Card Border Radius</span>
              </label>
              <select
                value={globalSettings.borderRadius}
                onChange={e => updateGlobalSettings({ borderRadius: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {radiusOptions.map(r => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Store Details & Compliance */}
          <div className="border-t border-slate-100 pt-5">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Store Identity & Compliance Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Store Name</label>
                <input
                  type="text"
                  value={globalSettings.storeName}
                  onChange={e => updateGlobalSettings({ storeName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">City, Country</label>
                <input
                  type="text"
                  value={`${globalSettings.city}, ${globalSettings.country}`}
                  onChange={e => {
                    const parts = e.target.value.split(',');
                    updateGlobalSettings({
                      city: parts[0]?.trim() || '',
                      country: parts[1]?.trim() || ''
                    });
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Drug License Number (Footer Compliance)
                </label>
                <input
                  type="text"
                  value={globalSettings.drugLicenseNumber}
                  onChange={e => updateGlobalSettings({ drugLicenseNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp Hotline</label>
                <input
                  type="text"
                  value={globalSettings.whatsappNumber}
                  onChange={e => updateGlobalSettings({ whatsappNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">Store Address & Timings</label>
                <input
                  type="text"
                  value={globalSettings.storeAddress}
                  onChange={e => updateGlobalSettings({ storeAddress: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={resetGlobalSettings}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            onClick={() => {
              setIsGlobalSettingsOpen(false);
              showToast('Elementor Global Settings saved and applied to entire website!');
            }}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium text-xs shadow-sm transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
