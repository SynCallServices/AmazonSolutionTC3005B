import React, { useState } from 'react'
import 'amazon-connect-streams'
import Sidebar from './components/Sidebar'
import RecordRTC from "recordrtc";
import * as video from "../ScreenRecorder/components/VideoAPI.js"
import { v4 as uuidv4 } from 'uuid'
import { Outlet } from 'react-router-dom'
import AWS from 'aws-sdk';
import { UserContext } from '../../App.js'
import ConnectLogIn from './components/ConnectLogIn.js'
import React, { useState } from "react";

const amazonConnect = new AWS.Connect();
const docClient = new AWS.DynamoDB.DocumentClient();

function DashBoard() {

  const [isRecording, setIsRecording] = React.useState(false)
  const [containerDiv, setContainerDiv] = React.useState(null);
  const [callConnected, setCallConnected] = React.useState(false);
  const [contactId, setContactId] = React.useState('');

  const { user, setUser } = React.useContext(UserContext)
  const [stream, setStream] = React.useState(null);
  const [blob, setBlob] = React.useState(null);
  const recorderRef = React.useRef(null);
  const [blobVar, setBlobVar] = React.useState(null);
  const [ranOnce, setRanOnce] = React.useState(false);


  const [loggedIn, setLoggedIn] = React.useState(false);

  const [closed, setClosed] = useState(false);
  const closeOpen = () => {
          setClosed(!closed);
        };

  // Amazon Connect Embed
  React.useEffect(() => {
    if (loggedIn === true && !ranOnce) {
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
      connect.contact((contact) => {
        contact.onConnected((contact) => {
          console.log(contact);
          setCallConnected(true);
          setContactId(contact.contactId);
          console.log(contact.contactId);

          handleRecording();
        });

        contact.onEnded(async (contact) => {
          console.log(contact.contactId);

          let body;
          await amazonConnect.describeContact({
            InstanceId: process.env.REACT_APP_INSTANCE_ID,
            ContactId: contact.contactId
          }, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
              let InitiationTimestamp = data.Contact.AgentInfo.ConnectedToAgentTimestamp;
              let ContactId = data.Contact.Id;
              let year = InitiationTimestamp.getFullYear();
              let month = ('0' + (InitiationTimestamp.getMonth() + 1)).slice(-2);
              let day = ('0' + InitiationTimestamp.getDate()).slice(-2);
              body = {
                ContactId: ContactId,
                AgentId: data.Contact.AgentInfo.Id,
                InitiationTimestamp: InitiationTimestamp,
                Path: `connect/csf-test-1/CallRecordings/${year}/${month}/${day}/${ContactId}_${year}${month}${day}T${('0' + InitiationTimestamp.getHours()).slice(-2)}:${('0' + InitiationTimestamp.getMinutes()).slice(-2)}_UTC.wav`
              };
            }
          })
            .promise();

          console.log(body);

          await docClient.put({
            TableName: process.env.REACT_APP_TABLE_NAME,
            Item: {
              "id": uuidv4(),
              "agentId": body.AgentId,
              "voiceId": `${body.AgentId}_${body.ContactId}`,
              "path": body.Path,
              "startTime": body.InitiationTimestamp.toString(),
              "createdAt": new Date().toString(),
              "updatedAt": new Date().toString(),
              "__typename": "Voice"
            }
          }, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
              console.log("upload to dynamodb");
            }
          })
            .promise();

        })

        contact.onDestroy((contact) => {
          handleStop();
        })
      });
    }

  }, [loggedIn])

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
    }
  };

  const handleStop = () => {
    setIsRecording(false)

    recorderRef.current.stopRecording((res) => {
      setBlob(recorderRef.current.getBlob());
      setBlobVar(recorderRef.current.getBlob())
      console.log(res)
    });
    stream.getTracks().forEach(track => track.stop());

  };

  // Change hard coded values
  const uploadBlob = () => {

    console.log("UPLOAD BLOBL")
    const videoId = uuidv4()
    const uploadingVideo = video.uploadVideo(blob, user.userAttributes["custom:connect_id"], videoId)
    uploadingVideo.then((res) => console.log(res))
    const videoEntry = video.create(videoId, user.userAttributes["custom:connect_id"], "00-00-00_00:00", "Title", 100)
    console.log(videoId)
    console.log(user.userAttributes["custom:connect_id"])
    console.log("00-00-00_00:00")
    videoEntry.then((res) => console.log(res))


  }



  const logIn = () => {
    setLoggedIn(true)
    window.open('https://csf-test-1.my.connect.aws', '_blank');
  }


  return (
    <div className='main-content'>
      <Sidebar />
      <div className='dashboard--content'>
        <Outlet />
      </div>
      {loggedIn ? <div id="ccp" /> : <ConnectLogIn logIn={logIn}/>}
      <>
      {closed ?
        <button onClick={closeOpen}>
          Closed it should open
        </button>
        :
          <div className='UploadSuccessful-card'>
              <p>&#127881; Upload Successful</p>
              <button onClick={closeOpen} className='closingButton'>
                  x
              </button>
          </div>
          } 
      </>

    </div>
  )
}

export default DashBoard
