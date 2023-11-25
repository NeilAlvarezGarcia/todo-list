import { BookContent, Chart, Clock, Gear, Home, PurchaseTag } from '@/commons/icons';

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
    name: 'Venta de productos',
    href: '/ventas',
    icon: <PurchaseTag />,
  },
  {
    name: 'Historial de ventas',
    href: '/historial',
    icon: <Clock />,
  },
  {
    name: 'Reportes',
    href: '/reportes',
    icon: <Chart />,
  },
];

export { LOGIN, DASHBOARD, SIDEBAR };
