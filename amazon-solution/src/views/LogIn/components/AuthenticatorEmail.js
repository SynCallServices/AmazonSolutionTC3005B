import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import LogIn from '../LogIn.js'
import AWS from 'aws-sdk'

import '@aws-amplify/ui-react/styles.css'

function AuthenticatorEmail() {
  
  // Global Config ??
  React.useEffect(() => {
    AWS.config.update({
     apiVersion: 'latest',
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
    }) 

  const connect = new AWS.Connect();
  connect.listUsers({
    InstanceId: process.env.REACT_APP_INSTANCE_ID,
  }, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
  })
  }, [])

   


  const services = {
    async handleSignUp(formData) {

      let { username, password, attributes } = formData

      return Auth.signUp({
        username,
        password,
        attributes
      })
    }
  }

  return (
    <Authenticator 
      services={services}
      initialState='signIn'
      signUpAttributes={['email']}
      formFields={{
        signUp: {
          email: {
            order: 1,
            isRequired: true
          },
          'custom:user_name': {
              order: 2,
              placeholder: "Username",
              isRequired: true
          },
          'custom:first_name': {
              order: 3,
              placeholder: "First Name",
              isRequired: true
          },
          'custom:last_name': {
              order: 4,
              placeholder: "Last Name",
              isRequired: true
          },
          password: {
            order: 5,
            isRequired: true
          },
          confirm_password: {
            order: 6,
            isRequired: true
          }
        }
      }}>
      {({ signOut, user }) => <LogIn signOut={signOut} user={user} />}
    </Authenticator>
  )
}

export default AuthenticatorEmail
