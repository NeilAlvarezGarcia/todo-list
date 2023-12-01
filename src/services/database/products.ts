import { Product, Products } from '@/interfaces';
import { PRODUCTS, activeProduct } from '@/utils/const';
import {
  deleteDocument,
  getDocument,
  getDocuments,
  setDocument,
  updateDocument,
} from '@/utils/helpers';

async function addProduct(data: Product) {
  return await setDocument(PRODUCTS, data.id, data);
}

async function getProducts(): Promise<Products> {
  const products = (await getDocuments(PRODUCTS)) as Products;

  return products.sort((a, b) => a.createdAt - b.createdAt);
}

async function getProduct(id: string): Promise<Product> {
  return (await getDocument(PRODUCTS, id)) as Product;
}

async function deleteProduct(productId: string) {
  await deleteDocument(PRODUCTS, productId);
}

async function updateProduct(data: Product) {
  await updateDocument(PRODUCTS, data.id, data);
}

function getAvailableProducts(data: Products): Products {
  return data.filter(
    (product) => product.state === activeProduct && Boolean(Number(product.stock))
  );
}

export { addProduct, getProducts, deleteProduct, updateProduct, getProduct, getAvailableProducts };
