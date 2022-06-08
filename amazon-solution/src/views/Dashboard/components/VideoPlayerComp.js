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
          src={`https://d1msutvtlsu91z.cloudfront.net/public/recordings/02562eb3-25e1-49f5-a0ac-5d35359bfc56.mp4`}
        />
      </div>
    </div>
  ) : "";
}

export default VideoPlayerComp
