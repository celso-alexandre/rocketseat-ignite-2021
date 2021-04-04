const repositoryName = 'unform2';

export default function RepositoryList() {
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        <li>
          <strong>{repositoryName}</strong>
          <p>Forms in React</p>

          <a href="a">
            Acessar repositório
          </a>
        </li>

        <li>
          <strong>unform</strong>
          <p>Forms in React</p>

          <a href="a">
            Acessar repositório
          </a>
        </li>

        <li>
          <strong>unform</strong>
          <p>Forms in React</p>

          <a href="a">
            Acessar repositório
          </a>
        </li>
      </ul>
    </section>
  );
}
