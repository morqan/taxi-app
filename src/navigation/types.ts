import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  OrderTab: undefined;
  OrdersTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Balance: undefined;
  PaymentMethod: undefined;
  AddCard: undefined;
  Promo: undefined;
  News: undefined;
  CountryPicker: undefined;
  DriverOrder: { orderId: string };
  Ratings: { orderId: string };
};
