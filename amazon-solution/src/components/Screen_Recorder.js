import { useState, useRef, useEffect } from "react";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc"; // for this app to work, one must have installed recordrtc.
import './App.css';

function App() {

  // hooks
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);

  // constraints variable for video stream. 
  let videoMediaConstraints = {
    video: {
      cursor: 'always',
      resizeMode: 'crop-and-scale',
      mediaSource: 'screen'
    }
  }

  // function to stop the recording and obtain the Blob. 
  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
    });
    stream.getTracks().forEach( track => track.stop() ); // stop all tracks.
  };

  // asynchronous function to save the Blob and download it as a txt file.
  async function saveLocally() {
    var blobURL = URL.createObjectURL(blob);
    let file = await fetch(blobURL).then(r => r.blob()).then(blobFile => new File([blobFile], "myBlobFileHere.txt", { type: "text/txt"}));
    invokeSaveAsDialog(file);
  };

  // asynchronous function to start the recording and get the screen and audio streams. 
  async function handleRecording() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia(videoMediaConstraints);
    setStream(screenStream);

    recorderRef.current = new RecordRTC(screenStream, {
      type: "video",
    });
    recorderRef.current.startRecording();
  };

  // everytime the component re-renders do...
  useEffect(() => {
    if (!refVideo.current) {
      return;
    }

    refVideo.current.srcObject = stream;
  }, [stream, refVideo]);

  /*
    idea:
    put the video into a component that renders the video and recives a blob
    props.blob
    but isn't that helpful.
  */

  return (
    <div className="App">
      <header className="App-header">
        {blob && (
          <video
            src={URL.createObjectURL(blob)}
            controls
            autoPlay={false}
            ref={refVideo}
            style={{ width: "700px", margin: "1em" }}
          />
        )}
        <br></br>
        <button onClick={handleRecording}>start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={saveLocally}>save</button>
      </header>
    </div>
  );
}

export default App;
