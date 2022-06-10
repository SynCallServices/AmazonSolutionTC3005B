//import { RiAccountCircleLine, HiOutlineInformationCircle,BsVolumeUp,BiHelpCircle,HiOutlineLockClosed} from 'react-icons/ai'
import { RiAccountCircleLine } from 'react-icons/ri'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { BsVolumeUp } from 'react-icons/bs'
import { BiHelpCircle } from 'react-icons/bi'
import { HiOutlineLockClosed } from 'react-icons/hi'

function Settings() {
  return (
    <div className='menu'>

      <div className='account'>
        <div className='a_logo'>
          {<RiAccountCircleLine size={50} />}
        </div>
        <div className='a_title'>
          <h1>Account</h1>
        </div>
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
          {<BiHelpCircle size={50}/>}
        </div>
        <div className='h_title'>
          <h1>Help</h1>
        </div>
      </div >

      <div className='terms'>
        <div className='t_logo'>
           {<HiOutlineLockClosed size={50}/>}
        </div>
        <div className='t_title'>
          <h1>Terms and Conditions</h1>
        </div>
      </div >



    </div>


  )
}

export default Settings






