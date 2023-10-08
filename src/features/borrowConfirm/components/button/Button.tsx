import { Button as DefaultButton, BUTTON_PRESET } from '@/components/buttons';

import { Wrapper } from './styled';

export function Button() {
  return (
    <Wrapper>
      <DefaultButton preset={BUTTON_PRESET.PINK} disabled={true}>
        Send Borrow
      </DefaultButton>
    </Wrapper>
  );
}
