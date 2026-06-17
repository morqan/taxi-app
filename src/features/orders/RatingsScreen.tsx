import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { useRateOrderMutation } from '@/features/orders/ordersApi';
import type { RootStackParamList } from '@/navigation/types';

const STARS = [1, 2, 3, 4, 5] as const;

export function RatingsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Ratings'>>();
  // orderId приходит из навигации — какой заказ оцениваем
  const { orderId } = route.params;

  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [rateOrder, { isLoading, isError }] = useRateOrderMutation();

  const handleSubmit = async (): Promise<void> => {
    if (stars < 1) {
      return;
    }
    try {
      // мутация отправки оценки заказа на сервер; при успехе возвращаемся назад
      await rateOrder({ id: orderId, stars, comment }).unwrap();
      navigation.goBack();
    } catch {
      // ошибка показывается ниже через isError
    }
  };

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">{t('ratings.title')}</Text>

      <Card className="mb-3">
        <Text className="text-sm text-muted">{t('ratings.rateDriver')}</Text>
        <View className="flex-row gap-3 py-3">
          {STARS.map((value) => (
            <Pressable key={value} onPress={() => setStars(value)} disabled={isLoading}>
              <Text className={value <= stars ? 'text-3xl text-primary' : 'text-3xl text-muted'}>
                {value <= stars ? '★' : '☆'}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card className="mb-6">
        <Text className="text-sm text-muted">{t('ratings.comment')}</Text>
        <Input
          className="py-2 text-base text-text"
          value={comment}
          onChangeText={setComment}
          placeholder="Rəyinizi yazın"
          placeholderTextColor="#9CA3AF"
          multiline
          editable={!isLoading}
        />
      </Card>

      {isError ? <Text className="mb-3 text-sm text-danger">{t('common.loadError')}</Text> : null}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title={t('ratings.send')}
          variant="primary"
          onPress={handleSubmit}
          disabled={stars < 1}
        />
      )}
    </Screen>
  );
}
