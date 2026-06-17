import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { useApplyPromoMutation } from '@/features/promo/promoApi';
import { colors } from '@/theme/colors';

export function PromoScreen() {
  const [code, setCode] = useState('');
  const [applyPromo, { data: result, isLoading, isError }] = useApplyPromoMutation();

  const trimmed = code.trim();

  const onApply = (): void => {
    if (trimmed.length === 0) {
      return;
    }
    void applyPromo({ code: trimmed });
  };

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">Promo kod</Text>
      <Card className="mb-3 gap-3">
        <Text className="text-sm text-muted">Zəhmət olmasa promo kodu daxil edin</Text>
        <Input
          value={code}
          onChangeText={setCode}
          placeholder="Promo kod"
          autoCapitalize="characters"
          autoCorrect={false}
          editable={!isLoading}
        />
        {isLoading ? (
          <View className="h-12 items-center justify-center">
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <Button title="Tətbiq et" onPress={onApply} disabled={trimmed.length === 0} />
        )}
      </Card>

      {isError ? (
        <Text className="text-sm text-danger">Xəta baş verdi. Yenidən cəhd edin.</Text>
      ) : null}

      {result ? (
        <Card>
          <Text
            className={
              result.valid
                ? 'text-base font-medium text-primary'
                : 'text-base font-medium text-danger'
            }
          >
            {result.message}
          </Text>
          {result.valid ? (
            <Text className="text-sm text-muted">Endirim: {result.discountPercent}%</Text>
          ) : null}
        </Card>
      ) : null}

      <Text className="py-4 text-sm text-muted">Promo kod növbəti sifariş zamanı aktiv olacaq</Text>
    </Screen>
  );
}
