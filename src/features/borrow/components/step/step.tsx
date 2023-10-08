import { ReactNode } from 'react';

import { Bubble, Box, Top, Rest, Title, Content, TitleGroup } from './styled';

type Props = {
  stepNo: number;
  title: string;
  children: ReactNode;
  appendItem?: ReactNode;
};

export function Step({ stepNo, title, appendItem, children }: Props) {
  return (
    <Box>
      <Top>
        <TitleGroup>
          <Bubble>{stepNo}</Bubble>
          <Title>{title}</Title>
        </TitleGroup>
        {appendItem && <Rest>{appendItem}</Rest>}
      </Top>
      <Content>{children}</Content>
    </Box>
  );
}
