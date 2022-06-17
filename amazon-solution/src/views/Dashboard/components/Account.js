import React from 'react'
import { UserContext } from '../../../App.js'
import { RiAccountCircleLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

function Account() {
  // function goBack(){
  //   props.setTrigger(false)
  // }
  const navigate = useNavigate()
  return (
    <div className='account-page'>
      <div className='acc-card'>
        <div className='account-info'>
          {<RiAccountCircleLine size={150} />}
          <div className='acc-info-inside'>
            <h3>{user.userAttributes["custom:first_name"]} {user.userAttributes["custom:last_name"]}</h3>
            <h3>@{user.username}</h3>
            <h3>{user.UserAttributes[5].Value}</h3>
          </div>
        </div>
      </div>
          <button onClick={() => {
        navigate('/dashboard/settings')

      }} className='a_button'>Back</button>

    </div>
  )
}

export default Account
