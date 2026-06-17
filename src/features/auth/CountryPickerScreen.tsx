import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, Text, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import type { RootStackParamList } from '@/navigation/types';

interface CountryCode {
  code: string;
  dialCode: string;
  name: string;
}

// Названия стран и телефонные коды — это контент (данные), а не UI-строки,
// поэтому они не переводятся через i18n и остаются как есть.
const COUNTRIES: readonly CountryCode[] = [
  { code: 'AZ', dialCode: '+994', name: 'Azərbaycan' },
  { code: 'TR', dialCode: '+90', name: 'Türkiyə' },
  { code: 'RU', dialCode: '+7', name: 'Rusiya' },
  { code: 'GE', dialCode: '+995', name: 'Gürcüstan' },
  { code: 'IR', dialCode: '+98', name: 'İran' },
  { code: 'KZ', dialCode: '+7', name: 'Qazaxıstan' },
  { code: 'UA', dialCode: '+380', name: 'Ukrayna' },
  { code: 'AE', dialCode: '+971', name: 'BƏƏ' },
] as const;

export function CountryPickerScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const handleSelect = useCallback(
    (_country: CountryCode) => {
      // TODO: вернуть выбранную страну вызывающему экрану через route params
      // (например navigation.navigate('AddCard', { dialCode: country.dialCode })).
      // Пока выбор без передачи значения — просто закрываем экран.
      navigation.goBack();
    },
    [navigation],
  );

  return (
    <Screen>
      <Text className="py-4 text-2xl font-medium text-text">{t('country.title')}</Text>
      <FlatList
        data={COUNTRIES}
        keyExtractor={(item) => item.code}
        ItemSeparatorComponent={() => <View className="h-px bg-border" />}
        renderItem={({ item }) => (
          <Pressable
            className="flex-row items-center justify-between rounded-xl bg-surface px-4 py-4"
            onPress={() => handleSelect(item)}
          >
            <Text className="text-base text-text">{item.name}</Text>
            <Text className="text-base font-medium text-muted">{item.dialCode}</Text>
          </Pressable>
        )}
      />
    </Screen>
  );
}
