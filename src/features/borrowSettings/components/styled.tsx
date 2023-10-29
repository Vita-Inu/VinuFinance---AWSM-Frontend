import { styled } from 'styled-components';
import NextImage from 'next/image';

export const Box = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  z-index: 2;
`;

export const Icon = styled(NextImage)``;

export const Inputs = styled.div`
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  @media (max-width: 767px) {
    padding-top: 2.8rem;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

export const Title = styled.div`
  color: #fff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8;
`;

export const Close = styled.div`
  padding: 0.5rem;
  display: none;
  cursor: pointer;

  @media (max-width: 1023px) {
    display: block;
  }
`;

export const Buttons = styled.div`
  padding-top: 2.4rem;
`;
