import { useContext, useEffect, useState } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { Container } from './styles';

export function TransactionsTable() {
  const { transactions } = useContext(TransactionsContext);

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
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {/* {format(
                  new Date(transaction.createdAt), 'dd/MM/yyyy'
                )} */}
                {/* {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt),
                )} */}
                {transaction.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
