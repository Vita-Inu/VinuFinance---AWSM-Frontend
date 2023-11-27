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
    date: Date;
}

export function DateTime({date}: Props) {
  return (
    <Box>
      <Value>{date.toDateString()}</Value>
      <Value>{date.toLocaleTimeString()}</Value>
    </Box>
  );
}
