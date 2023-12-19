import { Value, Wrapper, Label, Field, Append } from './styled';

type Props = {
  label: string;
  postfix: string;
};

export function Input({ label, postfix }: Props) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Value>
        <Field />
        <Append>{postfix}</Append>
      </Value>
    </Wrapper>
  );
}
