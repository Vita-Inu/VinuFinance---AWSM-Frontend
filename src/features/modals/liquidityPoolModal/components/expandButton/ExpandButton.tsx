import { ReactNode } from 'react';

import {Wrapper, Text, Arrow} from "./ExpandButton.styled"

type Props = {
  children: ReactNode
  expanded: boolean
  onClick: VoidFunction
}

export function ExpandButton({children, expanded, onClick}: Props) {
  return (
    <Wrapper onClick={onClick}>
      <Text>{children}</Text>
      <Arrow $expanded={expanded}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 8.5L10 13.5L15 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Arrow>
    </Wrapper>
  )
}