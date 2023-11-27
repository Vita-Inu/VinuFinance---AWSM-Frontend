import {
  Boxes,
  Wrapper,
  Label,
  Input,
  Button,
  Appendix,
  Box,
} from './numberInput.styled';

type Props = {
  value: number;
  onChange: (value: string) => void;
};

export function NumberInput({ onChange, value }: Props) {
  return (
    <Wrapper>
      <Label>Lorem Ipsum</Label>
      <Boxes>
        <Box>
          <Input value={value} onChange={(evt) => onChange(evt.target.value)} />
          <Appendix>$VC</Appendix>
        </Box>
        <Button>MAX</Button>
      </Boxes>
    </Wrapper>
  );
}
