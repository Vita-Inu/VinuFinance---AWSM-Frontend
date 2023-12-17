import { css, styled } from 'styled-components';

export const Text = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
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
    `}
`;
