import { auth } from '@/config/firebase';
import { UiProvider, UserProvider } from '@/context';
import { DASHBOARD, LOGIN } from '@/util/const';
import '@/styles/globals.css';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user?.uid) return push(LOGIN);

      push(pathname);
    });
  }, [pathname, push]);

  return (
    <UserProvider>
      <UiProvider>
        <Component {...pageProps} />
      </UiProvider>
    </UserProvider>
  );
}
