export type ProductCategory = 'Beverages' | 'Snacks' | 'Household' | 'Personal Care';

export const CATEGORIES: ProductCategory[] = ['Beverages', 'Snacks', 'Household', 'Personal Care'];

interface CategoryStyle {
  icon: string;
  iconColor: string;
  iconBackground: string;
}

export const categoryStyles: Record<ProductCategory, CategoryStyle> = {
  Beverages: { icon: 'droplet', iconColor: '#2563EB', iconBackground: '#DBEAFE' },
  Snacks: { icon: 'package', iconColor: '#D97706', iconBackground: '#FEF3C7' },
  Household: { icon: 'home', iconColor: '#16A34A', iconBackground: '#DCFCE7' },
  'Personal Care': { icon: 'heart', iconColor: '#DB2777', iconBackground: '#FCE7F3' },
};