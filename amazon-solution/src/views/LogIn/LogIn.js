import AuthenticatorEmail from './components/AuthenticatorEmail.js';

function LogIn(props) {
  return (
    <AuthenticatorEmail logInUser={props.logInUser}/>
  )
}

export default LogIn;
