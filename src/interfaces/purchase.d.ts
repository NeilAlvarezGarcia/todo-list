export interface Purchase {
  createdAt: number;
  purchaseId: string;
  documentClientNumber: string;
  clientName: string;
  products: { id: string; quantity: number }[];
  total: number;
  subtotal: number;
  ivaAmount: number;
}
