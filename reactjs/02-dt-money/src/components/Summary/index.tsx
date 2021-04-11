import { Container } from './styles';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/TransactionsContext';

export function Summary() {
  const { transactions } = useTransactions();

  const summaryValues = transactions.reduce((accumulatedSummary, transaction) => {
    const newAccumulatedSummary = accumulatedSummary;
    if (transaction.type === 'income') {
      newAccumulatedSummary.income += transaction.amount;
      newAccumulatedSummary.total += transaction.amount;
    } else {
      newAccumulatedSummary.outcome += transaction.amount;
      newAccumulatedSummary.total -= transaction.amount;
    }

    return newAccumulatedSummary;
  }, {
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
