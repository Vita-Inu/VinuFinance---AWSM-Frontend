import { styled } from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;

  @media (max-width: 767px) {
    gap: 1.8rem;
  }
`;

export const Cell = styled.div``;

export const Label = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
`;

export const Value = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
  margin-top: 0.4rem;
`;

export const Describe = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  margin-top: 6.4rem;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1.8rem;
    margin-top: 4.2rem;
  }
`;

export const DelegateButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
`
