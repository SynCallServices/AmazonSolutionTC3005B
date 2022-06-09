import { BsFillTrashFill } from 'react-icons/bs'

export default function UserManagementCard(props) {
  return (
    <div className="usercard">
        <div className="usecard-names">
          <h2 className="usercard-username">{props.username}</h2>

          <div className="usercard-names-real">
          <h3 className="usercard-firstname">{props.firstName} &nbsp;</h3>
          <h3 className="usercard-lastname">{props.lastName}</h3>
        </div>
      </div>
      <p className="usercard-email">{props.email}</p>
      <p className="usercard-id">{props.agentId}</p>
      <select name="cars" id="cars">
        <option value="agent">Agent</option>
        <option value="supervisor">Supervisor</option>
        <option value="admin">Admin</option>
      </select>
      <BsFillTrashFill />
    </div>
  )

}
