import { DashboardLayout, PageLayout } from '@/commons/layouts';
import { Table } from '@/commons/Table';
import { TABLE_HISTORIES_HEADER } from '@/util/const';
import Head from 'next/head';
import { Fragment } from 'react';

const Ventas = () => {
  return (
    <>
      <Head>
        <title>Historial</title>
      </Head>

      <DashboardLayout>
        <PageLayout title='Historial de ventas'>
          <Table
            headers={TABLE_HISTORIES_HEADER}
            data={[]}
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

export default Ventas;
