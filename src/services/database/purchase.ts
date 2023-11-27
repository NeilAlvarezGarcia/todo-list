import { Product, Purchase } from '@/interfaces';
import { PURCHASES, inactiveProduct } from '@/utils/const';
import { getDocuments, getDocumentsWhere, setDocument } from '@/utils/helpers';
import moment from 'moment';
import { getProduct, updateProduct } from '..';
import { ProductSelected } from '@/pages/ventas';

async function addPurchase(data: Purchase) {
  await setDocument(PURCHASES, data.purchaseId, data);
}

async function getPurchases() {
  return await getDocuments(PURCHASES);
}

async function getSevenDaysPurchases() {
  const sevenDaysAgoTimestamp = moment().subtract(7, 'days').valueOf();

  return await getDocumentsWhere(PURCHASES, 'createdAt', '>=', sevenDaysAgoTimestamp);
}

async function getTopSales(purchases: Purchase[]) {
  const topSales: Record<string, number> = {};

  for (let purchase of purchases) {
    for (let product of purchase.products) {
      const result = (await getProduct(product.id)) ?? {};
      topSales[result.name] = product.quantity + (topSales[result.name] ?? 0);
    }
  }

  return topSales;
}

async function updateProductsStock(products: ProductSelected[]) {
  for (let product of products) {
    const result = (await getProduct(product.id)) as Product;
    const stock = Number(result.stock) - product.quantity;
    await updateProduct({
      ...result,
      stock,
      ...(!Boolean(stock) && { state: inactiveProduct }),
    });
  }
}

export { addPurchase, getPurchases, getSevenDaysPurchases, getTopSales, updateProductsStock };
