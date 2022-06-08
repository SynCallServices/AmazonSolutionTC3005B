import React from 'react'
import ShowVideoCard from './ShowVideoCard.js'
import * as video from '../../ScreenRecorder/components/VideoAPI'
import * as agent from "../../ScreenRecorder/components/AgentAPI"
import VideoPreview from './VideoPreview.js'
import { UserContext } from '../../../App.js'

function ShowVideos() {

  const [videoCards, setVideoCards] = React.useState()
  const [assingedRecordings, setAssingedRecordings] = React.useState([]);
  const {user, setUser} = React.useContext(UserContext)


  React.useEffect(() => {

    const agentData = agent.get(user.userAttributes);
    agentData.then((res) => {
      if (res.status === "Unsuccesfull") {
        throw new Error("Agent does not exist")
      } else {
        setAssingedRecordings(res.data.asgnRec);      }
    })

    // const popo = agent.assignVideo("001");
    // popo.then((res) => console.log(res, "test"))

  }, [])

  React.useEffect(() => {
    function effect() {
       video.listRecording(assingedRecordings).then(value => {
        console.log(value)
        setVideoCards(value.data.map(vid => (
          <ShowVideoCard 
            videoTitle = {vid.title}
            videoPath = {vid.path}
            vidDuration = {vid.duration}
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
