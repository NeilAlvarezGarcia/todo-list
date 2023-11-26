import { Purchase } from '@/interfaces';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { FC } from 'react';
import s from '@/styles/sales.module.css';

type Props = {
  purchase: Purchase;
  openDetailModal: (purchase: Purchase) => void;
};

export const PurchaseTableRow: FC<Props> = ({ purchase, openDetailModal }) => {
  return (
    <>
      <td>{formatDate(purchase.createdAt)}</td>
      <td>{purchase.purchaseId}</td>
      <td>{purchase.documentClientNumber}</td>
      <td>{purchase.clientName}</td>
      <td>{formatCurrency(purchase.ivaAmount)}</td>
      <td>{formatCurrency(purchase.total)}</td>
      <td>
        <button className={s.detailBtn} onClick={() => openDetailModal(purchase)}>
          Ver detalle
        </button>
      </td>
    </>
  );
};
