import { useAccount, useNetwork } from 'wagmi';
import {vinuChain} from "@/const";

export const useAuthGuard = () => {
  const { isConnected } = useAccount();

  const { chain } = useNetwork();

  return { isConnected, isCorrectNetwork: chain?.id === vinuChain.id };
};
