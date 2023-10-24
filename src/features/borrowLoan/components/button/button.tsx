import { ReactNode } from 'react';

import { Wrapper, Text, Append } from './styled';
import checkIcon from './assets/check.svg';

type Props = {
  onClick: VoidFunction;
  children: ReactNode;
  active?: boolean;
};

export function Button({ children, onClick, active }: Props) {
  return (
    <Wrapper onClick={onClick} $active={active}>
      <Text>{children}</Text>
      <Append src={checkIcon} width={24} height={24} alt={'checked'} />
    </Wrapper>
  );
}
