import { useState } from 'react';

import { Button } from '@/components/buttons';

import { Popup, Input, Box, Icon, Title, Buttons, Inputs } from './components';
import SettingsIcon from './assets/settings.svg';

export function BorrowSettings() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Box>
      <Icon
        src={SettingsIcon}
        alt={'settings'}
        width={20}
        height={20}
        role={'button'}
        onClick={() => setShowModal((prevState) => !prevState)}
      />
      <Popup visible={showModal}>
        <Title>Transaction Settings</Title>
        <Inputs>
          <Input label={'Slippage Tolerance Loan Amount'} />
          <Input label={'Transaction Deadline'} />
        </Inputs>
        <Buttons>
          <Button>Apply</Button>
        </Buttons>
      </Popup>
    </Box>
  );
}
