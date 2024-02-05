import {useSwitchNetwork} from 'wagmi'

import { Button, BUTTON_PRESET } from '@/components/buttons';
import { vinuChain } from '@/const';

import { Buttons, Container, Description, Title, Wrapper } from './components';

export function WrongNetworkError() {

  const { switchNetwork, isLoading } = useSwitchNetwork({chainId: vinuChain.id})

  return (
    <Wrapper>
      <Container>
        <Title>Wrong network selected</Title>
        <Description>Please connect to Vita Inu network</Description>
        <Buttons>
          <Button preset={BUTTON_PRESET.WHITE} onClick={() => switchNetwork?.()} loading={isLoading}>Switch to Vita Inu</Button>
        </Buttons>
      </Container>
    </Wrapper>
  );
}
