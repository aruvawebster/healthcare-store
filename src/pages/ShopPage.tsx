import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Check, 
  ShoppingBag, 
  FileText 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES_DATA } from '../data/initialData';
import { ProductCategory } from '../types/store';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory 
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [filterRxOnly, setFilterRxOnly] = useState<boolean | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(70);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand)));
    return ['all', ...list];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Rx filter
      if (filterRxOnly !== null) {
        if (filterRxOnly === true && !p.requiresPrescription) return false;
        if (filterRxOnly === false && p.requiresPrescription) return false;
      }
      // Price filter
      if (p.price > maxPrice) return false;
      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, filterRxOnly, maxPrice, selectedBrand, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setFilterRxOnly(null);
    setMaxPrice(70);
    setSelectedBrand('all');
    setSortBy('featured');
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-slate-500 mb-1">
          <span>Home</span> <span className="text-slate-300">/</span> <span className="text-slate-900 font-medium">Dispensary Shop</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Healthcare Catalog & Medicines
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {filteredProducts.length} certified healthcare items
            </p>
          </div>

          {/* Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            >
              <Filter className="w-4 h-4 text-teal-600" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className={`lg:col-span-1 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm">Filter Products</span>
              <button
                onClick={resetFilters}
                className="text-xs text-teal-700 hover:text-teal-800 font-medium"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Categories
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-teal-50 text-teal-800 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Healthcare Products</span>
                  <span className="text-slate-400 font-mono text-[10px]">{products.length}</span>
                </button>

                {CATEGORIES_DATA.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-teal-50 text-teal-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prescription vs OTC Filter */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Prescription Type
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setFilterRxOnly(null)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    filterRxOnly === null ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Types (Rx + OTC)</span>
                </button>
                <button
                  onClick={() => setFilterRxOnly(true)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    filterRxOnly === true ? 'bg-rose-50 text-rose-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-rose-600" />
                    <span>Prescription Only (Rx)</span>
                  </span>
                </button>
                <button
                  onClick={() => setFilterRxOnly(false)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    filterRxOnly === false ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Over The Counter (OTC)</span>
                </button>
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider">
                  Max Price
                </h4>
                <span className="font-semibold text-slate-900 tabular-nums">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={maxPrice}
                onChange={e => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>$10</span>
                <span>$70</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Manufacturer / Brand
              </h4>
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none"
              >
                {brands.map(b => (
                  <option key={b} value={b}>
                    {b === 'all' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">No matching products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range or clearing category and brand filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
