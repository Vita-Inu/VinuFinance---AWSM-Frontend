import { PropsWithChildren } from 'react';

import { WrongNetworkError, NotConnectedError } from '@/features/errors';

import { useAuthGuard } from './hooks';

export function AuthGuard({ children }: PropsWithChildren) {
  const { isConnected, isCorrectNetwork } = useAuthGuard();

  const TEMP_GUARD_DISABLE = true;

  if (!isConnected && !TEMP_GUARD_DISABLE) return <NotConnectedError />;

  if (!isCorrectNetwork && !TEMP_GUARD_DISABLE) return <WrongNetworkError />;

  return <>{children}</>;
}
