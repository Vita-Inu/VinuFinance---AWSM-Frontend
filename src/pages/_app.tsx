import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, theme } from '@/features/theme';
import { DashboardLayout } from '@/features/dashboardLayout';
import { Wagmi } from '@/features/wagmi';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Wagmi>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </Wagmi>
      </ThemeProvider>
    </>
  );
}
