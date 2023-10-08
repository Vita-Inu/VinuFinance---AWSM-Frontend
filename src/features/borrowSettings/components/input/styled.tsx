import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
`;

export const Value = styled.input`
  width: 13.2rem;
  height: 4.2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  border: none;

  &:focus {
    outline: none;
  }
`;
