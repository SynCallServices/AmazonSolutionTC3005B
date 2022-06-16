import React from 'react'
import AWS from "aws-sdk";
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import { MdSpaceDashboard } from 'react-icons/md'
import { IoCall } from 'react-icons/io5'
import { RiSettingsFill } from 'react-icons/ri'
import { HiMenu } from 'react-icons/hi'
import { FaUserAlt } from 'react-icons/fa'
import { CgAssign } from 'react-icons/cg'
import { IoLogOut } from 'react-icons/io5'

import { UserContext } from '../../../App.js'

function Sidebar() {

  const amazonConnect = new AWS.Connect();

  const { user, setUser } = React.useContext(UserContext)
  const [role, setRole] = React.useState("...");
  const navigate = useNavigate();

  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null)
      localStorage.removeItem('user')
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  React.useEffect(() => {
    console.log(user)
    // example of how to obtain the security profile of a user
    amazonConnect.describeUser({
      InstanceId: process.env.REACT_APP_INSTANCE_ID,
      UserId: user.userAttributes["custom:connect_id"]
    }, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        const securityProfile = data.User.SecurityProfileIds[0];
        switch (securityProfile) {
          case process.env.REACT_APP_AGENT_ID:
            setRole("agent");
            break;
          case process.env.REACT_APP_SUPERVISOR_ID:
            setRole("supervisor");
            break;
          case process.env.REACT_APP_ADMIN_ID:
            setRole("admin");
            break;
          default:
            // only for good practice
        }
      }
    })
  }, [])

  const [sidebarActive, setSidebarActive] = React.useState(false);

  function sidebarUtil() {
    setSidebarActive(prevState => !prevState);
  }

  return (
    <nav className={sidebarActive ? 'sidebar' : 'sidebar active'}>
      <div className='logo-content'>
        <Link className='link' to='home'>
          <div className='logo' ><img src={require('../../../assets/Syncall_logo.png')} className='logo-icon' />
            <div className='logo-name'>SynCall</div>
            
          </div>
        </Link>
        <div className='menu-btn' onClick={sidebarUtil}>
          <HiMenu />
        </div>
      </div>
      <hr className='sidebar-separator' />
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

        {role === 'admin' ? 
        <li>
          <Link className='link' to='create-user'>
            <i>
              <FaUserAlt />
            </i>
            <span className='links-name'>Create User</span>
          </Link>
          <span className='tooltip'>Create User</span>
        </li>
        : null
        }

        {role === 'admin' ? 
        <li>
          <Link className='link' to='user-management'>
            <i>
              <FaUserAlt />
            </i>
            <span className='links-name'>User Management</span>
          </Link>
          <span className='tooltip'>User Management</span>
        </li>
        : null
        }

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
            <div className="profile-name">{user.username}</div>
            <div className="profile-role">{role}</div>
          </div>
          <div className='log-out' onClick={() => signOut()}>
            <IoLogOut />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar

