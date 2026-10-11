import React, { useState } from 'react';
import { Search, X, ShoppingBag, FileText, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    viewProduct, 
    setCurrentPage, 
    setSelectedCategory 
  } = useStore();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          p.activeIngredients.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (prod: any) => {
    viewProduct(prod);
    setIsSearchOpen(false);
  };

  const handleSelectCategory = (catId: any) => {
    setSelectedCategory(catId);
    setCurrentPage('shop');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search input bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-teal-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search medicines, active ingredients, health devices..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search body */}
        <div className="p-4 overflow-y-auto flex-1 text-xs">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                Popular Healthcare Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Blood Pressure Monitor',
                  'Vitamin D3',
                  'Metformin',
                  'First Aid Kit',
                  'Amoxicillin',
                  'Ceramide Cream'
                ].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] mb-2">
                  Browse by Category
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSelectCategory('prescription-medicines')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-teal-500 text-left hover:bg-teal-50/40 transition-colors"
                  >
                    <div className="font-semibold text-slate-900">Prescription Medicines</div>
                    <div className="text-[11px] text-slate-500">Antibiotics, cardiac & diabetic care</div>
                  </button>
                  <button
                    onClick={() => handleSelectCategory('vitamins-supplements')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-teal-500 text-left hover:bg-teal-50/40 transition-colors"
                  >
                    <div className="font-semibold text-slate-900">Vitamins & Supplements</div>
                    <div className="text-[11px] text-slate-500">Immunity, organic multivitamins</div>
                  </button>
                  <button
                    onClick={() => handleSelectCategory('health-devices')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-teal-500 text-left hover:bg-teal-50/40 transition-colors"
                  >
                    <div className="font-semibold text-slate-900">Health Devices</div>
                    <div className="text-[11px] text-slate-500">BP monitors, oximeters, first aid</div>
                  </button>
                  <button
                    onClick={() => handleSelectCategory('baby-mother')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-teal-500 text-left hover:bg-teal-50/40 transition-colors"
                  >
                    <div className="font-semibold text-slate-900">Baby & Mother Care</div>
                    <div className="text-[11px] text-slate-500">Gentle pediatric & maternal care</div>
                  </button>
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="font-medium text-slate-800">No products found for "{query}"</p>
              <p className="text-slate-500 text-[11px]">
                Need a specific medicine not in our online catalog? Upload your prescription and our pharmacists will source it.
              </p>
              <button
                onClick={() => {
                  setCurrentPage('upload-prescription');
                  setIsSearchOpen(false);
                }}
                className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium"
              >
                Upload Prescription Instead
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-slate-400 font-medium text-[11px] mb-2">
                Found {results.length} results:
              </div>
              {results.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/30 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 object-cover rounded-lg border border-slate-100 bg-slate-50"
                    />
                    <div>
                      <div className="font-semibold text-slate-900 line-clamp-1">{prod.name}</div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-2">
                        <span>{prod.categoryName}</span>
                        {prod.requiresPrescription && (
                          <span className="text-rose-600 font-medium">· Rx Required</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 tabular-nums">${prod.price.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
