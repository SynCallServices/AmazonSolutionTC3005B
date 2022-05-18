import { Link, Outlet } from 'react-router-dom'

function DashBoard() {
  return (
    <div className='main-content'>
      <h1>This is Dashboard</h1>
      <Link to='/' >To Front Page</Link>
      <Link to='callmanager'>Open Call Manager</Link>
      <Link to='videoform'>Open Video Form</Link>
      <Link to='videodashboard'>Video Dashboard</Link>
      <Outlet />
    </div>
  )
}

export default DashBoard
