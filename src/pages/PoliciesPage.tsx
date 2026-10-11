import React, { useState } from 'react';
import { 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  ChevronDown 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FAQS } from '../data/initialData';

export const PoliciesPage: React.FC = () => {
  const { globalSettings } = useStore();
  const [activeTab, setActiveTab] = useState<'faq' | 'privacy' | 'terms' | 'refund'>('faq');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl font-sans space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Trust, Compliance & Store Policies
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Clear policies adhering to state pharmacy regulations, patient privacy laws, and customer satisfaction guarantees.
        </p>
      </div>

      {/* Policy Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 rounded-xl p-1 gap-1 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('faq')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeTab === 'faq' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FAQ</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeTab === 'privacy' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeTab === 'terms' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Terms & Conditions</span>
        </button>

        <button
          onClick={() => setActiveTab('refund')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeTab === 'refund' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Return & Refund Policy</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed">
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left p-4 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between gap-3 font-semibold text-slate-900 text-xs sm:text-sm transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaqIndex === idx ? 'rotate-180 text-teal-600' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Patient Privacy Policy & Data Security</h2>
            <p>
              At <strong>{globalSettings.storeName}</strong>, safeguarding your personal medical history and doctor prescriptions is our top priority. We operate under stringent privacy protocols compliant with medical data standards.
            </p>
            <h3 className="text-base font-bold text-slate-900 pt-2">1. Information We Collect</h3>
            <p>
              We collect your name, phone number, shipping address, and uploaded prescription files solely to facilitate dispensing and doorstep delivery of your orders.
            </p>
            <h3 className="text-base font-bold text-slate-900 pt-2">2. Confidentiality of Prescriptions</h3>
            <p>
              Uploaded prescription images and records are restricted strictly to registered on-duty pharmacists verifying your order. We never sell or share medical records with third-party advertisers or insurance brokers.
            </p>
            <h3 className="text-base font-bold text-slate-900 pt-2">3. Payment Information</h3>
            <p>
              Card and UPI payments are processed via PCI-DSS compliant payment gateways with end-to-end 256-bit encryption. We do not store credit card CVVs or net banking passwords.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Terms & Conditions of Service</h2>
            <p>
              By purchasing from {globalSettings.storeName}, you agree to the regulatory and commercial terms outlined below.
            </p>
            <h3 className="text-base font-bold text-slate-900 pt-2">1. Prescription Verification</h3>
            <p>
              Prescription medicines (marked with the "Rx" label) will only be dispensed upon verification of a valid prescription signed by a registered medical practitioner. The pharmacy reserves the right to decline dispensing if the prescription is illegible, expired, or outside legal limits.
            </p>
            <h3 className="text-base font-bold text-slate-900 pt-2">2. Product Availability & Batch Dating</h3>
            <p>
              All medicines are supplied with minimum 6 to 24 months validity before expiration. If a specified brand is out of stock, our pharmacist may suggest a bio-equivalent generic only with the patient's explicit consent.
            </p>
            <h3 className="text-base font-bold text-slate-900 pt-2">3. Delivery & Courier Terms</h3>
            <p>
              Orders are packaged in secure, sealed tamper-evident pouches. Same-day delivery applies to orders placed before 4:00 PM in serviceable postal pincodes.
            </p>
          </div>
        )}

        {activeTab === 'refund' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Returns, Replacements & Refunds Policy</h2>
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
              <strong>Government Pharmacy Regulations Notice:</strong> By law, dispensed medicines cannot be restocked or resold once they leave the dispensary premises to maintain chemical stability and hygiene.
            </div>

            <h3 className="text-base font-bold text-slate-900 pt-2">1. Eligible Returns</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Product delivered was broken, damaged, or seal was compromised upon delivery.</li>
              <li>Product delivered had an expiration date within less than 60 days.</li>
              <li>Incorrect medicine or dosage was delivered compared to your verified order.</li>
            </ul>

            <h3 className="text-base font-bold text-slate-900 pt-2">2. Refund Timeline</h3>
            <p>
              Upon reporting within 48 hours of delivery, refunds are credited back to your original payment method (UPI / Bank Account) within 2 to 3 business days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
