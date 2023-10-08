import { styled } from 'styled-components';

export const Grid = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6rem;
`;

export const SetupCol = styled.div`
  width: 100%;
  max-width: 82rem;
  display: grid;
  gap: 6.4rem;
`;

export const ConfirmCol = styled.div`
  width: 100%;
  max-width: 38rem;
`;

export const Pairs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  max-width: 73rem;
`;
