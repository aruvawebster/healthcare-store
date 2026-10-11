import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Award, 
  Users 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutContactPage: React.FC = () => {
  const { globalSettings, setIsWhatsAppOpen, showToast } = useStore();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    showToast('Your message has been sent to our chief pharmacist.');
  };

  return (
    <div className="container mx-auto px-4 py-10 font-sans space-y-16">
      {/* 1. About Us Hero */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
          <Award className="w-3.5 h-3.5 text-teal-600" />
          <span>Established 2018 · Licensed Retail Dispensary</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About {globalSettings.storeName}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We bridge modern e-commerce convenience with clinical pharmacy diligence. Sourcing only genuine, laboratory-tested medications, daily wellness supplements, and certified diagnostic instruments.
        </p>
      </section>

      {/* 2. Pharmacist Credentials & Standards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Strict Drug Licensing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Registered under License No. <strong className="text-slate-900">{globalSettings.drugLicenseNumber}</strong> under Form 20B/21B. We adhere to national drug control protocols.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Certified Pharmacists</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our dispensing team consists of full-time registered pharmacists with Pharm.D and B.Pharm credentials providing patient dosage counseling.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Direct Lab Procurement</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every batch is procured directly from reputable WHO-GMP certified manufacturers with tamper-evident packaging and temperature-controlled storage.
          </p>
        </div>
      </section>

      {/* 3. Contact & Store Location */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Left: Contact Info & Timings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Have a question about an order, medication dosage, or prescription refill? Our team is available 7 days a week.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs mb-0.5">Physical Dispensary Address</strong>
                <span className="text-slate-600 leading-relaxed">{globalSettings.storeAddress}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
              <Phone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs mb-0.5">Customer Support & Pharmacy Helpline</strong>
                <span className="text-slate-600">{globalSettings.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
              <Mail className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs mb-0.5">Email Inquiries</strong>
                <span className="text-slate-600">{globalSettings.email}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
              <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs mb-0.5">Store & Dispensary Timings</strong>
                <span className="text-slate-600">{globalSettings.storeTimings}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <button
            onClick={() => setIsWhatsAppOpen(true)}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Directly on WhatsApp ({globalSettings.whatsappNumber})</span>
          </button>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Send Us a Message</h3>

          {messageSent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-sm">Message Sent!</h4>
              <p className="text-xs text-slate-600">
                Thank you for reaching out. A registered healthcare associate will respond via email or phone shortly.
              </p>
              <button
                onClick={() => setMessageSent(false)}
                className="mt-2 text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  placeholder="E.g. Dr. Ramesh / Ananya Sharma"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Your Message or Inquiry</label>
                <textarea
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                  placeholder="Describe your medicine requirement, bulk inquiry, or feedback..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 4. Google Map Simulator / Store Coordinates */}
      <section className="max-w-5xl mx-auto space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Store Location Map · {globalSettings.city}</span>
          </div>
          <span className="text-slate-400 font-mono">Lat: 23.1197° N, Lon: 83.1979° E (Ambikapur, Chhattisgarh)</span>
        </div>

        {/* Map Container */}
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shadow-inner">
          {/* Subtle map grid styling */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
          
          <div className="relative z-10 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-200 text-center max-w-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{globalSettings.storeName} Dispensary</h4>
            <p className="text-xs text-slate-600">{globalSettings.storeAddress}</p>
            <div className="text-[11px] text-teal-700 font-medium pt-1">
              {globalSettings.storeTimings}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
