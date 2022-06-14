import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from './views/LogIn/LogIn.js'
import Home from './views/Dashboard/components/Home.js'
import DashBoard from './views/Dashboard/Dashboard.js'
import DashBoardAdmin from './views/DashboardAdmin/DashboardAdmin.js'
import CallManager from './views/Dashboard/components/CallManager.js'
import VideoForm from './views/Dashboard/components/VideoForm.js'
import VideoDashboard from './views/Dashboard/components/VideoDashboard.js'
import Settings from './views/Dashboard/components/Settings.js'
import Account from './views/Dashboard/components/Account.js'
import Terms from './views/Dashboard/components/Terms.js'
import Help from './views/Dashboard/components/Help.js'
import ShowVideos from './views/Dashboard/components/ShowVideos.js'
import ScreenRecorder from './views/ScreenRecorder/ScreenRecorder.js'
import ConnectLogIn from './views/Dashboard/components/ConnectLogIn'
import AssignVideos from './views/Dashboard/components/AssignVideos.js'
import CreateUser from './views/Dashboard/components/CreateUser.js'
import { AmplifyProvider } from '@aws-amplify/ui-react'

// Route restrictions
import ProtectedRoute from './routes-config/ProtectedRoute.js'
import Sidebar from './views/Dashboard/components/Sidebar.js'

export const UserContext = React.createContext(null)

function App() {

  const [user, setUser] = React.useState(null)

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<LogIn/>} />
          <Route exact path='dashboard' element={
            <ProtectedRoute user={user}>
              <DashBoard />
            </ProtectedRoute>
          }>
            <Route path='callmanager' element={<CallManager />} />
            <Route path='home' element={<Home />} />
            <Route path='videoform' element={<VideoForm />} />
            <Route path='videodashboard' element={<ShowVideos />} />
            <Route path='settings' element={<Settings />} > 
              <Route path='account' element={<Account />}/>
              <Route path='terms' element={<Terms />}/>
              <Route path='help' element={<Help />}/>
            </Route>
            <Route path='screenrecorder' element={<ScreenRecorder />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App;
