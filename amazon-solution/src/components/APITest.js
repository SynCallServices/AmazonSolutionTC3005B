import * as agent from "./AgentAPI"
import * as voice from "./VoiceAPI"
import * as video from "./VideoAPI"

function APITest() {

  function VoiceCreate(voiceId, agentId) {
    const x = voice.create(voiceId, agentId, "00:00")
    x.then((res) => console.log(res))
  }

  function AgentCreate(agentId) {
    const x = agent.create(agentId)
    x.then((res) => console.log(res))
  }

  function VideoCreate(videoId, agentId) {
    const x = video.create(videoId, agentId, "00:00")
    x.then((res) => console.log(res))
  }


  function AgentList() {
  const x = agent.list()
  x.then((res) => console.log(res))
  }
  
  function VideoList() {
    const x = video.list()
    x.then((res) => console.log(res))
  }

  function VoiceList() {
    const x = voice.list()
    x.then((res) => console.log(res))
  }

  function CreateHundoAgents() {
    for (let i = 0; i < 100; i++) {
      const x = agent.create(`${i}`)
      x.then((res) => console.log(`Agent ${i} created`))
    }
  }

  function CreateHundoVideos() {
    for (let i = 0; i < 100; i++) {
      const agentId = Math.floor(Math.random() * 100)
      const x = video.create(`${i}`, agentId, "00:00")
      x.then((res) => console.log(`Video ${i} created for agent ${agentId}`, res))
    }
  }

  function CreateHundoVoices() {
    for (let i = 0; i < 100; i++) {
      const agentId = Math.floor(Math.random() * 100)
      const x = voice.create(`${i}`, agentId, "00:00")
      x.then((res) => console.log(`Voice ${i} created for agent ${agentId}`, res))
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={CreateHundoAgents}>Create Hundo Agents</button> 
        <button onClick={CreateHundoVideos}>Create Hundo Videos</button> 
        <button onClick={CreateHundoVoices}>Create Hundo Audios</button>
        <button onClick={VideoList}>List Videos</button>
        <button onClick={AgentList}>List Agents</button> 
        <button onClick={VoiceList}>List Audios</button>
      </header>
    </div>
  );
}

export default APITest;
