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


function AssignVideos(props) {

  const recordingId = props.videoId // recordingId to check if the function works

  //el evento es lo que el usuario vaya escribiendo
  const handleFilteredData = (event) => {
    //debes acceder al valor del evento que estara guardado dentro de esta constante
    const searchWord = event.target.value;
    //este es un array que filtrara cada item de data, solo si este incluye ya search word en su title
    const newFilter = Array.isArray(agents) ? agents.filter((item) => {
      return item.username.toLowerCase().includes(searchWord.toLowerCase());
    }) : [];

    //se cambiara el estado del componente con el nuevo array filtrado
    if (searchWord === "") {
      //si searchword esta vacia entonces no habra ningun estado
      setFilteredData(agents);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleFilteredData2 = (event) => {
    //debes acceder al valor del evento que estara guardado dentro de esta constante
    const searchWord = event.target.value;
    //este es un array que filtrara cada item de data, solo si este incluye ya search word en su title
    const newFilter = Array.isArray(assAgents) ? assAgents.filter((item) => {
      return item.username.toLowerCase().includes(searchWord.toLowerCase());
    }) : []

    //se cambiara el estado del componente con el nuevo array filtrado
    if (searchWord === "") {
      //si searchword esta vacia entonces no habra ningun estado
      setFilteredData2(assAgents);
    } else {
      setFilteredData2(newFilter);
    }
  };

  const [agentList, setAgentList] = useState([]);
  const [agents, setAgents] = useState([]);
  const [assAgents, setAssAgents] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);
  const [searchForm, setSearchForm] = useState('');
  let agentsInfo = [];
  let assAgentsInfo = [];


  React.useEffect(() => {

    async function meh() {


      if (agentList.length !== 0) {

        for (let i = 0; i < agentList.length; i++) {

          const id = agentList[i].agentId;

          const agentData = agent.get(id);
          await agentData.then((res) => {

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
                } else {
                  assAgentsInfo.push({
                    agentId: agent.agentId, 
                    username: agentList[i].username, 
                    firstName: agentList[i].firstName, 
                    role: agentList[i].role, 
                    email: agentList[i].email,
                    folder: agent.folder
                  })

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
          })

    }
        setAgents(agentsInfo);
        setAssAgents(assAgentsInfo);
        setFilteredData2(assAgentsInfo)
        setFilteredData(agentsInfo)
        handleFilteredData({target: {value: ""}})
        handleFilteredData2({target: {value: ""}})
      }
    }
    meh()
  }, [agentList, props.trigger])

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

  React.useEffect(() => {

    if (searchForm === '') {
      handleFilteredData({target: { value: ''}});
    }

  }, [filteredData])

  React.useEffect(() => {

    if (searchForm === '') {
      handleFilteredData2({target: { value: ''}});
    }

  }, [filteredData2])

  function handleChange(event) {
    setSearchForm(event.target.value)
    handleFilteredData(event)
  }

  function handleChange2(event) {
    setSearchForm(event.target.value)
    handleFilteredData2(event)
  }

  function handleAdd(agentId, videoId, agentObj) {
    console.log(videoId)
    agent.assignVideo(agentId, videoId)
    .then((result) => {
        if (result.status === 'Succesfull') {
          console.log('Assigned')
        }

    })
    console.log(agentObj)
      let newList = Array.isArray(agents) ? agents.filter(agent => agent.agentId !== agentObj.agentId) : []
      setAgents(Array.isArray(newList) ? newList : [agents])
      setAssAgents(prev => [...prev, agentObj])
  }

  function handleDelete(agentId, videoId, agentObj) {
    console.log(agent)
    agent.unAssignVideo(agentId, videoId)
    .then((result) => {
        if (result.status === 'Succesfull') {
          console.log('Assigned')
        }
    })

      let newList = Array.isArray(assAgents) ? assAgents.filter(agent => agent.agentId !== agentObj.agentId) : []
      setAssAgents(Array.isArray(newList) ? newList : [assAgents])
      setAgents(prev => [...prev, agentObj])
  }

  React.useEffect(() => {
    setFilteredData(agents)
  }, [agents])

  React.useEffect(() => {
    setFilteredData2(assAgents)
  }, [assAgents])

  return (props.trigger) ? (
    <div className='assign-pop-up-shadow'>
    <div className='assign-pop-up'>
      
      
        <button className="assign-close" onClick={() => props.setTrigger(false)}>
          <RiCloseLine className='assign-close-icon'/>
        </button>
        <div className='assign-container'>
          <div className="assign-list-title">All Agents</div>
          <div className='search'>
            {/* /* on change: siempre que haya más letras esta función automáticamente va buscando resultados con eso  */}
            <div className="searchInputs">
              <input
                type="text"

                placeholder="Search..."
                //se llamara cada vez que se escriba un nuevo caracter en la barra
                onChange={handleChange}

              />
      </div>

    </div>
          {
          filteredData.length !== 0 && Array.isArray(filteredData) && (
            <div className='assign-sub-container'>
              {filteredData.map((value, key) => {
                return (
                  <AssignVideoCard
                  key ={value.username}
                  username={value.username}
                  firstName={value.firstName}
                  lastName={value.lastName}
                  role={value.role}
                  agentId={value.agentId}
                  videoId={recordingId}
                  handle={handleAdd}
                  agent={value}
                  />
                );
              })}
            </div>
          )
        }
             
        </div>

        <div className='assign-container'>
          <div className="assign-list-title">Assigned Agents</div>
          <div className='search'>
            {/* /* on change: siempre que haya más letras esta función automáticamente va buscando resultados con eso  */}
            <div className="searchInputs">
              <input
                className='search-input'
                type="text"

                
                //se llamara cada vez que se escriba un nuevo caracter en la barra
                onChange={handleChange2}
                placeholder="Search..."
              />
      </div>

    </div>
          {
          filteredData2.length !== 0 && Array.isArray(filteredData2) && (
            <div className='assign-sub-container'>
              {filteredData2.map((value, key) => {
                return (
                  <AssignVideoCard
                  key ={value.username}
                  username={value.username}
                  firstName={value.firstName}
                  lastName={value.lastName}
                  role={value.role}
                  agentId={value.agentId}
                  videoId={recordingId}
                  handle={handleDelete}
                  isDelete={true}
                  agent={value}
                  />
                );
              })}
            </div>
          )
        }
        </div>

        
    </div>

    </div>
  ) : ""
}

export default AssignVideos
