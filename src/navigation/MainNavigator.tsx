import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.line },
        headerTintColor: '#FFFFFF',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="Balance"
        component={BalanceScreen}
        options={{ title: t('balance.title') }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
        options={{ title: t('payments.title') }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{ title: t('addCard.title') }}
      />
      <Stack.Screen name="Promo" component={PromoScreen} options={{ title: t('promo.title') }} />
      <Stack.Screen name="News" component={NewsScreen} options={{ title: t('news.title') }} />
      <Stack.Screen
        name="CountryPicker"
        component={CountryPickerScreen}
        options={{ title: t('country.title') }}
      />
      <Stack.Screen
        name="DriverOrder"
        component={DriverOrderScreen}
        options={{ title: t('driverOrder.title') }}
      />
      <Stack.Screen
        name="Ratings"
        component={RatingsScreen}
        options={{ title: t('ratings.title') }}
      />
    </Stack.Navigator>
  );
}
