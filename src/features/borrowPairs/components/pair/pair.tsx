import { Box, Text, Bubbles, Bubble } from './styled';

type Props = {
  pairs: [string, string];
  onClick: Function;
  active: boolean;
  id: number;
};

export function Pair({ pairs, active, onClick, id }: Props) {
  return (
    <Box $active={active} role={'button'} onClick={() => onClick(id)}>
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
