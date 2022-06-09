import { useState, useRef } from "react";
import RecordRTC  from "recordrtc";
import * as video from "./VideoAPI";

function ScreenRecorder() {

  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null); // blob state variable has the entire recording.
  const recorderRef = useRef(null);
  const [mergeVideo, setMergeV] = useState(null);


  let videoMediaConstraints = {
    video: {
      cursor: 'always',
      resizeMode: 'crop-and-scale',
      mediaSource: 'screen'
    }
  };

  let arrayOfTimeStamps = [];   // array that will be containing the time arrays.
  let arrayOfBlobs = [];        // array that will be containing the sliced blobs - transactional blocks.
  let startTime = [];
  let recordingDate = null;


  async function handleRecording() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia(videoMediaConstraints);
    setStream(screenStream);

    recorderRef.current = new RecordRTC(screenStream, {
      type: "video",
      mimeType: 'video/webm',
      checkForInactiveTracks: true,
      timeSlice: 5000,
      ondataavailable: function(s_blob) {
        arrayOfBlobs.push(s_blob);
        setMergeV(arrayOfBlobs);
      }
    });

    const obtainDate = new Date();
    recorderRef.current.startRecording();

    recordingDate = retrieveDateTime(obtainDate);
    //console.log(recordingDate);
    startTime = retrieveTime(obtainDate);
  };


  const uploadBlob = () => {
    let combinedRecordingBlob = new Blob(mergeVideo, {type: "video/mp4"});
    let timeStamp = getVideoTimeStamps();
    //const videoId = "merged_video_mk";
    const videoId = recordingDate;

    /*
      - ocupo que reciba el array timestamp
      - 
    */
    const uploadingVideo = video.uploadVideo(combinedRecordingBlob, "001", videoId) // video, agentID, videoID.
    uploadingVideo.then((res) => console.log(res))

    // idea if this fails, send the whole video -> blob sate variable

    /*
      - video create should be modified to accept not only start date, but the complete array[start, finish duration].
      - also the date of the video is captured and can be sent.
    */
    //const videoEntry = video.create(videoId, "001", arrayOfTimeStamps[0].toString()) // videoID, agentID, startTime.
    //videoEntry.then((res) => console.log(res))
  }

  // stop calls upload automatically.
  const handleStop = () => {
    recorderRef.current.stopRecording((res) => {
      setBlob(recorderRef.current.getBlob());
      console.log(res)
    });
    stream.getTracks().forEach( track => track.stop() );
    uploadBlob(); // call the function to upload the merged blob to the S3 and in the future: Dynamo.
  };
  

  function getVideoTimeStamps() {
    const finishDate = new Date();
    const finishTime = retrieveTime(finishDate);
    const duration = getVideoDuration(finishTime, startTime);

    arrayOfTimeStamps = [startTime, finishTime, duration];
    console.log("This is start time: ", arrayOfTimeStamps[0]);
    console.log("This is finish time: ", arrayOfTimeStamps[1]);
    console.log("This is duration time: ", arrayOfTimeStamps[2]);

    // Update variables.
    startTime = finishTime;
    return arrayOfTimeStamps;
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

  function retrieveDateTime(date) {
    const day = date.getDate();
    const month = date.getMonth(); // January starts as 0.
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const miliseconds = date.getMilliseconds();

    const dateString = year + "/" + (month + 1) + "/" + day + "/" + hours + "/" + minutes + "/" + seconds + "/" + miliseconds;
    return dateString;
  }

  // function that retrives the time from a general Date instance and returns an array with the format: H/M/S.
  function retrieveTime(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const videoTime = [hours, minutes, seconds];
    return videoTime;
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
