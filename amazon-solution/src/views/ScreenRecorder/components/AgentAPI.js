// AWS
import {API, graphqlOperation} from 'aws-amplify';

import { listAgents, getAgent } from '../../../graphql/queries';
import { createAgent, deleteAgent } from '../../../graphql/mutations'
import { listRecordings } from '../../../graphql/queries';

const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();
const connect = new AWS.Connect();

export async function list() {
    /**
     * List all the agents.
    */
    try {
        const agentsData = await API.graphql(graphqlOperation(listAgents));
        const agentsList = agentsData.data.listAgents.items;
        return {
            status: "Succesfull",
            message: "Fetched agents correctly",
            data: agentsList
        }
    } catch (error) { 
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function assignVideo(agentId_, videoId) {
    try {
        const agentData = await API.graphql(graphqlOperation(
            getAgent, { input: { agentId: agentId_, folder: `public/${agentId_}` } }
        ))
        console.log(agentData)
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
    
}

export async function get(agentId_) {
    /**
     * Given a agentId, return the information of an agent.
     * @param {String} agentId_ A agentId of an existing entry.
     */
    try {
        const agentData = await API.graphql(graphqlOperation(
            listAgents, { filter: { agentId: { eq: agentId_ } } }
        ))
        const agent = agentData.data.listAgents.items[0];
        if (!agent) {
            throw new Error("Agent does not exist")
        }
        return {
            status: "Succesfull",
            message: "Fetched agent correctly",
            data: agent
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function create(agentId_) {
    /**
     * Create a Agent entry in DynamoDB.
     * @param {String} agentId_ An Id for the new agent.
     */
    try {
        const agentData = await API.graphql(graphqlOperation(
            listAgents, { filter: { agentId: { eq: agentId_ } } }
        ))
        if (agentData.data.listAgents.items[0]) {
            throw new Error("Agent already exists")
        }
        const result = await API.graphql(graphqlOperation(
            createAgent, { input: { agentId: agentId_, folder: `public/${agentId_}` } } 
        )) 
        return {
            status: "Succesfull",
            message: "Created agent correctly",
            data: result
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function getRecordings(agentId_) {
    /**
     * Given a agentId, return all the recordings that agent has recorded.
     * @param {String} agentId_ A agentId of an existing entry.
     */
    try {
        const recordingsData = await API.graphql(graphqlOperation(
            listRecordings, { filter: { agentId: { eq: agentId_} } }
        ))
        const recordingsList = recordingsData.data.listRecordings.items;
        return {
            status: "Succesfull",
            message: "Correctly fetched all the recordings belonging to the agent",
            data: recordingsList
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function del(agentId_) {
    /**
     * Given a agentId, deletes a agent entry in DynamoDB.
     * @param {String} agentId_ A agentId of an existing entry.
     */
    try {
        const agentData = await API.graphql(graphqlOperation(
            listAgents, { filter: { agentId: { eq: agentId_ } } }
        ))
        const agent = agentData.data.listAgents.items[0];
        if (!agent) {
            throw new Error("Agent does not exist")
        }

        const agentId = agent.id
        
        const result = await API.graphql(graphqlOperation(
            deleteAgent, { input: { id: agentId } }
        ))
        return {
            status: "Succesfull",
            message: "Deleted agent correctly",
            data: result
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

// Connect

export async function listCognitoUsers () {
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
        console.log(tmp); // FINAL RESULT
    })
    .catch((error) => {
        console.log(error);
    })
}
