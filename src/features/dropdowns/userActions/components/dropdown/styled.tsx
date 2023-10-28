import { css, styled } from 'styled-components';
import NextImage from 'next/image';

export const Wrapper = styled.div`
  padding-top: 1.2rem;
`;

export const Items = styled.div`
  width: 28.6rem;
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

export const Copied = styled(NextImage)<{ $visible?: boolean }>`
  margin-left: auto;
  transition: 0.2s ease-in-out;
  opacity: 0;

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
    `}
`;

export const Text = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
`;
