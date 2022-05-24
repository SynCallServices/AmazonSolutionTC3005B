import * as agent from "./AgentAPI"
import * as voice from "./VoiceAPI"

function APITest() {

  function VoiceCreate() {
    const x = voice.create("003", "001", "23-03-2022/17_13")
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
        <button onClick={VoiceCreate}>Create</button>
        <button onClick={AgentList}>List</button>      
        <button onClick={AgentGet}>Get</button>
        <button onClick={DeleteAgent}>Delete</button>   
      </header>
    </div>
  );
}

export default APITest;
