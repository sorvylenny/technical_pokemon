export interface Checkout {
  message: string;
  transaction: Transaction;
}

export interface CheckoutPayload {
  userId: string;
  pokemonsIds: string[];
}

export interface Transaction {
  id: string;
  userId: string;
  totalAmount: number;
  pokemonsIds: string[];
  updatedAt: string;
  createdAt: string;
  orderNumber: number;
}
