import { useState } from 'react';

import { Button, BUTTON_PRESET } from '@/components/buttons';
import { LoginModal } from '@/features/modals';

export function ConnectButton() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => setIsModalVisible(true);

  const hideModal = () => setIsModalVisible(false);

  return (
    <>
      <Button preset={BUTTON_PRESET.PINK} onClick={showModal}>
        Connect Wallet
      </Button>
      {isModalVisible && <LoginModal onClose={hideModal} />}
    </>
  );
}
