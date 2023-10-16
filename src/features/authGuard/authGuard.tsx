import { PropsWithChildren } from 'react';

import { NotConnectedError } from '@/features/errors';

import { useAuthGuard } from './hooks';

export function AuthGuard({ children }: PropsWithChildren) {
  const { isConnected } = useAuthGuard();

  if (!isConnected) return <NotConnectedError />;

  // if (!isCorrectNetwork) return <WrongNetworkError />;

  return <>{children}</>;
}
