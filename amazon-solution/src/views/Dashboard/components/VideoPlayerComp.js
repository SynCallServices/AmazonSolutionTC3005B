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
          src={`https://d1msutvtlsu91z.cloudfront.net/public/aa73f0a3-df6b-4380-9c20-2522a72e436c/videos/d5013dcf-e222-410c-8ad0-ca0acc1c490d.mp4`}
        />
      </div>
    </div>
  ) : "";
}

export default VideoPlayerComp
