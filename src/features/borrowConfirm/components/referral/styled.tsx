import { styled } from 'styled-components';
import NextLink from 'next/link';

export const Wrapper = styled.div`
  margin-top: 2.4rem;
  text-align: center;
`;

export const Link = styled(NextLink)`
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.4);
  transition: 0.2s ease-in-out;

  &:hover {
    color: #fff;
    border-color: #fff;
  }
`;
