import { RiAccountCircleLine } from 'react-icons/ri'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { BiHelpCircle } from 'react-icons/bi'
import React from 'react'
import { Link } from 'react-router-dom'
import "../../../css/settings.css"
import { useNavigate } from 'react-router-dom'


function Settings() {
  // const [alert, setAlert] = React.useState(true)
  const navigate = useNavigate()
  return (
    <div className='menu'>
      <div>
          <div className='account' onClick={() => {
          navigate('/dashboard/account')
        }}>
            <div className='a_logo'>
              {<RiAccountCircleLine size={50} />}
            </div>
            <div className='a_title' >
              <h1>Account</h1>
            </div>
          </div>


      </div>

        <div className='information' onClick={() => {
          navigate('/dashboard/info')
        }}>
          <div className='i_logo'>
            {<HiOutlineInformationCircle size={50} />}
          </div>
          <div className='i_title'>
            <h1>Information</h1>
          </div>
        </div>


        <div className='help' onClick={() => {
        navigate('/dashboard/help')
      }}>
          <div className='h_logo'>
            {<BiHelpCircle size={50} />}
          </div>
          <div className='h_title'>
            <h1>Help</h1>
          </div>
        </div >
    </div>
  )
}

export default Settings






