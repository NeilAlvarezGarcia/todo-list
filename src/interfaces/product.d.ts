type ProductState = 'activo' | 'inactivo';

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  state: ProductState;
  createdAt: number;
  updatedAt: number;
}

type Products = Product[];

export { ProductState, Product, Products };
