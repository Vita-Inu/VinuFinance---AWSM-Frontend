import { useState } from 'react';

import { Button, BUTTON_PRESET } from '@/components/buttons';

import { ModalBase } from '../modalBase';

import {
  Cell,
  Describe,
  Grid,
  Label,
  Value,
  NumberInput,
  RangeSlider,
} from './components';

type Props = {
  poolId: string;
  onClose: VoidFunction;
};

export function LiquidityPoolModal({ onClose }: Props) {
  const [inputVal, setInputVal] = useState(0);
  const [range, setRange] = useState(30);

  const onInputChange = (val: string) => {
    const newVal = parseInt(val);

    if (isNaN(newVal)) {
      setInputVal(0);
      return;
    }

    setInputVal(newVal);
  };

  return (
    <ModalBase title={'Pool details'} onClose={onClose}>
      <Grid>
        <Cell>
          <Label>Current LTV</Label>
          <Value>81.8%</Value>
        </Cell>
        <Cell>
          <Label>Loan Tenor</Label>
          <Value>90 days</Value>
        </Cell>
        <Cell>
          <Label>Total Loan Volume</Label>
          <Value>138.62201 rETH</Value>
          <Describe>($274,253.96)</Describe>
        </Cell>
        <Cell>
          <Label>Max. Loan Per Collateral Unit</Label>
          <Value>0.011354088 rETH</Value>
          <Describe>($22.46)</Describe>
        </Cell>
        <Cell>
          <Label>Total Liquidity</Label>
          <Value>0.11128082 rETH</Value>
          <Describe>($220.16)</Describe>
        </Cell>
        <Cell>
          <Label>Current APR</Label>
          <Value>0.4009%</Value>
          <Describe>Floored at 0.04%</Describe>
        </Cell>
        <Cell>
          <Label>Rewards</Label>
          <Value>223 $VC</Value>
        </Cell>
        <Cell>
          <Button
            fullWidth
            preset={BUTTON_PRESET.PINK}
            onClick={() => window.alert('Claim rewards')}
          >
            Claim rewards
          </Button>
        </Cell>
        <Cell>
          <NumberInput
            value={inputVal}
            onChange={onInputChange}
            onMax={() => window.alert('MAX')}
          />
        </Cell>
        <Cell>
          <RangeSlider value={range} onChange={setRange} />
        </Cell>
        <Cell>
          <Button
            fullWidth
            preset={BUTTON_PRESET.PURPLE}
            onClick={() => window.alert('Deposit')}
          >
            Deposit
          </Button>
        </Cell>
        <Cell>
          <Button
            fullWidth
            preset={BUTTON_PRESET.PURPLE}
            onClick={() => window.alert('Withdraw')}
          >
            Withdraw
          </Button>
        </Cell>
      </Grid>
    </ModalBase>
  );
}
