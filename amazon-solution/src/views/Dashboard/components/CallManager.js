function CallManager(props) {


  return (
    <div className ="title-connect">
      <h1 className="clickhere">Call Manager</h1>
      <div className="connect-login">
        <button className='amazon-connect' onClick={props.logIn}>Amazon Connect Log In</button>
        {/* if amazon connect is not showing please re4fresh the page */}
      </div>

    </div>
    
  )
}

export default CallManager
