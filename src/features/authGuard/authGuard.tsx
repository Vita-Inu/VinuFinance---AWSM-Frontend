import { PropsWithChildren } from 'react';

import { WrongNetworkError, NotConnectedError } from '@/features/errors';

export function AuthGuard({ children }: PropsWithChildren) {
  const IS_CONNECTED = false;

  const IS_CORRECT_NETWORK = false;

  if (!IS_CONNECTED) return <NotConnectedError />;

  if (!IS_CORRECT_NETWORK) return <WrongNetworkError />;

  return <>{children}</>;
}
