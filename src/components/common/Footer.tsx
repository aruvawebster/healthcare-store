import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { globalSettings, setCurrentPage } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800 text-xs">
      {/* 1. Mandatory Clinical Disclaimer Banner */}
      <div className="bg-slate-950 border-b border-slate-800/80 py-3 px-4">
        <div className="container mx-auto flex items-start sm:items-center gap-2.5 text-slate-400 text-[11px] leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-slate-200">Statutory Medical Disclaimer:</strong> Consult a doctor or registered medical practitioner before using any medicine. Information on this website is for educational and retail dispensing purposes only and is not a substitute for professional clinical medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Store Details & License */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-teal-500 text-slate-950 flex items-center justify-center font-bold text-sm">
              +
            </span>
            <span className="text-base font-bold text-white tracking-tight">
              {globalSettings.storeName}
            </span>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs">
            {globalSettings.tagline}
          </p>

          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-teal-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Registered Retail Pharmacy</span>
            </div>
            <div className="text-slate-400 font-mono">
              Drug License: <span className="text-slate-200">{globalSettings.drugLicenseNumber}</span>
            </div>
            <div className="text-slate-500">
              Form 20B & 21B · Central Drugs Standard Control
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white tracking-wide">Healthcare Categories</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => setCurrentPage('shop')} className="hover:text-teal-400 transition-colors">
                Prescription Medicines (Rx)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('shop')} className="hover:text-teal-400 transition-colors">
                Vitamins, Minerals & Daily Supplements
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('shop')} className="hover:text-teal-400 transition-colors">
                Health Monitors & Digital BP Devices
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('shop')} className="hover:text-teal-400 transition-colors">
                Personal & Clinical Skincare
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('shop')} className="hover:text-teal-400 transition-colors">
                Baby Care & Maternal Nutrition
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Trust & Policies */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white tracking-wide">Trust & Customer Care</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => setCurrentPage('upload-prescription')} className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                <span>Upload Doctor Prescription</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('account')} className="hover:text-teal-400 transition-colors">
                Track Live Order Status
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('policies')} className="hover:text-teal-400 transition-colors">
                Frequently Asked Questions (FAQ)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('policies')} className="hover:text-teal-400 transition-colors">
                Privacy Policy & HIPAA Standards
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('policies')} className="hover:text-teal-400 transition-colors">
                Returns, Refunds & Damaged Goods Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Hours */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white tracking-wide">Store & Dispensary</h4>
          <div className="space-y-2 text-slate-400 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>{globalSettings.storeAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{globalSettings.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{globalSettings.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>{globalSettings.storeTimings}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar: Payment Badges & Copyright */}
      <div className="border-t border-slate-800 bg-slate-950 py-4 px-4 text-slate-400">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} {globalSettings.storeName}. All rights reserved. Built with Hello Elementor & WooCommerce.
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-slate-400">Accepted Payments:</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-semibold">UPI</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-white">Cards</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-white">NetBanking</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-white">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
