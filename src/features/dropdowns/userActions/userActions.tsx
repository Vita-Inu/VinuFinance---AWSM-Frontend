import { useDisconnect } from 'wagmi';

import { DropdownBase } from '../dropdownBase';

import { useAddress } from './hooks';
import { Button, Dropdown } from './components';

type Props = {
  address: string;
};

export function UserActions({ address }: Props) {
  const { copyAddress, shortAddress } = useAddress(address);

  const { disconnect } = useDisconnect();

  return (
    <DropdownBase
      button={<Button>{shortAddress}</Button>}
      dropdown={<Dropdown onLogout={disconnect} onCopyAddress={copyAddress} />}
    />
  );
}
