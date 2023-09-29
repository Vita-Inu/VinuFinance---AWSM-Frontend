import { useAccount, useNetwork } from 'wagmi';

import { vinuTestnet } from '@/features/wagmi';

export const useAuthGuard = () => {
  const { isConnected } = useAccount();

  const { chain } = useNetwork();

  return { isConnected, isCorrectNetwork: chain?.id === vinuTestnet.id };
};
