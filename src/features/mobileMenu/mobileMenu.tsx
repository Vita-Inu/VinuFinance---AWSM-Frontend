import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Burger, Modal, Menu } from './components';

export function MobileMenu() {
  const [visible, setVisible] = useState<boolean>(false);

  const router = useRouter();

  const openModal = () => setVisible(true);

  const closeModal = () => setVisible(false);

  useEffect(() => {
    router.events.on('routeChangeStart', closeModal);

    return () => router.events.off('routeChangeStart', closeModal);
  }, [router.events]);

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
