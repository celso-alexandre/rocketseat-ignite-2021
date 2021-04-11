import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Container } from './styles';

interface ITransaction {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: Date,
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState([] as ITransaction[]);

  useEffect(() => {
    axios.get<ITransaction[]>('http://localhost:3000/api/transactions')
      .then((response) => setTransactions(response.data));
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
              <td className="income">{transaction.amount}</td>
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
