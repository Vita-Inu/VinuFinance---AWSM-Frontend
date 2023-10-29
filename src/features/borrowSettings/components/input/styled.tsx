import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Label = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
`;

export const Value = styled.div`
  flex-shrink: 0;
  width: 13.2rem;
  border-radius: 1.2rem;
  background: rgba(255, 255, 255, 0.15);
  overflow: hidden;
  padding: 0.9rem 3.5rem 0.9rem 1.4rem;
  position: relative;

  @media (max-width: 1023px) {
    width: 26.4rem;
  }

  @media (max-width: 767px) {
    width: 100%;
    margin-top: 1.2rem;
  }
`;

export const Field = styled.input.attrs(() => ({ type: 'number' }))`
  width: 100%;
  line-height: 2.4rem;
  background: transparent;
  border: none;
  -moz-appearance: textfield;
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
  }
`;

export const Append = styled.div`
  position: absolute;
  top: 50%;
  right: 0.9rem;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
`;
