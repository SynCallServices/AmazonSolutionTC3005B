// AWS
import {API, graphqlOperation} from 'aws-amplify';

import { listVoices } from '../graphql/queries';
import { createVoice, deleteVoice } from '../graphql/mutations';

export async function list() {
    try {
        const voicesData = await API.graphql(graphqlOperation(listVoices))
        const voicesList = voicesData.data.listVoices.items
        return {
            status: "Succesfull",
            message: "Fetched voice recordings correctly",
            data: voicesList
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function get(id_) {
    try {
        const voiceData = await API.graphql(graphqlOperation(
            listVoices, { filter: { voiceId: { eq: id_ } } }
        ))
        const voice = voiceData.data.listVoices.items[0]
        if (!voice) {
            throw new Error("Voice Recoridng does not exist")
        }
        return {
            status: "Succesfull",
            message: "Fetched voice recording correctly",
            data: voice
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function create(voiceId_, agentId_) {
    try {
        const voiceData = await API.graphql(graphqlOperation(
            listVoices, { filter: { voiceId: { eq: voiceId_ } } }
        ))
        if (voiceData.data.listVoices.items[0]) {
            throw new Error("Voice Recording already exists")
        }
        const result = await API.graphql(graphqlOperation(
            createVoice, { input: { voiceId: voiceId_, agentId: agentId_ } } 
        )) 
        return {
            status: "Succesfull",
            message: "Voice recording created succesfully",
            data: result
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function del(id_) {
    try {
        const voiceData = await API.graphql(graphqlOperation(
            listVoices, { filter: { voiceId: { eq: id_ } } }
        ))
        const voice = voiceData.data.listVoices.items[0];
        if (!voice) {
            throw new Error("Voice recording does not exist")
        }

        const voiceId = voice.id
        
        const result = await API.graphql(graphqlOperation(
            deleteVoice, { input: { id: voiceId } }
        ))
        return {
            status: "Succesfull",
            message: "Voice recording deleted correctly",
            data: result
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

