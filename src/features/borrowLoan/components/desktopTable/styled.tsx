import { css, styled } from 'styled-components';

export const CheckBox = styled.div<{ $active?: boolean; $hovered?: boolean }>`
  opacity: 0.2;
  transition: 0.2s ease-in-out;

  ${(props) =>
    props.$hovered &&
    css`
      opacity: 0.7;
    `}

  ${(props) =>
    props.$active &&
    css`
      opacity: 1;
    `}
`;
