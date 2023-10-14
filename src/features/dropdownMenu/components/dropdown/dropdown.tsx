import { Text, Wrapper, Item, Items, Icon } from './styled';
import CopyAddressIcon from './assets/copy.svg';
import LogoutIcon from './assets/logout.svg';

type Props = {
  onHoverIn: VoidFunction;
  onHoverOut: VoidFunction;
  onCopyAddress: VoidFunction;
  onLogout: VoidFunction;
  visible?: boolean;
};

export function Dropdown({
  onCopyAddress,
  onLogout,
  visible,
  onHoverIn,
  onHoverOut,
}: Props) {
  return (
    <Wrapper
      $visible={visible}
      onMouseOver={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <Items>
        <Item role={'button'} onClick={onCopyAddress}>
          <Icon
            src={CopyAddressIcon}
            width={20}
            height={20}
            alt={'copy address'}
          />
          <Text>Copy Address</Text>
        </Item>
        <Item role={'button'} onClick={onLogout}>
          <Icon src={LogoutIcon} width={20} height={20} alt={'logout'} />
          <Text>Logout</Text>
        </Item>
      </Items>
    </Wrapper>
  );
}
