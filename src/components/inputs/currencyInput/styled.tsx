import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.1rem;
`;

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

export const Input = styled.input.attrs({ type: 'number' })`
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

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
  }
`;

export const Appendix = styled.div`
  color: rgba(255, 255, 255, 0.3);
  font-family: Aeonik, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
`;

export const Button = styled.div`
  flex-shrink: 0;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  background: #dfcefd;
  color: #000;
  font-family: Aeonik, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background: #c4a3ff;
  }
`;
