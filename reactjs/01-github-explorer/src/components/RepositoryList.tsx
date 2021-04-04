import '../styles/repositories.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RepositoryItem from './RepositoryItem';

interface Repository {
  id: number;
  name: string;
  description?: string;
  html_url: string;
}

export default function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    axios.get('https://api.github.com/users/celso-alexandre/repos')
      .then((response) => setRepositories(response.data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
        {repositories.map((repository) => (
          <RepositoryItem
            key={repository.id}
            repository={repository}
          />
        ))}
      </ul>
    </section>
  );
}
