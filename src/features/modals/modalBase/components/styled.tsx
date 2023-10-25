import { styled } from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow: auto;
  display: flex;
`;

export const Background = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 61.2rem;
  position: relative;
  z-index: 1;
  margin: auto;
  padding: 3.3rem 0;

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0;
    margin: auto 0 0;
  }
`;

export const Box = styled.div`
  width: 100%;
  max-height: 69.2rem;
  border-radius: 8px;
  background: #2d2635;
  overflow: auto;
  padding: 3.2rem;

  @media (max-width: 767px) {
    max-height: 100%;
    border-radius: 0.8rem 0.8rem 0 0;
    padding: 1.6rem 2.4rem 4.2rem;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  color: #fff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
`;

export const Close = styled.div`
  padding: 1rem;
`;

export const Content = styled.div`
  color: rgba(255, 255, 255, 0.65);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  margin-top: 4rem;

  @media (max-width: 767px) {
    margin-top: 2.4rem;
  }
`;
