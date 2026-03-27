import { useState, useEffect } from 'react'

function UserForm({ onSubmit, user }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
  })

  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      })
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'user',
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Le nom et l’email sont obligatoires')
      return
    }

    setError('')

    try {
      await onSubmit(formData)

      setFormData({
        name: '',
        email: '',
        role: 'user',
      })
    } catch (err) {}
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{user ? "Modifier l'utilisateur" : 'Ajouter un utilisateur'}</h2>

      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Nom"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>

      <button type="submit">
        {user ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  )
}

export default UserForm