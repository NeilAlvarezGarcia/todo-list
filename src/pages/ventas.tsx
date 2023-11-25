import { DashboardLayout, PageLayout } from '@/commons/layouts';
import Head from 'next/head';

const Ventas = () => {
  return (
    <>
      <Head>
        <title>Ventas</title>
      </Head>

      <DashboardLayout>
        <PageLayout title='Lista de productos'>
          <p>Ventas</p>
        </PageLayout>
      </DashboardLayout>
    </>
  );
};

export default Ventas;
