import { Button } from '@/components/buttons';

import { Buttons, Container, Description, Title, Wrapper } from './components';

export function WrongNetworkError() {
  //TODO:: Adjust text
  return (
    <Wrapper>
      <Container>
        <Title>Wrong network selected</Title>
        <Description>Please connect to Vita Inu network</Description>
        <Buttons>
          <Button background={'#FFF'} text={'#000'}>
            Switch to Vita Inu
          </Button>
        </Buttons>
      </Container>
    </Wrapper>
  );
}
