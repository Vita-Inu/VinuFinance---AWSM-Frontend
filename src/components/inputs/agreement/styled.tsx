import { css, styled } from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
`;

export const Box = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  margin-top: 0.4rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 2;
`;

export const BoxBackground = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.4rem;
`;

export const BoxMark = styled.div<{ $checked?: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.4rem;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
  transition: 0.2s ease-in-out;

  ${(props) =>
    props.$checked &&
    css`
      transform: scale(0.8);
    `}
`;

export const Description = styled.div`
  color: rgba(255, 255, 255, 0.65);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;
