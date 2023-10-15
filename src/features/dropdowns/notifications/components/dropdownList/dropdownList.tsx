import { v4 as uuidV4 } from 'uuid';

import { Button, BUTTON_PRESET } from '@/components/buttons';

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
} from './styled';

type Props = {
  notifications: Notification[];
  onArchive: VoidFunction;
};

export function DropdownList({ notifications, onArchive }: Props) {
  return (
    <Wrapper>
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
