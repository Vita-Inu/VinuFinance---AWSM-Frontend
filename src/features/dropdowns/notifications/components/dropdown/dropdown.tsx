import { Notification } from '../../types';
import { DropdownEmpty } from '../dropdownEmpty';
import { DropdownList } from '../dropdownList';

import { Wrapper, Box } from './styled';

type Props = {
  notifications: Notification[];
  onArchive: VoidFunction;
};

export function Dropdown({ notifications, onArchive }: Props) {
  return (
    <Wrapper>
      <Box>
        {!!notifications.length && (
          <DropdownList notifications={notifications} onArchive={onArchive} />
        )}
        {!notifications.length && <DropdownEmpty />}
      </Box>
    </Wrapper>
  );
}
