import React from 'react'
import VideoPlayerComp from './VideoPlayerComp.js'
import { AiFillPlayCircle, AiFillStar } from 'react-icons/ai'
import '../../../css/videoCard.css'

function ShowVideoCard(props) {

  return (
    <div className="video-card" onClick={() => {
      props.setSelVideo(props.thisVid)
      console.log('BRUH')
    }}>
      <div className="video-container">
        <div className="video-text" title={props.videoTitle}>{props.videoTitle}</div>
        <div className='video-info'>
          <div className="video-time">{props.vidDuration}</div>
        </div>
      </div>
    </div>
  )
}

export default ShowVideoCard
