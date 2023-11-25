import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import { Table } from '@/commons/Table';
import Head from 'next/head';
import { getUsers } from '@/services';
import { User } from '@/interfaces';
import { FC, useState } from 'react';
import { TABLE_USERS_HEADER, revalidateInterval } from '@/util/const';
import { AddUser, UserTableRow } from '@/components/administracion';

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
        <SectionLayout title='Lista de usuarios'>
          <AddUser refresh={refreshData} />

          <Table
            headers={TABLE_USERS_HEADER}
            data={users as unknown as Record<string, string | number>[]}
            row={(item, i) => <UserTableRow key={i} user={item as unknown as User} />}
          />
        </SectionLayout>
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
