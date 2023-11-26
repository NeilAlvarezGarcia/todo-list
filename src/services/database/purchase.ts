import { db } from '@/config/firebase';
import { Purchase } from '@/interfaces';
import { PURCHASES } from '@/utils/const';
import { getDocuments, getDocumentsWhere, setDocument } from '@/utils/helpers';
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';

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

export { addPurchase, getPurchases, getSevenDaysPurchases };
