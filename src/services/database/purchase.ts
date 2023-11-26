import { Purchase } from '@/interfaces';
import { PURCHASES } from '@/utils/const';
import { getDocuments, setDocument } from '@/utils/helpers';

async function addPurchase(data: Purchase) {
  await setDocument(PURCHASES, data.purchaseId, data);
}

async function getPurchases() {
  return await getDocuments(PURCHASES);
}

export { addPurchase, getPurchases };
