import { Input, Box } from './styled';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function TextInput({value, onChange}: Props) {
  return (
    <Box>
      <Input value={value} onChange={(evt) => onChange(evt.target.value)} />
    </Box>
  )
}