import React from 'react'
import * as agent from "../../ScreenRecorder/components/AgentAPI.js"
import AWS from 'aws-sdk'
import CreatedUser from "./CreatedUser"

function CreateUser() {
  const [alert, setAlert] = React.useState(true)
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const connect = new AWS.Connect();
  //const ses = new AWS.SES();

  const [createData, setCreateData] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
  })

  async function sendCredentials () {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!$*";
    let password = "";
    for (let i = 0; i < 11; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    // guarantee the following:
    // lowercase
    password += chars.slice(0,26)[Math.floor(Math.random() * chars.slice(0,26).length)];
    // uppercase
    password += chars.slice(26,52)[Math.floor(Math.random() * chars.slice(26,52).length)];
    // numbers
    password += chars.slice(52,62)[Math.floor(Math.random() * chars.slice(52,62).length)];
    // special
    password += chars.slice(-3)[Math.floor(Math.random() * chars.slice(-3).length)];
    console.log(password);
    await cognito.adminCreateUser({
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        Username: createData.username,
        TemporaryPassword: password,
        UserAttributes: [
            {
                Name: "email",
                Value: createData.email
            },
            {
                Name: "custom:first_name",
                Value: createData.firstName
            },
            {
                Name: "custom:last_name",
                Value: createData.lastName
            },
            {
                Name: "email_verified",
                Value: "true"
            }
        ]
    })
    .promise()
    .then((data) => {
        // console.log(data);
    })
    .catch((error) => {
        console.log(error);
    })
  }

  function handleChange(event) {
    const {name, value} = event.target
    setCreateData(prevValue => ({
      ...prevValue,
      [name]: value
    }))
  }

  function create() {
    sendCredentials()
  }

  return (
    <div>
      <div className="create-card">

        {alert ? 
        <div>
        <div className="create-title">Create account</div>

        <input onChange={handleChange} className="create-input" name="email" placeholder="Email"/>
        <input onChange={handleChange} className="create-input" name="username" placeholder="Username"/>
        <input onChange={handleChange} className="create-input" name="firstName" placeholder="First Name"/>
        <input onChange={handleChange} className="create-input" name="lastName" placeholder="Last Name"/>

        <button onClick={create} className="create-button">Create Account</button>
        </div>
         :

        <CreatedUser setTrigger={setAlert}/>

      }
        
      </div>

    </div>
  )
}

export default CreateUser
