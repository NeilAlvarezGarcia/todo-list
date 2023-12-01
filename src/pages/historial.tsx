import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import { Table } from '@/commons/Table';
import { PurchaseDetail, PurchaseTableRow } from '@/components/historial';
import { useOpenModal } from '@/hooks';
import { Purchase, Purchases } from '@/interfaces';
import { getPurchases } from '@/services';
import { TABLE_HISTORIES_HEADER } from '@/utils/const';
import Head from 'next/head';
import { FC, useState } from 'react';

type Props = {
  purchases: Purchases;
};

const Ventas: FC<Props> = ({ purchases }) => {
  const [modalOpen, openModal, closeModal] = useOpenModal();
  const [purchase, setPuchase] = useState<Purchase | null>(null);

  const openDetailModal = (purchase: Purchase) => {
    setPuchase(purchase);
    openModal();
  };

  return (
    <>
      <Head>
        <title>Historial</title>
      </Head>

      <DashboardLayout>
        <SectionLayout title='Historial de ventas'>
          <Table
            headers={TABLE_HISTORIES_HEADER}
            data={purchases}
            row={(item, i) => (
              <PurchaseTableRow key={i} purchase={item} openDetailModal={openDetailModal} />
            )}
          />
        </SectionLayout>
      </DashboardLayout>

      <PurchaseDetail purchase={purchase} modalOpen={modalOpen} closeModal={closeModal} />
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
