import { css, styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
`

export const Text = styled.div`
  color: #FFF;
  font-family: Aeonik, sans-serif;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
`;

export const Arrow = styled.div<{$expanded: boolean}>`
  ${props => props.$expanded && css`
    transform: rotate(180deg);
  `}
`;