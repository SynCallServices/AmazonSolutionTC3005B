import React from 'react'
import AWS from "aws-sdk";
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import { MdSpaceDashboard } from 'react-icons/md'
import { IoCall } from 'react-icons/io5'
import { RiSettingsFill } from 'react-icons/ri'
import { HiMenu } from 'react-icons/hi'
import { IoLogOut } from 'react-icons/io5'

import { UserContext } from '../../../App.js'

function Sidebar() {

  const amazonConnect = new AWS.Connect();

  const {user, setUser} = React.useContext(UserContext)
  const [role, setRole] = React.useState("...");

  async function signOut() {
    try {
      console.log('bruh')
      await Auth.signOut();
      setUser(null)
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  React.useEffect(() => {
    // example of how to obtain the security profile of a user
    amazonConnect.describeUser({
      InstanceId: process.env.REACT_APP_INSTANCE_ID,
      UserId: user.username.attributes["custom:connect_id"]
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
        }
      }
    })
  }, [])

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
          <Link className='link' to='screenrecorder'>
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
            <div className="profile-name">{user.username.username}</div>
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
