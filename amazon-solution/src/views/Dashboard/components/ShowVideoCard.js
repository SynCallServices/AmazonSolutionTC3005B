import React from 'react'
import VideoPlayerComp from './VideoPlayerComp.js'
import { AiFillPlayCircle, AiFillStar } from 'react-icons/ai'
import '../../../css/videoCard.css'

function ShowVideoCard(props) {
  // console.log(props.thisVid)
  const totalSeconds = props.vidDuration;


  // 👇 get number of full minutes
  const minutes = Math.floor(totalSeconds / 60);

  // 👇 get remainder of seconds
  const seconds = totalSeconds % 60;

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  // ✅ format as MM:SS
  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;

  return (
    <div className="video-card" onClick={() => {
      props.setSelVideo(props.thisVid)
    }}>
      <div className="video-container">
        <div className="video-text" title={props.videoTitle}>{props.videoTitle}</div>
        <div className='video-info'>
          <div className="video-time">{result}</div>
        </div>
      </div>
    </div>
  )
}

export default ShowVideoCard
