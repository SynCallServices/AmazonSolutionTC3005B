import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from './views/LogIn/LogIn.js'
import DashBoard from './views/Dashboard/Dashboard.js'
import VideoForm from './views/Dashboard/components/VideoForm.js'
import Settings from './views/Dashboard/components/Settings.js'
import ShowVideos from './views/Dashboard/components/ShowVideos.js'
import ScreenRecorder from './views/ScreenRecorder/ScreenRecorder.js'
import UserManagement from './views/Dashboard/components/UserManagement.js'
import AssignVideos from './views/Dashboard/components/AssignVideos.js'
import CreateUser from './views/Dashboard/components/CreateUser.js'
import CreatedUser from './views/Dashboard/components/CreatedUser.js'
import Account from './views/Dashboard/components/Account.js'
import Home from './views/Dashboard/components/Home'
import Info from './views/Dashboard/components/Info'
import Help from './views/Dashboard/components/Help'

// Route restrictions
import ProtectedRoute from './routes-config/ProtectedRoute.js'

export const UserContext = React.createContext(null)

function App() {

  const [user, setUser] = React.useState(null)

  return (
    <div>
      <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/' element={<LogIn/>} />
            <Route exact path='dashboard' element={
              <ProtectedRoute user={user}>
                <DashBoard />
              </ProtectedRoute>}>
              <Route path='videoform' element={<VideoForm/>}/>
              <Route path='videodashboard' element={<ShowVideos />}/>
              <Route path='settings' element={<Settings/>}/>
              <Route path='screenrecorder' element={<ScreenRecorder/>}/>
              <Route path='create-user' element={<CreateUser />}/>
              <Route path='created-user' element={<CreatedUser />}/>
              <Route path='user-management' element={<UserManagement />}/>
              <Route path='assign-videos' element={<AssignVideos/>}/>
              <Route path='home' element={<Home />}/>
              <Route path='settings/account' element={<Account/>}/>
              <Route path='settings/info' element={<Info />}/>
              <Route path='settings/help' element={<Help />}/>
            </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App;
