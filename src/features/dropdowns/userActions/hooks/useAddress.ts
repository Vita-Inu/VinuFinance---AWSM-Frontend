export const useAddress = (address: string) => {
  const shortAddress = `${address.slice(0, 5)}...${address.slice(-4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      //TODO:: Handle success state
      //TODO:: Extract to hook
    });
  };

  return { shortAddress, copyAddress };
};
