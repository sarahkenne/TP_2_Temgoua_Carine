function Navbar({ count }) {
  return (
    <nav className="navbar">
      <h1>Gestion des utilisateurs</h1>
      <p>Nombre d'utilisateurs : {count}</p>
    </nav>
  )
}

export default Navbar