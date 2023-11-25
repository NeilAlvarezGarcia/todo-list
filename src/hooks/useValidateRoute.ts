import { auth } from '@/config/firebase';
import { DASHBOARD, LOGIN } from '@/util/const';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useValidateRoute = (redirectTo = DASHBOARD) => {
  const { push } = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user?.uid) return push(LOGIN);

      push(redirectTo);
    });
  }, [push, redirectTo]);
};
