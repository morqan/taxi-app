import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useDeleteCardMutation, useGetCardsQuery } from '@/features/payments/paymentsApi';
import type { RootStackParamList } from '@/navigation/types';
import { colors } from '@/theme/colors';

export function PaymentMethodScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: cards = [], isLoading, isError } = useGetCardsQuery();
  const [deleteCard, { isLoading: isDeleting }] = useDeleteCardMutation();

  if (isLoading) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">Ödəniş üsulları</Text>

      {isError ? (
        <Text className="text-base text-danger">Kartları yükləmək mümkün olmadı</Text>
      ) : cards.length === 0 ? (
        <Text className="text-base text-muted">Əlavə edilmiş kart yoxdur</Text>
      ) : (
        <View className="gap-3">
          {cards.map((card) => (
            <Card key={card.id} className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-base font-medium text-text">•••• {card.last4}</Text>
                <Text className="text-sm text-muted">{card.brand}</Text>
                {card.isDefault ? (
                  <Text className="mt-1 text-xs font-medium text-primary">Əsas</Text>
                ) : null}
              </View>
              <Button
                title="Sil"
                variant="danger"
                disabled={isDeleting}
                onPress={() => {
                  void deleteCard(card.id);
                }}
              />
            </Card>
          ))}
        </View>
      )}

      <View className="mt-6">
        <Button title="Kart əlavə et" onPress={() => navigation.navigate('AddCard')} />
      </View>
    </Screen>
  );
}
