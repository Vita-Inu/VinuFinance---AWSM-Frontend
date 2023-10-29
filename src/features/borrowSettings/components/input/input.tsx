import { Value, Wrapper, Label, Field, Append } from './styled';

type Props = {
  label: string;
};

export function Input({ label }: Props) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Value>
        <Field />
        <Append>%</Append>
      </Value>
    </Wrapper>
  );
}
