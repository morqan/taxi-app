import { useAppSelector } from '@/store/hooks';

import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export function RootNavigator() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
}
