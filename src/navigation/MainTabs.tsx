import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { OrderScreen } from '@/features/orders/OrderScreen';
import { OrdersScreen } from '@/features/orders/OrdersScreen';
import { ProfileScreen } from '@/features/profile/ProfileScreen';
import { colors } from '@/theme/colors';

import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.line },
        headerTintColor: '#FFFFFF',
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
      }}
    >
      <Tab.Screen name="OrderTab" component={OrderScreen} options={{ title: 'Sifariş' }} />
      <Tab.Screen name="OrdersTab" component={OrdersScreen} options={{ title: 'Tarix' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}
