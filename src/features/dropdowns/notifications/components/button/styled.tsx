import { css, styled } from 'styled-components';
import NextImage from 'next/image';

export const Wrapper = styled.div<{ $isUnread?: boolean }>`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  border: 0.1rem solid rgba(255, 255, 255, 0.15);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
  position: relative;

  @media (max-width: 1023px) {
    width: 2.6rem;
    height: 2.6rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  ${(props) =>
    props.$isUnread &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 1.2rem;
        height: 1.2rem;
        background-color: #fe5f55;
        border-radius: 50%;

        @media (max-width: 1023px) {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
    `}
`;

export const Icon = styled(NextImage)``;
