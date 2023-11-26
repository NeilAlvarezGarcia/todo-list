import { SectionLayout } from '@/commons/layouts';
import { getDataSets } from '@/config/chartjs';
import s from '@/styles/Home.module.css';
import { FC } from 'react';
import { Pie } from 'react-chartjs-2';

type Props = {
  topSales: Record<string, number>[];
};

export const TopSales: FC<Props> = ({ topSales }) => {
  const data = {
    labels: Object.keys(topSales),
    datasets: [getDataSets(Object.values(topSales) as unknown as (string | number)[])],
  };

  return (
    <SectionLayout title='Productos más vendidos'>
      <div className={s.chartContainer}>
        <Pie data={data} />
      </div>
    </SectionLayout>
  );
};
