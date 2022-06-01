import { useState, useRef } from "react";
import RecordRTC  from "recordrtc";
import * as video from "./VideoAPI"

function ScreenRecorder() {

  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const recorderRef = useRef(null);

  let videoMediaConstraints = {
    video: {
      cursor: 'always',
      resizeMode: 'crop-and-scale',
      mediaSource: 'screen'
    }
  };

  let arrayOfTimeStamps = [];
  let slicedBlobID = 1;
  let startTime;


  async function handleRecording() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia(videoMediaConstraints);
    setStream(screenStream);
    recorderRef.current = new RecordRTC(screenStream, {
      type: "video",
      mimeType: 'video/webm',
      checkForInactiveTracks: true,
      timeSlice: 5000,
      ondataavailable: function(blob) {
        uploadBlob(blob);
      }
    });
    const retrieveDate = new Date();

    recorderRef.current.startRecording();

    const recordingDate = formatDate(retrieveDate);
    console.log(recordingDate);
    startTime = retrieveTime(retrieveDate);
    //console.log(startTime);
  };

  // stop calls upload automatically.
  const handleStop = () => {
    recorderRef.current.stopRecording((res) => {
      setBlob(recorderRef.current.getBlob());
      console.log(res)
    });
    stream.getTracks().forEach( track => track.stop() );

  };

  const uploadBlob = (blob) => {
    const finishDate = new Date();
    const finishTime = retrieveTime(finishDate);
    const videoId = "mini_test_" + slicedBlobID.toString();
    const duration = finishTime - startTime; // duration
    

    //const tempArray = [startTime, finalTimeStamp];
    arrayOfTimeStamps = [startTime, finishTime, duration];
    console.log("This is start time: ", arrayOfTimeStamps[0]);
    console.log("This is finish time: ", arrayOfTimeStamps[1]);
    console.log("This is duration time: ", arrayOfTimeStamps[2]);
    //tempArray = [];


    const uploadingVideo = video.uploadVideo(blob, "001", videoId) // video, agentID, videoID.
    uploadingVideo.then((res) => console.log(res))
    const videoEntry = video.create(videoId, "001", arrayOfTimeStamps[0].toString()) // videoID, agentID, startTime.
    videoEntry.then((res) => console.log(res))

    // Update variables.
    slicedBlobID += 1;
    startTime = finishTime;
    arrayOfTimeStamps = [];
  }

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth(); // January starts as 0.
    const year = date.getFullYear();

    const _newDate = day + "/" + (month + 1) + "/" + year;
    return _newDate;
  }

  function formatTime(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const _newTime = hours + "-" + minutes + "-" + seconds;
    return _newTime;
  }

  function retrieveTime(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const _time = hours*3600 + minutes*60 + seconds;
    return _time;
  }

  // hacer una funcion que me transforme mi time a segundos todo y luego resto ftime - stime

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
