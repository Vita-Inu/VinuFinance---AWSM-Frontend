import { css, styled } from 'styled-components';

export const Wrapper = styled.div<{ $active?: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  padding-top: 2.3rem;
  pointer-events: none;
  opacity: 0;
  z-index: 2;

  ${(props) =>
    props.$active &&
    css`
      opacity: 1;
      pointer-events: none;
    `}
`;

export const Inner = styled.div`
  width: 46.3rem;
  min-height: 43rem;
  padding: 2.4rem;
  border-radius: 1.2rem;
  background: #332a3f;
  display: flex;
  flex-direction: column;
`;
