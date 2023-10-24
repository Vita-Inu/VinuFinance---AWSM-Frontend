import { styled } from 'styled-components';

export const Pairs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  max-width: 73rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;
