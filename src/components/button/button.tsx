import styled from "styled-components";
import {PropsWithChildren} from "react";

type Props = {
    background?: string
    text?: string
}

const StyledButton = styled.div<Props>`
  padding: 1.2rem 2.4rem;
  border-radius: 3rem;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  background: ${props => props.background ?? props.theme.colors.white};
  color: ${props => props.text ?? props.theme.colors.black};
`

export const Button = (props: PropsWithChildren<Props>) => <StyledButton {...props} role={'button'}/>