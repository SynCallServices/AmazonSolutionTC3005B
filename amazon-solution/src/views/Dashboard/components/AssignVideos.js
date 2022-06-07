import { RiCloseLine } from 'react-icons/ri'
import AssignVideoCard from './AssignVideoCard.js'
import React, { useState } from 'react';
//import agentsData from '../../fakeData/agents.js';
//import {getAgentsData} from '../../fakeData/agents.js';


function AssignVideos() {
  // const [agentData, setAgentData] = useState([]);
  // setAgentData([...getAgentsData()]);
  const data = [
    {
      username: "carob",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob1",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob2",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob3",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob4",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob5",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob6",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob7",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob8",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob9",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob10",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob11",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob12",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob13",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob14",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob15",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },
    {
      username: "carob16",
      firstName: "Caro",
      lastName: 'Ortega',
      role: 'agent'

    },


  ];
  return (
    <div className='assign-pop-up'>


      <button className="assign-close">
        <RiCloseLine className='assign-close-icon' />
      </button>
      <div className='assign-container'>
        <div className="assign-list-title">All Agents</div>
        {
          data.length !== 0 && (
            <div className='assign-sub-container'>
              {data.map((value, key) => {
                return (
                  <AssignVideoCard key={value.username} username={value.username} firstName={value.firstName} lastName={value.lastName} role={value.role} />
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