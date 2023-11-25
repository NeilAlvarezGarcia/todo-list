import { DashboardLayout } from '@/commons/layouts';
import Head from 'next/head';

const Perfil = () => {
  return (
    <>
      <Head>
        <title>Administración</title>
      </Head>

      <DashboardLayout>
        <p>acá irá info del usuario</p>
      </DashboardLayout>
    </>
  );
};

export default Perfil;
