import { styled } from 'styled-components';

import { aeonik } from '@/fonts';

export const Wrapper = styled.div`
  padding: 2.4rem;
  border-radius: 1.2rem;
  background: rgba(223, 206, 253, 0.15);
  max-width: 73rem;

  @media (max-width: 767px) {
    padding: 1.8rem;
  }
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
  width: 100%;
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

  @media (max-width: 767px) {
    font-size: 2.4rem;
  }

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

  @media (max-width: 767px) {
    font-size: 2.4rem;
  }
`;

export const Fiat = styled.div`
  margin-top: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.048rem;

  @media (max-width: 767px) {
    font-size: 1.4rem;
  }
`;

export const Helpers = styled.div`
  display: flex;
  align-content: center;
  gap: 0.8rem;
  margin-top: 0.8rem;
  justify-content: flex-end;
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

  @media (max-width: 767px) {
    font-size: 1.4rem;
  }
`;
