import { ReactNode } from 'react';

import { Wrapper, Text, Arrow } from './styled';
import ArrowImg from './assets/menu-dropdown.svg';

type Props = {
  children: ReactNode;
  onHoverIn: VoidFunction;
  onHoverOut: VoidFunction;
};

export function Button({ children, onHoverOut, onHoverIn }: Props) {
  return (
    <Wrapper onMouseOver={onHoverIn} onMouseLeave={onHoverOut}>
      <Text>{children}</Text>
      <Arrow src={ArrowImg} alt={'dropdown arrow'} width={20} height={20} />
    </Wrapper>
  );
}
