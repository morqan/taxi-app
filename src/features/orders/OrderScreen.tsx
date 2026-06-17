import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import type { Place } from '@/features/geo/types';
import { WebMap } from '@/features/geo/WebMap';
import { useCreateOrderMutation, useGetTariffsQuery } from '@/features/orders/ordersApi';
import type { RootStackParamList } from '@/navigation/types';

// Заглушка маршрута: реальные адреса и координаты появятся при выборе точек на карте (геокодинг).
const DEMO_START = 'Qara Qarayev 56';
const DEMO_END = 'Süleyman Rəhimov 3/12';
const DEMO_PICKUP: Place = { label: DEMO_START, position: { lat: 40.4093, lng: 49.946 } };
const DEMO_DROPOFF: Place = { label: DEMO_END, position: { lat: 40.3777, lng: 49.8407 } };
const BAKU_CENTER = { lat: 40.3936, lng: 49.8932 };

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="py-4 text-2xl font-medium text-text">{t('order.title')}</Text>
        <WebMap center={BAKU_CENTER} markers={[DEMO_PICKUP, DEMO_DROPOFF]} />
        <Text className="mb-3 mt-3 text-sm text-muted">
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
      </ScrollView>
    </Screen>
  );
}
