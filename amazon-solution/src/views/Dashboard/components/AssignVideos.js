import { RiCloseLine } from 'react-icons/ri'
import AssignVideoCard from './AssignVideoCard.js'
import React, { useState } from 'react';
import * as agent from '../../ScreenRecorder/components/AgentAPI'
import agentsData from '../../fakeData/agents.js';
//import {getAgentsData} from '../../fakeData/agents.js';
import SearchBar from './SearchBar.js';
//import agentsData from '../../fakeData/agents.js';
//import {getAgentsData} from '../../fakeData/agents.js';



function AssignVideos() {
  // const [agentData, setAgentData] = useState([]);
  // setAgentData([...getAgentsData()]);

  const agentData = agent.listCognitoUsers();
  agentData.then((res) => {
    console.log(res)
  })

//esto sera el estado del componente, ambos son arrays
const [filteredData, setFilteredData] = useState();

//el evento es lo que el usuario vaya escribiendo
// const handleFilteredData = (event) => {
//   //debes acceder al valor del evento que estara guardado dentro de esta constante
//   const searchWord = event.target.value;
//   //este es un array que filtrara cada item de data, solo si este incluye ya search word en su title
//   const newFilter = data.filter((item) => {
//     return item.username.toLowerCase().includes(searchWord.toLowerCase());
//   });

//   //se cambiara el estado del componente con el nuevo array filtrado
//   if (searchWord === "") {
//     //si searchword esta vacia entonces no habra ningun estado
//     setFilteredData(data);
//   } else {
//     setFilteredData(newFilter);
//   }
// };

  return (
    <div className='assign-pop-up'>
      
      
        <button className="assign-close">
          <RiCloseLine className='assign-close-icon'/>
        </button>
        <div className='assign-container'>
          <div className="assign-list-title">All Agents</div>
          <div className='search'>
            {/* /* on change: siempre que haya más letras esta función automáticamente va buscando resultados con eso  */}
            <div className="searchInputs">
              <input
                type="text"
                
                //se llamara cada vez que se escriba un nuevo caracter en la barra
                // onChange={handleFilteredData}

              />
              


      </div>

    </div>
          {
          filteredData.length !== 0 && (
            <div className='assign-sub-container'>
              {filteredData.map((value, key) => {
                return (
                  <AssignVideoCard key ={value.username} username={value.username} firstName={value.firstName} lastName={value.lastName} role={value.role}/>
                );
              })}
            </div>
          )
        }
             
        </div>

        <div className='assign-container'>
          <div className="assign-list-title">Assigned Agents</div>
        </div>

        
    </div>
  )
}

export default AssignVideos