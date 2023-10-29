import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Wrapper, Inner, Background } from './styled';

type Props = {
  children: ReactNode;
  onClose: VoidFunction;
  visible?: boolean;
};

function PopupComponent({ visible, children, onClose }: Props) {
  return (
    <Wrapper $active={visible}>
      <Inner>{children}</Inner>
      <Background onClick={onClose} />
    </Wrapper>
  );
}

export const Popup: FC<Props & { anchor: HTMLElement | null }> = ({
  children,
  anchor,
  ...rest
}) => {
  if (!anchor) return null;

  return createPortal(
    <PopupComponent {...rest}>{children}</PopupComponent>,
    anchor,
  );
};
