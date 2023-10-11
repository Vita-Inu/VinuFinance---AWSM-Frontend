import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.8rem 0 2.4rem;
  border-top: 0.1rem solid rgba(255, 255, 255, 0.15);

  &:first-child {
    padding-top: 0;
    border-top: none;
  }
`;

export const ValueBox = styled.div`
  text-align: right;
`;

export const Label = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
`;

export const Value = styled.div`
  color: #fff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 0.8rem;
`;

export const Explain = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
`;
