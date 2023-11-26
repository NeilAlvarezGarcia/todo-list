import { SectionLayout } from '@/commons/layouts';
import { formatCurrency } from '@/utils/helpers';
import error from 'next/error';
import s from '@/styles/sales.module.css';
import { FC } from 'react';

type Props = {
  subtotalPurchase: number;
  ivaAmount: number;
  total: number;
  loading: boolean;
  error: string;
};

export const PurchaseDetail: FC<Props> = ({
  ivaAmount,
  subtotalPurchase,
  total,
  error,
  loading,
}) => {
  return (
    <SectionLayout title='Detalle de la compra'>
      <div className={s.rightSide}>
        <div className={s.groupDetail}>
          <h4>Sub total</h4>

          <p>{formatCurrency(subtotalPurchase)}</p>
        </div>

        <div className={s.groupDetail}>
          <h4>IVA (18%)</h4>

          <p>{formatCurrency(ivaAmount)}</p>
        </div>

        <div className={s.groupDetail}>
          <h4>Total</h4>

          <p>{formatCurrency(total)}</p>
        </div>

        <button>{loading ? 'Generando venta...' : 'Terminar venta'}</button>

        <p className={s.error}>{error}</p>
      </div>
    </SectionLayout>
  );
};
