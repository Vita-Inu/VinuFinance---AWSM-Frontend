import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, theme } from '@/features/theme';
import { DashboardLayout } from '@/features/dashboardLayout';
import { Wagmi } from '@/features/wagmi';
import {
  Notifications,
  NotificationContextProvider,
} from '@/features/notifications';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Wagmi>
          <NotificationContextProvider>
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
            <Notifications />
          </NotificationContextProvider>
        </Wagmi>
      </ThemeProvider>
    </>
  );
}
