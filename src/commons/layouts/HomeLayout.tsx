import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { Header } from '../Header';
import { useUser } from '@/context';
import { LOGIN } from '@/utils/const';
import { useRouter } from 'next/router';

export function HomeLayout({ children }: PropsWithChildren) {
  const { push } = useRouter();
  const { user } = useUser();

  if (!user) {
    push(LOGIN);
    return null;
  }

  return (
    <Main>
      <Container>
        <Header />
        {children}
      </Container>
    </Main>
  );
}

const Main = styled('main')`
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled('div')`
  max-width: 1200px;
  width: 100%;
`;
