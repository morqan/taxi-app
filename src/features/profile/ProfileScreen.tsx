import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { signedOut } from '@/features/auth/authSlice';
import { useGetBalanceQuery, useGetProfileQuery } from '@/features/profile/profileApi';
import { supportedLanguages } from '@/i18n';
import type { RootStackParamList } from '@/navigation/types';
import { useAppDispatch } from '@/store/hooks';

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
  const { data: profile } = useGetProfileQuery();
  const { data: balance } = useGetBalanceQuery();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="py-4 text-2xl font-medium text-text">{t('profile.title')}</Text>
        <Card className="mb-3">
          <Text className="text-lg font-medium text-text">{profile?.name ?? '—'}</Text>
          <Text className="text-sm text-muted">{profile?.phone ?? ''}</Text>
          <Text className="text-sm text-muted">★ {profile?.rating ?? '—'}</Text>
        </Card>
        <Card className="mb-6">
          <Text className="text-sm text-muted">{t('profile.balance')}</Text>
          <Text className="text-xl font-medium text-text">
            {balance ? `${balance.amount} ${balance.currency}` : '—'}
          </Text>
        </Card>
        <View className="mb-6 gap-3">
          <Button
            title={t('profile.balance')}
            variant="secondary"
            onPress={() => navigation.navigate('Balance')}
          />
          <Button
            title={t('profile.payments')}
            variant="secondary"
            onPress={() => navigation.navigate('PaymentMethod')}
          />
          <Button
            title={t('profile.promo')}
            variant="secondary"
            onPress={() => navigation.navigate('Promo')}
          />
          <Button
            title={t('profile.news')}
            variant="secondary"
            onPress={() => navigation.navigate('News')}
          />
        </View>
        <Text className="mb-2 text-sm text-muted">{t('profile.language')}</Text>
        <View className="mb-6 flex-row gap-2">
          {supportedLanguages.map((lng) => (
            <View key={lng} className="flex-1">
              <Button
                title={t(`language.${lng}`)}
                variant={i18n.language === lng ? 'primary' : 'secondary'}
                onPress={() => {
                  void i18n.changeLanguage(lng);
                }}
              />
            </View>
          ))}
        </View>
        <Button
          title={t('profile.logout')}
          variant="danger"
          onPress={() => dispatch(signedOut())}
        />
      </ScrollView>
    </Screen>
  );
}
