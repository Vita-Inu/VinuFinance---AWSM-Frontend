import { PropsWithChildren } from 'react';

import { WrongNetworkError, NotConnectedError } from '@/features/errors';

import { useAuthGuard } from './hooks';

export function AuthGuard({ children }: PropsWithChildren) {
  const { isConnected, isCorrectNetwork } = useAuthGuard();

  if (!isConnected) return <NotConnectedError />;

  if (!isCorrectNetwork) return <WrongNetworkError />;

  return <>{children}</>;
}
