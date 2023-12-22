import { CurrencyInput } from '@/components/inputs';

import {
  Wrapper,
  Label,
  Box,
} from './numberInput.styled';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onMax: VoidFunction;
  ticker: string;
};

export function NumberInput({ onChange, ticker, value, onMax }: Props) {
  return (
    <Wrapper>
      <Label>Deposit ${ticker}</Label>
      <Box>
        <CurrencyInput value={value} onChange={onChange} onMax={onMax} ticker={ticker}/>
      </Box>
    </Wrapper>
  );
}
