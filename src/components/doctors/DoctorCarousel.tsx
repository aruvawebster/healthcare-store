import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Stethoscope, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Doctor } from '../../types/store';

export const DoctorCarousel: React.FC = () => {
  const { 
    doctors, 
    setSelectedDoctorForBooking, 
    setIsBookingModalOpen, 
    globalSettings,
    showToast 
  } = useStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? doctors.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === doctors.length - 1 ? 0 : prev + 1));
  };

  const handleBook = (doctor: Doctor) => {
    setSelectedDoctorForBooking(doctor);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-0.5 rounded-full mb-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Nishant Medicos Clinic & OPD Consultations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Consult Our Specialist Doctors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            In-clinic consultations on Deviganj Road, Ambikapur. Book a token online or call <strong className="text-slate-800">7354260555</strong> to avoid clinic waiting times.
          </p>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-teal-500 text-slate-700 transition-colors shadow-xs"
            title="Previous Doctor"
            aria-label="Previous Doctor"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-teal-500 text-slate-700 transition-colors shadow-xs"
            title="Next Doctor"
            aria-label="Next Doctor"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Doctor Cards Carousel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, idx) => {
          const isFeaturedInSlide = idx === currentIndex;
          return (
            <div
              key={doctor.id}
              className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 ${
                isFeaturedInSlide ? 'ring-2 ring-teal-600 border-teal-500' : 'border-slate-200'
              }`}
            >
              {/* Doctor Image and Badge */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 shadow-xs flex items-center gap-1 border border-slate-200/80">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-400 font-normal">({doctor.experienceYears}+ yrs exp)</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs">
                  {doctor.roomNumber}
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                    {doctor.specialty}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {doctor.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium">
                    {doctor.qualification}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    {doctor.about}
                  </p>
                </div>

                {/* Timings & Fee */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>OPD Timings</span>
                    </span>
                    <span className="font-semibold text-slate-900 text-right">{doctor.opdTimings}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>Availability</span>
                    </span>
                    <span className="font-medium text-slate-800">{doctor.availableDays}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-500">Consultation Fee</span>
                    <span className="text-base font-bold text-slate-900">₹{doctor.consultationFee}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => handleBook(doctor)}
                    className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </button>

                  <a
                    href={`tel:${globalSettings.phone}`}
                    className="p-2.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-xl transition-colors"
                    title={`Call Nishant Medicos: ${globalSettings.phone}`}
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Indicator Dots */}
      <div className="flex justify-center items-center gap-1.5 mt-5">
        {doctors.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentIndex === i ? 'bg-teal-600 w-6' : 'bg-slate-300'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
