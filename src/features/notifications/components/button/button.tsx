import { Icon, Wrapper } from './styled';
import NotificationIcon from './assets/notifications.svg';

type Props = {
  onClick: VoidFunction;
};

export function Button({ onClick }: Props) {
  return (
    <Wrapper role={'button'} onClick={onClick}>
      <Icon
        src={NotificationIcon}
        alt={'notifications'}
        width={20}
        height={20}
      />
    </Wrapper>
  );
}
