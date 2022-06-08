import React from 'react'
import * as agent from "../../ScreenRecorder/components/AgentAPI.js"
import AWS from 'aws-sdk'

function CreateUser() {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const connect = new AWS.Connect();

  const [createData, setCreateData] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
  })

  function handleChange(event) {
    const {name, value} = event.target
    setCreateData(prevValue => ({
      ...prevValue,
      [name]: value
    }))
  }

  function create() {
    createUser()
  }

  async function createUser () {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!#$%^&*";
    let password = "";
    for (let i = 0; i < 11; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    password += chars.slice(-7)[Math.floor(Math.random() * chars.slice(-7).length)];
    await connect.createUser({
        InstanceId: process.env.REACT_APP_INSTANCE_ID,
        PhoneConfig: {
            PhoneType: "SOFT_PHONE"
        },
        RoutingProfileId: process.env.REACT_APP_GENERAL_ROUTING_PROFILE_ID,
        SecurityProfileIds: [
            process.env.REACT_APP_AGENT_ID
        ],
        Username: createData.username,
        IdentityInfo: {
            Email: createData.email, 
            FirstName: createData.firstName,
            LastName: createData.lastName
        },
        Password: "TestPW123*"// RANDOM PASSWORD
    })
    .promise()
    .then(async (data) => {
        const agentCreate = agent.create(data.UserId)
        .then((response) => {
          console.log(response)
        })
        console.log(data);
        await cognito.adminCreateUser({
            UserPoolId: process.env.REACT_APP_USER_POOL_ID,
            Username: createData.username,
            UserAttributes: [
                {
                    Name: "email",
                    Value: createData.email
                },
                {
                    Name: "custom:connect_id",
                    Value: data.UserId
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
                    Name: 'email_verified',
                    Value: 'true'
                }
            ]
        })
        .promise()
        .then(async (data) => {
            console.log(data);
            await cognito.adminSetUserPassword({
                UserPoolId: process.env.REACT_APP_USER_POOL_ID,
                Username: data.User.Username,
                Password: "TestPW123*", // RANDOM PASSWORD
                Permanent: true
            })
            .promise()
            .then((data) => {
                // WIP TO SEND EMAIL
                // await ses.sendEmail({
                //     Destination: {
                //         CcAddresses: [
                //         ],
                //         ToAddresses: [
                //             "test5@email.com"
                //         ]
                //     },
                //     Message: {
                //         Body: {
                //             Html: {
                //                 Charset: "UTF-8",
                //                 Data: "HTML_FORMAT_BODY"
                //             },
                //             Text: {
                //                 Charset: "UTF-8",
                //                 Data: "TEXT_FORMAT_BODY"
                //             }
                //         },
                //         Subject: {
                //             Charset: 'UTF-8',
                //             Data: 'Test email'
                //         }
                //     },
                //     Source: 'SENDER_EMAIL_ADDRESS',
                //     ReplyToAddresses: [
                //         'EMAIL_ADDRESS',
                //     ],
                // })
                // .promise()
                // .then((data) => {
                //     console.log(data); // FINAL RESULT
                // })
                // .catch((error) => {
                //     console.log(error);
                // })
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


  return (
    <div>
      <div className="create-card">
        <div className="create-title">Create account</div>

        <input onChange={handleChange} className="create-input" name="email" placeholder="Email"/>
        <input onChange={handleChange} className="create-input" name="username" placeholder="Username"/>
        <input onChange={handleChange} className="create-input" name="firstName" placeholder="First Name"/>
        <input onChange={handleChange} className="create-input" name="lastName" placeholder="Last Name"/>

        <button onClick={create} className="create-button">Create Account</button>

      </div> 
    </div>
  )
}

export default CreateUser
