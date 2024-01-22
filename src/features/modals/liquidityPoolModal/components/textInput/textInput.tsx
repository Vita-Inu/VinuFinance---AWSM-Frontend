import { TextInput as BaseInput} from '@/components/inputs';

import {
  Wrapper,
  Label,
  Box,
} from './textInput.styled';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function TextInput({ onChange, value }: Props) {
  return (
    <Wrapper>
      <Label>Delegate to</Label>
      <Box>
        <BaseInput value={value} onChange={onChange}/>
      </Box>
    </Wrapper>
  );
}
