import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Stethoscope 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Doctor } from '../../types/store';

export const DoctorAppointmentModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    setIsBookingModalOpen, 
    selectedDoctorForBooking, 
    bookAppointment, 
    globalSettings,
    showToast 
  } = useStore();

  const [patientName, setPatientName] = useState('Sunil Agrawal');
  const [patientPhone, setPatientPhone] = useState('7354260555');
  const [patientAge, setPatientAge] = useState('48');
  const [appointmentDate, setAppointmentDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [symptoms, setSymptoms] = useState('General health checkup, blood pressure & sugar level review');
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  if (!isBookingModalOpen || !selectedDoctorForBooking) return null;

  const doctor: Doctor = selectedDoctorForBooking;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      showToast('Please enter patient name and contact number');
      return;
    }

    const appt = bookAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      patientName,
      patientPhone,
      patientAge,
      appointmentDate,
      timeSlot,
      symptoms
    });

    setBookingSuccess(appt);
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setBookingSuccess(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 font-sans">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold leading-tight">Book Doctor Consultation</h2>
              <p className="text-xs text-slate-300">{globalSettings.storeName} Clinic, {globalSettings.city}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto text-xs space-y-5">
          {bookingSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                  Appointment Confirmed
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  Token #{bookingSuccess.tokenNumber} Reserved
                </h3>
                <p className="text-slate-600 text-xs">
                  Appointment ID: <strong className="text-slate-900">{bookingSuccess.id}</strong>
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2 text-xs">
                <div><strong className="text-slate-900">Consulting Doctor:</strong> {bookingSuccess.doctorName} ({bookingSuccess.specialty})</div>
                <div><strong className="text-slate-900">Patient:</strong> {bookingSuccess.patientName} (Age: {bookingSuccess.patientAge})</div>
                <div><strong className="text-slate-900">Date & Slot:</strong> {bookingSuccess.appointmentDate} at {bookingSuccess.timeSlot}</div>
                <div><strong className="text-slate-900">Clinic Room:</strong> {doctor.roomNumber}</div>
                <div><strong className="text-slate-900">Location:</strong> {globalSettings.storeAddress}</div>
                <div><strong className="text-slate-900">Clinic Helpline:</strong> {globalSettings.phone}</div>
              </div>

              <div className="p-3 bg-teal-50/80 border border-teal-200 text-teal-900 rounded-lg text-left text-[11px] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>An SMS & WhatsApp confirmation has been initiated to <strong>{bookingSuccess.patientPhone}</strong>. Please reach the clinic 10 minutes prior to your slot.</span>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors shadow-xs"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Doctor Quick Badge */}
              <div className="flex items-start gap-3 p-3.5 bg-teal-50/60 border border-teal-100 rounded-xl">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-14 h-14 object-cover rounded-lg border border-teal-200 shrink-0 bg-white"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm">{doctor.name}</h4>
                  <div className="text-teal-800 font-medium text-[11px]">{doctor.qualification}</div>
                  <div className="text-slate-600 text-[11px]">{doctor.specialty} · {doctor.experienceYears}+ Yrs Exp</div>
                  <div className="text-slate-500 text-[11px] mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                    <span>OPD: <strong>{doctor.opdTimings}</strong></span>
                    <span>Fee: <strong>₹{doctor.consultationFee}</strong></span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Patient Full Name</label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                      placeholder="Enter patient name"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Mobile Number (For Token SMS)</label>
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={e => setPatientPhone(e.target.value)}
                      placeholder="7354260555"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Patient Age</label>
                    <input
                      type="number"
                      required
                      value={patientAge}
                      onChange={e => setPatientAge(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Preferred Date</label>
                    <select
                      value={appointmentDate}
                      onChange={e => setAppointmentDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    >
                      <option value="Today">Today (Current OPD)</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Day After Tomorrow">Day After Tomorrow</option>
                      <option value="Upcoming Saturday">Upcoming Saturday</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-medium mb-1">Preferred Time Slot</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['10:30 AM', '11:30 AM', '12:30 PM', '06:30 PM', '07:15 PM', '08:00 PM', '08:45 PM'].map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`p-1.5 text-center rounded-lg border text-[11px] font-medium transition-colors ${
                            timeSlot === slot
                              ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-medium mb-1">Health Symptoms or Reason for Visit</label>
                    <textarea
                      rows={2}
                      value={symptoms}
                      onChange={e => setSymptoms(e.target.value)}
                      placeholder="E.g. Fever since 2 days, diabetic review, Joint pain..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Pay at clinic counter: <strong className="text-slate-900">₹{doctor.consultationFee}</strong>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white rounded-xl font-bold shadow-xs transition-colors"
                  >
                    Confirm & Reserve Token
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
