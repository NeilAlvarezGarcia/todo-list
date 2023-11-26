import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import { Table, tableDataRecord } from '@/commons/Table';
import { PurchaseTableRow } from '@/components/historial';
import { Purchase } from '@/interfaces';
import { getPurchases } from '@/services';
import { TABLE_HISTORIES_HEADER } from '@/utils/const';
import Head from 'next/head';
import { FC, Fragment } from 'react';

type Props = {
  purchases: Purchase[];
};

const Ventas: FC<Props> = ({ purchases }) => {
  return (
    <>
      <Head>
        <title>Historial</title>
      </Head>

      <DashboardLayout>
        <SectionLayout title='Historial de ventas'>
          <Table
            headers={TABLE_HISTORIES_HEADER}
            data={purchases as unknown as tableDataRecord[]}
            row={(item) => (
              <PurchaseTableRow key={item.purchaseId} purchase={item as unknown as Purchase} />
            )}
          />
        </SectionLayout>
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps() {
  const purchases = await getPurchases();

  return {
    props: {
      purchases,
    },
  };
}

export default Ventas;
