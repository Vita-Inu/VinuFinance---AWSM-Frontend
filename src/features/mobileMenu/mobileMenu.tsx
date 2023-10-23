import { useState } from 'react';

import { Burger, Modal, Menu } from './components';

export function MobileMenu() {
  const [visible, setVisible] = useState<boolean>(false);

  const openModal = () => setVisible(true);

  const closeModal = () => setVisible(false);

  return (
    <>
      <Burger onClick={openModal} />
      {visible && (
        <Modal onClose={closeModal}>
          <Menu />
        </Modal>
      )}
    </>
  );
}
