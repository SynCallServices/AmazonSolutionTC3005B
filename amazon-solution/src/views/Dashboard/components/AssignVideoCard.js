import { AiFillPlusCircle } from 'react-icons/ai'

function AssignVideoCard(props) {
  return (
    <div className="assign-card-container">
      <div className="card-column">
        <div className="assign-card-username">{props.username}</div>
        <div className='agent-info'>
          {props.role} | {props.firstName} {props.lastName}
        </div>
      </div>
      <AiFillPlusCircle className='assign-button' />
    </div>
  )
}

export default AssignVideoCard
