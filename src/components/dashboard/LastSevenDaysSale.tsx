import { SectionLayout } from '@/commons/layouts';
import { Bar } from 'react-chartjs-2';
import s from '@/styles/Home.module.css';
import { formatDate, getLastSevenDays } from '@/utils/helpers';
import { Purchases } from '@/interfaces';
import { FC } from 'react';
import { getDataSets, options } from '@/config/chartjs';

type Props = {
  lastSevenDaysPurchases: Purchases;
};

export const LastSevenDaysSale: FC<Props> = ({ lastSevenDaysPurchases }) => {
  const days = getLastSevenDays('dddd').reduce((acc: Record<string, number>, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  for (let purchase of lastSevenDaysPurchases) {
    const purchaseDay = formatDate(purchase.createdAt, 'dddd');
    days[purchaseDay] += 1;
  }

  const data = {
    labels: getLastSevenDays(),
    datasets: [
      getDataSets({
        data: Object.values(days),
        label: 'Venta de los últimos 7 días',
      }),
    ],
  };

  return (
    <SectionLayout title='Ventas de los últimos 7 días'>
      <div className={s.chartContainer}>
        <Bar options={options} data={data} />
      </div>
    </SectionLayout>
  );
};
