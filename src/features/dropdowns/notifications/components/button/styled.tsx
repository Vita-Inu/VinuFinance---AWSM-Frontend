import { styled } from 'styled-components';
import NextImage from 'next/image';

export const Wrapper = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  border: 0.1rem solid rgba(255, 255, 255, 0.15);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const Icon = styled(NextImage)``;
