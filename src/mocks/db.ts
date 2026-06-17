import type { Balance, Driver, NewsItem, Order, PaymentCard, Tariff, User } from '@/api/types';

const driver: Driver = {
  id: 'd1',
  name: 'Rəşad Məmmədov',
  rating: 4.8,
  carModel: 'Hyundai Sonata',
  carPlate: '90-AA-123',
  phone: '+994551112233',
};

// Мутабельное in-memory хранилище для MSW. Сид взят из старых App/Fixtures (адреса Баку, AZN).
export const db: {
  user: User;
  tariffs: Tariff[];
  orders: Order[];
  balance: Balance;
  cards: PaymentCard[];
  news: NewsItem[];
  driver: Driver;
} = {
  user: {
    id: 'u1',
    name: 'Əli Həsənli',
    phone: '+994501234567',
    avatarUrl: null,
    rating: 4.9,
  },
  tariffs: [
    { id: 't1', type: 'Ekonom', basePrice: 1.5, pricePerKm: 0.35, currency: 'AZN' },
    { id: 't2', type: 'Komfort', basePrice: 2.5, pricePerKm: 0.5, currency: 'AZN' },
    { id: 't3', type: 'Biznes', basePrice: 4, pricePerKm: 0.8, currency: 'AZN' },
  ],
  orders: [
    {
      id: '1',
      startPlace: 'Qara Qarayev 56',
      endPlace: 'Süleyman Rəhimov 3/12',
      price: 5,
      currency: 'AZN',
      type: 'Ekonom',
      status: 'completed',
      createdAt: '2026-06-15T09:12:00.000Z',
      driver,
    },
    {
      id: '2',
      startPlace: 'Süleyman Rəhimov 3/12',
      endPlace: 'Telnov 10',
      price: 7,
      currency: 'AZN',
      type: 'Komfort',
      status: 'completed',
      createdAt: '2026-06-16T18:30:00.000Z',
      driver,
    },
  ],
  balance: {
    amount: 12.5,
    currency: 'AZN',
    transactions: [
      {
        id: 'tr1',
        amount: 20,
        currency: 'AZN',
        type: 'topup',
        description: 'Balans artımı',
        createdAt: '2026-06-14T10:00:00.000Z',
      },
      {
        id: 'tr2',
        amount: -7.5,
        currency: 'AZN',
        type: 'ride',
        description: 'Sifariş #2',
        createdAt: '2026-06-16T18:55:00.000Z',
      },
    ],
  },
  cards: [{ id: 'c1', brand: 'visa', last4: '4242', isDefault: true }],
  news: [
    {
      id: '1',
      text: 'Yeni Komfort tarifi əlavə olundu — daha rahat səfərlər.',
      imageUrl: null,
      date: '2026-06-10',
    },
    {
      id: '2',
      text: 'TAXI2026 promokodu ilə ilk səfərə 15% endirim.',
      imageUrl: null,
      date: '2026-06-12',
    },
  ],
  driver,
};
