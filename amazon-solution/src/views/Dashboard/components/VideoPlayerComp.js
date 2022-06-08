import { RiCloseLine } from 'react-icons/ri'
import VideoPlayer from 'react-video-js-player'
import '../../../css/videoCard.css'

function VideoPlayerComp(props) {
  console.log(props.videoPath)
  return (props.trigger) ? (
    <div className='video-outer' >
      <div className='video-inner' >
        <button className='close-btn' >
          <RiCloseLine className='close-btn--icon' onClick={() => props.setTrigger(false)}/>
        </button>
        <VideoPlayer 
          className='video-player'
          src={`https://d1msutvtlsu91z.cloudfront.net/public/recordings/f2502ca6-325c-4a1d-a14c-6fddd15f7b2d.mp4`}
        />
      </div>
    </div>
  ) : "";
}

export default VideoPlayerComp
