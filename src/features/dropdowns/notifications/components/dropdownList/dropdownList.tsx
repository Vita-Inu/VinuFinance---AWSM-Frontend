import { v4 as uuidV4 } from 'uuid';
import NextImage from 'next/image';

import { Button, BUTTON_PRESET } from '@/components/buttons';

import CloseIcon from '../../assets/close.svg';
import { Notification } from '../../types';

import {
  Buttons,
  Date,
  Icon,
  Item,
  Items,
  Texts,
  Title,
  Wrapper,
  Top,
  Close,
  Heading,
} from './styled';

type Props = {
  notifications: Notification[];
  onArchive: VoidFunction;
  onClose: VoidFunction;
};

export function DropdownList({ notifications, onArchive, onClose }: Props) {
  return (
    <Wrapper>
      <Top>
        <Heading>Notifications</Heading>
        <Close onClick={onClose}>
          <NextImage src={CloseIcon} alt={'close'} width={14} height={14} />
        </Close>
      </Top>
      <Items>
        {notifications.map(({ icon, title, date }) => (
          <Item key={uuidV4()}>
            <Icon $icon={icon} />
            <Texts>
              <Title>{title}</Title>
              <Date>{date}</Date>
            </Texts>
          </Item>
        ))}
      </Items>
      <Buttons>
        <Button preset={BUTTON_PRESET.PURPLE} onClick={onArchive}>
          Archive All
        </Button>
      </Buttons>
    </Wrapper>
  );
}
