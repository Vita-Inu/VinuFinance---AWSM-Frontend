import { Value, Wrapper, Label, Field, Append } from './styled';

type Props = {
  label: string;
  postfix: string;
  onChange: (value: string) => void
  value: string
};

export function Input({ label, postfix, onChange, value }: Props) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Value>
        <Field value={value} onChange={(evt) => onChange(evt.target.value)} />
        <Append>{postfix}</Append>
      </Value>
    </Wrapper>
  );
}
