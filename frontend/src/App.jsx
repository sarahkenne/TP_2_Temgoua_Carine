import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import userService from './services/userService'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await userService.getAll()
      setUsers(response.data.data || [])
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
  }

  const handleCreate = async (data) => {
    try {
      setError(null)

      if (selectedUser) {
        await userService.update(selectedUser._id, data)
        await fetchUsers()
        setSelectedUser(null)
      } else {
        const response = await userService.create(data)
        const newUser = response.data?.data || response.data
        setUsers((prev) => [...prev, newUser])
      }
    } catch (err) {
      setError("Email déja utilisé")
      throw err
    }
  }

  const handleDelete = async (id) => {
    try {
      setError(null)
      await userService.remove(id)
      setUsers((prev) => prev.filter((u) => u._id !== id))
    } catch (err) {
      setError("Erreur lors de la suppression")
    }
  }

  return (
    <div>
      <Navbar count={users.length} />
      <UserForm onSubmit={handleCreate} user={selectedUser} />
      <UserList
        users={users}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  )
}

export default App