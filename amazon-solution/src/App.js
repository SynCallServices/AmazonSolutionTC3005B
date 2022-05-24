import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from './views/LogIn/LogIn.js'
import DashBoard from './views/Dashboard/Dashboard.js'
import DashBoardAdmin from './views/DashboardAdmin/DashboardAdmin.js'
import CallManager from './views/Dashboard/components/CallManager.js'
import VideoForm from './views/Dashboard/components/VideoForm.js'
import VideoDashboard from './views/Dashboard/components/VideoDashboard.js'
import Settings from './views/Dashboard/components/Settings.js'
import { withAuthenticator } from '@aws-amplify/ui-react';

// Route restrictions
import ProtectedRoute from './routes-config/ProtectedRoute.js'

export const UserContext = React.createContext(null)

function App() {

  const [user, setUser] = React.useState(null)

  return (
    <div>
      <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/' element={<LogIn />} />
            <Route exact path='dashboard' element={
              <ProtectedRoute user={user}>
                <DashBoard />
              </ProtectedRoute>
            }>
              <Route path='callmanager' element={<CallManager />}/>
              <Route path='videoform' element={<VideoForm/>}/>
              <Route path='videodashboard' element={<VideoDashboard/>}/>
              <Route path='settings' element={<Settings/>}/>
            </Route>
        </Routes>
      </UserContext.Provider>

    </div>
  )
}

export default App;
