import { RiCloseLine } from 'react-icons/ri'
import AssignVideoCard from './AssignVideoCard.js'

function AssignVideos() {
  return (
    <div className='assign-pop-up'>
      
      
        <button className="assign-close">
          <RiCloseLine className='assign-close-icon'/>
        </button>
        <div className='assign-container'>
          <div className="assign-list-title">All Agents</div>
          <AssignVideoCard username='Caro' firstName='Caro' lastName='Ortega' role='agent'/>        
        </div>

        <div className='assign-container'>
          <div className="assign-list-title">Assigned Agents</div>
        </div>

        
    </div>
  )
}

export default AssignVideos
