import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import { Header } from '@/features/header';
import { AuthGuard } from '@/features/authGuard';

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <Background>
      <Header />
      <AuthGuard>{children}</AuthGuard>
    </Background>
  );
}

const Background = styled.main`
  background-color: #150d1d;
  min-height: 100vh;
  padding: 5.4rem 0 6.3rem;
`;
