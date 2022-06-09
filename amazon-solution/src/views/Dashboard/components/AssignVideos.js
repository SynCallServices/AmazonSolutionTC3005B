import { RiCloseLine } from 'react-icons/ri'
import AssignVideoCard from './AssignVideoCard.js'
import React, { useState } from 'react';
import * as agent from '../../ScreenRecorder/components/AgentAPI'

const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();
const connect = new AWS.Connect();

function AssignVideos({ recordingId }) {

  const [agentList, setAgentList] = useState([]);
  const [assignedRecordingsList, setassignedRecordingsList] = useState([])

  React.useEffect(() => {
    let agentsInfo = [];
    console.log("get unass agents");
    
    for (let i = 0; i < assignedRecordingsList.length; i++) {
      const l = assignedRecordingsList[i];
      console.log(l, "l");
      let addAgent = true;
      for (let j = 0; j < l.asgnRec.length; j++) {
        console.log(l.asgnRec)
        const videoId = l.asgnRec[j];
        if (recordingId === videoId) {
          addAgent = false;
          console.log("here")
        }
      }
      if (addAgent) {
        agentsInfo.push(l)
        }
      }
      console.log(agentsInfo)
  }, [assignedRecordingsList])

  React.useEffect(() => {
    console.log("get ass vidoes")
    let agents = agentList;
    let ass = [];
    if (agents.length !== 0) {
      for (let i = 0; i < agents.length; i++) {
        const id = agents[i];
        const agentData = agent.get(id);
        agentData.then((res) => {
          ass.push(res.data)
          console.log(res)
        })
      }
      setassignedRecordingsList(ass);
    }
  console.log(ass)
  }, [agentList])

  React.useEffect(() => {
    async function listCognitoUsers () {
      await cognito.listUsers({
        UserPoolId: process.env.REACT_APP_USER_POOL_ID
      })
      .promise()
      .then(async (data) => {
          let tmp = [];
          for await (let user of data.Users) {
              let ConnectId = user.Attributes.find((item) => item.Name === "custom:connect_id");
              ConnectId = (ConnectId) ? ConnectId.Value : undefined;
              if (!ConnectId) continue;
              let tmpObj = {
                  username: user.Username,
                  agentId: ConnectId
              };
              user.Attributes.forEach((attribute) => {
                  switch (attribute.Name) {
                      case "custom:first_name":
                          tmpObj.firstName = attribute.Value;
                          break;
                      case "custom:last_name":
                          tmpObj.lastName = attribute.Value;
                          break;
                      case "email":
                          tmpObj.email = attribute.Value
                          break;
                      default:
                          break;
                  }
              })
              await connect.describeUser({
                  InstanceId: process.env.REACT_APP_INSTANCE_ID,
                  UserId: ConnectId
              })
              .promise()
              .then((response) => {
                  let role = response.User.SecurityProfileIds[0];
                  switch (role) {
                      case process.env.REACT_APP_AGENT_ID:
                          tmpObj.role = "agent";
                          break;
                      case process.env.REACT_APP_SUPERVISOR_ID:
                          tmpObj.role = "supervisor";
                          break;
                      case process.env.REACT_APP_ADMIN_ID:
                          tmpObj.role = "admin";
                          break;
                      default:
                          break;
                  }
              })
              .catch((error) => {
                  console.log(error);
              })
              tmp.push(tmpObj);
          }
          // console.log(tmp); // FINAL RESULT
          let agentIdList = [];
          for (let i = 0; i < tmp.length; i++) {
            const element = tmp[i];
            agentIdList.push(element.agentId) 
          }
  
          setAgentList(agentIdList)
      })
      .catch((error) => {
          console.log(error);
      })
    }
  
    listCognitoUsers();
  }, [])




//esto sera el estado del componente, ambos son arrays
// const [filteredData, setFilteredData] = useState();

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
    <div>
      <h1>Hello Bitches</h1>
    </div>
    // <div className='assign-pop-up'>
      
      
    //     <button className="assign-close">
    //       <RiCloseLine className='assign-close-icon'/>
    //     </button>
    //     <div className='assign-container'>
    //       <div className="assign-list-title">All Agents</div>
    //       <div className='search'>
    //         {/* /* on change: siempre que haya más letras esta función automáticamente va buscando resultados con eso  */}
    //         <div className="searchInputs">
    //           <input
    //             type="text"
                
    //             //se llamara cada vez que se escriba un nuevo caracter en la barra
    //             // onChange={handleFilteredData}

    //           />
              


    //   </div>

    // </div>
    //       {
    //       filteredData.length !== 0 && (
    //         <div className='assign-sub-container'>
    //           {filteredData.map((value, key) => {
    //             return (
    //               <AssignVideoCard key ={value.username} username={value.username} firstName={value.firstName} lastName={value.lastName} role={value.role}/>
    //             );
    //           })}
    //         </div>
    //       )
    //     }
             
    //     </div>

    //     <div className='assign-container'>
    //       <div className="assign-list-title">Assigned Agents</div>
    //     </div>

        
    // </div>
  )
}

export default AssignVideos