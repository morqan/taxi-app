import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { useAddCardMutation } from '@/features/payments/paymentsApi';
import type { RootStackParamList } from '@/navigation/types';

export function AddCardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [addCard, { isLoading, isError }] = useAddCardMutation();

  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [holder, setHolder] = useState('');

  const digits = number.replace(/\D/g, '');
  const canSubmit = digits.length >= 4 && expiry.trim().length > 0 && holder.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || isLoading) {
      return;
    }

    // БЕЗОПАСНОСТЬ: сырые PAN/CVC через наш слой НИКОГДА не проходят и НЕ логируются.
    // В проде здесь работал бы SDK платёжного провайдера (PSP), который сам токенизирует
    // карту на стороне PSP и возвращает безопасный токен. Для mock берём только last4.
    const last4 = digits.slice(-4);
    const token = `tok_${last4}`;

    try {
      await addCard({ token }).unwrap();
      navigation.goBack();
    } catch {
      // Ошибка отражается через isError; данные карты не логируем.
    }
  };

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">Kart əlavə et</Text>

      <View className="gap-3">
        <View className="gap-1">
          <Text className="text-sm text-muted">Kart nömrəsi</Text>
          <Input
            value={number}
            onChangeText={setNumber}
            keyboardType="numeric"
            placeholder="0000 0000 0000 0000"
            autoComplete="off"
            maxLength={19}
          />
        </View>

        <View className="gap-1">
          <Text className="text-sm text-muted">Bitmə tarixi</Text>
          <Input
            value={expiry}
            onChangeText={setExpiry}
            keyboardType="numeric"
            placeholder="AA/İİ"
            autoComplete="off"
            maxLength={5}
          />
        </View>

        <View className="gap-1">
          <Text className="text-sm text-muted">Kart sahibinin adı</Text>
          <Input
            value={holder}
            onChangeText={setHolder}
            placeholder="ADI SOYADI"
            autoCapitalize="characters"
            autoComplete="off"
          />
        </View>

        {isError ? (
          <Text className="text-sm text-danger">
            Kartı əlavə etmək alınmadı. Yenidən cəhd edin.
          </Text>
        ) : null}

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Yadda saxla" onPress={handleSubmit} disabled={!canSubmit} />
        )}
      </View>
    </Screen>
  );
}
