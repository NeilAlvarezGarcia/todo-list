import { TrashCan } from '@/commons/icons';
import { Product } from '@/interfaces';
import { formatCurrency } from '@/utils/helpers';
import { FC } from 'react';
import s from '@/styles/table.module.css';
import { ProductSelected } from '@/pages/ventas';

type Props = {
  product: ProductSelected;
  removeProduct: (id: string) => void;
};

export const ProductPurchaseTableRow: FC<Props> = ({ product, removeProduct }) => {
  const productPrice = Number(product.price);
  const total = productPrice * Number(product.quantity);

  return (
    <>
      <td>
        <button
          type='button'
          className={s.deleteAction}
          onClick={() => removeProduct(product.id as string)}>
          <TrashCan />
        </button>
      </td>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{formatCurrency(productPrice)}</td>
      <td>{formatCurrency(total)}</td>
    </>
  );
};
