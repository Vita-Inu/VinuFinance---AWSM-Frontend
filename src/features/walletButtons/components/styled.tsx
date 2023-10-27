import { css, keyframes, styled } from 'styled-components';
import NextImage from 'next/image';

import LoaderIcon from '../assets/loader.svg';

export const Button = styled.div<{ $disabled?: boolean; $loading?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2.4rem;
  gap: 1rem;
  border-radius: 3rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.15);
  transition: 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  will-change: opacity, background;

  ${(props) =>
    props.$disabled &&
    css`
      pointer-events: none;
      opacity: 0.7;
    `}

  ${(props) =>
    !props.$disabled &&
    css`
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: transparent;
      }
    `}

  ${(props) =>
    props.$loading &&
    css`
      pointer-events: none;
    `}
`;

export const Icon = styled(NextImage)``;

export const Text = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem;
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
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0.6rem);
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3.2rem;
    height: 3.2rem;
    background-image: url(${LoaderIcon.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    animation: ${loaderAnimation} 1s linear infinite;
  }
`;
