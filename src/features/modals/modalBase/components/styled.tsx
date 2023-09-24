import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

export const Background = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 61.2rem;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding: 3.3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  width: 100%;
  max-height: 63.8rem;
  border-radius: 8px;
  background: #2d2635;
  overflow: auto;
  padding: 3.2rem;
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
  font-weight: 500;
  line-height: 180%;
`;

export const Close = styled.div`
  padding: 1rem;
`;

export const Content = styled.div`
  color: rgba(255, 255, 255, 0.65);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  margin-top: 4rem;
`;
