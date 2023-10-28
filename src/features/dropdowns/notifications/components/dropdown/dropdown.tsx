import { Notification } from '../../types';
import { DropdownEmpty } from '../dropdownEmpty';
import { DropdownList } from '../dropdownList';

import { Wrapper, Box, Loader } from './styled';

type Props = {
  notifications: Notification[];
  onArchive: VoidFunction;
  onClose: VoidFunction;
  isLoading?: boolean;
};

export function Dropdown({
  notifications,
  onArchive,
  onClose,
  isLoading,
}: Props) {
  return (
    <Wrapper>
      <Box>
        {!!notifications.length && (
          <DropdownList
            notifications={notifications}
            onArchive={onArchive}
            onClose={onClose}
          />
        )}
        {!notifications.length && <DropdownEmpty />}
        {isLoading && <Loader />}
      </Box>
    </Wrapper>
  );
}
