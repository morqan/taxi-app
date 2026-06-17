import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { signedOut } from '@/features/auth/authSlice';
import { useGetBalanceQuery, useGetProfileQuery } from '@/features/profile/profileApi';
import type { RootStackParamList } from '@/navigation/types';
import { useAppDispatch } from '@/store/hooks';

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: profile } = useGetProfileQuery();
  const { data: balance } = useGetBalanceQuery();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="py-4 text-2xl font-medium text-text">Profil</Text>
        <Card className="mb-3">
          <Text className="text-lg font-medium text-text">{profile?.name ?? '—'}</Text>
          <Text className="text-sm text-muted">{profile?.phone ?? ''}</Text>
          <Text className="text-sm text-muted">★ {profile?.rating ?? '—'}</Text>
        </Card>
        <Card className="mb-6">
          <Text className="text-sm text-muted">Balans</Text>
          <Text className="text-xl font-medium text-text">
            {balance ? `${balance.amount} ${balance.currency}` : '—'}
          </Text>
        </Card>
        <View className="mb-6 gap-3">
          <Button
            title="Balans"
            variant="secondary"
            onPress={() => navigation.navigate('Balance')}
          />
          <Button
            title="Ödəniş üsulları"
            variant="secondary"
            onPress={() => navigation.navigate('PaymentMethod')}
          />
          <Button
            title="Promokod"
            variant="secondary"
            onPress={() => navigation.navigate('Promo')}
          />
          <Button
            title="Xəbərlər"
            variant="secondary"
            onPress={() => navigation.navigate('News')}
          />
        </View>
        <Button title="Çıxış" variant="danger" onPress={() => dispatch(signedOut())} />
      </ScrollView>
    </Screen>
  );
}
