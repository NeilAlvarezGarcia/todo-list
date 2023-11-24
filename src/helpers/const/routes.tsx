import { BookContent, Chart, Gear, Home, PurchaseTag } from '@/commons/icons';

const LOGIN = '/login';
const DASHBOARD = '/';

const SIDEBAR = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <Home />,
  },
  {
    name: 'Administración',
    href: '/administracion',
    icon: <Gear />,
  },
  {
    name: 'Inventario',
    href: '/inventario',
    icon: <BookContent />,
  },
  {
    name: 'Ventas',
    href: '/ventas',
    icon: <PurchaseTag />,
  },
  {
    name: 'Reportes',
    href: '/reportes',
    icon: <Chart />,
  },
];

export { LOGIN, DASHBOARD, SIDEBAR };
