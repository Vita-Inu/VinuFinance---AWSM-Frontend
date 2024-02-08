import { ReactNode } from 'react';

import { Button, Text, Icon, Loader } from './styled';

type Props = {
  icon: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  children: ReactNode;
  onClick?: VoidFunction;
  disabled?: boolean;
  connecting?: boolean;
};

export const WalletButton = ({
  children,
  icon,
  disabled,
  connecting,
  ...rest
}: Props) => {
  return (
    <Button
      {...rest}
      $loading={connecting}
      $disabled={disabled}
      role={'button'}
    >
      <Icon {...icon} />
      <Text>{children}</Text>
      {connecting && <Loader />}
    </Button>
  );
};
