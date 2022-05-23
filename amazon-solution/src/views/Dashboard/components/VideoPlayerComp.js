import { RiCloseLine } from 'react-icons/ri'
import VideoPlayer from 'react-video-js-player'
import '../../../css/videoCard.css'

function VideoPlayerComp(props) {
  return (props.trigger) ? (
    <div className='video-outer'>
      <div className='video-inner'>
        <button className='close-btn'>
          <RiCloseLine className='close-btn--icon' onClick={() => props.setTrigger(false)}/>
        </button>
        <VideoPlayer 
          src='https://d1msutvtlsu91z.cloudfront.net/public/videos/Rick.mp4'
        />
      </div>
    </div>
  ) : "";
}

export default VideoPlayerComp
