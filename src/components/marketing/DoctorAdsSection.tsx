import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Stethoscope, 
  MessageSquare,
  Edit2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const DoctorAdsSection: React.FC = () => {
  const { 
    doctorAds, 
    globalSettings, 
    isElementorEditing, 
    setIsWhatsAppOpen,
    showToast 
  } = useStore();

  const primaryAd = doctorAds[0];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-teal-900 text-white border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Ad Left Text Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{primaryAd.badge} · Nishant Medicos Ambikapur</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {primaryAd.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                {primaryAd.subtitle}
              </p>
            </div>

            {/* Doctor & Schedule Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 space-y-1">
                <div className="text-teal-300 font-semibold flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Specialist In Charge</span>
                </div>
                <div className="text-white font-bold text-sm">{primaryAd.doctorName}</div>
                <div className="text-slate-300 text-[11px]">{primaryAd.specialty}</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 space-y-1">
                <div className="text-teal-300 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule & Timing</span>
                </div>
                <div className="text-white font-bold">{primaryAd.scheduleText}</div>
                <div className="text-slate-300 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                  <span className="truncate">{primaryAd.venue}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  window.open(`https://wa.me/917354260555?text=${encodeURIComponent('Hi Nishant Medicos, I want to register for the Health & Specialist Doctor Camp at Deviganj Road.')}`, '_blank');
                  showToast('Connecting to WhatsApp for camp registration...');
                }}
                className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Register on WhatsApp: 7354260555</span>
              </button>

              <a
                href={`tel:${globalSettings.phone}`}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Call Helpline: {globalSettings.phone}</span>
              </a>
            </div>

            {isElementorEditing && (
              <div className="text-[10px] text-teal-300 bg-teal-900/50 p-2 rounded border border-teal-700/60 flex items-center gap-1.5">
                <Edit2 className="w-3 h-3" />
                <span>Elementor Doctor Ad Widget: You can replace doctor name, camp dates, or add new hospital promotions here.</span>
              </div>
            )}
          </div>

          {/* Ad Right Banner Graphic */}
          <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
            <img
              src={primaryAd.image}
              alt="Specialist Doctor Clinic Advertisement"
              className="w-full h-full object-cover lg:object-center min-h-[300px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
};
