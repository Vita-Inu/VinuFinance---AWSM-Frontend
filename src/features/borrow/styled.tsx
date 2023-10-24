import { styled } from 'styled-components';

export const Grid = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6rem;

  @media (max-width: 1440px) {
    flex-direction: column;
    max-width: 73rem;
    margin: 0 auto;
    gap: 2.4rem;
  }
`;

export const SetupCol = styled.div`
  width: 100%;
  max-width: 82rem;
  display: grid;
  gap: 6.4rem;

  @media (max-width: 1440px) {
    max-width: 100%;
    gap: 3.2rem;
  }
`;

export const ConfirmCol = styled.div`
  width: 100%;
  max-width: 38rem;

  @media (max-width: 1440px) {
    max-width: 100%;
  }
`;
