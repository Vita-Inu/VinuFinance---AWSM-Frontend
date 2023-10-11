import { styled } from 'styled-components';

import { aeonik } from '@/fonts';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 2.4rem;
  border-radius: 1.2rem;
  background: rgba(223, 206, 253, 0.15);
  max-width: 73rem;
`;

export const Box = styled.div``;

export const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
`;

export const Value = styled.input`
  ${aeonik.style}
  color: #fff;
  font-size: 3.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.108rem;
  -moz-appearance: textfield;
  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  margin: 0;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Currency = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 3.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.108rem;
`;

export const Fiat = styled.div`
  margin-top: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.048rem;
`;

export const Helpers = styled.div`
  display: flex;
  align-content: center;
  gap: 0.8rem;
`;

export const Balance = styled.div`
  padding: 0.6rem 1.6rem;
  border-radius: 10rem;
  background: rgba(223, 206, 253, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.048rem;
`;
