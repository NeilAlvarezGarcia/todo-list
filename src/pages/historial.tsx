import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import { Table, tableDataRecord } from '@/commons/Table';
import { Modal } from '@/components';
import { PurchaseTableRow } from '@/components/historial';
import { useOpenModal } from '@/hooks';
import { Purchase } from '@/interfaces';
import { getPurchases } from '@/services';
import { TABLE_HISTORIES_HEADER } from '@/utils/const';
import Head from 'next/head';
import { FC, useState } from 'react';
import s from '@/styles/profile.module.css';
import { formatCurrency, formatDate } from '@/utils/helpers';

type Props = {
  purchases: Purchase[];
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
            data={purchases as unknown as tableDataRecord[]}
            row={(item, i) => (
              <PurchaseTableRow
                key={i}
                purchase={item as unknown as Purchase}
                openDetailModal={openDetailModal}
              />
            )}
          />
        </SectionLayout>
      </DashboardLayout>

      <Modal open={modalOpen} closeModal={closeModal}>
        <div className={s.detailWrapper}>
          <h2>Detalle de venta</h2>

          <div className={s.gridContent}>
            <div className={s.group}>
              <h4>Fecha registro:</h4>
              <p>{formatDate(purchase?.createdAt ?? 0, 'DD/mm/yy')}</p>
            </div>

            <div className={s.group}>
              <h4>Numero venta:</h4>
              <p>{purchase?.purchaseId}</p>
            </div>

            <div className={s.group}>
              <h4>Documento cliente:</h4>
              <p>{purchase?.documentClientNumber}</p>
            </div>

            <div className={s.group}>
              <h4>Nombre cliente:</h4>
              <p>{purchase?.clientName}</p>
            </div>

            <div className={s.group}>
              <h4>Subtotal:</h4>
              <p>{formatCurrency(purchase?.subtotal)}</p>
            </div>

            <div className={s.group}>
              <h4>IVA (18%):</h4>
              <p>{formatCurrency(purchase?.ivaAmount)}</p>
            </div>

            <div className={s.group}>
              <h4>Total:</h4>
              <p>{formatCurrency(purchase?.total)}</p>
            </div>
          </div>
        </div>
      </Modal>
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
