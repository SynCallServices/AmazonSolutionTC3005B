import UserManagementCard from './UserManagementCard.js'
import AWS from 'aws-sdk'
import React from 'react'


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


function UserManagement() {

    const [agents, setAgents] = React.useState([])

    React.useEffect(() => {
      console.log('render')   
      handleChange({target: {value: ""}})
    }, [agents])

    async function listUsers () {
      await cognito.listUsers({
          UserPoolId: process.env.REACT_APP_USER_POOL_ID
      })
      .promise()
      .then(async (data) => {
          let tmp = [];
          for await (let user of data.Users) {
              let ConnectId = user.Attributes.find((item) => item.Name == "custom:connect_id");
              if (!ConnectId) continue;
              else ConnectId = ConnectId.Value;
              let hasRole = user.Attributes.find((item) => item.Name == "custom:role");
              if (!hasRole) continue;
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
                      case "custom:role":
                          tmpObj.role = attribute.Value;
                          break;
                      case "email":
                          tmpObj.email = attribute.Value
                          break;
                      default:
                          break;
                  }
              })
              tmp.push(tmpObj);
          }
          // console.log(tmp); // FINAL RESULT
          setAgents(tmp)
          setFilteredData(tmp)
      })
      .catch((error) => {
          console.log(error);
      })
  }

  React.useEffect(() => {
    listUsers()
  }, [])

  const [filteredData, setFilteredData] = React.useState(agents);
  const [searchForm, setSearchForm] = React.useState('');

  const handleChange = (event) => {
    //debes acceder al valor del evento que estara guardado dentro de esta constante
    const searchWord = event.target.value;
    //este es un array que filtrara cada item de data, solo si este incluye ya search word en su title
    const newFilter = agents.filter((item) => {
      return item.username.toLowerCase().includes(searchWord.toLowerCase());
    });
  
    //se cambiara el estado del componente con el nuevo array filtrado
    if (searchWord === "") {
      //si searchword esta vacia entonces no habra ningun estado
      setFilteredData(agents);
    } else {
      setFilteredData(newFilter);
    }
  };
  
  return (
    <div className="manage-container">

      <div className='manage-top-elements'>
        <h1 className="manage-title">User Management</h1>
        <div className='manage-search-container'>
        <div className='manage-search-input'>
              {/* /* on change: siempre que haya más letras esta función automáticamente va buscando resultados con eso  */}
                <input
                  type="text"

                  placeholder="Search..."
                  //se llamara cada vez que se escriba un nuevo caracter en la barra
                  onChange={handleChange}
                />
        </div>

        </div>
      </div>
     

      <div className="manage-card-container">
        {filteredData.map(agent => {
          return (
            <UserManagementCard
              agentList={agents}
              setAgentList={setAgents}
              username={agent.username}
              firstName={agent.firstName}
              lastName={agent.lastName}
              email={agent.email}
              agentId={`ID: ${agent.agentId}`}
              role={agent.role}
            />
          )
        }) }

      </div>
    </div>
  )
}

export default UserManagement
