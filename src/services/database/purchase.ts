import { db } from '@/config/firebase';
import { Purchase } from '@/interfaces';
import { PURCHASES } from '@/utils/const';
import { getDocuments, getDocumentsWhere, setDocument } from '@/utils/helpers';
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import { getProduct } from '..';

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

  for (let t of purchases) {
    for (let r of t.products) {
      const result = (await getProduct(r.id)) ?? {};
      topSales[result.name] = r.quantity + (topSales[result.name] ?? 0);
    }
  }

  return topSales;
}

export { addPurchase, getPurchases, getSevenDaysPurchases, getTopSales };
