import Head from 'next/head';
import { Home } from '@/components/home';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Home />
    </>
  );
};

export default HomePage;
