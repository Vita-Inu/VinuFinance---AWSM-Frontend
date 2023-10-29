import { styled } from 'styled-components';
import SimpleBar from 'simplebar-react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;

  @media (max-width: 1023px) {
    gap: 2.4rem;
  }
`;

export const Top = styled.div`
  display: none;

  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
  }
`;

export const Heading = styled.div`
  color: #fff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
`;

export const Close = styled.div`
  padding: 0.5rem;
  cursor: pointer;
`;

export const ScrollBar = styled(SimpleBar)`
  height: 24.3rem;
  padding-right: 2rem;

  @media (max-width: 1023px) {
    height: 25.1rem;
  }
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2.4rem;
`;

export const Icon = styled.div<{ $icon: string }>`
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: rgba(90, 75, 108, 0.69);
  background-image: url(${(props) => props.$icon});
`;

export const Texts = styled.div``;

export const Title = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4;
`;

export const Date = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4;
  margin-top: 0.4rem;
`;

export const Buttons = styled.div``;
