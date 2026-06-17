import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Text, View } from 'react-native';

import type { OrderStatus } from '@/api/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useCancelOrderMutation, useGetOrderQuery } from '@/features/orders/ordersApi';
import type { RootStackParamList } from '@/navigation/types';

const STATUS_LABELS: Record<OrderStatus, string> = {
  searching: 'Axtarılır',
  accepted: 'Qəbul edildi',
  in_progress: 'Yoldadır',
  completed: 'Tamamlandı',
  cancelled: 'Ləğv edildi',
};

export function DriverOrderScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'DriverOrder'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

  if (isError || !order) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-muted">Sifariş tapılmadı</Text>
        </View>
      </Screen>
    );
  }

  const driver = order.driver;
  const canRate = order.status === 'completed';

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">Sifariş</Text>

      <Card className="mb-3">
        <Text className="text-sm text-muted">Marşrut</Text>
        <Text className="text-base font-medium text-text">{order.startPlace}</Text>
        <Text className="text-base font-medium text-text">→ {order.endPlace}</Text>
      </Card>

      <Card className="mb-3 flex-row justify-between">
        <View>
          <Text className="text-sm text-muted">Status</Text>
          <Text className="text-base font-medium text-text">{STATUS_LABELS[order.status]}</Text>
        </View>
        <View>
          <Text className="text-sm text-muted">Qiymət</Text>
          <Text className="text-base font-medium text-text">
            {order.price} {order.currency}
          </Text>
        </View>
      </Card>

      {driver ? (
        <Card className="mb-6">
          <Text className="text-sm text-muted">Sürücü</Text>
          <Text className="text-lg font-medium text-text">{driver.name}</Text>
          <Text className="text-sm text-muted">
            {driver.carModel} · {driver.carPlate}
          </Text>
          <Text className="text-sm text-muted">★ {driver.rating}</Text>
          <Text className="text-sm text-muted">{driver.phone}</Text>
        </Card>
      ) : (
        <Card className="mb-6">
          <Text className="text-sm text-muted">Sürücü axtarılır…</Text>
        </Card>
      )}

      <View className="gap-3">
        {canRate ? (
          <Button
            title="Qiymətləndir"
            variant="primary"
            onPress={() => navigation.navigate('Ratings', { orderId })}
          />
        ) : (
          <Button
            title="Ləğv et"
            variant="danger"
            disabled={isCancelling}
            onPress={() => {
              void cancelOrder(orderId);
            }}
          />
        )}
      </View>
    </Screen>
  );
}
