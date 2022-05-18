import React from 'react'
import VideoPlayerComp from './VideoPlayerComp.js'
import { AiFillPlayCircle, AiFillStar } from 'react-icons/ai'
import '../../../css/videoCard.css'

function ShowVideoCard() {

  const [playPopUp , setPlayPopUp] = React.useState(false);

  return (
    <div className="card">
      <div className="video-container">
        <div className="video-text">Video Titleeeeeeeeeeeeee</div>
        <div className='video-info'>
          <div className="video-time"> 3:00 </div>
          <div className="video-rating">
            <AiFillStar className='video-star'/>
            <span className='rating-number'>5.0</span>
          </div>
        </div>
          <AiFillPlayCircle className='play-button' onClick={() => setPlayPopUp(true)}/>
      </div>
      <VideoPlayerComp trigger={playPopUp} setTrigger={setPlayPopUp}/>
    </div>
  )
}

export default ShowVideoCard
