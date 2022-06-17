import React from 'react'
import AssignVideos from './AssignVideos.js'
import ShowVideoCard from './ShowVideoCard.js'
import * as video from '../../ScreenRecorder/components/VideoAPI'
import * as agent from "../../ScreenRecorder/components/AgentAPI"
import { UserContext } from '../../../App.js'
import ReactPlayer from 'react-player'
import LoadingWheel from './LoadingWheel.js';

function ShowVideos() {

  const [videoCards, setVideoCards] = React.useState()
  const [recList, setRecList] = React.useState([]);
  const {user,} = React.useContext(UserContext)
  const [selVideo, setSelVideo] = React.useState({path: 'public/recordings/2f1bbd69-1b64-4adb-869e-8c321355a115.mp4'});
  const [assignPopUp, setAssignPopUp] = React.useState(false)

  React.useEffect(() => {

    async function getData() {
      if (user.ConnectData.User.SecurityProfileIds[0] === process.env.REACT_APP_ADMIN_ID || user.ConnectData.User.SecurityProfileIds[0] === process.env.REACT_APP_SUPERVISOR_ID){
        await video.listRec().then((result) => {
          if (result.status === 'Succesfull') {
            setRecList(result.data)
            if (!selVideo) {
              setSelVideo(result.data[0])
            }
          } 
        })
      } else {
        let currAgentId;

        await agent.get(user.agentId).then((result) => {
          if (result.status === 'Succesfull') {
            currAgentId = result.data.asgnRec
          }
        })

        await video.listRecording(currAgentId).then((result) => {
          if (result.status === 'Succesfull') {
            setRecList(result.data)
          }
        })
      }
    }

    getData()
  }, [])

  React.useEffect(() => {
    if (recList.length > 0) {
      setVideoCards(recList.map(vid => {
        if (vid) {
          return <ShowVideoCard
            videoTitle={vid.title}
            vidDuration={vid.duration}
            videoPath={vid.path}
            thisVid={vid}
            setSelVideo={setSelVideo}
          />
        }
      }))
    }

  }, [recList])

  const handleFilteredData = (event) => {
    const searchWord = event.target.value

    const newFilter = recList.filter((item) => {
      return item.title.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === '') {
      setVideoCards(recList.map(vid => (
        <ShowVideoCard
          videoTitle={vid.title}
          vidDuration={vid.duration}
          videoPath={vid.path}
          thisVid={vid}
          setSelVideo={setSelVideo}
        />
      )))
    } else {
      setVideoCards(newFilter.map(vid => (
        <ShowVideoCard
          videoTitle={vid.title}
          vidDuration={vid.duration}
          videoPath={vid.path}
          thisVid={vid}
          setSelVideo={setSelVideo}
        />
      )))
    }
  }

  return (
    <div className='show-pop-up'> 
      <div className='assign-container'>
        <div>
          <div className='assign-list-title'>All Videos</div>
          <div className='search'>
            <div className='searchInputs'>
              <input type='text' onChange={handleFilteredData} />
            </div>
          </div>
          <div className='assign-sub-container'>
            {videoCards ? (
              videoCards
            ) : <LoadingWheel witdh={200} height={200} className="loading-wheel-2"/>}
              
          </div>
        </div>
      </div>
      <div className='video-card-player-title'>
        <div className='vid-container-title'>
          <h1 className='vid-sub-container-title'>{selVideo.title}</h1>
        </div>
        <div className='vid-container'>
          <ReactPlayer
            className='new-video-player'
            url={`https://d1msutvtlsu91z.cloudfront.net/${selVideo.path}`} 
            controls={true}
          />
        </div>
          { user.ConnectData.User.SecurityProfileIds[0] === process.env.REACT_APP_SUPERVISOR_ID || user.ConnectData.User.SecurityProfileIds[0] === process.env.REACT_APP_ADMIN_ID ?
            <button className='vid-assign-btn' onClick={() => setAssignPopUp(true)}>Assign Agents to video</button>
            :
            ""
          }

      </div>
      <AssignVideos videoId={selVideo.recordingId} trigger={assignPopUp} setTrigger={setAssignPopUp}/> 
    </div>
  )
}

export default ShowVideos
