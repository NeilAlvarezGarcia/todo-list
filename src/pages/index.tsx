import Head from 'next/head';
import s from '@/styles/Home.module.css';
import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import { salesData } from '@/mocks';

const Home = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DashboardLayout>
        <div className={s.wrapper}>
          <ul className={s.salesIndicators}>
            {salesData?.map(({ title, value, color, icon }) => (
              <li key={title} className={s.listItem} style={{ borderLeft: `thick solid ${color}` }}>
                <div className={s.data}>
                  <h3 className={s.title} style={{ color }}>
                    {title}
                  </h3>

                  <p className={s.value}>{value}</p>
                </div>

                {icon}
              </li>
            ))}
          </ul>

          <div className={s.content}>
            <div className={s.leftSideContent}>
              <SectionLayout title='Ventas de los últimos 7 días'></SectionLayout>
            </div>

            <div className={s.rightSideContent}>
              <SectionLayout title='Productos más vendidos'></SectionLayout>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Home;
