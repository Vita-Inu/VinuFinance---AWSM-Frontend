import { useDisconnect } from 'wagmi';
import { useRef } from 'react';

import { useDropdown } from '@/features/dropdowns/dropdownBase/hooks';

import { DropdownBase } from '../dropdownBase';

import { useAddress } from './hooks';
import { Button, Dropdown } from './components';

type Props = {
  address: string;
};

export function UserActions({ address }: Props) {
  const { copyAddress, shortAddress, isCopied } = useAddress(address);

  const { disconnect } = useDisconnect();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { anchor, toggleDropdown, hideDropdown, isVisible } =
    useDropdown(dropdownRef);

  return (
    <DropdownBase
      ref={dropdownRef}
      button={<Button>{shortAddress}</Button>}
      onButtonClick={toggleDropdown}
      onClose={hideDropdown}
      dropdown={
        <Dropdown
          onClose={hideDropdown}
          onLogout={disconnect}
          onCopyAddress={copyAddress}
          isAddressCopied={isCopied}
        />
      }
      dropdownVisible={isVisible}
      dropdownAnchor={anchor}
    />
  );
}
