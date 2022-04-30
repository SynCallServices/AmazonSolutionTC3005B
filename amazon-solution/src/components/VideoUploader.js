import { useRef, useState } from 'react'
import VideoUploadDB from '../api/VideoUploadDB';
// AWS
import { Storage } from 'aws-amplify';

function VideoUploader({ user , file }) {

  const inputRef = useRef(null);
  const [state, setState] = useState("../assets/images/team.jpg")

  const setInput = (value) => {
    setState(value)
  }

  async function uploadVideo(file) {
    if (!file) {
      return
    }
    try {
      console.log(state, state instanceof Blob)
        await Storage.put(`images/${file.name}`, file, {
        level: "public",
        progressCallback: (progress) => {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      })
      VideoUploadDB({ videoId: "100", agentId: user, videoPath: `public/images/${file.name}` })
    } catch (error) {
      console.log("Eror Uploading file", error)
    }   
  }

  return (
  <div className='container'>
    <input ref={inputRef} type="file" onChange={(event) => {setInput(event.target.files[0])}}/>
    <button onClick={(event) => {uploadVideo(state)}}>Upload Video</button> 
  </div>
  )
}

export default VideoUploader;