import NextImage from 'next/image';

import {
  Text,
  Wrapper,
  Item,
  Items,
  Icon,
  Copied,
  Content,
  Top,
  Close,
  Title,
} from './styled';
import CopyAddressIcon from './assets/copy.svg';
import LogoutIcon from './assets/logout.svg';
import CopyIcon from './assets/copied.svg';
import CloseIcon from './assets/close.svg';

type Props = {
  onCopyAddress: VoidFunction;
  onLogout: VoidFunction;
  onClose: VoidFunction;
  isAddressCopied?: boolean;
};

export function Dropdown({
  onCopyAddress,
  onLogout,
  isAddressCopied,
  onClose,
}: Props) {
  return (
    <Wrapper>
      <Content>
        <Top>
          <Title>Profile</Title>
          <Close onClick={onClose}>
            <NextImage src={CloseIcon} alt={'close'} width={14} height={14} />
          </Close>
        </Top>
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
      </Content>
    </Wrapper>
  );
}
