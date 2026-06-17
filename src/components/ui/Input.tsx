import type { TextInputProps } from 'react-native';
import { TextInput } from 'react-native';

import { colors } from '@/theme/colors';

export function Input(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.muted}
      className="h-12 rounded-xl border border-border bg-surface px-4 text-base text-text"
      {...props}
    />
  );
}
