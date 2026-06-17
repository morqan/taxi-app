import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import type { Transaction } from '@/api/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useGetBalanceQuery } from '@/features/profile/profileApi';
import { colors } from '@/theme/colors';

function renderTransaction({ item }: { item: Transaction }) {
  const isPositive = item.amount > 0;
  return (
    <Card className="mb-3">
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-1">
          <Text className="text-base font-medium text-text">{item.description}</Text>
          <Text className="text-sm text-muted">{item.createdAt}</Text>
        </View>
        <Text
          className={
            isPositive ? 'text-base font-medium text-green-500' : 'text-base font-medium text-text'
          }
        >
          {isPositive ? `+${item.amount}` : item.amount} {item.currency}
        </Text>
      </View>
    </Card>
  );
}

export function BalanceScreen() {
  const { data: balance, isLoading, isError } = useGetBalanceQuery();

  if (isLoading) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (isError || !balance) {
    return (
      <Screen>
        <Text className="py-4 text-2xl font-medium text-text">Balans</Text>
        <Text className="text-base text-muted">Balans yüklənə bilmədi</Text>
      </Screen>
    );
  }

  const transactions = balance.transactions;

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">Balans</Text>
      <Card className="mb-6 items-center py-6">
        <Text className="text-sm text-muted">Cari balans</Text>
        <Text className="text-4xl font-medium text-text">
          {balance.amount} {balance.currency}
        </Text>
      </Card>
      <Button title="Balansı artır" onPress={() => {}} />
      <Text className="py-4 text-lg font-medium text-text">Əməliyyatlar</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        ListEmptyComponent={<Text className="text-base text-muted">Əməliyyat yoxdur</Text>}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
