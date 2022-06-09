/*import { RiAccountCircleLine, HiOutlineInformationCircle,BsVolumeUp,BiHelpCircle,HiOutlineLockClosed} from 'react-icons/ai'
import { HiOutlineInformationCircle } from 'react-icons/ai'
import { BsVolumeUp } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/ai'
import { HiOutlineLockClosed } from 'react-icons/ai'*/

function Settings() {
  return (
    <div className='menu'>

      <div className='account'>
        <div className='a_logo'>
          {/* <RiAccountCircleLine /> */}
        </div>
        <div className='a_title'>
          <h1>Account</h1>
        </div>
      </div>

      <div className='information'>
        <div className='i_logo'>
          {/* <HiOutlineInformationCircle /> */}
        </div>
        <div className='i_title'>
          <h1>Information</h1>
        </div>
      </div>
      <div className='sound'>
        <div className='s_logo'>
          {/* <BsVolumeUp /> */}
        </div>
        <div className='s_bar'>
        </div></div>

      <div className='help'>
        <div className='h_logo'>
          {/* <BiHelpCircle /> */}
        </div>
        <div className='h_title'>
          <h1>Help</h1>
        </div>
      </div >

      <div className='terms'>
        <div className='t_logo'>
          {/* <HiOutlineLockClosed /> */}
        </div>
        <div className='t_title'>
          <h1>Terms and Conditions</h1>
        </div>
      </div >



    </div>


  )
}

export default Settings






