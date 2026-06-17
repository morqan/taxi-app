import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  OrderTab: undefined;
  OrdersTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
};
