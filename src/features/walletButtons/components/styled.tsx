import { css, styled } from 'styled-components';
import NextImage from 'next/image';

export const Button = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2.4rem;
  gap: 1rem;
  border-radius: 3rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.15);
  transition: 0.2s ease-in-out;

  ${(props) =>
    props.$disabled &&
    css`
      pointer-events: none;
      opacity: 0.7;
    `}

  ${(props) =>
    !props.$disabled &&
    css`
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: transparent;
      }
    `}
`;

export const Icon = styled(NextImage)``;

export const Text = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.4rem;
`;
