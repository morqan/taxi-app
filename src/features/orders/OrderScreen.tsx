import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useCreateOrderMutation, useGetTariffsQuery } from '@/features/orders/ordersApi';
import type { RootStackParamList } from '@/navigation/types';

// Заглушка маршрута: реальные адреса появятся на Ф6 (карта/геокодинг).
const DEMO_START = 'Qara Qarayev 56';
const DEMO_END = 'Süleyman Rəhimov 3/12';

export function OrderScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { data: tariffs = [] } = useGetTariffsQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleOrder = async (tariffId: string) => {
    // Серверная мутация создаёт заказ и возвращает id — по нему переходим на экран водителя.
    const order = await createOrder({
      startPlace: DEMO_START,
      endPlace: DEMO_END,
      tariffId,
    }).unwrap();
    navigation.navigate('DriverOrder', { orderId: order.id });
  };

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">{t('order.title')}</Text>
      <Text className="mb-3 text-sm text-muted">
        {DEMO_START} → {DEMO_END}
      </Text>
      <View className="gap-3">
        {tariffs.map((tariff) => (
          <Pressable
            key={tariff.id}
            disabled={isLoading}
            onPress={() => {
              void handleOrder(tariff.id);
            }}
          >
            <Card>
              <Text className="text-base font-medium text-text">{tariff.type}</Text>
              <Text className="text-sm text-muted">
                {tariff.basePrice} {tariff.currency} + {tariff.pricePerKm}
                {t('order.perKm')}
              </Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
