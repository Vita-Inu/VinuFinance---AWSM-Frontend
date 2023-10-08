import { Box, Rows, Referral, Button, Row } from './components';

const FAKE_DATA = [
  {
    label: 'You Send',
    value: '0 RPL',
    explain: '($0.00)',
    dateTime: null,
  },
  {
    label: 'You Borrow',
    value: '0 rETH',
    explain: '($0.00)',
    dateTime: null,
  },
  {
    label: 'Repayment Amount',
    value: '0 rETH',
    explain: '($0.00)',
    dateTime: null,
  },
  {
    label: 'Due Amount',
    value: null,
    explain: null,
    dateTime: {
      date: 'November 5, 2023',
      time: '12:50 PM',
    },
  },
  {
    label: 'Reclaimable Amount',
    value: '0 RPL',
    explain: '($0.00)',
    dateTime: null,
  },
  {
    label: 'Total Fees',
    value: '0 RPL',
    explain: '0 %',
    dateTime: null,
  },
];

export function BorrowConfirm() {
  return (
    <Box>
      <Rows>
        {FAKE_DATA.map(({ explain, label, value, dateTime }, index) => (
          <Row
            key={index}
            label={label}
            value={value}
            explain={explain}
            dateTime={dateTime}
          />
        ))}
      </Rows>
      <Button />
      <Referral />
    </Box>
  );
}
