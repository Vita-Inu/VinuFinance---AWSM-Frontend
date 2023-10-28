import { useRef } from 'react';

import { useDropdown } from '@/features/dropdowns/dropdownBase/hooks';

import { DropdownBase } from '../dropdownBase';

import { Button, Dropdown } from './components';
import { useNotifications } from './hooks';

export function Notifications() {
  const { notifications, archiveNotifications } = useNotifications();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isVisible, toggleDropdown, hideDropdown, anchor } =
    useDropdown(dropdownRef);

  return (
    <DropdownBase
      ref={dropdownRef}
      button={<Button />}
      onButtonClick={toggleDropdown}
      dropdown={
        <Dropdown
          notifications={notifications}
          onArchive={archiveNotifications}
          onClose={hideDropdown}
        />
      }
      onClose={hideDropdown}
      dropdownVisible={isVisible}
      dropdownAnchor={anchor}
    />
  );
}
