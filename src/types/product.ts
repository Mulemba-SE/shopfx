export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: string;
  name: string;
  price: number;
  stockCount: number;
  status: StockStatus;
  icon: string;
  iconColor: string;
  iconBackground: string;
  category: string;
}