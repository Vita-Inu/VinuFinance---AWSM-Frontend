import { ReactNode } from 'react';

import { Wrapper, Text, Arrow } from './styled';
import ArrowImg from './assets/menu-dropdown.svg';

type Props = {
  children: ReactNode;
};

export function Button({ children }: Props) {
  return (
    <Wrapper>
      <Text>{children}</Text>
      <Arrow src={ArrowImg} alt={'dropdown arrow'} width={20} height={20} />
    </Wrapper>
  );
}
