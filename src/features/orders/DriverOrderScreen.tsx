import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import type { OrderStatus } from '@/api/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useCancelOrderMutation, useGetOrderQuery } from '@/features/orders/ordersApi';
import type { RootStackParamList } from '@/navigation/types';

// Сопоставление статуса заказа с i18n-ключом подписи.
// Само значение статуса — это данные сервера (enum), а человекочитаемая
// подпись локализуется, поэтому держим тут ключи, а не литералы.
const STATUS_LABEL_KEYS: Record<OrderStatus, string> = {
  searching: 'driverOrder.statusLabels.searching',
  accepted: 'driverOrder.statusLabels.accepted',
  in_progress: 'driverOrder.statusLabels.inProgress',
  completed: 'driverOrder.statusLabels.completed',
  cancelled: 'driverOrder.statusLabels.cancelled',
};

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

  // RTK Query вернул ошибку загрузки либо заказ не найден — показываем заглушку
  if (isError || !order) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-muted">{t('driverOrder.notFound')}</Text>
        </View>
      </Screen>
    );
  }

  const driver = order.driver;
  const canRate = order.status === 'completed';

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">{t('driverOrder.title')}</Text>

      <Card className="mb-3">
        <Text className="text-sm text-muted">{t('driverOrder.route')}</Text>
        {/* startPlace / endPlace — реальные адреса Баку, это контент, не локализуем */}
        <Text className="text-base font-medium text-text">{order.startPlace}</Text>
        <Text className="text-base font-medium text-text">→ {order.endPlace}</Text>
      </Card>

      <Card className="mb-3 flex-row justify-between">
        <View>
          <Text className="text-sm text-muted">{t('driverOrder.status')}</Text>
          <Text className="text-base font-medium text-text">
            {t(STATUS_LABEL_KEYS[order.status])}
          </Text>
        </View>
        <View>
          <Text className="text-sm text-muted">{t('driverOrder.price')}</Text>
          {/* price + currency (AZN) — данные заказа, остаются как есть */}
          <Text className="text-base font-medium text-text">
            {order.price} {order.currency}
          </Text>
        </View>
      </Card>

      {driver ? (
        <Card className="mb-6">
          <Text className="text-sm text-muted">{t('driverOrder.driver')}</Text>
          {/* Имя, модель/номер машины, рейтинг, телефон — контент, не переводим */}
          <Text className="text-lg font-medium text-text">{driver.name}</Text>
          <Text className="text-sm text-muted">
            {driver.carModel} · {driver.carPlate}
          </Text>
          <Text className="text-sm text-muted">★ {driver.rating}</Text>
          <Text className="text-sm text-muted">{driver.phone}</Text>
        </Card>
      ) : (
        <Card className="mb-6">
          <Text className="text-sm text-muted">{t('driverOrder.driverSearching')}</Text>
        </Card>
      )}

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
