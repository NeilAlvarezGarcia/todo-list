import Head from 'next/head';
import s from '@/styles/Home.module.css';
import { DashboardLayout } from '@/commons/layouts';

import { getPurchases, getSevenDaysPurchases, getTopSales } from '@/services';
import { Purchase } from '@/interfaces';
import { FC } from 'react';
import { Indicators, LastSevenDaysSale, TopSales } from '@/components/dashboard';

type Props = {
  purchases: Purchase[];
  lastSevenDaysPurchases: Purchase[];
  topSales: Record<string, number>[];
};

const Home: FC<Props> = ({ purchases, lastSevenDaysPurchases, topSales }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DashboardLayout>
        <div className={s.wrapper}>
          <Indicators purchases={purchases} />

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
  const purchases = await getPurchases();
  const lastSevenDaysPurchases = await getSevenDaysPurchases();
  const topSales = await getTopSales(purchases);

  return {
    props: {
      purchases,
      lastSevenDaysPurchases,
      topSales,
    },
  };
}

export default Home;
