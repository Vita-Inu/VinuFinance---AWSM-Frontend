import { styled } from 'styled-components';

const Box = styled.div``;

const Value = styled.div`
  color: rgba(255, 255, 255, 0.65);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 300;
  line-height: 1.4;
`;

type Props = {
  date: string;
  time: string;
};

export function DateTime({ time, date }: Props) {
  return (
    <Box>
      <Value>{date}</Value>
      <Value>{time}</Value>
    </Box>
  );
}
