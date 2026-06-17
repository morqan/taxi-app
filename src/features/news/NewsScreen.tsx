import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import type { NewsItem } from '@/api/types';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useGetNewsQuery } from '@/features/news/newsApi';
import { colors } from '@/theme/colors';

export function NewsScreen() {
  const { t } = useTranslation();
  // useGetNewsQuery — RTK Query: лента новостей грузится с сервера, ошибку показываем через common.loadError
  const { data: news = [], isLoading, isError } = useGetNewsQuery();

  const renderItem = ({ item }: { item: NewsItem }) => (
    <Card className="mb-3">
      {/* item.text и item.date — серверный контент, не локализуем */}
      <Text className="text-base text-text">{item.text}</Text>
      <Text className="mt-2 text-sm text-muted">{item.date}</Text>
    </Card>
  );

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">{t('news.title')}</Text>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : isError ? (
        <Text className="text-base text-danger">{t('common.loadError')}</Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text className="text-base text-muted">{t('news.empty')}</Text>}
        />
      )}
    </Screen>
  );
}
