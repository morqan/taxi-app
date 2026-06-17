import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { setAuthenticated } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

export function AuthScreen() {
  const dispatch = useAppDispatch();

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="flex-1 items-center justify-center gap-6">
        <Text className="text-3xl font-medium text-text">Taxi</Text>
        <Text className="text-center text-base text-muted">
          Telefon nömrəsi ilə daxil ol (demo)
        </Text>
        <View className="w-full">
          <Button title="Davam et" onPress={() => dispatch(setAuthenticated(true))} />
        </View>
      </View>
    </Screen>
  );
}
