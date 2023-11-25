import { BookContent, Chart, Clock, Gear, Home, PurchaseTag } from '@/commons/icons';

const LOGIN = '/login';
const DASHBOARD = '/';
const ADMINISTRATION = '/administracion';
const INVENTORY = '/inventario';
const SALES = '/ventas';
const HISTORY = '/historial';
const REPORTS = '/reportes';
const PROFILE = '/perfil';

const SIDEBAR = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <Home />,
  },
  {
    name: 'Administración',
    href: ADMINISTRATION,
    icon: <Gear />,
  },
  {
    name: 'Inventario',
    href: INVENTORY,
    icon: <BookContent />,
  },
  {
    name: 'Venta de productos',
    href: SALES,
    icon: <PurchaseTag />,
  },
  {
    name: 'Historial de ventas',
    href: HISTORY,
    icon: <Clock />,
  },
  {
    name: 'Reportes',
    href: REPORTS,
    icon: <Chart />,
  },
];

export { LOGIN, DASHBOARD, ADMINISTRATION, INVENTORY, SALES, HISTORY, REPORTS, PROFILE, SIDEBAR };
