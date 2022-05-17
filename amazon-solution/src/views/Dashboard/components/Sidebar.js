import { Link } from 'react-router-dom'
import { MdSpaceDashboard } from 'react-icons/md'
import { IoCall } from 'react-icons/io5'
import { RiSettingsFill } from 'react-icons/ri'
import { HiMenu } from 'react-icons/hi'
import { IoLogOut } from 'react-icons/io5'

function Sidebar() {
  return (
    <nav className='sidebar'>
      <div className='logo-content'>
        <div className='logo'>
          <img src={require('../../../assets/Syncall_Logo.png')} className='logo-icon'/>
          <div className='logo-name'>SynCall</div>
        </div>
        <div className='menu-btn'>
          <HiMenu />
        </div>
      </div>
      <hr className='sidebar-separator'/>
      <ul className='nav_list'>
        <li>
          <Link className='link' to='videodashboard'>
            <i>
              <MdSpaceDashboard />
            </i>
            <span className='links-name'>Dashboard</span>
          </Link>
          <span className='tooltip'>Dashboard</span>
        </li>
        <li>
          <Link className='link' to='callmanager'>
            <i>
              <IoCall />
            </i>
            <span className='links-name'>Call Manager</span>
          </Link>
          <span className='tooltip'>Call Manager</span>
        </li>
        <li>
          <Link className='link' to='settings'>
            <i>
              <RiSettingsFill />
            </i>
            <span className='links-name'>Settings</span>
          </Link>
          <span className='tooltip'>Settings</span>
        </li>
      </ul>
      <div className='profile-content'>
        <div className='profile'>
          <div className='profile-details'>
            <div className="profile-name">Jorge Cabiedes</div>
            <div className="profile-role">Agent</div>
          </div>
          <div className='log-out'>
            <IoLogOut />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
