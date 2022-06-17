import { RiAccountCircleLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

function Account() {
  // function goBack(){
  //   props.setTrigger(false)
  // }
  const navigate = useNavigate()
  return (

    <div>
      <div className='acc-card'>
        {/* <div className='acc-pic'>
        </div> */}
        <div className='account-info'>
          {<RiAccountCircleLine size={150} />}
          <h3>Carolina Ortega</h3>
          <h3>@sweetcaroline</h3>
          <h3>carortega@abba.com</h3>
          <h3>Rol</h3>
        </div>

      </div>
          <button onClick={() => {
        navigate('/dashboard/settings')

      }} className='a_button'>Back</button>

    </div>

  )
}

export default Account
