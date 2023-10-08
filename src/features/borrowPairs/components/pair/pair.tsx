import { Box, Text, Bubbles, Bubble } from './styled';

type Props = {
  pairs: [string, string];
  onClick: VoidFunction;
  active: boolean;
};

export function Pair({ pairs, active, onClick }: Props) {
  return (
    <Box $active={active} role={'button'} onClick={onClick}>
      <Bubbles>
        <Bubble />
        <Bubble />
      </Bubbles>
      <Text>
        Borrow <span>{pairs[0]}</span> against <span>{pairs[1]}</span>
      </Text>
    </Box>
  );
}
