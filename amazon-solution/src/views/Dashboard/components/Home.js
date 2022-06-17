import React from "react";

function Home() {

  return (
    <div className="home-page">
      <div className="home_logo" >
        <img src={require('../../../assets/Syncall_logo.png')}  alt="" className="syncallLogo" />
        <div>SynCall</div>
      </div>
    </div>
  )
}

export default Home