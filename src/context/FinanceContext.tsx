import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { INITIAL_TRANSACTIONS, Transaction, TransactionType } from '../data/initialTransactions';

type FinanceContextType = {
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
  addTransaction: (
    title: string,
    amount: number,
    type: TransactionType,
    category: Transaction['category'],
    note: string
  ) => void;
  deleteTransaction: (id: string) => void;
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((item) => {
      if (item.type === 'income') income += item.amount;
      else expense += item.amount;
    });
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transactions]);

  const addTransaction = useCallback(
    (
      title: string,
      amount: number,
      type: TransactionType,
      category: Transaction['category'],
      note: string
    ) => {
      const today = new Date().toISOString().split('T')[0];
      const newTx: Transaction = {
        id: Date.now().toString(),
        title,
        amount,
        type,
        category,
        date: today,
        note: note || '-',
      };
      setTransactions((prev) => [newTx, ...prev]);
    },
    []
  );

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        totalIncome,
        totalExpense,
        balance,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance harus digunakan di dalam FinanceProvider');
  }
  return context;
}
