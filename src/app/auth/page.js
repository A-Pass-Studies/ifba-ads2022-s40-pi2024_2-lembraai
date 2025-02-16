import db from '../../database/models';

export default async function Page() {

      const usuarios = await db.usuarios.findAll();

  return (
    <div>
      {usuarios.map((u) => (
        <div key={u.id}>
          <p>e-mail: {u.email}</p>
          <p>senha: {u.senha}</p>
        </div>
      ))}
    </div>
  )
}