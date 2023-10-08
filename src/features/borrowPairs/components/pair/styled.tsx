import { css, styled } from 'styled-components';

export const Bubbles = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

export const Bubble = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: #ffffff;

  &:nth-child(2) {
    background-color: #d0d0d0;
    position: absolute;
    top: 0;
    left: 1.6rem;
  }
`;

export const Text = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;

  span {
    color: #fff;
  }
`;

export const Box = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3.6rem;
  padding: 1.4rem 1.6rem;
  border-radius: 0.8rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.15);

  ${(props) =>
    props.$active &&
    css`
      background: #dfcefd;

      ${Text} {
        color: rgba(0, 0, 0, 0.45);

        span {
          color: #000;
        }
      }

      ${Bubble} {
        background-color: #000;

        &:nth-child(1) {
          background-color: #6f6f6f;
        }
      }
    `}
`;
