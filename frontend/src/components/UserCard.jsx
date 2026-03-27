function UserCard({ user, onDelete, onEdit }) {
  const formattedDate = new Date(user.createdAt).toLocaleDateString()

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email : {user.email}</p>

      <p>
        Rôle :
        <span className={user.role === 'admin' ? 'role-admin' : 'role-user'}>
          {user.role}
        </span>
      </p>

      <p>Créé le : {formattedDate}</p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => onEdit(user)}>Modifier</button>
        <button onClick={() => onDelete(user._id)}>Supprimer</button>
      </div>
    </div>
  )
}

export default UserCard