import type { PressableProps } from 'react-native';
import { Pressable, Text } from 'react-native';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: Variant;
}

const variantClass: Record<Variant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-surface border border-border',
  danger: 'bg-danger',
};

export function Button({ title, variant = 'primary', disabled, ...rest }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={`h-12 items-center justify-center rounded-xl px-4 active:opacity-80 ${variantClass[variant]} ${disabled ? 'opacity-50' : ''}`}
      {...rest}
    >
      <Text className="text-base font-medium text-white">{title}</Text>
    </Pressable>
  );
}
