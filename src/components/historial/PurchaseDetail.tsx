import { FC } from 'react';
import { formatDate, formatCurrency } from '@/utils/helpers';
import { Modal } from '..';
import { Purchase } from '@/interfaces';
import s from '@/styles/profile.module.css';

type Props = {
  purchase: Purchase | null;
  modalOpen: boolean;
  closeModal: VoidFunction;
};

export const PurchaseDetail: FC<Props> = ({ purchase, modalOpen, closeModal }) => {
  return (
    <Modal open={modalOpen} closeModal={closeModal}>
      <div className={s.detailWrapper}>
        <h2>Detalle de venta</h2>

        <div className={s.gridContent}>
          <div className={s.group}>
            <h4>Fecha registro:</h4>
            <p>{formatDate(purchase?.createdAt ?? 0, 'DD/MM/YYYY')}</p>
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
  );
};
