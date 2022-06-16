import React from 'react'
import AssignVideos from './AssignVideos.js'
import ShowVideoCard from './ShowVideoCard.js'
import * as video from '../../ScreenRecorder/components/VideoAPI'
import * as agent from "../../ScreenRecorder/components/AgentAPI"
import VideoPreview from './VideoPreview.js'
import { UserContext } from '../../../App.js'
import VideoPlayerComp from './VideoPlayerComp.js'
import ReactPlayer from 'react-player'

function ShowVideos() {

  const [videoCards, setVideoCards] = React.useState()
  const [recList, setRecList] = React.useState([]);
  const {user, setUser} = React.useContext(UserContext)
  const [selVideo, setSelVideo] = React.useState({path: 'public/recordings/2f1bbd69-1b64-4adb-869e-8c321355a115.mp4'});
  const [assignPopUp, setAssignPopUp] = React.useState(false)

  React.useEffect(() => {

    async function getData() {
      if (user.ConnectData.User.SecurityProfileIds[0] === process.env.REACT_APP_ADMIN_ID || user.ConnectData.User.SecurityProfileIds[0] === process.env.REACT_APP_SUPERVISOR_ID){
        await video.listRec().then((result) => {
          // console.log(result)
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
    setVideoCards(recList.map(vid => (
      <ShowVideoCard
        videoTitle={vid.title}
        vidDuration={vid.duration}
        videoPath={vid.path}
        thisVid={vid}
        setSelVideo={setSelVideo}
      />
    )))

  }, [recList])

  // React.useEffect(() => {
  //   console.log(selVideo)
  // }, [selVideo])


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
        <div className='assign-list-title'>All Videos</div>
        <div className='search'>
          <div className='searchInputs'>
            <input type='text' onChange={handleFilteredData} />
          </div>

        </div>
        <div className='assign-sub-container'>
            {videoCards}
        </div>
        <h1 className='vid-container-title'>{selVideo.title}</h1>
        <div className='vid-container'>
          <ReactPlayer
            className='new-video-player'
            url={`https://d1msutvtlsu91z.cloudfront.net/${selVideo.path}`} 
            controls={true}
          />
        </div>
        <button className='vid-assign-btn' onClick={() => setAssignPopUp(true)}>Assign Agents to video</button>

      </div>
      <AssignVideos videoId={selVideo.recordingId} trigger={assignPopUp} setTrigger={setAssignPopUp}/> 
    </div>
  )
}

export default ShowVideos
