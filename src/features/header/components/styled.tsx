import { styled, css } from 'styled-components';

export const Wrapper = styled.header`
  padding: 0 0 10.4rem;

  @media (max-width: 767px) {
    padding: 0 0 4.8rem;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Menu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  gap: 1.6rem;
  border-radius: 3rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.15);

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const MenuItem = styled.span<{ $active: boolean }>`
  padding: 0.4rem 1.2rem;
  border-radius: 3rem;
  background: transparent;
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  transition: 0.2s ease-in-out;

  &:hover {
    background: #38313f;
  }

  ${(props) =>
    props.$active &&
    css`
      background: #38313f;
    `}
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;

  @media (max-width: 1023px) {
    display: none;
  }
`;
