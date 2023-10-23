import { styled } from 'styled-components';

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
  font-size: 6.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.192rem;
  text-align: center;

  @media (max-width: 767px) {
    text-align: left;
    font-size: 4.2rem;
    letter-spacing: -0.126rem;
  }
`;

export const Description = styled.p`
  color: #dfcefd;
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
  max-width: 50rem;
  margin: 4rem auto 0;

  @media (max-width: 767px) {
    text-align: left;
    font-size: 1.6rem;
    max-width: none;
    margin: 2.4rem auto 0;
  }
`;

export const Buttons = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  @media (max-width: 767px) {
    margin-top: 2.4rem;
    justify-content: flex-start;
  }
`;

export const LinkWrapper = styled.div`
  margin-top: 4rem;
  text-align: center;

  @media (max-width: 767px) {
    margin-top: 2.4rem;
    text-align: left;
  }
`;

export const Link = styled.span`
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.4);
  transition: 0.2s ease-in-out;

  @media (max-width: 767px) {
    font-size: 1.4rem;
  }

  &:hover {
    color: #fff;
    border-color: #fff;
  }
`;
