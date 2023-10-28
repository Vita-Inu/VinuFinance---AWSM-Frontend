import { Text, Wrapper, Item, Items, Icon, Copied } from './styled';
import CopyAddressIcon from './assets/copy.svg';
import LogoutIcon from './assets/logout.svg';
import CopyIcon from './assets/copied.svg';

type Props = {
  onCopyAddress: VoidFunction;
  onLogout: VoidFunction;
  isAddressCopied?: boolean;
};

export function Dropdown({ onCopyAddress, onLogout, isAddressCopied }: Props) {
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
          <Copied
            $visible={isAddressCopied}
            src={CopyIcon}
            alt={'copied'}
            width={24}
            height={24}
          />
        </Item>
        <Item role={'button'} onClick={onLogout}>
          <Icon src={LogoutIcon} width={20} height={20} alt={'logout'} />
          <Text>Logout</Text>
        </Item>
      </Items>
    </Wrapper>
  );
}
