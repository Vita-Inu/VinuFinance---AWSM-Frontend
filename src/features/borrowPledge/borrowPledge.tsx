import { ChangeEventHandler } from 'react';

import { Button, BUTTON_PRESET, BUTTON_SIZE } from '@/components/buttons';

import {
  Balance,
  Box,
  Currency,
  Fiat,
  Helpers,
  Amount,
  Value,
  Wrapper,
} from './styled';

type Props = {
  value: string;
  onValueChange: ChangeEventHandler<HTMLInputElement>;
  onMax: VoidFunction;
  currency: string;
  balance: string;
  price: number;
};

export function BorrowPledge({ value, onMax, onValueChange, currency, balance, price }: Props) {
  return (
    <Wrapper>
      <Box>
        <Amount>
          <Currency>{currency}</Currency>
          <Value type={'number'} value={value} onChange={onValueChange} />
        </Amount>
        <Fiat>${parseFloat((price * parseFloat(value) || 0).toFixed(2)).toLocaleString('en-US')}</Fiat>
      </Box>
      <Box>
        <Helpers>
          <Balance>Balance: {balance}</Balance>
          <Button
            preset={BUTTON_PRESET.PINK}
            size={BUTTON_SIZE.TINY}
            onClick={onMax}
          >
            MAX
          </Button>
        </Helpers>
      </Box>
    </Wrapper>
  );
}
