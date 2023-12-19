import { Wrapper, Input, Button, Appendix, Box } from './styled';

type Props = {
  value: number;
  onChange: (value: string) => void;
  onMax: VoidFunction;
  ticker: string;
  maxText?: string
};

export function CurrencyInput({ticker, value, onMax, onChange, maxText}: Props) {
  return (
    <Wrapper>
      <Box>
        <Input value={value} onChange={(evt) => onChange(evt.target.value)} />
        <Appendix>${ticker}</Appendix>
      </Box>
      <Button onClick={onMax}>{maxText ?? 'MAX'}</Button>
    </Wrapper>
  )
}