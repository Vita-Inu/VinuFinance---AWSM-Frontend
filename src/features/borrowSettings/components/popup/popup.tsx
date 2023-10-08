import { ReactNode } from 'react';

import { Wrapper, Inner } from './styled';

type Props = {
  children: ReactNode;
  visible?: boolean;
};

export function Popup({ visible, children }: Props) {
  return (
    <Wrapper $active={visible}>
      <Inner>{children}</Inner>
    </Wrapper>
  );
}
