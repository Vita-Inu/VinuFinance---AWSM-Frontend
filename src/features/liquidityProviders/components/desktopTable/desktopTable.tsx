import { Column, Explain, Table, Value } from '@/components/table';
import { LoanProvider } from '@/features/liquidityProviders/types';
import { CurrencyBadge } from '@/components/currencyBadge';
import { Button, BUTTON_PRESET } from '@/components/buttons';
import {PoolWithInfo} from "@/features/liquidityProviders";
import {formatEther, formatUnits} from "viem";
const humanizeDuration = require("humanize-duration");

type Props = { data: PoolWithInfo[]; onView: (id: string) => void };

export function DesktopTable({ data, onView }: Props) {
  const COLUMNS: Column<PoolWithInfo>[] = [
    {
      label: 'Loan Currency',
      key: 'loanCurrency',
      render: (row) => <CurrencyBadge symbol={row.loanCurrency.symbol}/>,
    },
    {
      label: 'Collateral Currency',
      key: 'collateralCurrency',
      render: (row) => <CurrencyBadge symbol={row.collCurrency.symbol} />,
    },
    {
      label: 'Total Liquidity',
      key: 'totalLiquidity',
      render: (row) => (
        <>
          <Value>{parseFloat(formatUnits(row.pool.info[5], row.collCurrency.decimals)).toFixed(2)} {row.collCurrency.symbol}</Value>
          <Explain>$0.0</Explain>
        </>
      ),
    },
    {
      label: 'Current APR',
      key: 'currentApr',
      render: (row) => (
        <>
          <Value>{(1 + (row.currentMonthlyApr * 12).toFixed(2))}%</Value>
          <Explain>~{(Math.pow(1 + row.currentMonthlyApr, 12) * 100 - 100).toFixed(2)}% APY</Explain>
        </>
      ),
    },
    {
      label: 'Loan Tenor',
      key: 'loanTenor',
      render: (row) => (
        <>
          <Value>{humanizeDuration(1000 * parseInt(row.pool.info[4].toString()))}</Value>
        </>
      )
    },
    {
      label: 'Max. Loan Per Collateral Unit',
      key: 'collateralUnit',
      render: (row) => (
        <>
          <Value>{formatUnits(row.pool.info[2], row.loanCurrency.decimals)} {row.loanCurrency.symbol}</Value>
          <Explain>$0.0</Explain>
        </>
      ),
    },
    {
      label: '',
      key: 'actions',
      render: (row) => (
        <Button preset={BUTTON_PRESET.PINK} onClick={() => onView(row.pool.address)}>
          View
        </Button>
      ),
    },
  ];

  return <Table columns={COLUMNS} data={data} />;
}
