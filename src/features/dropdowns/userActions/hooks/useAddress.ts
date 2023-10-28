import { useState } from 'react';

export const useAddress = (address: string) => {
  const [isCopied, setIsCopied] = useState(false);

  const shortAddress = `${address.slice(0, 5)}...${address.slice(-4)}`;

  const markAsCopied = () => {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      markAsCopied();
    });
  };

  return { shortAddress, copyAddress, isCopied };
};
