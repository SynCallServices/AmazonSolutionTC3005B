import { Link, Outlet } from 'react-router-dom'

function DashBoard() {
  return (
    <div>
      <h1>This is Dashboard</h1>
      <Link to='/' >To Front Page</Link>
      <Link to='callmanager'>Open Call Manager</Link>
      <Link to='videoform'>Open Video Form</Link>
      <Outlet />
    </div>
  )
}

export default DashBoard
