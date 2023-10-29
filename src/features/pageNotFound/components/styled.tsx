import { styled } from 'styled-components';
import NextLink from 'next/link';

export const Wrapper = styled.div`
  padding-top: 0.6rem;

  @media (max-width: 767px) {
    padding-top: 9rem;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 72.3rem;
  margin: 0 auto;

  @media (max-width: 1023px) {
    max-width: 100%;
    padding: 0 8rem;
  }

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 2.4rem;
  }
`;

export const Title = styled.h1`
  color: #dfcefd;
  text-align: center;
  font-size: 16rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.8rem;

  @media (max-width: 767px) {
    font-size: 8rem;
  }
`;

export const Text = styled.div`
  color: #fff;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.072rem;
  opacity: 0.3;
  text-align: center;
  margin-top: 3.2rem;

  @media (max-width: 767px) {
    font-size: 2rem;
    margin-top: 2.4rem;
  }
`;

export const Description = styled.p`
  color: #dfcefd;
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.06rem;
  margin: 3.2rem auto 0;
  max-width: 40.5rem;

  @media (max-width: 767px) {
    font-size: 1.6rem;
    margin: 2.4rem auto 0;
  }
`;

export const Buttons = styled.div`
  margin-top: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  @media (max-width: 767px) {
    margin-top: 2.4rem;
  }
`;

export const Link = styled(NextLink)``;
