import { DashboardLayout, PageLayout } from '@/commons/layouts';
import { Table } from '@/commons/Table';
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
            headers={[
              { id: 'head1', name: 'head 1' },
              { id: 'head2', name: 'head 2' },
              { id: 'head3', name: 'head 3' },
              { id: 'head4', name: 'head 4' },
              { id: 'head5', name: 'head 5' },
              { id: 'head6', name: 'head 6' },
            ]}
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
