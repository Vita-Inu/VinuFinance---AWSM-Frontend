import { css, styled } from 'styled-components';
import NextImage from 'next/image';

export const Text = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
`;

export const Append = styled(NextImage)`
  opacity: 0.3;
`;

export const Wrapper = styled.div<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.6rem 1.2rem 0.6rem 1.8rem;
  border-radius: 1.2rem;
  background: rgba(127, 122, 131, 0.2);
  cursor: pointer;

  ${(props) =>
    props.$active &&
    css`
      ${Append} {
        opacity: 1;
      }
    `}
`;
