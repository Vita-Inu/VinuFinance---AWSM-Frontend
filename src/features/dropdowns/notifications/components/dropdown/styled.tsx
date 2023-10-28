import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 1.2rem;

  @media (max-width: 1023px) {
    padding-top: 0;
  }
`;

export const Box = styled.div`
  width: 46.3rem;
  height: 37.1rem;
  padding: 2.4rem;
  border-radius: 1.2rem;
  background: #332a3f;

  @media (max-width: 1023px) {
    border-radius: 0.8rem 0.8rem 0 0;
    width: 100%;
    height: 43.1rem;
  }
`;
