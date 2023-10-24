import { css, styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 2.4rem 0;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.15);

  &:first-child {
    padding-top: 0;
  }
`;

export const Cells = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5rem;
  row-gap: 1.2rem;
`;

export const Cell = styled.div<{ $fullWidth?: boolean }>`
  ${(props) =>
    props.$fullWidth &&
    css`
      grid-column: span 2;
    `}
`;

export const Label = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
  margin-bottom: 0.4rem;
`;

export const Value = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
`;

export const Explain = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8;
`;

export const Buttons = styled.div`
  margin-top: 1.2rem;
`;
