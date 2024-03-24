import { useUser } from '@/context';
import { HOME } from '@/utils/const';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export function AuthLayout({ children }: PropsWithChildren) {
  const { push } = useRouter();
  const { user } = useUser();

  if (user) {
    push(HOME);
    return null;
  }

  return <Main>{children}</Main>;
}

const Main = styled('main')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 100vh;
  flex-direction: column;
  gap: 16px;

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(500px, 90%);
  }
`;
