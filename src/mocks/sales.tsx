import { Basket, Dollar, Receipt } from '@/commons/icons';
import { formatCurrency } from '@/util/helpers';

export const salesData = [
  {
    title: 'Cantidad de ventas',
    value: 13,
    color: '#269CEE',
    icon: <Basket />,
  },
  {
    title: 'Ingreso por ventas',
    value: formatCurrency?.(2506000),
    color: '#90D668',
    icon: <Dollar />,
  },
  {
    title: 'Total productos',
    value: 13,
    color: '#E3E053',
    icon: <Receipt />,
  },
];
