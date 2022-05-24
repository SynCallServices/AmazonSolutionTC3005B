import Sidebar from './components/Sidebar'
import { Link, Outlet } from 'react-router-dom'

function DashBoard() {
  return (
    <div className='main-content'>
      <Sidebar />
      <div className='dashboard--content'>
        <Link to='/' >To Front Page</Link>
        <Link to='callmanager'>Open Call Manager</Link>
        <Link to='videoform'>Open Video Form</Link>
        <Link to='videodashboard'>Video Dashboard</Link>
        <Link to='screenrecorder'>Screen Recorder</Link>
        <Outlet />
      </div>
    </div>
  )
}

export default DashBoard
