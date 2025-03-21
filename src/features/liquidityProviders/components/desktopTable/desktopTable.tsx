import { Column, Explain, Table, Value } from '@/components/table';
import { CurrencyBadge } from '@/components/currencyBadge';
import { Button, BUTTON_PRESET } from '@/components/buttons';
import { PoolWithInfo } from '@/features/liquidityProviders';
import { formatEther, formatUnits } from 'viem';

const humanizeDuration = require('humanize-duration');

type Props = {
  data: PoolWithInfo[];
  onView: (id: string) => void;
  priceMap: any;
  deprecatedList: string[];
};

export function DesktopTable({ data, onView, priceMap, deprecatedList }: Props) {
  const COLUMNS: Column<PoolWithInfo>[] = [
    {
      label: 'Loan Currency',
      key: 'loanCurrency',
      render: (row) => <CurrencyBadge symbol={row.loanCurrency.symbol} />,
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
          <Value>
            {parseFloat(
              parseFloat(
                formatUnits(row.pool.info[5], row.loanCurrency.decimals),
              ).toFixed(2),
            ).toLocaleString('en-US')}{' '}
            {row.loanCurrency.symbol}
          </Value>
          <Explain>
            $
            {parseFloat(
              (
                parseFloat(
                  formatUnits(row.pool.info[5], row.loanCurrency.decimals),
                ) * priceMap[row.pool.info['0']]
              ).toFixed(2),
            ).toLocaleString('en-US')}
          </Explain>
        </>
      ),
    },
    {
      label: 'Current APR',
      key: 'currentApr',
      render: (row) => (
        <>
          <Value>{(row.currentMonthlyApr * 100 * 12).toFixed(2)}%</Value>
          <Explain>
            ~{(Math.pow(1 + row.currentMonthlyApr, 12) * 100 - 100).toFixed(2)}%
            APY
          </Explain>
        </>
      ),
    },
    {
      label: 'Loan Tenor',
      key: 'loanTenor',
      render: (row) => (
        <>
          <Value>
            {humanizeDuration(1000 * parseInt(row.pool.info[4].toString()))}
          </Value>
        </>
      ),
    },
    {
      label: 'Max. Loan Per Collateral Unit',
      key: 'collateralUnit',
      render: (row) => (
        <>
          <Value>
            {parseFloat(
              formatUnits(row.pool.info[2], row.loanCurrency.decimals),
            ).toLocaleString('en-US')}{' '}
            {row.loanCurrency.symbol}
          </Value>
          <Explain>
            $
            {parseFloat(
              (
                parseFloat(
                  formatUnits(row.pool.info[2], row.loanCurrency.decimals),
                ) * priceMap[row.pool.info['0']]
              ).toFixed(2),
            ).toLocaleString('en-US')}
          </Explain>
        </>
      ),
    },
    {
      label: '',
      key: 'actions',
      render: (row) => {
        return (
          <Button
            preset={BUTTON_PRESET.PINK}
            onClick={() => onView(row.pool.address)}
          >
            View
            { deprecatedList.includes(row.pool.address.toLowerCase()) && (
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.4869C1 11.0612 1.10814 10.6424 1.31427 10.27L5.64714 2.44068C6.02955 1.74969 6.69637 1.26173 7.47066 1.10628V1.10628C7.82007 1.03613 8.17993 1.03613 8.52934 1.10628V1.10628C9.30363 1.26173 9.97045 1.74969 10.3529 2.44068L14.6857 10.27C14.8919 10.6424 15 11.0612 15 11.4869V11.4869C15 12.8748 13.8748 14 12.4869 14H3.51313C2.12517 14 1 12.8748 1 11.4869V11.4869Z"
                    stroke="#000"
                    strokeWidth="1.2"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.63643 4H7.29587V8.92297H8.63643V4ZM7.96615 11.9996C8.10054 12.0031 8.23432 11.9818 8.35958 11.9369C8.48484 11.8921 8.59904 11.8247 8.69542 11.7387C8.7918 11.6526 8.86842 11.5497 8.92073 11.4361C8.97305 11.3224 9 11.2002 9 11.0769C9 10.9535 8.97305 10.8313 8.92073 10.7176C8.86842 10.604 8.7918 10.5011 8.69542 10.4151C8.59904 10.329 8.48484 10.2616 8.35958 10.2168C8.23432 10.1719 8.10054 10.1506 7.96615 10.1541C7.70646 10.1635 7.46082 10.2648 7.28071 10.4367C7.1006 10.6087 7 10.838 7 11.0765C7 11.315 7.1006 11.5443 7.28071 11.7163C7.46082 11.8882 7.70646 11.9902 7.96615 11.9996Z"
                    fill="#000"
                  />
                </svg>
              )}
          </Button>
        );
      },
    },
  ];

  return <Table columns={COLUMNS} data={data} />;
}
