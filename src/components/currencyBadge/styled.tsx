import { styled } from 'styled-components';
import NextImage from 'next/image';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.2rem;
`;

export const Bubble = styled(NextImage)`
  border-radius: 50%;
  background: #6f6f6f;
`;

export const Text = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
`;
