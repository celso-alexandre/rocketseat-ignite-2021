export default function RepositoryItem(props) {
  const { name, description, link } = props.repository || {};

  return (
    <li>
      <strong>{name ?? 'Default'}</strong>
      <p>{description ?? 'Default'}</p>

      <a href={link ?? '#'}>
        Acessar repositório
      </a>
    </li>
  );
}
