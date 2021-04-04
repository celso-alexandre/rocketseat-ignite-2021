export default function RepositoryItem(props) {
  const { name, description, html_url: url } = props.repository || {};

  return (
    <li>
      <strong>{name ?? 'Default'}</strong>
      <p>{description ?? 'Default'}</p>

      <a href={url ?? '#'}>
        Acessar repositório
      </a>
    </li>
  );
}
