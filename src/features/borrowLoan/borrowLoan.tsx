import { Box, Row, Head, Table, Body, HeadCell } from './styled';
import { BodyCells } from './components';

export function BorrowLoan() {
  return (
    <Box>
      <Table>
        <Head>
          <Row>
            <HeadCell></HeadCell>
            <HeadCell>Borrowing Period</HeadCell>
            <HeadCell>Loan Amount</HeadCell>
            <HeadCell>Repayment Amount</HeadCell>
            <HeadCell>Term Rate</HeadCell>
            <HeadCell>LTV</HeadCell>
            <HeadCell>Max. Loan Per Coll Unit</HeadCell>
          </Row>
        </Head>
        <Body>
          <Row>
            <BodyCells active />
          </Row>
          <Row>
            <BodyCells />
          </Row>
        </Body>
      </Table>
    </Box>
  );
}
