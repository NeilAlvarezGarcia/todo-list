import { auth } from '@/config/firebase';
import { UiProvider, UserProvider } from '@/context';
import { LOGIN, PROFILE } from '@/util/const';
import '@/styles/globals.css';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const { push } = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user?.uid) return push(LOGIN);

      push(PROFILE);
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
