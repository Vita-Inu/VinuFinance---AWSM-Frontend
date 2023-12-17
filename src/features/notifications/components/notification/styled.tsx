import { css, styled } from 'styled-components';

export const Wrapper = styled.div<{$visible?: boolean}>`
  width: 34.3rem;
  border-radius: 8rem;
  background: #2D2635;
  box-shadow: 0 0.8rem 1rem 0 rgba(0, 0, 0, 0.20), 0 0.6rem 3rem 0 rgba(0, 0, 0, 0.12), 0 1.6rem 2.4rem 0 rgba(0, 0, 0, 0.14);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateX(10rem);
  transition: .2s ease-in-out;
  
  ${props => !!props.$visible && css`
    opacity: 1;
    transform: translateX(0);
  `}
`;

export const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.2rem 1.6rem;
  gap: 1.6rem;
`;

export const Icon = styled.div`
  flex-shrink: 0;
`;

export const Texts = styled.div``;

export const Title = styled.div`
  color: #FFF;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 129.412% */
  letter-spacing: -0.408px;
`;

export const Description = styled.div`
  color: #C8C5C5;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 138.462% */
  letter-spacing: -0.078px;
`;