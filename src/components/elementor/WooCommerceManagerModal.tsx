import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Package, 
  FileText, 
  CheckCircle, 
  Clock, 
  Truck, 
  AlertCircle, 
  Search, 
  DollarSign, 
  Edit3, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types/store';

export const WooCommerceManagerModal: React.FC = () => {
  const { 
    isWooCommerceManagerOpen, 
    setIsWooCommerceManagerOpen, 
    products, 
    updateProduct, 
    orders, 
    prescriptions,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'prescriptions'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!isWooCommerceManagerOpen) return null;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold leading-tight">WooCommerce Store Manager</h2>
              <p className="text-xs text-slate-300">Products Inventory, Orders & Prescription Verification</p>
            </div>
          </div>
          <button
            onClick={() => setIsWooCommerceManagerOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 text-xs">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'products'
                ? 'border-amber-600 text-amber-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'orders'
                ? 'border-amber-600 text-amber-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`py-3 px-4 font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'prescriptions'
                ? 'border-amber-600 text-amber-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Prescriptions Queue ({prescriptions.length})</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products by name or category..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="text-slate-500">
                  Showing {filteredProducts.length} items
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Rx Required</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3 text-right">Quick Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 flex items-center gap-2.5">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-md border border-slate-200 shrink-0 bg-slate-100"
                          />
                          <div>
                            <div className="font-semibold text-slate-900 line-clamp-1">{p.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">SKU: {p.sku}</div>
                          </div>
                        </td>
                        <td className="p-3 text-slate-600">{p.categoryName}</td>
                        <td className="p-3 font-semibold text-slate-900">${p.price.toFixed(2)}</td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              updateProduct({ ...p, requiresPrescription: !p.requiresPrescription });
                            }}
                            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                              p.requiresPrescription
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {p.requiresPrescription ? 'Rx Required' : 'OTC / Open'}
                          </button>
                        </td>
                        <td className="p-3 text-slate-700">
                          {p.stockCount} units
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded"
                            title="Edit Product Details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {editingProduct && (
                <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-950">Editing: {editingProduct.name}</span>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="text-slate-400 hover:text-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Price ($)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editingProduct.price}
                        onChange={e =>
                          setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Stock Count</label>
                      <input
                        type="number"
                        value={editingProduct.stockCount}
                        onChange={e =>
                          setEditingProduct({ ...editingProduct, stockCount: parseInt(e.target.value) || 0 })
                        }
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Package Size</label>
                      <input
                        type="text"
                        value={editingProduct.packageSize}
                        onChange={e =>
                          setEditingProduct({ ...editingProduct, packageSize: e.target.value })
                        }
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      updateProduct(editingProduct);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium"
                  >
                    Save Product
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-4 border border-slate-200 rounded-xl bg-white space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{order.id}</span>
                      <span className="text-slate-500 ml-2">Placed: {order.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">${order.total.toFixed(2)}</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-teal-100 text-teal-800">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-slate-600">
                    <p className="font-medium text-slate-800">Customer: {order.shippingAddress.fullName} ({order.shippingAddress.phone})</p>
                    <p>{order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Payment: {order.paymentMethod} ({order.paymentStatus})</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-slate-500 text-[11px]">
                      Items: {order.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">{order.trackingNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              {prescriptions.map(rx => (
                <div key={rx.id} className="p-4 border border-slate-200 rounded-xl bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{rx.id}</span>
                      <span className="text-slate-500 ml-2">{rx.date}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-amber-100 text-amber-800">
                      {rx.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <p><strong className="text-slate-900">Patient:</strong> {rx.patientName}</p>
                      <p><strong className="text-slate-900">Phone:</strong> {rx.phone}</p>
                      <p><strong className="text-slate-900">Pincode:</strong> {rx.deliveryPincode}</p>
                    </div>
                    <div>
                      <p><strong className="text-slate-900">Prescription File:</strong> {rx.fileName} ({rx.fileSize})</p>
                      <p><strong className="text-slate-900">Patient Notes:</strong> {rx.notes || 'None'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => showToast(`Prescription ${rx.id} approved by Pharmacist!`)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium transition-colors"
                    >
                      Approve & Dispatch Order
                    </button>
                    <button
                      onClick={() => showToast(`Requested patient call for ${rx.id}`)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium transition-colors"
                    >
                      Request Clarification
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={() => setIsWooCommerceManagerOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
