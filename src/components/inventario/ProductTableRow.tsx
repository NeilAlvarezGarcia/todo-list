import { Edit, TrashCan } from '@/commons/icons';
import { Product } from '@/interfaces';
import { formatCurrency } from '@/utils/helpers';
import { FC } from 'react';
import s from '@/styles/table.module.css';

type Props = {
  product: Product;
  openDeleteModal: (product: Product) => void;
  openEditModal: (product: Product) => void;
};

export const ProductTableRow: FC<Props> = ({ product, openDeleteModal, openEditModal }) => {
  return (
    <>
      <td>{product.id}</td>

      <td>{product.name}</td>

      <td>{product.stock}</td>

      <td>{formatCurrency(Number(product.price))}</td>

      <td className={s[product.state]}>{product.state}</td>

      <td>
        <div className={s.actionsContainer}>
          <button className={s.editAction} onClick={() => openEditModal(product)}>
            <Edit />
          </button>

          <button className={s.deleteAction} onClick={() => openDeleteModal(product)}>
            <TrashCan />
          </button>
        </div>
      </td>
    </>
  );
};
