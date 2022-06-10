function CallManager(props) {


  return (
    <div className="connect-login">
      <h1 className="clickhere">Click below to log into your account</h1>
      <button className='amazon-connect' onClick={props.logIn}>Amazon Connect Log In</button>
      {/* if amazon connect is not showing please re4fresh the page */}

    </div>
  )
}

export default CallManager
