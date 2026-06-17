import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const emptySubscribe = () => () => {};

/**
 * Returns true only after client-side hydration. Uses useSyncExternalStore so the
 * server snapshot is `false` and the client snapshot is `true` — the React-correct
 * way to detect hydration without calling setState inside an effect.
 */
function useHasHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * To support static rendering, the color scheme is re-calculated on the client for web.
 */
export function useColorScheme() {
  const hasHydrated = useHasHydrated();
  const colorScheme = useRNColorScheme();

  return hasHydrated ? colorScheme : 'light';
}
