import AuthenticatorEmail from './components/AuthenticatorEmail.js';

function LogIn() {
  return (
    <div>
      <AuthenticatorEmail />
      <div className='login-header' >
        <img src={require('../../assets/Syncall_logo.png')} className='login-logo'/>
        <h1 className='login-header-title'>Syncall</h1>
      </div>

      <div class="overlay-container">
          <div class="overlay">
              <div class="overlay-left">
                  <h1 className='login-title'>Log In</h1>
                  <p className='login-subtitle'>or create your account.</p>
                  <input name='username' type='text' placeholder='Username' className='login-input'/> 
                  <input name='password' type='text' placeholder='Password' className='login-input'/> 
            
                  <button className="login-button">Log In</button>
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
