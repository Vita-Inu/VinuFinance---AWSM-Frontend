import { useEffect, useRef } from 'react';

import { Button, Dropdown, Wrapper } from './components';
import { useDropdown, useNotifications } from './hooks';

export function Notifications() {
  const notificationRef = useRef<HTMLDivElement>(null);

  const { isVisible, toggleDropdown, hideDropdown, eventHandler } =
    useDropdown(notificationRef);

  const { notifications, archiveNotifications } = useNotifications();

  useEffect(() => {
    window.addEventListener('mousedown', eventHandler);

    return () => {
      window.removeEventListener('mousedown', eventHandler);
    };
  }, [eventHandler, hideDropdown]);

  return (
    <Wrapper ref={notificationRef}>
      <Button onClick={toggleDropdown} />
      <Dropdown
        visible={isVisible}
        notifications={notifications}
        onArchive={archiveNotifications}
      />
    </Wrapper>
  );
}
