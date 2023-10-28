import { Icon, Wrapper } from './styled';
import NotificationIcon from './assets/notifications.svg';

type Props = {
  isUnread?: boolean;
};

export function Button({ isUnread }: Props) {
  return (
    <Wrapper $isUnread={isUnread}>
      <Icon
        src={NotificationIcon}
        alt={'notifications'}
        width={20}
        height={20}
      />
    </Wrapper>
  );
}
