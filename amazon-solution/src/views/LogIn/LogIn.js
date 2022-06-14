import AuthenticatorEmail from './components/AuthenticatorEmail.js';
import React from 'react'
import AWS from 'aws-sdk'
import { UserContext } from '../../App.js'
import { useNavigate, useParams } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const AmazonCognitoIdentity = require("amazon-cognito-identity-js")

  const cognito = new AWS.CognitoIdentityServiceProvider();
  const connect = new AWS.Connect();


  const {user, setUser} = React.useContext(UserContext)

  const [inputState, setInputState] = React.useState(false)

  const [logInData, setLogInData] = React.useState({
    username: "",
    password: "",
  })


  function handleChange(event) {
    const { name, value} = event.target
    setLogInData(prevValue => ({
      ...prevValue,
      [name]: value
    }))
  }

  function logInClick() {
    setInputState(true)
    console.log(logInData)
    login()

  }

  async function login() {
    let successfulLogIn

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: logInData.username,
      Pool: new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        ClientId: process.env.REACT_APP_CLIENT_ID,
      })
    })

    cognitoUser.authenticateUser(new AmazonCognitoIdentity.AuthenticationDetails({
      Username: logInData.username,
      Password: logInData.password,
    }), {
      onSuccess: function (response) {
          // LOG IN MADE
          successfulLogIn = true
      },
      onFailure: function (response) {
          successfulLogIn = false
          setInputState(false)
      },
      newPasswordRequired: function (response) {
          console.log('New Passwrd')
        }
    });

    while (successfulLogIn === undefined) {
      await new Promise(res => setTimeout(res, 100))
    }

    if (successfulLogIn) {
      await getUser(logInData.username)
    }
  }

  async function getUser(username) {
    await cognito.adminGetUser({
      UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      Username: username,
    })
    .promise()
    .then(async (data) => {
      const ConnectId = data.UserAttributes.find((item) => item.Name == "custom:connect_id").Value
      await connect.describeUser({
        InstanceId: process.env.REACT_APP_INSTANCE_ID,
        UserId: ConnectId,
      })
      .promise()
      .then((response) => {
        data.ConnectData = response
        data.username = data.Username
        delete (data.Username)

        data.userAttributes = {};
        data.UserAttributes.forEach((attribute) => {
            data.userAttributes[attribute.Name] = attribute.Value;
        })

        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        navigate("/dashboard/home")
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

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
        Username: "TestAgent12345",
        TemporaryPassword: password,
        UserAttributes: [
            {
                Name: "email",
                Value: "diegomejiasuarez@gmail.com"
            },
            {
                Name: "custom:first_name",
                Value: "Joe"
            },
            {
                Name: "custom:last_name",
                Value: "Doe"
            },
            {
                Name: "email_verified",
                Value: "true"
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
  }

  async function setUserPassword () {
    await cognito.adminSetUserPassword({
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        Username: "TestAgent12345",
        Password: "TestPW123*", // RANDOM PASSWORD
        Permanent: true
    })
    .promise()
    .then(async (data) => {
        await connect.createUser({
            InstanceId: process.env.REACT_APP_INSTANCE_ID,
            PhoneConfig: {
                PhoneType: "SOFT_PHONE"
            },
            RoutingProfileId: process.env.REACT_APP_GENERAL_ROUTING_PROFILE_ID,
            SecurityProfileIds: [
                process.env.REACT_APP_AGENT_ID
            ],
            Username: "testagent12345", // MODIFY
            IdentityInfo: {
                Email: "diegomejiasuarez@gmail.com", // MODIFY
                FirstName: "John", // MODIFY
                LastName: "Doe" // MODIFY
            },
            Password: "TestPW123*" // RANDOM PASSWORD
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
  }

  React.useEffect(() => {
    console.log(localStorage.user)
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.getItem('user')))
      navigate('/dashboard')

      console.log(user)
      console.log(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  return (
    <div>
      <div className='login-header' >
        <img src={require('../../assets/Syncall_logo.png')} className='login-logo'/>
        <h1 className='login-header-title'>Syncall</h1>
      </div>

      <div class="overlay-container">
          <div class="overlay">


              <div class="overlay-left">
                  <h1 className='login-title'>Log In</h1>
                  <p className='login-subtitle'>or create your account.</p>
                  <input onChange={handleChange} name='username' type='text' placeholder='Username' className='login-input'/> 
                  <input onChange={handleChange} name='password' type='password' placeholder='Password' className='login-input'/> 
            
                  <button onClick={logInClick} className="login-button">Log In</button>
              </div>


              <div class="overlay-right">
                  <h1>Hello Compa!</h1>
                  <p className='login-subtitle'>Welcome to Syncall by Team 2 Campus Santa Fe</p>

              </div>
          </div>
      </div>
    </div>
  )
}

export default LogIn;
