export type ProductState = 'activo' | 'inactivo';

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  state: ProductState;
}
