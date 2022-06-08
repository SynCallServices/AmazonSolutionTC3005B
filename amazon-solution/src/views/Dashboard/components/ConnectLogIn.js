function ConnectLogIn(props) {


  return (
    <div className="connect-login">
      <button className='test' onClick={props.logIn}>Amazon Connect Log In</button>
      {/* if amazon connect is not showing please re4fresh the page */}
    </div>
  )
}

export default ConnectLogIn
