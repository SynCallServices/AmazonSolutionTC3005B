// AWS
import {API, graphqlOperation} from 'aws-amplify';

import { listAgents } from '../graphql/queries';
import { createAgent, deleteAgent, updateAgent } from '../graphql/mutations'

export async function list() {
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

export async function get(id_) {
    try {
        const agentData = await API.graphql(graphqlOperation(
            listAgents, { filter: { agentId: { eq: id_ } } }
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
    try {
        const agentData = await API.graphql(graphqlOperation(
            listAgents, { filter: { agentId: { eq: agentId_ } } }
        ))
        if (agentData.data.listAgents.items[0]) {
            throw new Error("Agent already exists")
        }
        const result = await API.graphql(graphqlOperation(
            createAgent, { input: { agentId: agentId_ } } 
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

export async function update(videos_) {
    try {
        const result = API.graphql(graphqlOperation(
            updateAgent, { input: { videos: videos_ } }
        ))
        return {
            status: "Succesfull",
            message: "Updated agent correctly",
            data: result
        }
    } catch (error) {
        return {
            status: "Failed",
            data: error
        }
    }
}

export async function del(id_) {
    try {
        const agentData = await API.graphql(graphqlOperation(
            listAgents, { filter: { agentId: { eq: id_ } } }
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
