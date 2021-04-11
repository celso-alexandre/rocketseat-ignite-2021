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

type ICreateNewTransactionBody = Omit<ITransaction, 'id' | 'createdAt'>;

interface IGetTransactionsResponse {
  transactions: ITransaction[];
}

interface IPostTransactionsResponse {
  transaction: ITransaction;
}

interface IContextValue {
  transactions: ITransaction[];
  createNewTransaction: (transaction: ICreateNewTransactionBody) => Promise<void>;
}

interface IProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<IContextValue>({} as IContextValue);

export function TransactionsProvider({ children }: IProps) {
  const [transactions, setTransactions] = useState([] as ITransaction[]);

  async function loadTransactions() {
    const response = await api.get<IGetTransactionsResponse>('transactions');
    setTransactions(response.data.transactions);
  }

  async function createNewTransaction(newTransaction: ICreateNewTransactionBody) {
    const newTransactionResponse = await api.post<IPostTransactionsResponse>('transactions', newTransaction);
    setTransactions([
      ...transactions,
      newTransactionResponse.data.transaction,
    ]);
    // await loadTransactions();
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createNewTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
