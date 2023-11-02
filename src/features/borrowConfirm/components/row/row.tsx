import { DateTime } from '../dateTime';

import { Wrapper, Value, ValueBox, Label, Explain } from './styled';

type Props = {
  label: string;
  value: string | null;
  explain: string | null;
  dateTime: Date | null;
};

export function Row({ explain, label, value, dateTime }: Props) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <ValueBox>
        {value && <Value>{value}</Value>}
        {explain && <Explain>{explain}</Explain>}
        {dateTime && <DateTime date={dateTime}/>}
      </ValueBox>
    </Wrapper>
  );
}
