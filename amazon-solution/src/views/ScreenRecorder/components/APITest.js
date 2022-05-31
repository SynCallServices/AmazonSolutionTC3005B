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

  function AgentList() {
    const x = agent.list()
    x.then((res) => console.log(res))
  }

  function AgentGet() {
    const x = agent.get("001")
    x.then((res) => console.log(res))
  }


  function DeleteAgent() {
    const x = agent.del("001")
    x.then((res) => console.log(res))
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
