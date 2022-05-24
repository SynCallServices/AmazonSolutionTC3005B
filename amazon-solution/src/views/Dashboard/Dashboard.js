import Sidebar from './components/Sidebar'
import { Link, Outlet } from 'react-router-dom'

function DashBoard() {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboard--content'>
        <h1>This is Dashboard</h1>
        <Link to='/' >To Front Page</Link>
        <Link to='callmanager'>Open Call Manager</Link>
        <Link to='videoform'>Open Video Form</Link>
        <Outlet />
      </div>
    </div>
  )
}

export default DashBoard
