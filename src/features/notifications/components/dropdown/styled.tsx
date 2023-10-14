import { css, styled } from 'styled-components';

export const Wrapper = styled.div<{ $visible?: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-2rem);
  transition: 0.2s ease-in-out;
  padding-top: 1.2rem;

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: none;
    `}
`;

export const Box = styled.div`
  width: 46.3rem;
  height: 37.1rem;
  padding: 2.4rem;
  border-radius: 1.2rem;
  background: #332a3f;
`;
