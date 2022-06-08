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
          src={`https://d1msutvtlsu91z.cloudfront.net/public/recordings/a0aed4e8-0b33-4a1a-8187-f351dd0ec5d3.mkv`}
        />
      </div>
    </div>
  ) : "";
}

export default VideoPlayerComp
