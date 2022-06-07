import React from 'react'
import ShowVideoCard from './ShowVideoCard.js'
import * as video from '../../ScreenRecorder/components/VideoAPI'
import * as agent from "../../ScreenRecorder/components/AgentAPI"
import VideoPreview from './VideoPreview.js'

function ShowVideos({ agentId }) {

  const [videoCards, setVideoCards] = React.useState()
  const [assingedRecordings, setAssingedRecordings] = React.useState([]);


  React.useEffect(() => {

    const agentData = agent.get(agentId);
    agentData.then((res) => {
      if (res.status === "Unsuccesfull") {
        throw new Error("Agent does not exist")
      } else {
        setAssingedRecordings(res.data.asgnRec);      }
    })

  }, [])

  React.useEffect(() => {
    function effect() {
       video.listRecording(assingedRecordings).then(value => {
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
    }
    effect();
  }, [assingedRecordings])

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
