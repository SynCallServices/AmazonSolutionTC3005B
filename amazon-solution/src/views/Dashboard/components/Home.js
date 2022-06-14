import React, { useEffect, useState } from "react";

function Home() {

  // const newDate = 0;
  // let clock = newDate().toLocaleTimestring();
  // const [currentTime, setNewTime] = useState(clock);

  // let updateTime = () => {
  //   clock = newDate().toLocaleTimestring();
  //   setNewTime(clock);
  // }

  // setInterval(updateTime, 1000)

  return (
    <div className="home-page">
      <div className="home-title"> Welcome Home </div>
      <div className="home_logo" >
            <img src={require('../../../assets/Syncall_logo.png')}  alt="" />
            <div >SynCall</div>
          </div>
    </div>
   
  )
}

export default Home