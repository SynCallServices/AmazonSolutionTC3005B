//import { RiAccountCircleLine, HiOutlineInformationCircle,BsVolumeUp,BiHelpCircle,HiOutlineLockClosed} from 'react-icons/ai'
// import { Link } from '@aws-amplify/ui-react'
import { RiAccountCircleLine } from 'react-icons/ri'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { BsVolumeUp } from 'react-icons/bs'
import { BiHelpCircle } from 'react-icons/bi'
import { HiOutlineLockClosed } from 'react-icons/hi'
import Account from "./Account.js"
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Settings() {
  const [alert, setAlert] = React.useState(true)
  return (
    <div className='menu'>
      
      <div>
      <div className='account'>
      <div className='a_logo'>
        {<RiAccountCircleLine size={50} />}
      </div>
      <Link className='a_title' to='account-settings' >
        <span>Account</span>
      </Link>

    </div>

    <div className='information'>
      <div className='i_logo'>
        {<HiOutlineInformationCircle size={50} />}
      </div>
      <div className='i_title'>
        <h1>Information</h1>
      </div>
    </div>


    <div className='help'>
      <div className='h_logo'>
        {<BiHelpCircle size={50} />}
      </div>
      <div className='h_title'>
        <h1>Help</h1>
      </div>
    </div >
    </div>
    

   
  </div>
      

  )
}

export default Settings






