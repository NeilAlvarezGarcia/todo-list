import { SectionLayout } from '@/commons/layouts';
import { Bar } from 'react-chartjs-2';
import s from '@/styles/Home.module.css';
import { getLastSevenDays } from '@/utils/helpers';
import moment from 'moment';
import { Purchase } from '@/interfaces';
import { FC } from 'react';
import { getDataSets, options } from '@/config/chartjs';

type Props = {
  lastSevenDaysPurchases: Purchase[];
};

export const LastSevenDaysSale: FC<Props> = ({ lastSevenDaysPurchases }) => {
  const days = getLastSevenDays('dddd').reduce((acc: Record<string, number>, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  for (let t of lastSevenDaysPurchases) {
    const purchaseDay = moment(t.createdAt).format('dddd');
    days[purchaseDay] += 1;
  }

  const data = {
    labels: getLastSevenDays(),
    datasets: [getDataSets('Venta de los últimos 7 días', Object.values(days))],
  };

  return (
    <SectionLayout title='Ventas de los últimos 7 días'>
      <div className={s.chartContainer}>
        <Bar options={options} data={data} />
      </div>
    </SectionLayout>
  );
};
