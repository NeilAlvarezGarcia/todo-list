import { SectionLayout } from '@/commons/layouts';
import { getDataSets } from '@/config/chartjs';
import { Purchase } from '@/interfaces';
import s from '@/styles/Home.module.css';
import { getLastSevenDays } from '@/utils/helpers';
import moment from 'moment';
import { FC } from 'react';
import { Pie } from 'react-chartjs-2';

type Props = {
  lastSevenDaysPurchases: Purchase[];
};

export const TopSales: FC<Props> = ({ lastSevenDaysPurchases }) => {
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
    <SectionLayout title='Productos más vendidos'>
      <div className={s.chartContainer}>
        {' '}
        <Pie data={data} />
      </div>
    </SectionLayout>
  );
};
