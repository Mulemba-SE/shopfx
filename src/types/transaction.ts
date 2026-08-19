export interface SoldItem {
  name: string;
  quantity: number;
  price: number;
}

export type ReceiptStatus = 'Paid' | 'Pending' | 'Refunded';

export interface TransactionDetailsParams {
  receiptNumber: string;
  date: string;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  items: SoldItem[];
  customerName?: string; 
  status?: ReceiptStatus;
}