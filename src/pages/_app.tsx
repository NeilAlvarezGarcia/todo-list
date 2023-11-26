import { auth } from '@/config/firebase';
import { UiProvider, UserProvider } from '@/context';
import { DASHBOARD, LOGIN } from '@/utils/const';
import '@/styles/globals.css';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import 'moment/locale/es';

export default function App({ Component, pageProps }: AppProps) {
  const { push } = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user?.uid) return push(LOGIN);

      push(DASHBOARD);
    });
  }, [push]);

  return (
    <UserProvider>
      <UiProvider>
        <Component {...pageProps} />
      </UiProvider>
    </UserProvider>
  );
}
