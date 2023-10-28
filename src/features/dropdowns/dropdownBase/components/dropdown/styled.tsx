import { css, styled } from 'styled-components';

export const Wrapper = styled.div<{ $visible?: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  transition: 0.2s ease-in-out;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-2rem);

  @media (max-width: 1023px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    transform: translateY(0);
    display: flex;
    flex-direction: column;
  }

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: none;
    `}
`;

export const Background = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;

  @media (max-width: 1023px) {
    display: block;
  }
`;

export const Box = styled.div<{ $visible?: boolean }>`
  position: relative;
  z-index: 1;

  @media (max-width: 1023px) {
    margin-top: auto;
  }
`;
