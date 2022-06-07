// AWS
import {API, graphqlOperation} from 'aws-amplify';

import { listVoices } from '../../../graphql/queries';
import { createVoice, deleteVoice } from '../../../graphql/mutations';


export async function downloadVoice(voicePath) {
    /**
     * Download a voice from S3.
     * @param {String} voicePath The path in which the voice is stored
     */

    try {
      const result = await Storage.get(voicePath)

      // Fetch the voice and convert it into a blob
      fetch(result)
      .then((res) => {
        return {
            status: "Succesfull",
            message: "Correctly downloaded the voice",
            data: res.blob()
        } 
      })
    } catch (error) {
      return {
          status: "Unsuccesfull",
          data: error
      }
    }
}

export async function list() {
    /**
     * List all the voiceRecordings. 
     */
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

export async function get(voiceId_) {
    /**
     * Given a voiceId, return the information of a voice recording.
     * @param {String} voiceId_ A voiceId of an existing entry.
     */
    try {
        const voiceData = await API.graphql(graphqlOperation(
            listVoices, { filter: { voiceId: { eq: voiceId_ } } }
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

export async function create(voiceId_, agentId_, startTime_, path_) {
    /**
     * Given a new voiceoId and a agentId, create a new entry of a voice recording in dynamoDB.
     * @param {String} voiceId_ An Id for the new voice recording.
     * @param {String} agentId_ The Id of the agent that recorded the audio.
     */
    try {
        const voiceData = await API.graphql(graphqlOperation(
            listVoices, { filter: { voiceId: { eq: voiceId_ } } }
        ))
        if (voiceData.data.listVoices.items[0]) {
            throw new Error("Voice Recording already exists")
        }
        const result = await API.graphql(graphqlOperation(
            createVoice, { input: { voiceId: voiceId_, agentId: agentId_, startTime: startTime_, path: path_ } } 
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

export async function del(voiceId_) {
    /**
     * Given a voiceId, deletes a voice recording entry in DynamoDB.
     * @param {String} voiceId_ A voiceId of an existing entry.
     */
    try {
        const voiceData = await API.graphql(graphqlOperation(
            listVoices, { filter: { voiceId: { eq: voiceId_ } } }
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

