import { Button, BUTTON_PRESET } from '@/components/buttons';
import { ROUTE } from '@/utils';

import {
  Buttons,
  Container,
  Description,
  Title,
  Wrapper,
  Text,
  Link,
} from './components';

export function PageNotFound() {
  return (
    <Wrapper>
      <Container>
        <Title>Oops!</Title>
        <Text>404 page not found</Text>
        <Description>
          You didn’t break the internet, but we can’t find what you are looking
          for.
        </Description>
        <Buttons>
          <Link href={ROUTE.HOME}>
            <Button preset={BUTTON_PRESET.PINK}>Take me back</Button>
          </Link>
        </Buttons>
      </Container>
    </Wrapper>
  );
}
