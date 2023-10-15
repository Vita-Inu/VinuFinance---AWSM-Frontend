import { Text, Wrapper, Item, Items, Icon } from './styled';
import CopyAddressIcon from './assets/copy.svg';
import LogoutIcon from './assets/logout.svg';

type Props = {
  onCopyAddress: VoidFunction;
  onLogout: VoidFunction;
};

export function Dropdown({ onCopyAddress, onLogout }: Props) {
  return (
    <Wrapper>
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
