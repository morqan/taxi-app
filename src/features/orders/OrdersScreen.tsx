import { FlatList, Text } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useGetOrdersQuery } from '@/features/orders/ordersApi';

export function OrdersScreen() {
  const { data: orders = [] } = useGetOrdersQuery();

  return (
    <Screen>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.id}
        ListHeaderComponent={<Text className="py-4 text-2xl font-medium text-text">Tarix</Text>}
        renderItem={({ item }) => (
          <Card className="mb-3">
            <Text className="text-base text-text">
              {item.startPlace} → {item.endPlace}
            </Text>
            <Text className="text-sm text-muted">
              {item.price} {item.currency} · {item.type}
            </Text>
          </Card>
        )}
      />
    </Screen>
  );
}
