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

  let arrayOfTimeStamps = []; // array that will be containing the time arrays.
  let slicedBlobID = 1;
  let startTime = [];


  async function handleRecording() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia(videoMediaConstraints);
    setStream(screenStream);
    recorderRef.current = new RecordRTC(screenStream, {
      type: "video",
      mimeType: 'video/webm',
      checkForInactiveTracks: true,
      timeSlice: 5000,
      ondataavailable: function(e) {
        uploadBlob(e);
      }
    });
    const retrieveDate = new Date();

    recorderRef.current.startRecording();

    const recordingDate = formatDate(retrieveDate);
    console.log(recordingDate);

    startTime = retrieveTime(retrieveDate);
  };

  // stop calls upload automatically.
  const handleStop = () => {
    recorderRef.current.stopRecording((res) => {
      setBlob(recorderRef.current.getBlob());
      console.log(res)
    });
    stream.getTracks().forEach( track => track.stop() );

  };

  const uploadBlob = (e) => {
    const finishDate = new Date();
    const finishTime = retrieveTime(finishDate);
    const videoId = "mini_test_" + slicedBlobID.toString();
    const duration = getVideoDuration(finishTime, startTime);
    

    arrayOfTimeStamps = [startTime, finishTime, duration];
    console.log("This is start time: ", arrayOfTimeStamps[0]);
    console.log("This is finish time: ", arrayOfTimeStamps[1]);
    console.log("This is duration time: ", arrayOfTimeStamps[2]);

    /*
      - changed blob to e for testing
      - 
    */
    const uploadingVideo = video.uploadVideo(e, "001", videoId) // video, agentID, videoID.
    uploadingVideo.then((res) => console.log(res))
    /*
      - video create should be modified to accept not only start date, but the complete array[start, finish duration].
      - also the date of the video is captured and can be sent
    */
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

  // function that retrives the time from a general Date instance and returns an array with the format: H/M/S.
  function retrieveTime(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const videoTime = [hours, minutes, seconds];
    return videoTime;
  }

  // function that retrives the duration of a video given a finish and start time and returns an array with the format: H/M/S.
  function getVideoDuration(fTime, sTime) {
    let videoDuration = []
    let d_hours = 0,  d_minutes = 0, d_seconds = 0;


    if (sTime[2] > fTime[2]) {
      let reminder = 60 - sTime[2];
      let totalSeconds = reminder + fTime[2];
      d_seconds = totalSeconds;
      sTime[1] += 1;
    }
    else {
      d_seconds = fTime[2] - sTime[2];
    }

    if (sTime[1] > fTime[1]) {
      let reminder = 60 - sTime[1];
      let totalMinutes = reminder + fTime[1];
      d_minutes = totalMinutes;
      sTime[0] += 1;
    }
    else {
      d_minutes = fTime[1] - sTime[1];
    }

    if (sTime[0] > fTime[0]) {
      let reminder = 24 - sTime[0];
      let totalHours = reminder + fTime[0];
      d_hours = totalHours;
    }
    else {
      d_hours = fTime[0] - sTime[0];
    }

    videoDuration = [d_hours, d_minutes, d_seconds];
    return videoDuration;
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
