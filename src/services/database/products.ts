import { Product } from '@/interfaces';
import { PRODUCTS } from '@/util/const';
import { deleteDocument, getDocuments, setDocument, updateDocument } from '@/util/helpers';

async function addProduct(data: Product) {
  return await setDocument(PRODUCTS, data.id, data);
}

async function getProducts() {
  return await getDocuments(PRODUCTS);
}

async function deleteProduct(productId: string) {
  await deleteDocument(PRODUCTS, productId);
}

async function updateProduct(data: Product) {
  await updateDocument(PRODUCTS, data.id, data);
}

export { addProduct, getProducts, deleteProduct, updateProduct };
