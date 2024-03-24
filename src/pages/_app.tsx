import { UserProvider } from '@/context';
import type { AppProps } from 'next/app';
import { GlobalStyle, theme } from '@/styles';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}
