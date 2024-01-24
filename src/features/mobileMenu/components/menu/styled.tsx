import { css, styled } from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Content = styled.div`
  margin: auto 0;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;

export const Item = styled.span<{ $active?: boolean }>`
  color: #fff;
  font-size: 3.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  padding: 1.2rem 2.4rem;
  border-radius: 10rem;
  transition: 0.2s ease-in-out;
  display: block;

  &:hover {
    background-color: #38313f;
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: #38313f;
    `}
`;

export const Bottom = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
  flex-wrap: wrap;
`;
