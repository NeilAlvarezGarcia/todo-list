import { DashboardLayout, PageLayout } from '@/commons/layouts';
import { Table } from '@/commons/Table';
import Head from 'next/head';
import { AddButton } from '@/components/AddButton';
import { getUsers } from '@/services';
import { User } from '@/interfaces';
import { FC, FormEvent, Fragment } from 'react';
import { ADMIN_ROL, EMPLYEE_ROL, TABLE_USERS_HEADER, revalidateInterval } from '@/util/const';
import { Input } from '@/commons/forms';
import s from '@/styles/administration.module.css';
import { useRouter } from 'next/navigation';

type Props = {
  data: User[];
};

const Administracion: FC<Props> = ({ data }) => {
  const { refresh } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refresh();
  };

  return (
    <>
      <Head>
        <title>Administración</title>
      </Head>

      <DashboardLayout>
        <PageLayout title='Lista de usuarios'>
          <AddButton textBtn='Nuevo usuario'>
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.wrapper}>
                <h3>Añadir nuevo usario</h3>

                <Input label='Nombre' name='name' />
                <Input label='Correo electrónico' name='email' />
                <Input label='Contraseña' name='password' type='password' />

                <div className={s.select}>
                  <label className={s.label}>Rol</label>

                  <select name='role'>
                    <option value={ADMIN_ROL}>{ADMIN_ROL}</option>
                    <option value={EMPLYEE_ROL}>{EMPLYEE_ROL}</option>
                  </select>
                </div>
              </div>

              <button>Agregar usuario</button>
            </form>
          </AddButton>

          <Table
            headers={TABLE_USERS_HEADER}
            data={data as unknown as Record<string, string | number>[]}
            row={(item, i) => (
              <Fragment key={i}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <p>Eliminar</p>
                </td>
              </Fragment>
            )}
          />
        </PageLayout>
      </DashboardLayout>
    </>
  );
};

export async function getStaticProps() {
  const data = await getUsers();

  return {
    props: {
      data,
    },
    revalidate: revalidateInterval,
  };
}

export default Administracion;
