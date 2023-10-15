import { css, styled } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  z-index: 3;
`;

export const Button = styled.div``;

export const Dropdown = styled.div<{ $visible?: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  transition: 0.2s ease-in-out;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-2rem);

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: none;
    `}
`;
