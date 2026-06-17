import { Text } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { signedOut } from '@/features/auth/authSlice';
import { useGetBalanceQuery, useGetProfileQuery } from '@/features/profile/profileApi';
import { useAppDispatch } from '@/store/hooks';

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { data: profile } = useGetProfileQuery();
  const { data: balance } = useGetBalanceQuery();

  return (
    <Screen>
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
      <Button title="Çıxış" variant="danger" onPress={() => dispatch(signedOut())} />
    </Screen>
  );
}
