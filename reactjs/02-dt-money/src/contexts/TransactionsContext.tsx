import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import { api } from '../services/api';

interface ITransaction {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string,
}

interface IGetTransactionsResponse {
  transactions: ITransaction[];
}

interface IContextValue {
  transactions: ITransaction[];
  loadTransactions: () => void;
}

interface IProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as IContextValue);

export function TransactionsProvider({ children }: IProps) {
  const [transactions, setTransactions] = useState([] as ITransaction[]);

  async function loadTransactions() {
    const response = await api.get<IGetTransactionsResponse>('transactions');
    setTransactions(response.data.transactions);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        loadTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
