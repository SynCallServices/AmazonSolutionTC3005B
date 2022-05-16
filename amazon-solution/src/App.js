import { Route, Routes } from 'react-router-dom'
import LogIn from './views/LogIn/LogIn.js'
import DashBoard from './views/Dashboard/Dashboard.js'
import DashBoardAdmin from './views/DashboardAdmin/DashboardAdmin.js'
import CallManager from './views/Dashboard/components/CallManager.js'
import VideoForm from './views/Dashboard/components/VideoForm.js'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='admin' element={<DashBoardAdmin />}></Route>
        <Route path='dashboard' element={<DashBoard />}>
          <Route path='callmanager' element={<CallManager />}/>
          <Route path='videoform' element={<VideoForm/>}/>
        </Route>
      </Routes>

    </div>
  )
}

export default App;
