import * as voice from "./VoiceAPI"
import * as video from "./VideoAPI"

function APITest() {

  function ListVideo() {
    const x = video.list()
    x.then((res) => console.log(res))
  }
  
  function CreateVideo() {
    const x = video.create("videoIdTest", "aa73f0a3-df6b-4380-9c20-2522a72e436c", "00:00", "Cool Video", 420)
    x.then((res) => console.log(res))
  }

  function DownloadVoice(voicePath) {
    const x = voice.downloadVoice(voicePath)
    x.then((res) => {
    })
  }
  
  function GetVoice() {
    const x = voice.get("aa73f0a3-df6b-4380-9c20-2522a72e436c_756629dc-206a-48bc-8dfc-e536d27cfba1")
    x.then((res) => {
      if (res.status === "Succesfull") {
        const data = res.data;
        console.log(data)
      } else {
        console.log(res.data)
      }
    })
  }

  function GetVideo() {
    const x = video.get("videoIdTest")
    x.then((res) => {
      console.log(res)
      if (res.status === "Succesfull") {
        const data = res.data
        console.log(data)
      } else {
        console.log(res.data)
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={GetVoice}>Get Audios</button>
        <button onClick={CreateVideo}>Create Video</button>
        <button onClick={ListVideo}>List Video</button>
        <button onClick={GetVideo}>Get Video</button>
      </header>
    </div>
  );
}

export default APITest;
