import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Container } from './styles';
import { api } from '../../services/api';

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

export function TransactionsTable() {
  const [transactions, setTransactions] = useState([] as ITransaction[]);

  useEffect(() => {
    api.get<IGetTransactionsResponse>('transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th className="title">Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td className="title">{transaction.title}</td>
              <td className={transaction.type}>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>
                {format(new Date(transaction.createdAt), 'dd/MM/yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
