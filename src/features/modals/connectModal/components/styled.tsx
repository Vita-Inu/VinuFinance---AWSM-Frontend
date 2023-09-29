import { styled } from 'styled-components';
import NextLink from 'next/link';

export const Agreements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 3.2rem;
`;

export const Link = styled(NextLink)`
  color: #fff;
  text-decoration-line: underline;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
