import { ReactNode } from 'react';

import { Button, Text, Icon } from './styled';

type Props = {
  icon: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  children: ReactNode;
  onClick: VoidFunction;
  disabled?: boolean;
};

export const WalletButton = ({ children, icon, disabled, ...rest }: Props) => {
  return (
    <Button {...rest} $disabled={disabled} role={'button'}>
      <Icon {...icon} />
      <Text>{children}</Text>
    </Button>
  );
};
