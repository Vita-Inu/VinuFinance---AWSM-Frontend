'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { StyledComponentsRegistry } from '@/lib';
import { aeonik } from '@/fonts';
import { GlobalStyles, theme } from '@/features/theme';
import { DashboardLayout } from '@/features/dashboardLayout';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={aeonik.className}>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <StyledComponentsRegistry>
            <DashboardLayout>{children}</DashboardLayout>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
