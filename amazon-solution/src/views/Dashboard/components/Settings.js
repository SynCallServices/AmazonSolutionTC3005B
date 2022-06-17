import { RiAccountCircleLine } from 'react-icons/ri'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { BiHelpCircle } from 'react-icons/bi'
import React from 'react'
import { Link } from 'react-router-dom'
import "../../../css/settings.css"


function Settings() {
  return (
    <div className='menu'>
      <div className='sub-menu'>
        <div>
          <Link className='link' to='account'>
            <div className='settings-card'>
              <div className='a_logo'>
                {<RiAccountCircleLine size={50} />}
              </div>
              <div className='a_title' >
                <h1>Account</h1>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link className='link' to='info'>
            <div className='settings-card'>
              <div className='i_logo'>
                {<HiOutlineInformationCircle size={50} />}
              </div>
              <div className='i_title'>
                <h1>Information</h1>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link className='link' to='help'>
            <div className='settings-card'>
              <div className='h_logo'>
                {<BiHelpCircle size={50} />}
              </div>
              <div className='h_title'>
                <h1>Help</h1>
              </div>
            </div >
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Settings






