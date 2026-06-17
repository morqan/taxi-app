import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { useApplyPromoMutation } from '@/features/promo/promoApi';
import { colors } from '@/theme/colors';

export function PromoScreen() {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  // Применение промокода идёт на сервер: только бэкенд знает текущие акции,
  // лимиты использования и срок действия — поэтому валидность кода клиентом
  // не проверяется, доверяем ответу мутации (result.valid).
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
      <Text className="py-4 text-2xl font-medium text-text">{t('promo.title')}</Text>
      <Card className="mb-3 gap-3">
        <Text className="text-sm text-muted">{t('promo.placeholder')}</Text>
        <Input
          value={code}
          onChangeText={setCode}
          placeholder={t('promo.placeholder')}
          autoCapitalize="characters"
          autoCorrect={false}
          editable={!isLoading}
        />
        {isLoading ? (
          <View className="h-12 items-center justify-center">
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <Button title={t('common.apply')} onPress={onApply} disabled={trimmed.length === 0} />
        )}
      </Card>

      {isError ? <Text className="text-sm text-danger">{t('common.loadError')}</Text> : null}

      {result ? (
        <Card>
          {/* result.message приходит с сервера уже на нужном языке — это контент ответа, не UI-литерал */}
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
            <Text className="text-sm text-muted">
              {t('promo.discount')}: {result.discountPercent}%
            </Text>
          ) : null}
        </Card>
      ) : null}

      <Text className="py-4 text-sm text-muted">{t('promo.hint')}</Text>
    </Screen>
  );
}
