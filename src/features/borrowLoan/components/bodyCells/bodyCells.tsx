import NextImage from 'next/image';

import { BodyCell, Value, Explain } from './styled';

type Props = {
  active?: boolean;
};

export function BodyCells({ active }: Props) {
  return (
    <>
      <BodyCell>
        {active && (
          <NextImage
            width={24}
            height={24}
            src={'/borrow/check.svg'}
            alt={'check icon'}
          />
        )}
      </BodyCell>
      <BodyCell>
        <Value>90 days</Value>
      </BodyCell>
      <BodyCell>
        <Value>0 rETH</Value>
        <Explain>Min. Loan: 0.1 rETH</Explain>
      </BodyCell>
      <BodyCell>
        <Value>0 rETH</Value>
        <Explain>Int. Cost: 0 rETH</Explain>
      </BodyCell>
      <BodyCell>
        <Value>0%</Value>
        <Explain>APR: 0%</Explain>
      </BodyCell>
      <BodyCell>
        <Value>0%</Value>
      </BodyCell>
      <BodyCell>
        <Value>0.011354088 rETH</Value>
        <Explain>Max. LTV: 81.8%</Explain>
      </BodyCell>
    </>
  );
}
