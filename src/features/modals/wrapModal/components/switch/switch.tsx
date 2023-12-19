import { Item, Items, Wrapper } from './styled';

export type SwitchOption = {
  value: string;
  label: string;
};

type Props = {
  options: [SwitchOption, SwitchOption];
  value: string | null;
  onChange: (value: string) => void;
};

export function Switch({ options, value, onChange }: Props) {
  const matchedOption = options.find((option) => option.value === value);

  return (
    <Wrapper>
      <Items>
        {options.map(({ label, value }) => (
          <Item
            key={value}
            $active={value === matchedOption?.value}
            onClick={() => onChange(value)}
          >
            {label}
          </Item>
        ))}
      </Items>
    </Wrapper>
  );
}
