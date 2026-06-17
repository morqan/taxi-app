import { Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useGetTariffsQuery } from '@/features/orders/ordersApi';

export function OrderScreen() {
  const { data: tariffs = [] } = useGetTariffsQuery();

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">Sifariş</Text>
      <View className="gap-3">
        {tariffs.map((tariff) => (
          <Card key={tariff.id}>
            <Text className="text-base font-medium text-text">{tariff.type}</Text>
            <Text className="text-sm text-muted">
              {tariff.basePrice} {tariff.currency} + {tariff.pricePerKm}/km
            </Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
