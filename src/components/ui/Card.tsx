import type { PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

export function Card({ children, className, ...rest }: PropsWithChildren<ViewProps>) {
  return (
    <View
      className={`rounded-2xl border border-border bg-surface p-4 ${className ?? ''}`}
      {...rest}
    >
      {children}
    </View>
  );
}
