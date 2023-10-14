import { css, styled } from 'styled-components';
import NextImage from 'next/image';

export const Wrapper = styled.div<{ $visible?: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 28.6rem;
  padding-top: 1.2rem;
  transition: 0.2s ease-in-out;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-2rem);

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: none;
    `}
`;

export const Items = styled.div`
  border-radius: 1.2rem;
  background: #332a3f;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.2rem;
  padding: 1.2rem;
  transition: 0.2s ease-in-out;
  border-radius: 0.8rem;
  background: transparent;

  &:hover {
    background: #493c5b;
  }
`;

export const Icon = styled(NextImage)``;

export const Text = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
`;
