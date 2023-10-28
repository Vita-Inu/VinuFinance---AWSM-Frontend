import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Wrapper, Box, Background } from './styled';

type Props = {
  children: ReactNode;
  onClose: VoidFunction;
  visible?: boolean;
};

function DropdownContainer({ children, visible, onClose }: Props) {
  return (
    <Wrapper $visible={visible}>
      <Background onClick={onClose} />
      <Box>{children}</Box>
    </Wrapper>
  );
}

export const Dropdown: FC<Props & { anchor: HTMLElement | null }> = ({
  children,
  anchor,
  ...rest
}) => {
  if (!anchor) return null;

  return createPortal(
    <DropdownContainer {...rest}>{children}</DropdownContainer>,
    anchor,
  );
};
