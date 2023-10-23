import { mainnet, useAccount, useNetwork } from 'wagmi';

export const useAuthGuard = () => {
  const { isConnected } = useAccount();

  const { chain } = useNetwork();

  return { isConnected, isCorrectNetwork: chain?.id === mainnet.id };
};
