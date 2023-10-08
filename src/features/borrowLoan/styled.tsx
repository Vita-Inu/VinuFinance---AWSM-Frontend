import { styled } from 'styled-components';

export const Box = styled.div``;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const Head = styled.thead``;

export const Body = styled.tbody``;

export const Row = styled.tr`
  &:not(:first-child) {
    border-top: 0.1rem solid rgba(255, 255, 255, 0.15);
  }
`;

export const HeadCell = styled.th`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 180%;
  text-align: left;
  padding: 0 1.6rem;
`;
