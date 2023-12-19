import { styled } from 'styled-components';

import { Button as RawButton } from '@/components/buttons';

export const Wrapper = styled.div`

`;

export const SwitchBox = styled.div`

`

export const InputBox = styled.div`
  margin-top: 2.4rem;
`

export const Buttons = styled.div`
  margin-top: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const Button = styled(RawButton)`
  width: 50%;

  @media (max-width: 767px) {
    width: 100%;
  }
`