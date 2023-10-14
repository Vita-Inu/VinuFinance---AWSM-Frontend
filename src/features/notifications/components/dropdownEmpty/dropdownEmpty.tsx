import { Title, Wrapper, Icon, Description } from './styled';
import SuccessIcon from './assets/success.svg';

export function DropdownEmpty() {
  return (
    <Wrapper>
      <Icon src={SuccessIcon} alt={'success icon'} width={64} height={64} />
      <Title>No new notifications</Title>
      <Description>You all caught up!</Description>
    </Wrapper>
  );
}
