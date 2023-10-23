import { css, styled } from 'styled-components';

export const Wrapper = styled.div``;

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
