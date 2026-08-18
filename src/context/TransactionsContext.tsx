import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TransactionDetailsParams } from '../types/transaction';

interface TransactionsContextValue {
  transactions: TransactionDetailsParams[];
  addTransaction: (transaction: TransactionDetailsParams) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionDetailsParams[]>([]);

  function addTransaction(transaction: TransactionDetailsParams) {
    setTransactions((prev) => [transaction, ...prev]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
}