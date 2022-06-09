import { RiCloseLine } from 'react-icons/ri'
import AssignVideoCard from './AssignVideoCard.js'
import React, { useState } from 'react';
import * as agent from '../../ScreenRecorder/components/AgentAPI'

const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: 'latest',
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});
const connect = new AWS.Connect({
  apiVersion: 'latest',
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});


function AssignVideos() {

  const responseAss = agent.assignVideo()

  const [agentList, setAgentList] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const recordingId = "648517bb-6d02-4643-ad87-964b90cf7874"; // recordingId to check if the function works

  React.useEffect(() => {

    let agentsInfo = [];

    if (agentList.length !== 0) {

      for (let i = 0; i < agentList.length; i++) {

        const id = agentList[i].agentId;

        const agentData = agent.get(id);
        console.log(agentData)
        agentData.then((res) => {

          if (res.status === "Succesfull") {

            let agent = res.data;
            let agentAsgnRec = agent.asgnRec;
            let addAgent = true;

            if (agentAsgnRec) {
              for (let j = 0; j < agentAsgnRec.length; j++) {
                const recId = agentAsgnRec[j];

                if (recId === recordingId) {
                  addAgent = !addAgent;
                  break;
                }

              }

              if (addAgent) {
                agentsInfo.push({
                  agentId: agent.agentId, 
                  username: agentList[i].username, 
                  firstName: agentList[i].firstName, 
                  role: agentList[i].role, 
                  email: agentList[i].email,
                  folder: agent.folder
                });
              }

            } else {
              agentsInfo.push({
                agentId: agent.agentId, 
                username: agentList[i].username, 
                firstName: agentList[i].firstName, 
                role: agentList[i].role, 
                email: agentList[i].email,
                folder: agent.folder
              });
            }
          }
          setAgents(agentsInfo);
        })
      }
    }
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
        let agentIdList = [];
        for (let i = 0; i < tmp.length; i++) {
          const element = tmp[i];
          agentIdList.push(element) 
        }
        setAgentList(agentIdList)
      })
      .catch((error) => {
          console.log(error);
      })
    }
    listCognitoUsers();
  }, [])

  //el evento es lo que el usuario vaya escribiendo
  const handleFilteredData = (event) => {
    //debes acceder al valor del evento que estara guardado dentro de esta constante
    const searchWord = event.target.value;
    //este es un array que filtrara cada item de data, solo si este incluye ya search word en su title
    const newFilter = agents.filter((item) => {
        return item.username.toLowerCase().includes(searchWord.toLowerCase());
      }
    )

    //se cambiara el estado del componente con el nuevo array filtrado
    if (searchWord === "") {
      //si searchword esta vacia entonces no habra ningun estado
      setFilteredData(agents);
    } else {
      setFilteredData(newFilter);
    }
  };

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
          <input type="text"      
            //se llamara cada vez que se escriba un nuevo caracter en la barra
            onChange={handleFilteredData}
          />
          </div>
        </div>
      </div>
      { filteredData.length !== 0 && (
        <div className='assign-sub-container'>
            {filteredData.map((value, key) => {
              return (
                <AssignVideoCard key ={value.username} username={value.username} firstName={value.firstName} lastName={value.lastName} role={value.role}/>
              );
            }
            )}
          </div>
        )
      }
      <div className='assign-container'>
        <div className="assign-list-title">Assigned Agents</div>
      </div>
    </div>
  )
}

export default AssignVideos