import { BsFillTrashFill } from 'react-icons/bs'
import React from 'react'
import AWS from 'aws-sdk'
import ConfirmPopUp from './ConfirmPopUp.js'
import * as agent from '../../ScreenRecorder/components/AgentAPI'

const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: 'latest',
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

const connect = new AWS.Connect({
  apiVersion: 'latest',
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

export default function UserManagementCard(props) {

  const [selectedRole, setSelectedRole] = React.useState(props.role)
  const [playPopUp, setPlayPopUp] = React.useState(false)

  function handleChange(event) {
    setSelectedRole(event.target.value)
    switchRole(event.target.value); 
  }

  async function switchRole (role) {
    await cognito.adminGetUser({
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        Username: props.username // MODIFY
    })
    .promise()
    .then(async (data) => {
        const ConnectId = data.UserAttributes.find((item) => item.Name === "custom:connect_id").Value;
        await connect.updateUserSecurityProfiles({
            InstanceId: process.env.REACT_APP_INSTANCE_ID,
            UserId: ConnectId,
            SecurityProfileIds: [process.env[`REACT_APP_${role.toUpperCase()}_ID`]]
        }) .promise()
        .then(async (response) => {
            await cognito.adminUpdateUserAttributes({
              UserPoolId: process.env.REACT_APP_USER_POOL_ID,
              Username: data.Username,
              UserAttributes: [
                {
                  Name: "custom:role",
                  Value: role
                }
              ]
            })
            .promise()
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error);
    })
  }

  async function deleteUser () {
    await cognito.adminGetUser({
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        Username: props.username // MODIFY
    })
    .promise()
    .then(async (data) => {
        const ConnectId = data.UserAttributes.find((item) => item.Name === "custom:connect_id").Value;
        await connect.describeUser({
            InstanceId: process.env.REACT_APP_INSTANCE_ID,
            UserId: ConnectId
        })
        .promise()
        .then(async (response) => {
            await connect.deleteUser({
                InstanceId: process.env.REACT_APP_INSTANCE_ID,
                UserId: ConnectId
            })
            .promise()
            .then(async (response) => {
                await cognito.adminDeleteUser({
                    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
                    Username: props.username // MODIFY
                })
                .promise()
                .then((response) => {
                    // console.log(response); // FINAL RESULT
                    const delAgent = agent.del(ConnectId);
                    delAgent.then((res) => {
                      // console.log(res);
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error);
    })

  }

  function trashClick() {
    // console.log('clock')
    setPlayPopUp(true)    
  }

  return (
    <div className="usercard">
        <div className="usecard-names usercard-item">
          <div className="usercard-names-real">
            <h3 className="usercard-complete-name" title={`${props.firstName} ${props.lastName}`}>{props.firstName} {props.lastName}</h3>
          </div>
          <h2 className="usercard-username" title={props.username}>{props.username}</h2>
      </div>
      <p className="usercard-email usercard-item" title={props.email}>{props.email}</p>
      <p className="usercard-id usercard-item" title={props.agentId}>{props.agentId}</p>
      <select classname="usercard-role usercard-item" value={selectedRole} onChange={handleChange} name="cars" id="cars">
        <option value="agent">Agent</option>
        <option value="supervisor">Supervisor</option>
        <option value="admin">Admin</option>
      </select>
      <BsFillTrashFill className='delete-user usercard-item' onClick={trashClick}/>
      <ConfirmPopUp agentList={props.agentList} setAgentList={props.setAgentList} trigger={playPopUp} setTrigger={setPlayPopUp} username={props.username}/>
    </div>
  )

}
