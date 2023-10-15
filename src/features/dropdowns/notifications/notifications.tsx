import { DropdownBase } from '../dropdownBase';

import { Button, Dropdown } from './components';
import { useNotifications } from './hooks';

export function Notifications() {
  const { notifications, archiveNotifications } = useNotifications();

  return (
    <DropdownBase
      button={<Button />}
      dropdown={
        <Dropdown
          notifications={notifications}
          onArchive={archiveNotifications}
        />
      }
    />
  );
}
