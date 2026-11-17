export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  image: string;
  badge?: string; // 'Más Vendido' | 'Recomendado' | 'Nuevo' | 'Especial'
  available: boolean;
  calories?: string;
  options?: {
    name: string;
    choices: string[];
  }[];
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  order: number;
  active: boolean;
}

export interface BusinessConfig {
  name: string;
  slogan: string;
  logo: string;
  phone: string;
  whatsapp: string; // digits only e.g. 573101234567
  address: string;
  city: string;
  openingHours: string;
  isOpen: boolean;
  currency: string;
  currencySymbol: string;
  deliveryFee: number;
  minOrder: number;
  estimatedDeliveryTime: string;
  paymentMethods: string[];
  social: {
    instagram?: string;
    facebook?: string;
    zesto?: string;
  };
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  googleAnalyticsId: string;
  googleAdsId: string;
  facebookPixelId: string;
  conversionEventName: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  link: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedDoneness?: string;
  extras?: string[];
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'takeaway' | 'dinein';
  deliveryAddress: string;
  paymentMethod: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    notes?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  status: 'pendiente' | 'preparando' | 'en_camino' | 'entregado' | 'cancelado';
}

export interface AppStoreData {
  config: BusinessConfig;
  seo: SeoConfig;
  promos: PromoBanner[];
  categories: Category[];
  products: Product[];
  orders: Order[];
}
