import { styled } from 'styled-components';
import NextImage from 'next/image';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Icon = styled(NextImage)``;

export const Title = styled.div`
  margin-top: 4rem;
  color: #fff;
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
`;

export const Description = styled.div`
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
`;
