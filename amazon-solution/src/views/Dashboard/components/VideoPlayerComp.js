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
          src='https://d1msutvtlsu91z.cloudfront.net/public/aa73f0a3-df6b-4380-9c20-2522a72e436c/videos/1fb6f9a3-c513-43e0-b6ab-8c2a46412078.mp4'
        />
      </div>
    </div>
  ) : "";
}

export default VideoPlayerComp
