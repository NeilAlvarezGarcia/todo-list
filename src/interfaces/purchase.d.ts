export interface Purchase {
  createdAt: number;
  purchaseId: number;
  documentClientNumber: string;
  clientName: string;
  products: { id: string; quantity: number }[];
  total: number;
}
