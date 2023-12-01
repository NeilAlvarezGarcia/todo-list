import Head from 'next/head';
import s from '@/styles/Home.module.css';
import { DashboardLayout } from '@/commons/layouts';

import { getSevenDaysPurchases, getTopSales } from '@/services';
import { Purchases } from '@/interfaces';
import { FC } from 'react';
import { Indicators, LastSevenDaysSale, TopSales } from '@/components/dashboard';

type Props = {
  lastSevenDaysPurchases: Purchases;
  topSales: Record<string, number>;
};

const Home: FC<Props> = ({ lastSevenDaysPurchases, topSales }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DashboardLayout>
        <div className={s.wrapper}>
          <Indicators purchases={lastSevenDaysPurchases} />

          <div className={s.content}>
            <div className={s.leftSideContent}>
              <LastSevenDaysSale lastSevenDaysPurchases={lastSevenDaysPurchases} />
            </div>

            <TopSales topSales={topSales} />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps() {
  const lastSevenDaysPurchases = await getSevenDaysPurchases();
  const topSales = await getTopSales(lastSevenDaysPurchases);

  return {
    props: {
      lastSevenDaysPurchases,
      topSales,
    },
  };
}

export default Home;
