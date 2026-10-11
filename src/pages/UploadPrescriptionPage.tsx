import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  HelpCircle, 
  FileCheck, 
  AlertCircle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const UploadPrescriptionPage: React.FC = () => {
  const { 
    submitPrescription, 
    pincode, 
    setCurrentPage, 
    globalSettings, 
    showToast 
  } = useStore();

  const [patientName, setPatientName] = useState('Meera Deshmukh');
  const [patientAge, setPatientAge] = useState('58');
  const [phone, setPhone] = useState('7354260555');
  const [deliveryPincode, setDeliveryPincode] = useState(pincode || '49001');
  const [notes, setNotes] = useState('Please dispense 30-day course of regular medicines from Nishant Medicos, Deviganj Road, Ambikapur.');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>({
    name: 'dr_sharma_prescription_clinic.jpg',
    size: '2.4 MB'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showToast('Please select or drag a prescription file first.');
      return;
    }

    const sub = submitPrescription({
      patientName,
      patientAge,
      phone,
      deliveryPincode,
      notes,
      fileName: selectedFile.name,
      fileSize: selectedFile.size
    });

    setSubmittedId(sub.id);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl font-sans space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Licensed Pharmacist Verification Service</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Upload Doctor Prescription
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Upload a clear photo or PDF scan of your doctor's prescription. Our certified pharmacists will review the medication, confirm dosage, and prepare your medicines.
        </p>
      </div>

      {/* 3-Step Process Explanation Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
            1
          </div>
          <div className="text-xs">
            <h3 className="font-bold text-slate-900 mb-0.5">Upload Prescription</h3>
            <p className="text-slate-500">Take a photo or upload a digital PDF from your doctor.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
            2
          </div>
          <div className="text-xs">
            <h3 className="font-bold text-slate-900 mb-0.5">Pharmacist Review</h3>
            <p className="text-slate-500">Registered on-duty pharmacist verifies medicine validity in 15 mins.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
            3
          </div>
          <div className="text-xs">
            <h3 className="font-bold text-slate-900 mb-0.5">Doorstep Delivery</h3>
            <p className="text-slate-500">Confirm payment and receive medicines in temperature-safe packs.</p>
          </div>
        </div>
      </div>

      {/* Form or Confirmation Card */}
      {isSubmitted ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-xs max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Prescription Successfully Uploaded!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Reference Ticket: <strong className="text-slate-900">{submittedId}</strong>
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              Our registered pharmacist has received your file <em>"{selectedFile?.name}"</em>. You will receive an SMS and WhatsApp notification with the medicine bill within 15-20 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setCurrentPage('account')}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              View In My Account
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedFile(null);
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
            >
              Upload Another Prescription
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Drag and Drop Zone */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Select Prescription Image or PDF
              </label>

              <div className="border-2 border-dashed border-teal-400/80 hover:border-teal-600 bg-teal-50/20 rounded-2xl p-6 sm:p-10 text-center transition-colors cursor-pointer space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                  <UploadCloud className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedFile ? selectedFile.name : 'Click to browse or drag prescription file here'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports JPG, PNG, WEBP, or PDF (Up to 15 MB)
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile({ name: 'dr_manish_rx_cardio_2026.jpg', size: '3.1 MB' });
                      showToast('Attached prescription demo scan!');
                    }}
                    className="px-4 py-2 bg-white border border-slate-300 hover:border-teal-500 text-slate-700 rounded-lg text-xs font-semibold shadow-xs"
                  >
                    Select File
                  </button>
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="px-3 py-2 text-rose-600 hover:text-rose-700 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Guidelines checklist */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                <span>✓ Doctor's name and clinic header visible</span>
                <span>✓ Patient name & date clearly written</span>
                <span>✓ Medicine names and dosage legible</span>
              </div>
            </div>

            {/* Patient & Contact Info */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Patient & Delivery Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Patient Age</label>
                  <input
                    type="number"
                    required
                    value={patientAge}
                    onChange={e => setPatientAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Phone Number (For Pharmacist Call)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Delivery Postal Pincode</label>
                  <input
                    type="text"
                    required
                    value={deliveryPincode}
                    onChange={e => setDeliveryPincode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-medium mb-1">
                    Special Instructions / Refill Duration Notes
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="E.g. Send 15-day course only, or substitute with generic bio-equivalent..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Verification typically completed within 15-20 minutes.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-700 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Submit Prescription for Verification</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
