import { css, styled } from 'styled-components';

export const Wrapper = styled.div<{ $active?: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  padding-top: 2.3rem;
  pointer-events: none;
  opacity: 0;
  z-index: 2;

  @media (max-width: 1023px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    flex-direction: column;
    padding-top: 0;
  }

  ${(props) =>
    props.$active &&
    css`
      opacity: 1;
      pointer-events: auto;
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

export const Inner = styled.div`
  width: 46.3rem;
  padding: 2.4rem;
  border-radius: 1.2rem;
  background: #332a3f;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;

  @media (max-width: 1023px) {
    width: 100%;
    margin-top: auto;
    border-radius: 0.8rem 0.8rem 0 0;
  }
`;
