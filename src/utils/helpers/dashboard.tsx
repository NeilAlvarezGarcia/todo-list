import { Purchases } from '@/interfaces';
import { formatCurrency } from '.';

function populateIndicatorData(purchases: Purchases) {
  const sales = {
    title: 'Cantidad de ventas',
    value: purchases.length,
    color: '#269CEE',
  };

  const total = purchases.reduce((counter, purchase) => (counter += purchase.total), 0);
  const inconmings = {
    title: 'Ingreso por ventas',
    value: formatCurrency(total),
    color: '#90D668',
  };

  const products = purchases.reduce((counter, purchase) => {
    const total = purchase.products.reduce(
      (quantity, product) => (quantity += product.quantity),
      0
    );

    return (counter += total);
  }, 0);

  const productsSold = {
    title: 'Total productos',
    value: products,
    color: '#E3E053',
  };

  return [sales, inconmings, productsSold];
}
export { populateIndicatorData };
