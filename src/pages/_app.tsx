import { UiProvider, UserProvider } from '@/context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <UiProvider>
        <Component {...pageProps} />
      </UiProvider>
    </UserProvider>
  );
}
