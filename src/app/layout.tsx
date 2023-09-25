'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { StyledComponentsRegistry } from '@/lib';
import { aeonik } from '@/fonts';
import { GlobalStyles, theme } from '@/features/theme';
import { DashboardLayout } from '@/features/dashboardLayout';
import { Wagmi } from '@/features/wagmi';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={aeonik.className}>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <StyledComponentsRegistry>
            <Wagmi>
              <DashboardLayout>{children}</DashboardLayout>
            </Wagmi>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
