import { Button, BUTTON_PRESET } from '@/components/buttons';
import { ModalBase } from '../modalBase';
const humanizeDuration = require("humanize-duration");
import { Buttons, Cell, Describe, Grid, Label, Value } from './components';
import {PoolWithInfo} from "@/features/liquidityProviders";
import {formatUnits} from "viem";
import {Explain} from "@/components/table";

type Props = {
  pool: PoolWithInfo;
  onClose: VoidFunction;
};

export function LiquidityPoolModal({ onClose, pool }: Props) {
  return (
    <ModalBase title={'Pool details'} onClose={onClose}>
      <Grid>
        <Cell>
          <Label>Loan Tenor</Label>
          <Value>{humanizeDuration(1000 * parseInt(pool.pool.info[4].toString()))}</Value>
        </Cell>
        <Cell>
          <Label>Max. Loan Per Collateral Unit</Label>
          <Value>{formatUnits(pool.pool.info[2], pool.loanCurrency.decimals)} {pool.loanCurrency.symbol}</Value>
          <Explain>$0.0</Explain>
        </Cell>
        <Cell>
          <Label>Total Liquidity</Label>
          <Value>{parseFloat(formatUnits(pool.pool.info[5], pool.collCurrency.decimals)).toFixed(2)} {pool.collCurrency.symbol}</Value>
          <Explain>$0.0</Explain>
        </Cell>
        <Cell>
          <Label>Current APR</Label>
          <Value>{(1 + (pool.currentMonthlyApr * 12).toFixed(2))}%</Value>
          <Explain>~{(Math.pow(1 + pool.currentMonthlyApr, 12) * 100 - 100).toFixed(2)}% APY</Explain>
        </Cell>
      </Grid>
      <Buttons>
        <Button
          fullWidth
          preset={BUTTON_PRESET.PURPLE}
          onClick={() => window.alert('Add liquidity')}
        >
          Add liquidity
        </Button>
        <Button
          fullWidth
          preset={BUTTON_PRESET.PURPLE}
          onClick={() => window.alert('Remove liquidity')}
        >
          Remove liquidity
        </Button>
        <Button
          fullWidth
          preset={BUTTON_PRESET.PINK}
          onClick={() => window.alert('Claim rewards')}
        >
          Claim rewards
        </Button>
      </Buttons>
    </ModalBase>
  );
}
