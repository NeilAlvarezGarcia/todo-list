import { DashboardLayout, PageLayout } from '@/commons/layouts';
import { Table } from '@/commons/Table';
import Head from 'next/head';
import { AddButton } from '@/components/AddButton';
import { getUsers } from '@/services';
import { User } from '@/interfaces';
import { FC, Fragment } from 'react';
import { TABLE_USERS_HEADER, revalidateInterval } from '@/util/const';

type Props = {
  data: User[];
};

const Administracion: FC<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Administración</title>
      </Head>

      <DashboardLayout>
        <PageLayout title='Lista de usuarios'>
          <AddButton textBtn='Nuevo usuario'>
            <p>this is suppouse to be a form to add users</p>
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
