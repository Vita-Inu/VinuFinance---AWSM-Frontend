import { keyframes, styled } from 'styled-components';

export const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Box = styled.div`
  animation: ${rotate} 1s linear infinite;
`;
