import '../assets/styles/App.css'
import VideoUploader from './VideoUploader';

import { withAuthenticator } from '@aws-amplify/ui-react';

function Home({ signOut, user }) {
  return (
    <div className='container'>
      <h1>Hello {user.username}</h1>
      <VideoUploader user={user.attributes.sub}/>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

//export default withAuthenticator(Home); 