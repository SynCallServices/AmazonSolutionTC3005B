import '../assets/styles/App.css'
import App from './App'

import { withAuthenticator } from '@aws-amplify/ui-react';


function Home({ signOut, user }) {
  return (
    <div className='container'>
      <h1>Hello {user.username}</h1>
      <App />
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default withAuthenticator(Home); 