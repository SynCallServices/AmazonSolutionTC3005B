
import UserManagementCard from './UserManagementCard.js'
import React, { useState } from 'react';

function UserManagement() {

  const agents = [
    {
        username:'Jorge-Cab',
          firstName:'Jothe',
          lastName:'Cabiedes',
          email:'Test@Test.com',
          agentId: '91025824524',
          role:'agent'

    },

    {
      username:'dichi.gab',
        firstName:'Jothe',
        lastName:'Cabiedes',
        email:'Test@Test.com',
        agentId: '91025824524',
        role:'agent'

  },

  {
    username:'matt.sandov',
      firstName:'Jothe',
      lastName:'Cabiedes',
      email:'Test@Test.com',
      agentId: '91025824524',
      role:'agent'

},

  ]

  const [filteredData, setFilteredData] = useState(agents);
  const [searchForm, setSearchForm] = useState('');

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
  
  // function handleChange(event) {
  //   setSearchForm(event.target.value)
  //   handleFilteredData(event)
  // }

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

      {
          filteredData.length !== 0 && (
            <div className='manage-sub-container'>
              {filteredData.map((value, key) => {
                return (
                  <UserManagementCard
                    key = {value.username}
                    username={value.username}
                    firstName={value.firstName}
                    lastName={value.lastName}
                    email={value.email}
                    agentId= {value.agentId}
                    role= {value.role}
                />
                );
              })}
            </div>
          )
        }

        

        
        

      </div>
    </div>
  )
}

export default UserManagement
