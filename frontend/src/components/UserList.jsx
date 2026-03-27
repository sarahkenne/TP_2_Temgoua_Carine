import UserCard from './UserCard'

function UserList({ users, loading, error, onDelete, onEdit }) {
  if (loading) {
    return <p className="info-message">Chargement...</p>
  }

  if (error) {
    return <p className="error-message">{error}</p>
  }

  if (users.length === 0) {
    return <p className="info-message">Aucun utilisateur</p>
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default UserList