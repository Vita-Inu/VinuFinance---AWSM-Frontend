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
  onMax: VoidFunction;
};

export function NumberInput({ onChange, value, onMax }: Props) {
  return (
    <Wrapper>
      <Label>Lorem Ipsum</Label>
      <Boxes>
        <Box>
          <Input value={value} onChange={(evt) => onChange(evt.target.value)} />
          <Appendix>$VC</Appendix>
        </Box>
        <Button onClick={onMax}>MAX</Button>
      </Boxes>
    </Wrapper>
  );
}
