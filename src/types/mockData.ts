export interface SalesDataPoint {
  time: string;
  value: number;
}

export interface DashboardStats {
  todaySales: number;
  yesterdaySales: number;
  salesChangePercent: number;
  transactions: number;
  transactionsChangePercent: number;
  itemsSold: number;
  itemsSoldChangePercent: number;
  outstanding: number;
  customers: number;
  chartData: SalesDataPoint[];
}

export const mockDashboardStats: DashboardStats = {
  todaySales: 84520,
  yesterdaySales: 75180,
  salesChangePercent: 12.5,
  transactions: 128,
  transactionsChangePercent: 8.2,
  itemsSold: 342,
  itemsSoldChangePercent: 15.7,
  outstanding: 32640,
  customers: 256,
  chartData: [
    { time: '12 AM', value: 20 },
    { time: '6 AM', value: 35 },
    { time: '12 PM', value: 55 },
    { time: '6 PM', value: 70 },
    { time: '12 AM', value: 84.5 },
  ],
};

export const mockUser = {
  name: 'Evans Mulemba',
};