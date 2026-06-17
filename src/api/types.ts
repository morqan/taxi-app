// Доменные DTO такси-приложения. Источник истины для RTK Query и MSW-моков.

export type Currency = 'AZN';

export type TariffType = 'Ekonom' | 'Komfort' | 'Biznes';

export type OrderStatus = 'searching' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  phone: string;
  avatarUrl: string | null;
  rating: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession extends AuthTokens {
  user: User;
}

export interface Tariff {
  id: string;
  type: TariffType;
  basePrice: number;
  pricePerKm: number;
  currency: Currency;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  carModel: string;
  carPlate: string;
  phone: string;
}

export interface Order {
  id: string;
  startPlace: string;
  endPlace: string;
  price: number;
  currency: Currency;
  type: TariffType;
  status: OrderStatus;
  createdAt: string;
  driver: Driver | null;
}

export type TransactionType = 'topup' | 'ride' | 'refund';

export interface Transaction {
  id: string;
  amount: number;
  currency: Currency;
  type: TransactionType;
  description: string;
  createdAt: string;
}

export interface Balance {
  amount: number;
  currency: Currency;
  transactions: Transaction[];
}

export type CardBrand = 'visa' | 'mastercard' | 'unknown';

export interface PaymentCard {
  id: string;
  brand: CardBrand;
  last4: string;
  isDefault: boolean;
}

export interface NewsItem {
  id: string;
  text: string;
  imageUrl: string | null;
  date: string;
}

export interface PromoResult {
  valid: boolean;
  discountPercent: number;
  message: string;
}

// --- Request bodies ---

export interface RequestOtpBody {
  phone: string;
}

export interface RequestOtpResponse {
  requestId: string;
}

export interface VerifyOtpBody {
  phone: string;
  code: string;
}

export interface UpdateProfileBody {
  name?: string;
  avatarUrl?: string | null;
}

export interface CreateOrderBody {
  startPlace: string;
  endPlace: string;
  tariffId: string;
}

export interface RateOrderArgs {
  id: string;
  stars: number;
  comment?: string;
}

/** Токен платёжного провайдера. Сырые PAN/CVC через наш слой НИКОГДА не проходят. */
export interface AddCardBody {
  token: string;
}

export interface ApplyPromoBody {
  code: string;
}
