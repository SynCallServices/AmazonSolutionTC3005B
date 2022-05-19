// AWS
import {API, graphqlOperation} from 'aws-amplify';

import { listAgents } from '../graphql/queries';
import { createAgent, deleteAgent } from '../graphql/mutations'
import { listRecordings } from '../graphql/queries';

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
            status: "Failed",
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
            status: "Failed",
            data: error
        }
    }
}

export async function create(agentId_) {
    /**
     * Create a Agent entry in DynamoDB.
     * @param {String} agentId_ An Id for the new agent
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
            status: "Failed",
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
            status: "Failed",
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
            status: "Failed",
            data: error
        }
    }
}
