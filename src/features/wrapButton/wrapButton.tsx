import { useState } from 'react';

import { Button, BUTTON_PRESET } from '@/components/buttons';
import { WrapModal } from '@/features/modals';

export function WrapButton() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => setIsModalVisible(true);

  const hideModal = () => setIsModalVisible(false);

  return (
    <>
      <Button preset={BUTTON_PRESET.PURPLE} onClick={showModal}>
        Wrap/Unwrap
      </Button>
      {isModalVisible && <WrapModal onClose={hideModal} />}
    </>
  );
}
