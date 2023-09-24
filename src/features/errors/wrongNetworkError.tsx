import { useTheme } from 'styled-components';

import { Button } from '@/components/buttons';

import { Buttons, Container, Description, Title, Wrapper } from './components';

export function WrongNetworkError() {
  const { colors } = useTheme();

  //TODO:: Adjust text
  return (
    <Wrapper>
      <Container>
        <Title>Wrong network selected</Title>
        <Description>Please connect to Vita Inu network</Description>
        <Buttons>
          <Button background={colors.white} text={colors.black}>
            Switch to Vita Inu
          </Button>
        </Buttons>
      </Container>
    </Wrapper>
  );
}
