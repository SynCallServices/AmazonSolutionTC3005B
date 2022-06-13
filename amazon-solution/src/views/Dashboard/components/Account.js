import { Link } from '@aws-amplify/ui-react'
import { RiAccountCircleLine } from 'react-icons/ri'

function Account() {
  return (
    <div>
      <div className='s-account'>
        <Link to="settings" className='a_button'>
          <h3>Back</h3>
        </Link>
      </div>

      <div className='acc-card'>

        <div className='acc-pic'>
        </div>
        <div className='account-info'>
          {<RiAccountCircleLine size={150} />}
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