import React from 'react';
import { Navigate } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';
import { UserContext } from '../../../App.js'

import '@aws-amplify/ui-react/styles.css'

function AuthenticatorEmail() {

  const {user, setUser} = React.useContext(UserContext)

  const services = {
    async handleSignUp(formData) {

      let { username, password, attributes } = formData;
      const amazonConnect = new AWS.Connect();

      console.log(attributes)
      console.log('BRUH')

      amazonConnect.createUser({
        InstanceId: process.env.REACT_APP_INSTANCE_ID,
        PhoneConfig: {
            PhoneType: "SOFT_PHONE"
        },
        RoutingProfileId: process.env.REACT_APP_GENERAL_ROUTING_PROFILE_ID,
        SecurityProfileIds: [
            process.env.REACT_APP_AGENT_ID
        ],
        Username: username,
        IdentityInfo: {
            Email: attributes["email"],
            FirstName: attributes["custom:first_name"],
            LastName: attributes["custom:last_name"]
        },
        Password: password
      }, function(error, data) {
        if (error) {
          console.error(error);
        } else {
          attributes["custom:connect_id"] = data.UserId;
        }
      })

      while (!attributes["custom:connect_id"]) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

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
          username: {
              order: 2,
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
      {({ signOut, user }) => {

        setUser(prev => ({
        ...prev,
        username: user,
        signOut: () => (signOut()),
        }))

        return <Navigate to='dashboard' />

      }}
    </Authenticator>
  )
}

export default AuthenticatorEmail;
