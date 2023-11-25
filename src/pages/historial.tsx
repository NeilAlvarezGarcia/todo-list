import { DashboardLayout, PageLayout } from '@/commons/layouts';
import Head from 'next/head';

const Ventas = () => {
  return (
    <>
      <Head>
        <title>Historial</title>
      </Head>

      <DashboardLayout>
        <PageLayout title='Historial de ventas'>
          <p>Historial</p>
        </PageLayout>
      </DashboardLayout>
    </>
  );
};

export default Ventas;
