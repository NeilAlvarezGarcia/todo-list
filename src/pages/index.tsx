import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useUser } from '@/context';
import { DashboardLayout } from '@/commons/layouts';

const Home = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DashboardLayout>
        <p>layout</p>
      </DashboardLayout>
    </>
  );
};

export default Home;
