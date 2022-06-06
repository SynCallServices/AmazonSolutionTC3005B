import React from 'react'
import ShowVideoCard from './ShowVideoCard.js'
import * as video from '../../ScreenRecorder/components/VideoAPI'
import VideoPreview from './VideoPreview.js'

function ShowVideos() {

  const [videoCards, setVideoCards] = React.useState()

  React.useEffect(() => {
    video.list().then(value => {
      console.log(value)
      setVideoCards(value.data.map(vid => (
        <ShowVideoCard 
          videoTitle = {"Test Video"}
          videoPath = {vid.path}
          vidDuration = "2.00"
          vidRating = "4.9"
          key = {vid.videoId}
        />
      )))
    }).catch(err => {
        console.log(err)
    })

  }, [])

  return (
    <div className="showvideos-outer">
      <VideoPreview />
      <div className='showvideos-inner'>
        <h1>Asigned Videos</h1>
        <div className='videos-container'>
          {videoCards}
        </div>
      </div>

    </div> 
  )
}

export default ShowVideos
