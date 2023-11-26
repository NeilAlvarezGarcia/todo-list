import { Purchase } from '@/interfaces';
import { formatCurrency, formatDate } from '@/utils/helpers';
import React, { FC } from 'react';

type Props = {
  purchase: Purchase;
};

export const PurchaseTableRow: FC<Props> = ({ purchase }) => {
  return (
    <>
      <td>{formatDate(purchase.createdAt)}</td>
      <td>{purchase.purchaseId}</td>
      <td>{purchase.documentClientNumber}</td>
      <td>{purchase.clientName}</td>
      <td>{formatCurrency(purchase.ivaAmount)}</td>
      <td>{formatCurrency(purchase.total)}</td>
      <td>
        <button>Ver detalle</button>
      </td>
    </>
  );
};
