import { styled } from 'styled-components';

export const Box = styled.div``;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  margin-top: 4.2rem;

  @media (max-width: 767px) {
    margin-top: 2.4rem;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
`;

export const Bubble = styled.div`
  width: 4.2rem;
  height: 4.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: #38313f;
  color: #fff;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.054rem;

  @media (max-width: 767px) {
    width: 3.2rem;
    height: 3.2rem;
    font-size: 1.4rem;
  }
`;

export const Title = styled.div`
  color: #fff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%; /* 36px */

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

export const Rest = styled.div``;
