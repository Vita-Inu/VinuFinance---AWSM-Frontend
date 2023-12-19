import { css, styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 0.8rem;
  border-radius: 3rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.15);
  display: inline-block;
`;

export const Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
`;

export const Item = styled.div<{$active?: boolean}>`
  padding: 4px 12px;
  border-radius: 30px;
  background: transparent;
  transition: .2s ease-in-out;
  color: #FFF;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  
  &:hover {
    background: #38313F;
  }
  
  ${props => props.$active && css`
    background: #38313F;
  `}
`;