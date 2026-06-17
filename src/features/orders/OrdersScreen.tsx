import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, Text } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useGetOrdersQuery } from '@/features/orders/ordersApi';
import type { RootStackParamList } from '@/navigation/types';

export function OrdersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { data: orders = [] } = useGetOrdersQuery();

  return (
    <Screen>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.id}
        ListHeaderComponent={
          <Text className="py-4 text-2xl font-medium text-text">{t('history.title')}</Text>
        }
        renderItem={({ item }) => (
          // Передаём только id заказа в DriverOrder — экран сам дотянет детали через RTK Query
          <Pressable onPress={() => navigation.navigate('DriverOrder', { orderId: item.id })}>
            <Card className="mb-3">
              {/* startPlace/endPlace — это данные (адреса Баку), не переводим */}
              <Text className="text-base text-text">
                {item.startPlace} → {item.endPlace}
              </Text>
              <Text className="text-sm text-muted">
                {item.price} {item.currency} · {item.type}
              </Text>
            </Card>
          </Pressable>
        )}
      />
    </Screen>
  );
}
