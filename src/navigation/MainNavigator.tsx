import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CountryPickerScreen } from '@/features/auth/CountryPickerScreen';
import { NewsScreen } from '@/features/news/NewsScreen';
import { DriverOrderScreen } from '@/features/orders/DriverOrderScreen';
import { RatingsScreen } from '@/features/orders/RatingsScreen';
import { AddCardScreen } from '@/features/payments/AddCardScreen';
import { PaymentMethodScreen } from '@/features/payments/PaymentMethodScreen';
import { BalanceScreen } from '@/features/profile/BalanceScreen';
import { PromoScreen } from '@/features/promo/PromoScreen';
import { colors } from '@/theme/colors';

import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.line },
        headerTintColor: '#FFFFFF',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Balance" component={BalanceScreen} options={{ title: 'Balans' }} />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
        options={{ title: 'Ödəniş üsulları' }}
      />
      <Stack.Screen name="AddCard" component={AddCardScreen} options={{ title: 'Kart əlavə et' }} />
      <Stack.Screen name="Promo" component={PromoScreen} options={{ title: 'Promokod' }} />
      <Stack.Screen name="News" component={NewsScreen} options={{ title: 'Xəbərlər' }} />
      <Stack.Screen
        name="CountryPicker"
        component={CountryPickerScreen}
        options={{ title: 'Ölkə kodu' }}
      />
      <Stack.Screen
        name="DriverOrder"
        component={DriverOrderScreen}
        options={{ title: 'Sifariş' }}
      />
      <Stack.Screen name="Ratings" component={RatingsScreen} options={{ title: 'Qiymətləndir' }} />
    </Stack.Navigator>
  );
}
