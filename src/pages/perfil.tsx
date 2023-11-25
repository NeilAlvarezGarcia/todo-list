import { DashboardLayout } from '@/commons/layouts';
import Head from 'next/head';
import Image from 'next/image';

import s from '@/styles/profile.module.css';

const Perfil = () => {
  return (
    <>
      <Head>
        <title>Administración</title>
      </Head>

      <DashboardLayout>
        <h2 className={s.title}>Detalle del perfil</h2>

        <section className={s.wrapper}>
          <Image
            src='/profile.png'
            alt='profile'
            width={100}
            height={100}
            className={s.profileImage}
          />

          <div className={s.userDetails}>
            <div className={s.group}>
              <h4>Nombre</h4>
              <p>Admin</p>
            </div>

            <div className={s.group}>
              <h4>Correo electrónico</h4>
              <p>user@gmail.com</p>
            </div>

            <div className={s.group}>
              <h4>Role</h4>
              <p>Admin</p>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </>
  );
};

export default Perfil;
