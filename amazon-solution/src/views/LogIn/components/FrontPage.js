import AWS from "aws-sdk";
import { useState } from "react";
import { Link } from 'react-router-dom'

function FrontPage({ signOut, user, logInUser }) {
  const connect = new AWS.Connect();
  const [role, setRole] = useState("...");
  const [finalUser, setFinalUser] = useState({
    userData: '',
    userRole: '...'
  })

  // example of how to obtain the security profile of a user
  connect.describeUser({
    InstanceId: process.env.REACT_APP_INSTANCE_ID,
    UserId: user.attributes["custom:connect_id"]
  }, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      const securityProfile = data.User.SecurityProfileIds[0];
      switch (securityProfile) {
        case process.env.REACT_APP_AGENT_ID:
          setRole("agent");
          break;
        case process.env.REACT_APP_SUPERVISOR_ID:
          setRole("supervisor");
          break;
        case process.env.REACT_APP_ADMIN_ID:
          setRole("admin");
          break;
      }
    }
    setFinalUser({userData: user, userRole: role})
    logInUser(finalUser)
  })

  return (
    <div>
      <h1>Hello {user.username}</h1>
      <h2>Role: {role}</h2>
      <button onClick={signOut}>Sign Out</button>
      <Link to='/dashboard'>Dashboard</Link>
    </div>
  )
}

export default FrontPage;
