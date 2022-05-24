import React from 'react'
import VideoPlayerComp from './VideoPlayerComp.js'
import { AiFillPlayCircle, AiFillStar } from 'react-icons/ai'
import '../../../css/videoCard.css'

function ShowVideoCard(props) {

  const [playPopUp , setPlayPopUp] = React.useState(false);

  return (
    <div className="card">
      <div className="video-container">
        <div className="video-text">{props.videoTitle}</div>
        <div className='video-info'>
          <div className="video-time">{props.vidDuration}</div>
          <div className="video-rating">
            <AiFillStar className='video-star'/>
            <span className='rating-number'>{props.vidRating}</span>
          </div>
        </div>
          <AiFillPlayCircle className='play-button' onClick={() => setPlayPopUp(true)}/>
      </div>
      <VideoPlayerComp trigger={playPopUp} setTrigger={setPlayPopUp}/>
    </div>
  )
}

export default ShowVideoCard
