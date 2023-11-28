import { UiProvider, UserProvider } from '@/context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'moment/locale/es';
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <UiProvider>
        <Component {...pageProps} />
      </UiProvider>
    </UserProvider>
  );
}
