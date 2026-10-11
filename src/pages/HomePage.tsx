import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  FileUp, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  PhoneCall, 
  Clock, 
  HeartHandshake, 
  Pill, 
  Activity, 
  Baby, 
  Send,
  Edit2,
  MapPin,
  Calendar,
  Stethoscope
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES_DATA, TESTIMONIALS } from '../data/initialData';
import { DoctorCarousel } from '../components/doctors/DoctorCarousel';
import { DoctorAdsSection } from '../components/marketing/DoctorAdsSection';
import { PromoMedicineTemplate } from '../components/marketing/PromoMedicineTemplate';

export const HomePage: React.FC = () => {
  const { 
    products, 
    setCurrentPage, 
    setSelectedCategory, 
    globalSettings, 
    updateGlobalSettings,
    isElementorEditing,
    setIsSearchOpen,
    showToast 
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 4);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId as any);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      showToast('Thank you for subscribing to Nishant Medicos updates!');
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 font-sans">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-teal-50/60 via-white to-slate-50/40 border-b border-slate-200/80 pt-6 pb-12 sm:pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-100/70 border border-teal-200/80 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                <span>100% Genuine Medicines · Deviganj Road, Ambikapur, Chhattisgarh</span>
              </div>

              {/* Editable Hero Headline in Elementor mode */}
              <div className="relative group">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
                  {globalSettings.heroHeadline}
                </h1>
                {isElementorEditing && (
                  <button
                    onClick={() => {
                      const next = prompt('Edit Hero Headline:', globalSettings.heroHeadline);
                      if (next) updateGlobalSettings({ heroHeadline: next });
                    }}
                    className="absolute -top-3 -right-3 p-1.5 bg-rose-600 text-white rounded-full shadow-md text-xs flex items-center gap-1"
                    title="Edit headline"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Subheadline */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                {globalSettings.heroSubheadline}
              </p>

              {/* Search Bar & Direct Prescription Upload CTA */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2 max-w-xl">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex-1 flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-xl shadow-xs hover:border-teal-500 text-left transition-colors text-slate-500 text-xs sm:text-sm group"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
                    <span>Search medicine, salt, brand or specialist...</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">⌘K</span>
                </button>

                <button
                  onClick={() => setCurrentPage('upload-prescription')}
                  className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 shrink-0"
                >
                  <FileUp className="w-4 h-4" />
                  <span>Upload Rx</span>
                </button>
              </div>

              {/* Trust Micro-Metrics Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-5 sm:gap-8 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Deviganj Road, Ambikapur</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-teal-600" />
                  <span>Call: <strong className="text-slate-800">7354260555</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-teal-600" />
                  <span>Same-Day Ambikapur Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white">
                <img
                  src="/src/assets/images/hero_healthcare_pharmacy_1791657420441.jpg"
                  alt="Nishant Medicos Pharmacy & Doctor Clinic Complex, Ambikapur"
                  className="w-full h-80 sm:h-96 object-cover"
                />

                {/* Floating clinic & store card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-lg flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                      Rx
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Need Medicines or Doctor OPD?</div>
                      <div className="text-[11px] text-slate-500">Deviganj Road, Ambikapur · Mobile: 7354260555</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentPage('upload-prescription')}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shrink-0"
                  >
                    Upload Rx
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DOCTOR CAROUSEL SECTION (Requested by User) */}
      <DoctorCarousel />

      {/* 3. DOCTOR ADVERTISEMENTS SPACE (Requested by User) */}
      <DoctorAdsSection />

      {/* 4. PROMOTIONAL MEDICINE TEMPLATE (Requested by User) */}
      <PromoMedicineTemplate />

      {/* 5. Shop By Category Strip */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Browse Dispensary Catalog
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Shop by Healthcare Category</h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentPage('shop');
            }}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {CATEGORIES_DATA.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="p-4 rounded-xl border border-slate-200 hover:border-teal-500 bg-white hover:bg-teal-50/20 text-left transition-all hover:shadow-xs group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors flex items-center justify-center mb-3">
                  {cat.id === 'prescription-medicines' && <Pill className="w-5 h-5" />}
                  {cat.id === 'vitamins-supplements' && <Sparkles className="w-5 h-5" />}
                  {cat.id === 'health-devices' && <Activity className="w-5 h-5" />}
                  {cat.id === 'personal-care' && <HeartHandshake className="w-5 h-5" />}
                  {cat.id === 'baby-mother' && <Baby className="w-5 h-5" />}
                </div>
                <h3 className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-teal-700 transition-colors">
                  {cat.name}
                </h3>
              </div>
              <div className="text-[11px] text-slate-500 mt-2 font-mono">
                {cat.count} Items
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. Featured Products Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Nishant Medicos Stock
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Featured Healthcare Essentials</h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentPage('shop');
            }}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 group"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Why Choose Us (Nishant Medicos, Ambikapur) */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 mb-8">
            <span className="text-teal-300 text-xs font-bold uppercase tracking-wider">
              Your Trusted Healthcare Partner in Sarguja
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Why Patients & Doctors in Ambikapur Trust Nishant Medicos
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Centrally situated at Deviganj Road, Ambikapur, Sarguja, Chhattisgarh 49001. We provide authentic medications, on-duty clinical pharmacist review, doctor OPD appointments, and fast delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800 text-xs">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-white">100% Genuine Pharmaceuticals</h3>
              <p className="text-slate-400 leading-relaxed">
                Licensed under {globalSettings.drugLicenseNumber}. Direct sourcing with verifiable manufacturer lot numbers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-white">Fast Ambikapur Doorstep Delivery</h3>
              <p className="text-slate-400 leading-relaxed">
                Emergency home delivery across Ambikapur and Sarguja district. WhatsApp prescription to 7354260555.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-white">Specialist Doctor OPD Clinic</h3>
              <p className="text-slate-400 leading-relaxed">
                Consult general physicians, pediatricians, and orthopedic specialists right at our Deviganj Road complex.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Best Sellers Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Patient Favorites
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Best Selling Medicines & Monitors</h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentPage('shop');
            }}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. Patient Reviews / Testimonials */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
            Patient Stories in Ambikapur
          </span>
          <h2 className="text-2xl font-bold text-slate-900">What Our Patients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(rev => (
            <div
              key={rev.id}
              className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{rev.author}</div>
                  <div className="text-slate-400 text-[11px]">{rev.location}</div>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  Verified Patient
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Store Location & Contact Callout Strip */}
      <section className="container mx-auto px-4">
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>Nishant Medicos · Ambikapur, Chhattisgarh</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Visit Us at Deviganj Road or Call 7354260555
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Open 7 days a week (8:00 AM – 10:30 PM). 24x7 emergency dispensary counter and doctor appointments available.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-auto max-w-md">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              placeholder="Enter email for medicine discount coupons..."
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 flex-1 md:w-64"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-xs transition-colors"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
