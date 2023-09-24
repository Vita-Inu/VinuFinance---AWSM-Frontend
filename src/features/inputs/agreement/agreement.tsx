import { ChangeEventHandler, ReactNode } from 'react';

import {
  BoxBackground,
  Box,
  BoxMark,
  Description,
  Row,
  Input,
} from './components';

type Props = {
  children: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  checked?: boolean;
};

export function Agreement({ checked, children, onChange, name }: Props) {
  return (
    <Row>
      <Box>
        <Input
          type={'checkbox'}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <BoxBackground />
        <BoxMark $checked={checked} />
      </Box>
      <Description>{children}</Description>
    </Row>
  );
}
