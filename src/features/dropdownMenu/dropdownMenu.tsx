import { Button, Box } from './components';

type Props = {
  address: string;
};

export function DropdownMenu({ address }: Props) {
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <Box>
      <Button>{shortAddress}</Button>
    </Box>
  );
}
