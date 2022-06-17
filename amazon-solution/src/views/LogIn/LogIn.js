import React from 'react'
import AWS from 'aws-sdk'
import { UserContext } from '../../App.js'
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading'

function LogIn() {
  const navigate = useNavigate();
  const AmazonCognitoIdentity = require("amazon-cognito-identity-js")

  const cognito = new AWS.CognitoIdentityServiceProvider();
  const connect = new AWS.Connect();

  const {user, setUser} = React.useContext(UserContext)
  const [changePW, setChangePW] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  const [, setInputState] = React.useState(false)

  const [logInData, setLogInData] = React.useState({
    username: "",
    password: "",
  })

  const [newPassData, setNewPassData] = React.useState({
    newPassword: "",
    confirmNewPassword: "",
  })

  function handleChange(event) {
    const { name, value} = event.target
    setLogInData(prevValue => ({
      ...prevValue,
      [name]: value
    }))
  }

  function handleChangePW(event) {
    const { name, value} = event.target
    setNewPassData(prevValue => ({
      ...prevValue,
      [name]: value
    }))
  }

  function logInClick() {
    setInputState(true);
    setLoading(true);
    login().then((res) => {
      setLoading(false);
    })

  }

  async function login() {
    let successfulLogIn
    let isChange;

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
          successfulLogIn = true
          isChange = true
      }
    });

    while (successfulLogIn === undefined) {
      await new Promise(res => setTimeout(res, 100))
    }

    if (successfulLogIn) {
      await getUser(logInData.username, isChange)
    }
  }

  async function getUser(username, isChange) {
    await cognito.adminGetUser({
      UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      Username: username,
    })
    .promise()
    .then(async (data) => {
      let ConnectId = data.UserAttributes.find((item) => item.Name === "custom:connect_id")
          ConnectId = (ConnectId) ? ConnectId.Value : undefined;
          if (ConnectId) {
        await connect.describeUser({
          InstanceId: process.env.REACT_APP_INSTANCE_ID,
          UserId: ConnectId,
        })
        .promise()
      .then((response) => {
        data.ConnectData = response
      })
      .catch((error) => {
        console.log(error)
      })
      }
        data.username = data.Username
        delete (data.Username)

        data.userAttributes = {};
        data.UserAttributes.forEach((attribute) => {
            data.userAttributes[attribute.Name] = attribute.Value;
        })

        console.log("bruh")
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        if (changePW === true && !isChange) {
          navigate("/dashboard/home")
        }
        if (isChange) {
            setChangePW(false)
        }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  async function setUserPassword () {
    console.log(user, "Booh")
    console.log(newPassData, "Booh")
    await cognito.adminSetUserPassword({
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        Username: user.username,
        Password: newPassData.newPassword, // RANDOM PASSWORD
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
            Username: user.username, // MODIFY
            IdentityInfo: {
                Email: user.email, // MODIFY
                FirstName: user.userAttributes["custom:first_name"],// MODIFY
                LastName: user.userAttributes["custom:last_name"]// MODIFY
            },
            Password: newPassData.newPassword // RANDOM PASSWORD
        })
        .promise()
        .then(async (data) => {
        await cognito.adminUpdateUserAttributes({
                UserPoolId: process.env.REACT_APP_USER_POOL_ID,
                Username: user.username,
                UserAttributes: [
                    {
                        Name: "custom:connect_id",
                        Value: data.UserId
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
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
        await getUser(logInData.username)
        navigate("/dashboard/home")
    })
    .catch((error) => {
        console.log(error);
    })
  }

  React.useEffect(() => {
    console.log(localStorage.user)
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.getItem('user')))
      navigate('/dashboard/home')

      console.log(user)
      console.log(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  function commitPW() {
    setUserPassword();
  }

  return (
    <div>
      <div className='login-header' >
        <img src={require('../../assets/Syncall_logo.png')} className='login-logo'/>
        <h1 className='login-header-title'>Syncall</h1>
      </div>

      <div class="overlay-container">
          <div class="overlay">


              {changePW ? 
                <div class="overlay-left">
                    <h1 className='login-title'>Log In</h1>
                    <p className='login-subtitle'>or create your account.</p>
                    <input onChange={handleChange} name='username' type='text' placeholder='Username' className='login-input'/> 
                    <input onChange={handleChange} name='password' type='password' placeholder='Password' className='login-input'/> 
                    {loading ?
                      <div> 
                        <ReactLoading
                          type={"spin"}
                          color={"#ffffff"}
                          height={50}
                          width={50}
                          className="login-button"
                        />
                      </div>
                      : 
                      <button onClick={logInClick} className="login-button">Log In</button>
                    }  
                </div>
                :
                <div class="overlay-left">
                    <h1 className='login-title'>Change Password</h1>
                    <input onChange={handleChangePW} name='newPassword' type='text' placeholder='New Password' className='login-input'/> 
                    <input onChange={handleChangePW} name='confirmNewPassword' type='password' placeholder='Confirm' className='login-input'/> 
              
                    <button onClick={commitPW} className="login-button">Change</button>
                </div>
              }
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
