import React, { useState } from 'react';
import { MessageSquare, X, Send, PhoneCall, ShieldCheck, FileText, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const FloatingWhatsApp: React.FC = () => {
  const { 
    isWhatsAppOpen, 
    setIsWhatsAppOpen, 
    globalSettings, 
    setCurrentPage,
    showToast 
  } = useStore();

  const [messageText, setMessageText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    let cleanNumber = globalSettings.whatsappNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.length === 10) {
      cleanNumber = `91${cleanNumber}`;
    }
    const encoded = encodeURIComponent(messageText);
    showToast('Opening WhatsApp Consultation...');
    // We open wa.me URL
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
    setMessageText('');
    setIsWhatsAppOpen(false);
  };

  const handleQuickPrompt = (prompt: string, targetPage?: any) => {
    if (targetPage) {
      setCurrentPage(targetPage);
      setIsWhatsAppOpen(false);
    } else {
      setMessageText(prompt);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans">
      {/* Floating Trigger Button */}
      {!isWhatsAppOpen && (
        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group"
          title="Chat with Licensed Pharmacist on WhatsApp"
          aria-label="WhatsApp Support"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.974.531 1.907.82 2.791.82 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.806-5.768-5.806zm3.374 8.232c-.144.405-.837.774-1.17.822-.312.043-.687.069-2.221-.568-1.745-.726-2.883-2.497-2.97-2.613-.087-.116-.708-.941-.708-1.794 0-.852.449-1.272.608-1.446.16-.174.348-.217.464-.217.116 0 .232.001.333.006.107.005.249-.041.39.298.145.348.493 1.202.536 1.289.043.087.072.188.014.304-.058.116-.087.188-.174.29-.087.101-.184.227-.263.305-.088.087-.18.182-.077.359.102.176.452.746.97 1.207.669.596 1.233.781 1.407.868.174.087.275.072.377-.043.101-.116.435-.507.551-.681.116-.174.232-.145.391-.087.159.058 1.014.478 1.188.565.174.087.29.13.333.203.043.073.043.42-.101.825z"/>
            </svg>
          </div>
          <span className="text-xs font-semibold pr-1 hidden sm:inline">Pharmacist WhatsApp</span>
        </button>
      )}

      {/* Expanded Interactive Chat Modal */}
      {isWhatsAppOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-80 sm:w-96 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                +
              </div>
              <div>
                <h4 className="text-sm font-semibold leading-tight">{globalSettings.storeName} Support</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block" />
                  Pharmacist Available (Instant Reply)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsWhatsAppOpen(false)}
              className="text-emerald-100 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Help Prompts */}
          <div className="p-4 bg-slate-50 space-y-2 border-b border-slate-100 text-xs">
            <p className="text-slate-500 text-[11px] font-medium">Frequently Requested Assistance:</p>
            <div className="space-y-1.5">
              <button
                onClick={() => handleQuickPrompt('Hi, I want to send my doctor prescription for review.', 'upload-prescription')}
                className="w-full text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-800 transition-colors flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Upload / Send Prescription</span>
              </button>

              <button
                onClick={() => handleQuickPrompt('Hi, can you help me track my recent order?', 'account')}
                className="w-full text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-800 transition-colors flex items-center gap-2"
              >
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Track My Active Order</span>
              </button>

              <button
                onClick={() => handleQuickPrompt('Hello, I have a question about dosage and side effects for my medication.')}
                className="w-full text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-800 transition-colors flex items-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ask Pharmacist About Medicine Dosage</span>
              </button>
            </div>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white flex items-center gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message to pharmacist..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
            <button
              type="submit"
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-xs"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Pharmacist hours */}
          <div className="bg-slate-50 px-3 py-1.5 text-center text-[10px] text-slate-400 border-t border-slate-100">
            Dispensary WhatsApp: {globalSettings.whatsappNumber} · Mon-Sun
          </div>
        </div>
      )}
    </div>
  );
};
