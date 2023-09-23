import styled, {css} from "styled-components";

export const Wrapper = styled.header`
  padding: 0 0 10.4rem;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Menu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  gap: 1.6rem;
  border-radius: 3rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.15);
`

export const MenuItem = styled.span<{$active: boolean}>`
  padding: 0.4rem 1.2rem;
  border-radius: 3rem;
  background: transparent;
  color: ${props => props.theme.colors.white};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  
  ${props => props.$active && css`
    background: ${props => props.theme.colors.darkGrey};
  `}
`