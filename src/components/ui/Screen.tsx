import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';

interface ScreenProps {
  edges?: readonly Edge[];
}

export function Screen({ children, edges = ['top'] }: PropsWithChildren<ScreenProps>) {
  return (
    <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 px-4">{children}</View>
    </SafeAreaView>
  );
}
