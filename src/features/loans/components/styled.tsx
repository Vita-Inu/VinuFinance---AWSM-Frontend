import { css, styled } from 'styled-components';

export const Wrapper = styled.div``;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4.6rem;

  @media (max-width: 767px) {
    gap: 2.4rem;
  }
`;

export const Filter = styled.div<{ $active?: boolean }>`
  color: rgba(255, 255, 255, 0.4);
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8;
  border-bottom: 0.1rem solid transparent;
  transition: 0.2s ease-in-out;

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }

  &:hover {
    color: #fff;
  }

  ${(props) =>
    props.$active &&
    css`
      pointer-events: none;
      color: #fff;
      border-color: #fff;
    `}
`;

export const List = styled.div`
  margin-top: 4.8rem;

  @media (max-width: 767px) {
    margin-top: 2.4rem;
  }
`;
