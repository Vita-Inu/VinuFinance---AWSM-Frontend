import { Icon, Wrapper } from './styled';
import NotificationIcon from './assets/notifications.svg';

export function Button() {
  return (
    <Wrapper>
      <Icon
        src={NotificationIcon}
        alt={'notifications'}
        width={20}
        height={20}
      />
    </Wrapper>
  );
}
