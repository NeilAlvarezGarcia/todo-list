import Head from 'next/head';
import s from '@/styles/Home.module.css';
import { DashboardLayout } from '@/commons/layouts';

import { getPurchases, getSevenDaysPurchases } from '@/services';
import { Purchase } from '@/interfaces';
import { FC } from 'react';
import { Indicators, LastSevenDaysSale, TopSales } from '@/components/dashboard';

type Props = {
  purchases: Purchase[];
  lastSevenDaysPurchases: Purchase[];
};

const Home: FC<Props> = ({ purchases, lastSevenDaysPurchases }) => {
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

            <div className={s.rightSideContent}>
              <TopSales lastSevenDaysPurchases={lastSevenDaysPurchases} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps() {
  const purchases = await getPurchases();
  const lastSevenDaysPurchases = await getSevenDaysPurchases();

  return {
    props: {
      purchases,
      lastSevenDaysPurchases,
    },
  };
}

export default Home;
