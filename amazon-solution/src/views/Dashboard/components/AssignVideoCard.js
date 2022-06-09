import { AiFillPlusCircle } from 'react-icons/ai'
import * as agent from '../../ScreenRecorder/components/AgentAPI.js'

function AssignVideoCard(props) {

  return (
    <div className="assign-card-container">
      <div className="card-column">
        <div className="assign-card-username">{props.username}</div>
        <div className='agent-info'>
          {props.role} | {props.firstName} {props.lastName}
        </div>
      </div>
      <AiFillPlusCircle className='assign-button' onClick={() => props.handleAdd(props.agentId, props.videoId)}/>
    </div>
  )
}

export default AssignVideoCard
