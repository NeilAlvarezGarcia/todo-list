import { Edit, TrashCan } from '@/commons/icons';
import { Product } from '@/interfaces';
import { formatCurrency } from '@/util/helpers';
import { FC } from 'react';
import s from '@/styles/table.module.css';

type Props = {
  product: Product;
};

export const ProductTableRow: FC<Props> = ({ product }) => {
  return (
    <>
      <td>{product.id}</td>

      <td>{product.name}</td>

      <td>{product.stock}</td>

      <td>{formatCurrency(Number(product.price))}</td>

      <td>{product.state}</td>

      <td>
        <div className={s.actionsContainer}>
          <button className={s.editAction}>
            <Edit />
          </button>

          <button className={s.deleteAction}>
            <TrashCan />
          </button>
        </div>
      </td>
    </>
  );
};
