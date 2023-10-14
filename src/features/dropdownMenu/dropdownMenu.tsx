import { useDisconnect } from 'wagmi';

import { useDropdown } from './hooks';
import { Button, Box, Dropdown } from './components';

type Props = {
  address: string;
};

export function DropdownMenu({ address }: Props) {
  const { hideDropdown, showDropdown, isVisible } = useDropdown();

  const shortAddress = `${address.slice(0, 5)}...${address.slice(-4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      //TODO:: Handle success state
      //TODO:: Extract to hook
    });
  };

  const { disconnect } = useDisconnect();

  return (
    <Box>
      <Button onHoverIn={showDropdown} onHoverOut={hideDropdown}>
        {shortAddress}
      </Button>
      <Dropdown
        onHoverIn={showDropdown}
        onHoverOut={hideDropdown}
        visible={isVisible}
        onCopyAddress={copyAddress}
        onLogout={disconnect}
      />
    </Box>
  );
}
