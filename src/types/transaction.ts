export interface SoldItem {
  name: string;
  quantity: number;
  price: number;
}

export interface TransactionDetailsParams {
  receiptNumber: string;
  date: string;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  items: SoldItem[];
}