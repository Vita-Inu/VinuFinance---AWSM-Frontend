import { Notification } from '../../types';
import { DropdownEmpty } from '../dropdownEmpty';
import { DropdownList } from '../dropdownList';

import { Wrapper, Box } from './styled';

type Props = {
  notifications: Notification[];
  onArchive: VoidFunction;
  visible?: boolean;
};

export function Dropdown({ visible, notifications, onArchive }: Props) {
  return (
    <Wrapper $visible={visible}>
      <Box>
        {!!notifications.length && (
          <DropdownList notifications={notifications} onArchive={onArchive} />
        )}
        {!notifications.length && <DropdownEmpty />}
      </Box>
    </Wrapper>
  );
}
