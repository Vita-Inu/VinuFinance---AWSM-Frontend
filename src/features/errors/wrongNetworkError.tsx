import { Button, BUTTON_PRESET } from '@/components/buttons';

import { Buttons, Container, Description, Title, Wrapper } from './components';

export function WrongNetworkError() {
  //TODO:: Adjust text
  return (
    <Wrapper>
      <Container>
        <Title>Wrong network selected</Title>
        <Description>Please connect to Vita Inu network</Description>
        <Buttons>
          <Button preset={BUTTON_PRESET.WHITE}>Switch to Vita Inu</Button>
        </Buttons>
      </Container>
    </Wrapper>
  );
}
