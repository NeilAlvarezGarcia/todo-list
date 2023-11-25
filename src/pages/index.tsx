import Head from 'next/head';
import s from '@/styles/Home.module.css';
import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import { salesData } from '@/mocks';
import { Bar, Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  resizeBy: '',
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const UserData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

export const data = {
  labels: UserData.map((data) => data.year),
  datasets: [
    {
      label: 'Users Gained',
      data: UserData.map((data) => data.userGain),
      backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
      borderColor: 'black',
      borderWidth: 2,
    },
  ],
};

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
              <SectionLayout title='Ventas de los últimos 7 días'>
                <div className={s.chartContainer}>
                  <Bar options={options} data={data} />
                </div>
              </SectionLayout>
            </div>

            <div className={s.rightSideContent}>
              <SectionLayout title='Productos más vendidos'>
                <div className={s.chartContainer}>
                  <Pie data={data} />
                </div>
              </SectionLayout>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Home;
