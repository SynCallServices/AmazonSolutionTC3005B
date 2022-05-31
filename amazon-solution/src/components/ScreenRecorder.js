import { useState, useRef } from "react";
import RecordRTC  from "recordrtc";
import * as video from "./VideoAPI"

function ScreenRecorder() {

  const arrayOfTimeStamps = [];

  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const recorderRef = useRef(null);

  let videoMediaConstraints = {
    video: {
      cursor: 'always',
      resizeMode: 'crop-and-scale',
      mediaSource: 'screen'
    }
  }

  async function handleRecording() {
    const startTime = Date();
    const screenStream = await navigator.mediaDevices.getDisplayMedia(videoMediaConstraints);
    setStream(screenStream);
    recorderRef.current = new RecordRTC(screenStream, {
      type: "video",
      mimeType: 'video/webm',
      checkForInactiveTracks: true,
      timeSlice: 5000,
      ondataavailable: function() {
        uploadBlob(startTime);
      }
    });
    recorderRef.current.startRecording();
  };

  const handleStop = () => {
    recorderRef.current.stopRecording((res) => {
      setBlob(recorderRef.current.getBlob());
      console.log(res)
    });
    stream.getTracks().forEach( track => track.stop() );

  };

  const uploadBlob = (startTime) => {
    const finishTime = Date();
    const videoId = "001_test"
    const finalTimeStamp = finishTime - startTime;
    
    
    const tempArray = [startTime, finalTimeStamp];
    arrayOfTimeStamps.push(tempArray);
    console.log(arrayOfTimeStamps);
    tempArray = [];


    const uploadingVideo = video.uploadVideo(blob, "001", videoId) // video, agentID, videoID.
    uploadingVideo.then((res) => console.log(res))
    const videoEntry = video.create(videoId, "001", "00-00-00_00:00") // change last parameter.
    videoEntry.then((res) => console.log(res))
  }  

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleRecording}>start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={uploadBlob}>Upload</button> 
      </header>
    </div>
  );
}

export default ScreenRecorder;
