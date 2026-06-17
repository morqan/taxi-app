import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { DriverCard } from '@/features/orders/components/DriverCard';
import { OrderInfoCards } from '@/features/orders/components/OrderInfoCards';
import { useCancelOrderMutation, useGetOrderQuery } from '@/features/orders/ordersApi';
import type { RootStackParamList } from '@/navigation/types';

export function DriverOrderScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'DriverOrder'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  // orderId приходит из параметров навигации — по нему тянем заказ и шлём отмену
  const { orderId } = route.params;

  const { data: order, isLoading, isError } = useGetOrderQuery(orderId);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  if (isLoading) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </Screen>
    );
  }

  // RTK Query вернул ошибку либо заказ не найден — показываем заглушку
  if (isError || !order) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-muted">{t('driverOrder.notFound')}</Text>
        </View>
      </Screen>
    );
  }

  const canRate = order.status === 'completed';

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">{t('driverOrder.title')}</Text>
      <OrderInfoCards order={order} />
      <DriverCard driver={order.driver} />

      <View className="gap-3">
        {canRate ? (
          <Button
            title={t('driverOrder.rate')}
            variant="primary"
            onPress={() => navigation.navigate('Ratings', { orderId })}
          />
        ) : (
          <Button
            title={t('driverOrder.cancel')}
            variant="danger"
            disabled={isCancelling}
            onPress={() => {
              // Отмена заказа — мутация RTK Query, принимает orderId
              void cancelOrder(orderId);
            }}
          />
        )}
      </View>
    </Screen>
  );
}
