import logo from '../assets/images/logo.svg';
import '../assets/styles/App.css';
import * as agent from "./AgentAPI"
import "../assets/styles/App.css"

function App() {

  function AgentCreate() {
    const x = agent.create("001")
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

  function AddVideos(video) {
    const x = agent.update(video)
    x.then((res) => console.log(res))
  }

  function DeleteAgent() {
    const x = agent.del("001")
    x.then((res) => console.log(res))
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={AgentCreate}>Create</button>
        <button onClick={AgentList}>List</button>      
        <button onClick={AgentGet}>Get</button>
        <button onClick={DeleteAgent}>Delete</button>   
      </header>
    </div>
  );
}

export default App;
