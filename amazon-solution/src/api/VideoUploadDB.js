import { API, graphqlOperation } from 'aws-amplify';
import { createVideo } from '../graphql/mutations';

function VideoUploadDB({ videoId, agentId, videoPath }) {

    async function addVideoRecordings() 
    {
        try{
        const videoRecording = { videoId, agentId, videoPath }
        await API.graphql(graphqlOperation(createVideo, {input: videoRecording}))
        } catch (err) {
        console.log("Error creating Video recording: ", err)
        }
    }

    addVideoRecordings()
}

export default VideoUploadDB;