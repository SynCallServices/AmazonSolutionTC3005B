import '../assets/styles/App.css'
import APITest from './APITest'



function Home({ signOut, user }) {
  console.log(process.env.REACT_APP_TEST)
  return (
    <div className='container'>
      <h1>Hello {user.username}</h1>
      <APITest />
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default Home; 