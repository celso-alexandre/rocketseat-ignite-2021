import { useContext } from 'react';
import { Container } from './styles';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { TransactionsContext } from '../../contexts/TransactionsContext';

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const summaryValues = transactions.reduce((accumulatedSummary, transaction) => (
    {
      ...accumulatedSummary,
      [transaction.type]: accumulatedSummary[transaction.type] + transaction.amount,
      total: accumulatedSummary.total + (
        transaction.amount * (transaction.type === 'outcome' ? -1 : 1)
      ),
    }
  ), {
    income: 0,
    outcome: 0,
    total: 0,
  });

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summaryValues.income)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summaryValues.outcome * -1)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summaryValues.total)}
        </strong>
      </div>
    </Container>
  );
}
