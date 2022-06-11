import { RiAccountCircleLine } from 'react-icons/ri'

function Account() {
  return (
    <div>
      <div className='s-account'>
        <div className='a_logo'>
          {<RiAccountCircleLine size={50} />}
        </div>
        <div className='a_title'>
          <h1>Account</h1>
        </div>
      </div>

      <div className='acc-card'>

        <div className='acc-pic'>
        </div>
        <div className='account-info'>
          <h1>PIC</h1>
          <h3>Carolina Ortega</h3>
          <h3>@sweetcaroline</h3>
          <h3>carortega@abba.com</h3>
          <h3>Rol</h3>
        </div>

      </div>

    </div>





  )
}

export default Account