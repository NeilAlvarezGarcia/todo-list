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
    datasets: [
      getDataSets(
        Object.values(topSales).sort((a, b) => Number(a) - Number(b)) as unknown as number[],
        '',
        ['#FF6859', '#F2F53A', '#75F02E', '#D123F3', '#55EAFF', ' #FF55BC']
      ),
    ],
  };

  return (
    <div className={s.rightSideContent}>
      <SectionLayout title='Productos más vendidos'>
        <div className={s.chartContainer}>
          <Pie data={data} />
        </div>
      </SectionLayout>
    </div>
  );
};
