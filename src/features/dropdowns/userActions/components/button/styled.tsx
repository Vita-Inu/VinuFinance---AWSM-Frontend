import { styled } from 'styled-components';
import NextImage from 'next/image';

export const Wrapper = styled.div`
  padding: 1.1rem 1.8rem 1.1rem 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  border-radius: 10rem;
  background-color: transparent;
  border: 0.1rem solid rgba(255, 255, 255, 0.15);
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const Text = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
`;

export const Arrow = styled(NextImage)``;
