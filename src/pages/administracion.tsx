import { DashboardLayout, PageLayout } from '@/commons/layouts';
import { Table } from '@/commons/Table';
import Head from 'next/head';
import { getUsers } from '@/services';
import { User } from '@/interfaces';
import { FC, Fragment, useState } from 'react';
import { TABLE_USERS_HEADER, revalidateInterval } from '@/util/const';
import s from '@/styles/forms.module.css';
import { TrashCan } from '@/commons/icons';
import { AddUser } from '@/components/administracion';

type Props = {
  data: User[];
};

const Administracion: FC<Props> = ({ data }) => {
  const [users, setUsers] = useState(data);

  const refreshData = async () => {
    const data = await getUsers();

    setUsers(data);
  };

  return (
    <>
      <Head>
        <title>Administración</title>
      </Head>

      <DashboardLayout>
        <PageLayout title='Lista de usuarios'>
          <AddUser refresh={refreshData} />

          <Table
            headers={TABLE_USERS_HEADER}
            data={users as unknown as Record<string, string | number>[]}
            row={(item, i) => (
              <Fragment key={i}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <div className={s.deleteBtn}>
                    <TrashCan />
                  </div>
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
