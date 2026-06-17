import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { setAuthenticated } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

export function AuthScreen() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="flex-1 items-center justify-center gap-6">
        <Text className="text-3xl font-medium text-text">{t('auth.title')}</Text>
        <Text className="text-center text-base text-muted">{t('auth.subtitle')}</Text>
        <View className="w-full">
          {/* Demo-вход: помечаем сессию как авторизованную, реальной проверки телефона нет */}
          <Button title={t('auth.continue')} onPress={() => dispatch(setAuthenticated(true))} />
        </View>
      </View>
    </Screen>
  );
}
