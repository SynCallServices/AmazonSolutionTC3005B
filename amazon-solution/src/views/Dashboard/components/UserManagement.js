import UserManagementCard from './UserManagementCard.js'
import AWS from 'aws-sdk'
import React from 'react'


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


function UserManagement() {

    const [agents, setAgents] = React.useState([])

    async function listUsers () {
      await cognito.listUsers({
          UserPoolId: process.env.REACT_APP_USER_POOL_ID
      })
      .promise()
      .then(async (data) => {
          let tmp = [];
          for await (let user of data.Users) {
              let ConnectId = user.Attributes.find((item) => item.Name == "custom:connect_id");
              ConnectId = (ConnectId) ? ConnectId.Value : undefined;
              if (!ConnectId) continue;
              let tmpObj = {
                  username: user.Username,
                  agentId: ConnectId
              };
              user.Attributes.forEach((attribute) => {
                  switch (attribute.Name) {
                      case "custom:first_name":
                          tmpObj.firstName = attribute.Value;
                          break;
                      case "custom:last_name":
                          tmpObj.lastName = attribute.Value;
                          break;
                      case "email":
                          tmpObj.email = attribute.Value
                          break;
                      default:
                          break;
                  }
              })
              await connect.describeUser({
                  InstanceId: process.env.REACT_APP_INSTANCE_ID,
                  UserId: ConnectId
              })
              .promise()
              .then((response) => {
                  let role = response.User.SecurityProfileIds[0];
                  switch (role) {
                      case process.env.REACT_APP_AGENT_ID:
                          tmpObj.role = "agent";
                          break;
                      case process.env.REACT_APP_SUPERVISOR_ID:
                          tmpObj.role = "supervisor";
                          break;
                      case process.env.REACT_APP_ADMIN_ID:
                          tmpObj.role = "admin";
                          break;
                      default:
                          break;
                  }
              })
              .catch((error) => {
                  console.log(error);
              })
              tmp.push(tmpObj);
          }
          console.log(tmp); // FINAL RESULT
          setAgents(tmp)
      })
      .catch((error) => {
          console.log(error);
      })
  }

  React.useEffect(() => {
    listUsers()
  }, [])

  return (
    <div className="manage-container">
      <h1 className="manage-title">User Management</h1>
      <div className="manage-card-container">
        {agents.map(agent => {
          return (
            <UserManagementCard
              agentList={agents}
              setAgentList={setAgents}
              username={agent.username}
              firstName={agent.firstName}
              lastName={agent.lastName}
              email={agent.email}
              agentId={`ID: ${agent.agentId}`}
              role={agent.role}
            />
          )
        }) }

      </div>
    </div>
  )
}

export default UserManagement
