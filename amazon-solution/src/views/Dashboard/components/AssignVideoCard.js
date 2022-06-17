import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'

function AssignVideoCard(props) {

  return (
    <div className="assign-card-container">
      <div className="card-column">
        <div className="assign-card-username">{props.username}</div>
        <div className='agent-info'>
          {props.role} | {props.firstName} {props.lastName}
        </div>
      </div>
      {props.isDelete ? 
      <AiFillMinusCircle className='assign-button' onClick={() => props.handle(props.agentId, props.videoId, props.agent)}/>
      : <AiFillPlusCircle className='assign-button' onClick={() => props.handle(props.agentId, props.videoId, props.agent)}/>
      }
    </div>
  )
}

export default AssignVideoCard
