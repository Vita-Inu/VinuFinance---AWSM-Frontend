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
  ticker: string;
};

export function NumberInput({ onChange, ticker, value, onMax }: Props) {
  return (
    <Wrapper>
      <Label>Deposit ${ticker}</Label>
      <Boxes>
        <Box>
          <Input value={value} onChange={(evt) => onChange(evt.target.value)} />
          <Appendix>${ticker}</Appendix>
        </Box>
        <Button onClick={onMax}>MAX</Button>
      </Boxes>
    </Wrapper>
  );
}
