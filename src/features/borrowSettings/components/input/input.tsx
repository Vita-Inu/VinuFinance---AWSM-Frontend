import { Value, Wrapper, Label } from './styled';

type Props = {
  label: string;
};

export function Input({ label }: Props) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Value />
    </Wrapper>
  );
}
