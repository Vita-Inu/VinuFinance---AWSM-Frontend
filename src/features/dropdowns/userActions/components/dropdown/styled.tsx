import { css, styled } from 'styled-components';
import NextImage from 'next/image';

export const Wrapper = styled.div`
  padding-top: 1.2rem;

  @media (max-width: 1023px) {
    padding-top: 0;
  }
`;

export const Content = styled.div`
  width: 28.6rem;
  border-radius: 1.2rem;
  background: #332a3f;
  padding: 1.2rem;

  @media (max-width: 1023px) {
    width: 100%;
    border-radius: 0.8rem 0.8rem 0 0;
    padding: 2.4rem;
  }
`;

export const Top = styled.div`
  gap: 0.8rem;
  display: none;
  margin-bottom: 1.2rem;

  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Title = styled.div`
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

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 1023px) {
    gap: 0;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.2rem;
  padding: 1.2rem;
  transition: 0.2s ease-in-out;
  border-radius: 0.8rem;
  background: transparent;

  @media (max-width: 1023px) {
    padding: 2.4rem 0;
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);

    &:last-child {
      border-bottom: none;
    }
  }

  &:hover {
    background: #493c5b;
  }
`;

export const Icon = styled(NextImage)``;

export const Copied = styled(NextImage)<{ $visible?: boolean }>`
  margin-left: auto;
  transition: 0.2s ease-in-out;
  opacity: 0;

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
    `}
`;

export const Text = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
`;
