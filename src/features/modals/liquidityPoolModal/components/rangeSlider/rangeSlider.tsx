import {
  Slider,
  Box,
  Wrapper,
  Label,
  Value,
  Bubble,
} from './rangeSlider.styled';

type Props = {
  value: number;
  onChange: (val: number) => void;
};

export function RangeSlider({ onChange, value }: Props) {
  return (
    <Wrapper>
      <Value>
        <Label>Lorem Ipsum</Label>
        <Bubble>{value}%</Bubble>
      </Value>
      <Box>
        <Slider
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(val) => onChange(Array.isArray(val) ? val[0] : val)}
        />
      </Box>
    </Wrapper>
  );
}
