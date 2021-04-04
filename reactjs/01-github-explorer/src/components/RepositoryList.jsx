import RepositoryItem from './RepositoryItem';

export default function RepositoryList() {
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
        <RepositoryItem
          repository={{
            name: 'unform',
            description: 'Forms in React',
            link: 'https://github.com/unform/unform',
          }}
        />
        <RepositoryItem />
        <RepositoryItem />
        <RepositoryItem />
      </ul>
    </section>
  );
}
