import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import { Header } from '@/features/header';
import { AuthGuard } from '@/features/authGuard';
import { aeonik } from '@/fonts';
import { PageMeta } from '@/features/pageMeta';

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageMeta />
      <Background className={aeonik.className}>
        <Header />
        <AuthGuard>{children}</AuthGuard>
      </Background>
    </>
  );
}

const Background = styled.main`
  background-color: #150d1d;
  min-height: 100vh;
  padding: 4.2rem 0 6.3rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    padding: 2.4rem 0;
  }
`;
