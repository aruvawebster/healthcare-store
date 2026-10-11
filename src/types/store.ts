export type ProductCategory = 
  | 'prescription-medicines'
  | 'vitamins-supplements'
  | 'health-devices'
  | 'personal-care'
  | 'baby-mother';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  requiresPrescription: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  shortDescription: string;
  description: string;
  activeIngredients: string;
  dosageUsage: string;
  precautions: string;
  brand: string;
  packageSize: string;
  sku: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  requiresPrescription: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Order Placed' | 'Pharmacist Review' | 'Packed' | 'Out for Delivery' | 'Delivered';
  paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending';
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  prescriptionFile?: string;
  trackingNumber: string;
}

export interface PrescriptionSubmission {
  id: string;
  date: string;
  patientName: string;
  patientAge: string;
  phone: string;
  notes: string;
  deliveryPincode: string;
  fileName: string;
  fileSize: string;
  status: 'Pending Pharmacist Review' | 'Verified - Processing' | 'Medicines Added to Cart';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
  experienceYears: number;
  opdTimings: string;
  consultationFee: number;
  roomNumber: string;
  image: string;
  availableDays: string;
  about: string;
  rating: number;
}

export interface DoctorAppointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  patientName: string;
  patientPhone: string;
  patientAge: string;
  appointmentDate: string;
  timeSlot: string;
  symptoms: string;
  tokenNumber: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface DoctorAd {
  id: string;
  title: string;
  subtitle: string;
  doctorName: string;
  specialty: string;
  scheduleText: string;
  venue: string;
  badge: string;
  image: string;
  phone: string;
}

export interface PromoMedicineCampaign {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  promoCode: string;
  discountPercentage: number;
  validUntil: string;
  featuredProductName: string;
  featuredProductPrice: number;
  featuredProductOriginalPrice: number;
  image: string;
}

export interface GlobalSiteSettings {
  storeName: string;
  tagline: string;
  city: string;
  state: string;
  district: string;
  pincode: string;
  country: string;
  drugLicenseNumber: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  storeAddress: string;
  storeTimings: string;
  primaryColor: string; // e.g. '#0d9488' (teal-600)
  primaryColorName: 'teal' | 'emerald' | 'blue' | 'cyan' | 'indigo';
  fontFamily: 'Plus Jakarta Sans' | 'Outfit' | 'Inter';
  borderRadius: 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  heroHeadline: string;
  heroSubheadline: string;
  promoBannerText: string;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type PageId = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart-checkout'
  | 'upload-prescription'
  | 'about-contact'
  | 'policies'
  | 'account';
