import { useState, RecordRTC, RecordRTCPromisesHandler, saveAs } from "./modules.js";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { VideoUploader } from './VideoUploader';
import { Storage } from 'aws-amplify';
import VideoUploadDB from '../api/VideoUploadDB';

function RecordButtons ({signOut, user}) {
    const [stream, setStream] = useState(null);
    const [recorder, setRecorder] = useState(null);
    const [videoBlob, setVideoBlob] = useState(null);
    const [filePath, setFilePath] = useState('');

    async function startVideo (event) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });

        const recorder = new RecordRTCPromisesHandler(stream, {
            type: 'video'
        });

        await recorder.startRecording();

        setStream(stream);
        setRecorder(recorder);
        setVideoBlob(null);
    }

    async function stopVideo (event) {
        if (recorder) {
            await recorder.stopRecording();

            const videoBlob = await recorder.getBlob();

            stream.stop();

            setStream(null);
            setRecorder(null);
            setVideoBlob(videoBlob);
            setFilePath('videos/'+((new Date(Date.now())).getTime().toString())+'.mp4')
        }
    }

    async function uploadVideo(file) {
        if (!file) {
          return
        }
        try {
            await Storage.put(filePath, file, {
            level: "public",
            contentType: 'video/mp4',
            progressCallback: (progress) => {
              console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            },
          })
          VideoUploadDB({ videoId: "100", agentId: user, videoPath: 'public/'+filePath })
          alert('Video uploaded to S3 and link to DynamoDB');
        } catch (error) {
          console.log("Eror Uploading file", error)
        }   
      }

    return (
        <div id="pageContainer">
            { (videoBlob) && <video id="finalVideo" src={ URL.createObjectURL(videoBlob) } controls></video> }
            <div id="flexContainer">
                <button onClick={startVideo}>Start</button>
                <button onClick={stopVideo}>Stop</button>
                <button onClick={() => uploadVideo(videoBlob)}>Upload Video</button>
                <button onClick={signOut}>Sign out</button>
            </div>
        </div>
    );
}

export default withAuthenticator(RecordButtons);