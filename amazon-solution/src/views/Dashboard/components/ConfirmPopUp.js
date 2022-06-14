import AWS from 'aws-sdk'

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

export default function ConfirmPopUp(props) {

  function cancel() {
    props.setTrigger(false)
  }

  function confirm() {

    deleteUser()
    console.log(props.agentList)
    props.setAgentList(props.agentList.filter(agent => agent.username != props.username));
    console.log(props.agentList)
    props.setTrigger(false)
  }

  async function deleteUser () {
    await cognito.adminGetUser({
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        Username: props.username // MODIFY
    })
    .promise()
    .then(async (data) => {
        const ConnectId = data.UserAttributes.find((item) => item.Name == "custom:connect_id").Value;
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
                  // FINAL RESULT
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

  return (props.trigger) ? (
    <div className='video-outer' >
      <div className="confirm-container">
        <h1 className="confirm-title">Confirm Delete?</h1>
        <button className="confirm-button1" onClick={cancel}>Cancel</button>
        <button className="confirm-button2" onClick={confirm}>Confirm</button>
      </div>
    </div>
  ) : "";
}
