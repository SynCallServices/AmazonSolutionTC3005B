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
          src={`https://d1msutvtlsu91z.cloudfront.net/public/recordings/b8bb02c6-00b2-4589-9f8a-10e7d0ee0026.mp4`}
        />
      </div>
    </div>
  ) : "";
}

export default VideoPlayerComp
