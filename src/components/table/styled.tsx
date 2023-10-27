import { css, styled } from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const Head = styled.thead``;

export const Body = styled.tbody``;

export const Row = styled.tr<{ $clickable?: boolean }>`
  &:not(:first-child) {
    border-top: 0.1rem solid rgba(255, 255, 255, 0.15);
  }

  ${(props) =>
    props.$clickable &&
    css`
      cursor: pointer;
    `}
`;

export const HeadCell = styled.th`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
  text-align: left;
  padding: 0 1.6rem;

  &:first-child {
    padding-left: 0;
  }
`;

export const BodyCell = styled.td`
  vertical-align: top;
  padding: 2.4rem 1.6rem;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;

export const Value = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
`;

export const Explain = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 300;
  line-height: 180%;
`;
