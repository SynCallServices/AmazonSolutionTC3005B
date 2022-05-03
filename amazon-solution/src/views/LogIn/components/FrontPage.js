function FrontPage({ signOut, user }) {
  return (
    <div>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default LogIn

