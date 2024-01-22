import { styled } from 'styled-components';

export const Box = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
`;

export const Input = styled.input.attrs({ type: 'text' })`
  width: 100%;
  color: #fff;
  font-family: Aeonik, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  background: transparent;
  border: none;
  -moz-appearance: textfield;

  &:focus {
    outline: none;
  }
`;