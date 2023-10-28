import { useEffect, useRef, useState } from 'react';

import { useDropdown } from '@/features/dropdowns/dropdownBase/hooks';

import { DropdownBase } from '../dropdownBase';

import { Button, Dropdown } from './components';
import { useNotifications } from './hooks';

export function Notifications() {
  const [isLoading, setIsLoading] = useState(false);

  const { notifications, archiveNotifications } = useNotifications();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isVisible, toggleDropdown, hideDropdown, anchor } =
    useDropdown(dropdownRef);

  //NOTE: Fake loading state
  useEffect(() => {
    if (!isVisible) return;

    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isVisible]);

  return (
    <DropdownBase
      ref={dropdownRef}
      button={<Button isUnread={!!notifications.length} />}
      onButtonClick={toggleDropdown}
      dropdown={
        <Dropdown
          notifications={notifications}
          onArchive={archiveNotifications}
          onClose={hideDropdown}
          isLoading={isLoading}
        />
      }
      onClose={hideDropdown}
      dropdownVisible={isVisible}
      dropdownAnchor={anchor}
    />
  );
}
