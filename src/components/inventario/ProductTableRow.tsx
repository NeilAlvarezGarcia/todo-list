import { TrashCan } from '@/commons/icons';
import { Product } from '@/interfaces';
import { formatCurrency } from '@/util/helpers';
import { FC } from 'react';

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
        <div>
          <button>edit</button>

          <button>
            <TrashCan />
          </button>
        </div>
      </td>
    </>
  );
};
