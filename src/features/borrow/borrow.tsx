import { ChangeEvent, useState } from 'react';

import { Container } from '@/components/container';
import { BorrowConfirm } from '@/features/borrowConfirm';
import { BorrowSettings } from '@/features/borrowSettings';

import { BorrowPairs } from '../borrowPairs';
import { BorrowPledge } from '../borrowPledge';
import { BorrowLoan } from '../borrowLoan';

import { Step } from './components';
import { Grid, SetupCol, ConfirmCol } from './styled';

export function Borrow() {
  const [value, setValue] = useState<string>('0');

  const onValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    const convertedValue = Number(value);

    if (convertedValue < 0) return;

    console.log({ value, convertedValue });

    setValue(value);
  };

  return (
    <Container>
      <Grid>
        <SetupCol>
          <Step stepNo={1} title={'Select Borrow Pair'}>
            <BorrowPairs />
          </Step>
          <Step stepNo={2} title={'Select Pledge Amount'}>
            <BorrowPledge
              value={value}
              onValueChange={onValueChange}
              onMax={() => undefined}
            />
          </Step>
          <Step stepNo={3} title={'Select Loan Option'}>
            <BorrowLoan />
          </Step>
        </SetupCol>
        <ConfirmCol>
          <Step
            stepNo={4}
            title={'Check Details & Confirm'}
            appendItem={<BorrowSettings />}
          >
            <BorrowConfirm />
          </Step>
        </ConfirmCol>
      </Grid>
    </Container>
  );
}
