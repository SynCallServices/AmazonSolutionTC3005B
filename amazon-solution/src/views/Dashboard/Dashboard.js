import React from 'react'
import 'amazon-connect-streams'
import Sidebar from './components/Sidebar'
import RecordRTC  from "recordrtc";
import * as video from "../ScreenRecorder/components/VideoAPI.js"
import * as voice from "../ScreenRecorder/components/VoiceAPI.js"
import { v4 as uuidv4 } from 'uuid'
import { Outlet } from 'react-router-dom'
import AWS from 'aws-sdk';
import { UserContext } from '../../App.js'
import ConnectLogIn from './components/ConnectLogIn.js'

const amazonConnect = new AWS.Connect({
  apiVersion: 'latest',
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});
const lambda = new AWS.Lambda({
  apiVersion: 'latest',
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

function DashBoard() {

  const [isRecording, setIsRecording] = React.useState(false)
  const [callConnected, setCallConnected] = React.useState(false);
  const [contactId, setContactId] = React.useState('');

  const {user, setUser} = React.useContext(UserContext)
  const [stream, setStream] = React.useState(null);
  const [blob, setBlob] = React.useState(null);
  const recorderRef = React.useRef(null);
  const [blobVar, setBlobVar] = React.useState(null);
  const [ranOnce, setRanOnce] = React.useState(false);
  const [recordingStartTime, setRecordingStartTime] = React.useState(null);
  const [voicePath, setVoicePath] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(false);

  function CreateVoice(contactId_, agentId_, startTime_, path_) {
    const response = voice.create(contactId_, agentId_, startTime_, path_);
    response.then((res) => {
      if (res.status === "Unsuccesful") {
        console.log(res.data)
      }
      })
    }

  // Amazon Connect Embed
  React.useEffect(() => {
    if (!ranOnce) {
      setRanOnce(true)

      let instanceURL = "https://csf-test-1.my.connect.aws/ccp-v2";


      // eslint-disable-next-line no-undef
      connect.core.initCCP(document.getElementById("ccp"), {
        ccpUrl: instanceURL,            // REQUIRED
        loginPopup: false,               // optional, defaults to `true`
        loginPopupAutoClose: true,      // optional, defaults to `false`
        loginOptions: {                 // optional, if provided opens login in new window
          autoClose: true,              // optional, defaults to `false`
          height: 600,                  // optional, defaults to 578
          width: 400,                   // optional, defaults to 433
          top: 0,                       // optional, defaults to 0
          left: 0                       // optional, defaults to 0
        },
        region: "us-east-1",         // REQUIRED for `CHAT`, optional otherwise
        softphone: {                    // optional, defaults below apply if not provided
          allowFramedSoftphone: true,   // optional, defaults to false
          disableRingtone: false,       // optional, defaults to false
          ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
        },
        pageOptions: { //optional
          enableAudioDeviceSettings: false, //optional, defaults to 'false'
          enablePhoneTypeSettings: true //optional, defaults to 'true' 
        },
        ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
        ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
        ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
      });

    // eslint-disable-next-line no-undef
    const eventBus = connect.core.getEventBus();
    // eslint-disable-next-line no-undef
    eventBus.subscribe(connect.EventType.ACKNOWLEDGE, () => {
      if (!loggedIn) setLoggedIn(true)
      // Do stuff...
    });
    // eslint-disable-next-line no-undef
    eventBus.subscribe(connect.EventType.TERMINATED, () => {
      if (loggedIn) setLoggedIn(false)
      // Do stuff...
    });

      // eslint-disable-next-line no-undef
    connect.contact((contact) => {
      contact.onAccepted((contact) => {
        console.log(contact);
        setCallConnected(true);
        setContactId(contact.contactId);
        // console.log(contact.contactId);

        handleRecording();
      });


      contact.onEnded(async (contact) => {
        // console.log(contact.getInitialContactId());

        let body;
        await amazonConnect.describeContact({
            InstanceId: process.env.REACT_APP_INSTANCE_ID,
            ContactId: contact.contactId
        })
        .promise()
        .then((data) => {
          // console.log(data);
          let InitiationTimestamp = data.Contact.AgentInfo.ConnectedToAgentTimestamp;
          let ContactId = data.Contact.Id;
          let year = InitiationTimestamp.getFullYear();
          let month = ('0' + (InitiationTimestamp.getUTCMonth() + 1)).slice(-2);
          let day = ('0' + InitiationTimestamp.getUTCDate()).slice(-2);
          body = {
              ContactId: ContactId,
              AgentId: data.Contact.AgentInfo.Id,
              InitiationTimestamp: InitiationTimestamp,
              Path: `connect/csf-test-1/CallRecordings/${year}/${month}/${day}/${ContactId}_${year}${month}${day}T${('0' + InitiationTimestamp.getUTCHours()).slice(-2)}:${('0' + InitiationTimestamp.getUTCMinutes()).slice(-2)}_UTC.wav`
          };
        })
        .catch((error) => {
          console.log(error);
        })

        // console.log(body);
        setVoicePath(body.Path);
        CreateVoice(body.ContactId, body.AgentId, body.InitiationTimestamp.toISOString(), body.Path);
      })

      contact.onDestroy((contact) => {
        handleStop();
      })
    });
    }


  }, [])

  React.useEffect(() => {
    if (blobVar) {
      uploadBlob();
    }
  }, [blobVar])

  let videoMediaConstraints = {
    video: {
      cursor: 'always',
      resizeMode: 'crop-and-scale',
      mediaSource: 'screen'
    }
  }

  async function handleRecording() {

    if (!isRecording) {
      console.log('START RECORDING')
      setIsRecording(true)
      const screenStream = await navigator.mediaDevices.getDisplayMedia(videoMediaConstraints);
      setStream(screenStream);
      recorderRef.current = new RecordRTC(screenStream, {
        type: "video",
      });
      recorderRef.current.startRecording();
      setRecordingStartTime((new Date(Date.now())));
    }
  };

  const handleStop = () => {
    setIsRecording(false)

    recorderRef.current.stopRecording((res) => {
      setBlob(recorderRef.current.getBlob());
      setBlobVar(recorderRef.current.getBlob())
      // console.log(res)
    });
    stream.getTracks().forEach( track => track.stop() );
    
  };

  // Change hard coded values
  async function uploadBlob () {
    
    console.log("UPLOAD BLOBL")
    const videoId = uuidv4()
    const uploadingVideo = video.uploadVideo(blob, user.userAttributes["custom:connect_id"], videoId)
    await uploadingVideo.then((res) => console.log(res))
    const videoEntry = video.create(videoId, user.userAttributes["custom:connect_id"], recordingStartTime.toISOString())
    videoEntry.then(async (res) => {
      const videoPath = res.data.data.createVideo.path;
      // console.log(voicePath);
      // console.log(videoPath);
      // console.log(res);

      await lambda.invoke({
        FunctionName: process.env.REACT_APP_LAMBDA_MERGE,
        InvocationType: "RequestResponse",
        LogType: "Tail",
        Payload: JSON.stringify({
          audioPath: voicePath,
          videoPath: videoPath
        })
      })
      .promise()
      .then((data) => {
        console.log("finished merging!");
      })
      .catch((error) => {
        console.log(error);
      })
    })
  }  

  const logIn = () => {
    window.open('https://csf-test-1.my.connect.aws', '_blank');
  }


  return (
    <div className='main-content'>
      <Sidebar />
      <div className='dashboard--content'>
        <Outlet />
      </div>
      <div id="ccp" />
      {loggedIn ? null  : <ConnectLogIn logIn={logIn}/>}
      

    </div>
  )
}

export default DashBoard
