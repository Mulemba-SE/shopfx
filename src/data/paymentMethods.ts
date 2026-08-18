export interface PaymentMethod {
  id: string;
  icon: string;
  iconColor: string;
  iconBackground: string;
  label: string;
  description: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cash',
    icon: 'dollar-sign',
    iconColor: '#16A34A',
    iconBackground: '#DCFCE7',
    label: 'Cash',
    description: 'Pay with cash',
  },
  {
    id: 'mpesa',
    icon: 'smartphone',
    iconColor: '#16A34A',
    iconBackground: '#DCFCE7',
    label: 'M-Pesa',
    description: 'Pay with M-Pesa',
  },
  {
    id: 'card',
    icon: 'credit-card',
    iconColor: '#2563EB',
    iconBackground: '#DBEAFE',
    label: 'Card',
    description: 'Debit / Credit card',
  },
  {
    id: 'other',
    icon: 'list',
    iconColor: '#7C3AED',
    iconBackground: '#EDE9FE',
    label: 'Other',
    description: 'Other payment methods',
  },
];