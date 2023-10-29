import { useWindowResize } from '@/hooks';

import { Icon, Wrapper } from './styled';
import NotificationIcon from './assets/notifications.svg';

type Props = {
  isUnread?: boolean;
};

export function Button({ isUnread }: Props) {
  const { isTabletSize } = useWindowResize();

  return (
    <Wrapper $isUnread={isUnread}>
      <Icon
        src={NotificationIcon}
        alt={'notifications'}
        width={isTabletSize ? 15 : 20}
        height={isTabletSize ? 15 : 20}
      />
    </Wrapper>
  );
}
