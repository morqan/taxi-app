import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useDeleteCardMutation, useGetCardsQuery } from '@/features/payments/paymentsApi';
import type { RootStackParamList } from '@/navigation/types';
import { colors } from '@/theme/colors';

export function PaymentMethodScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { data: cards = [], isLoading, isError } = useGetCardsQuery();
  // Мутация удаления карты по id; isDeleting блокирует кнопки на время запроса
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
      <Text className="py-4 text-2xl font-medium text-text">{t('payments.title')}</Text>

      {isError ? (
        // Ошибка приходит от RTK Query (сеть/сервер) — показываем общий текст загрузки
        <Text className="text-base text-danger">{t('common.loadError')}</Text>
      ) : cards.length === 0 ? (
        <Text className="text-base text-muted">{t('payments.empty')}</Text>
      ) : (
        <View className="gap-3">
          {cards.map((card) => (
            <Card key={card.id} className="flex-row items-center justify-between">
              <View className="flex-1">
                {/* last4 и brand — данные карты, не переводим */}
                <Text className="text-base font-medium text-text">•••• {card.last4}</Text>
                <Text className="text-sm text-muted">{card.brand}</Text>
                {card.isDefault ? (
                  <Text className="mt-1 text-xs font-medium text-primary">
                    {t('payments.default')}
                  </Text>
                ) : null}
              </View>
              <Button
                title={t('common.delete')}
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
        <Button title={t('payments.addCard')} onPress={() => navigation.navigate('AddCard')} />
      </View>
    </Screen>
  );
}
