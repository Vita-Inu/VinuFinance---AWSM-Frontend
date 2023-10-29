import { keyframes, styled } from 'styled-components';

import LoaderIcon from '../../assets/loader.svg';

export const Wrapper = styled.div`
  padding-top: 1.2rem;

  @media (max-width: 1023px) {
    padding-top: 0;
  }
`;

export const Box = styled.div`
  width: 46.3rem;
  padding: 2.4rem;
  border-radius: 1.2rem;
  background: #332a3f;
  position: relative;
  overflow: hidden;

  @media (max-width: 1023px) {
    border-radius: 0.8rem 0.8rem 0 0;
    width: 100%;
  }
`;

const loaderAnimation = keyframes`
  from {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }

  to {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
`;

export const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(6px);
  border-radius: 0.8rem;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4.2rem;
    height: 4.2rem;
    background-image: url(${LoaderIcon.src});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    animation: ${loaderAnimation} 1s linear infinite;
  }
`;
