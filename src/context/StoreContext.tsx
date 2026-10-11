import React, { createContext, useContext, useState } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  PrescriptionSubmission, 
  GlobalSiteSettings, 
  PageId, 
  ViewportMode,
  ProductCategory,
  Doctor,
  DoctorAppointment,
  DoctorAd,
  PromoMedicineCampaign
} from '../types/store';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_GLOBAL_SETTINGS, 
  INITIAL_DOCTORS, 
  INITIAL_DOCTOR_ADS, 
  INITIAL_PROMO_CAMPAIGNS 
} from '../data/initialData';

interface StoreContextType {
  // Navigation & Page State
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  viewProduct: (product: Product) => void;

  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Doctors & Appointments
  doctors: Doctor[];
  selectedDoctorForBooking: Doctor | null;
  setSelectedDoctorForBooking: (doctor: Doctor | null) => void;
  appointments: DoctorAppointment[];
  bookAppointment: (data: Omit<DoctorAppointment, 'id' | 'tokenNumber' | 'status' | 'createdAt'>) => DoctorAppointment;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;

  // Doctor Ads & Promotional Medicine Campaigns
  doctorAds: DoctorAd[];
  promoCampaigns: PromoMedicineCampaign[];
  updatePromoCampaign: (campaign: PromoMedicineCampaign) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  hasPrescriptionRequiredItems: boolean;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'status'>) => Order;
  selectedOrderForTracking: Order | null;
  setSelectedOrderForTracking: (order: Order | null) => void;
  trackOrderById: (id: string) => Order | null;

  // Prescriptions
  prescriptions: PrescriptionSubmission[];
  submitPrescription: (data: Omit<PrescriptionSubmission, 'id' | 'date' | 'status'>) => PrescriptionSubmission;

  // Pincode & Delivery
  pincode: string;
  setPincode: (pin: string) => void;
  pincodeStatus: { checked: boolean; serviceable: boolean; message: string; estimatedDays: string };
  checkPincode: (pin: string) => void;

  // Search & Modals
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isWhatsAppOpen: boolean;
  setIsWhatsAppOpen: (open: boolean) => void;

  // Toast Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Elementor & Customization Engine
  globalSettings: GlobalSiteSettings;
  updateGlobalSettings: (partial: Partial<GlobalSiteSettings>) => void;
  resetGlobalSettings: () => void;
  isElementorEditing: boolean;
  setIsElementorEditing: (editing: boolean) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  isGlobalSettingsOpen: boolean;
  setIsGlobalSettingsOpen: (open: boolean) => void;
  isThemeBuilderOpen: boolean;
  setIsThemeBuilderOpen: (open: boolean) => void;
  isWooCommerceManagerOpen: boolean;
  setIsWooCommerceManagerOpen: (open: boolean) => void;
  activeTemplateTab: 'header' | 'footer' | 'product-card' | 'single-product' | 'shop-archive';
  setActiveTemplateTab: (tab: 'header' | 'footer' | 'product-card' | 'single-product' | 'shop-archive') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_ORDERS: Order[] = [
  {
    id: 'NM-ORD-8924',
    date: 'Yesterday, 14:32',
    items: [
      {
        productId: 'prod-1',
        productName: "Nature's Harvest Organic Daily Multivitamin",
        price: 24.50,
        quantity: 1,
        image: '/src/assets/images/product_herbal_supplements_1791657433673.jpg',
        requiresPrescription: false
      },
      {
        productId: 'prod-4',
        productName: 'AmoxiClav 625mg Antibiotic Tablets',
        price: 18.20,
        quantity: 2,
        image: '/src/assets/images/prescription_upload_hero_1791657467081.jpg',
        requiresPrescription: true
      }
    ],
    subtotal: 60.90,
    deliveryFee: 0,
    total: 60.90,
    status: 'Out for Delivery',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    shippingAddress: {
      fullName: 'Sunil Kumar Agrawal',
      phone: '7354260555',
      address: 'Near Clock Tower, Gandhi Chowk',
      city: 'Ambikapur, Sarguja',
      pincode: '49001'
    },
    prescriptionFile: 'dr_rajesh_gupta_prescription_nov.jpg',
    trackingNumber: 'NISHANT-TRK-749210'
  },
  {
    id: 'NM-ORD-7612',
    date: 'Oct 04, 2026',
    items: [
      {
        productId: 'prod-2',
        productName: 'ProCheck Digital Upper Arm Blood Pressure Monitor',
        price: 49.99,
        quantity: 1,
        image: '/src/assets/images/product_digital_bp_monitor_1791657445045.jpg',
        requiresPrescription: false
      }
    ],
    subtotal: 49.99,
    deliveryFee: 0,
    total: 49.99,
    status: 'Delivered',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    shippingAddress: {
      fullName: 'Kavita Singh',
      phone: '98261 44321',
      address: 'House #42, Ring Road, Near Stadium',
      city: 'Ambikapur',
      pincode: '49001'
    },
    trackingNumber: 'NISHANT-TRK-581903'
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1
    }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-2', 'prod-7']);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(INITIAL_ORDERS[0]);
  
  // Doctors & Appointments
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([
    {
      id: 'APT-104',
      doctorId: 'doc-1',
      doctorName: 'Dr. Rajesh Gupta',
      specialty: 'Senior Consultant Physician',
      patientName: 'Sunil Agrawal',
      patientPhone: '7354260555',
      patientAge: '52',
      appointmentDate: 'Tomorrow',
      timeSlot: '11:30 AM',
      symptoms: 'Routine Diabetes blood glucose check & BP review',
      tokenNumber: 4,
      status: 'Confirmed',
      createdAt: 'Today, 09:30 AM'
    }
  ]);

  // Doctor Ads & Promo Campaigns
  const [doctorAds, setDoctorAds] = useState<DoctorAd[]>(INITIAL_DOCTOR_ADS);
  const [promoCampaigns, setPromoCampaigns] = useState<PromoMedicineCampaign[]>(INITIAL_PROMO_CAMPAIGNS);

  const [prescriptions, setPrescriptions] = useState<PrescriptionSubmission[]>([
    {
      id: 'RX-1049',
      date: 'Today, 10:15 AM',
      patientName: 'Ramprasad Jaiswal (Age 64)',
      patientAge: '64',
      phone: '7354260555',
      notes: 'Need monthly refill of Telmisartan 40mg and Glucophage Metformin 500mg SR at Deviganj Road store.',
      deliveryPincode: '49001',
      fileName: 'dr_rajesh_gupta_prescription_cardiology.jpg',
      fileSize: '1.8 MB',
      status: 'Verified - Processing'
    }
  ]);

  const [pincode, setPincode] = useState<string>('49001');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    serviceable: boolean;
    message: string;
    estimatedDays: string;
  }>({
    checked: true,
    serviceable: true,
    message: 'Express Doorstep Delivery Available in Ambikapur & Sarguja (Within 2-4 Hours)',
    estimatedDays: 'Same-Day Local Delivery'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Elementor Visual Builder & Site Customization
  const [globalSettings, setGlobalSettings] = useState<GlobalSiteSettings>(INITIAL_GLOBAL_SETTINGS);
  const [isElementorEditing, setIsElementorEditing] = useState(false);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [isGlobalSettingsOpen, setIsGlobalSettingsOpen] = useState(false);
  const [isThemeBuilderOpen, setIsThemeBuilderOpen] = useState(false);
  const [isWooCommerceManagerOpen, setIsWooCommerceManagerOpen] = useState(false);
  const [activeTemplateTab, setActiveTemplateTab] = useState<'header' | 'footer' | 'product-card' | 'single-product' | 'shop-archive'>('header');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const updateGlobalSettings = (partial: Partial<GlobalSiteSettings>) => {
    setGlobalSettings(prev => ({ ...prev, ...partial }));
    showToast('Nishant Medicos Site Settings saved successfully');
  };

  const resetGlobalSettings = () => {
    setGlobalSettings(INITIAL_GLOBAL_SETTINGS);
    showToast('Reset to default Nishant Medicos settings');
  };

  const updatePromoCampaign = (updated: PromoMedicineCampaign) => {
    setPromoCampaigns(prev => prev.map(c => c.id === updated.id ? updated : c));
    showToast(`Updated medicine promotion "${updated.title}"`);
  };

  const bookAppointment = (data: Omit<DoctorAppointment, 'id' | 'tokenNumber' | 'status' | 'createdAt'>) => {
    const nextToken = appointments.filter(a => a.doctorId === data.doctorId).length + 1;
    const newId = `APT-${Math.floor(100 + Math.random() * 900)}`;
    const newAppointment: DoctorAppointment = {
      ...data,
      id: newId,
      tokenNumber: nextToken,
      status: 'Confirmed',
      createdAt: 'Just now'
    };
    setAppointments(prev => [newAppointment, ...prev]);
    showToast(`Appointment booked! Token #${nextToken} allocated for ${data.doctorName}`);
    return newAppointment;
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to bag`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeDeliveryThreshold = 30.00;
  const deliveryFee = cartSubtotal >= freeDeliveryThreshold || cartSubtotal === 0 ? 0 : 3.50;
  const cartTotal = cartSubtotal + deliveryFee;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const hasPrescriptionRequiredItems = cart.some(
    item => item.product.requiresPrescription
  );

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'status'>) => {
    const newId = `NM-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTracking = `NISHANT-TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      ...orderData,
      id: newId,
      date: 'Just now',
      trackingNumber: newTracking,
      status: orderData.prescriptionFile ? 'Pharmacist Review' : 'Order Placed'
    };

    setOrders(prev => [newOrder, ...prev]);
    setSelectedOrderForTracking(newOrder);
    clearCart();
    showToast(`Order ${newId} confirmed! Our team will dispatch to Ambikapur.`);
    return newOrder;
  };

  const trackOrderById = (id: string) => {
    const cleaned = id.trim().toUpperCase();
    const found = orders.find(
      o => o.id.toUpperCase() === cleaned || o.trackingNumber.toUpperCase() === cleaned
    );
    if (found) {
      setSelectedOrderForTracking(found);
      return found;
    }
    return null;
  };

  // Prescription Submission
  const submitPrescription = (data: Omit<PrescriptionSubmission, 'id' | 'date' | 'status'>) => {
    const newId = `NM-RX-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry: PrescriptionSubmission = {
      ...data,
      id: newId,
      date: 'Just now',
      status: 'Pending Pharmacist Review'
    };
    setPrescriptions(prev => [newEntry, ...prev]);
    showToast('Prescription received at Nishant Medicos, Deviganj Road!');
    return newEntry;
  };

  // Pincode checker
  const checkPincode = (pin: string) => {
    setPincode(pin);
    const cleaned = pin.trim();
    if (!cleaned || cleaned.length < 4) {
      setPincodeStatus({
        checked: true,
        serviceable: false,
        message: 'Please enter a valid postal pincode (e.g. 49001 / 497001).',
        estimatedDays: 'N/A'
      });
      return;
    }

    if (cleaned === '49001' || cleaned === '497001' || cleaned.startsWith('497') || cleaned.startsWith('49')) {
      setPincodeStatus({
        checked: true,
        serviceable: true,
        message: `Express Local Delivery to ${cleaned} (Ambikapur / Sarguja District within 2-4 Hours)`,
        estimatedDays: 'Same-Day Express Dispatch'
      });
      showToast(`Pincode ${cleaned} is eligible for express local dispatch from Deviganj Road!`);
    } else {
      setPincodeStatus({
        checked: true,
        serviceable: true,
        message: `Standard Courier Delivery Available to ${cleaned}`,
        estimatedDays: '2-3 Business Days'
      });
      showToast(`Delivery available for ${cleaned} (2-3 business days)`);
    }
  };

  // Product management for WooCommerce modal
  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated`);
  };

  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added to catalog`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from catalog');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        selectedCategory,
        setSelectedCategory,
        viewProduct,
        products,
        setProducts,
        updateProduct,
        addProduct,
        deleteProduct,
        doctors,
        selectedDoctorForBooking,
        setSelectedDoctorForBooking,
        appointments,
        bookAppointment,
        isBookingModalOpen,
        setIsBookingModalOpen,
        doctorAds,
        promoCampaigns,
        updatePromoCampaign,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        deliveryFee,
        freeDeliveryThreshold,
        hasPrescriptionRequiredItems,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        selectedOrderForTracking,
        setSelectedOrderForTracking,
        trackOrderById,
        prescriptions,
        submitPrescription,
        pincode,
        setPincode,
        pincodeStatus,
        checkPincode,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isWhatsAppOpen,
        setIsWhatsAppOpen,
        toastMessage,
        showToast,
        globalSettings,
        updateGlobalSettings,
        resetGlobalSettings,
        isElementorEditing,
        setIsElementorEditing,
        viewportMode,
        setViewportMode,
        isGlobalSettingsOpen,
        setIsGlobalSettingsOpen,
        isThemeBuilderOpen,
        setIsThemeBuilderOpen,
        isWooCommerceManagerOpen,
        setIsWooCommerceManagerOpen,
        activeTemplateTab,
        setActiveTemplateTab
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
