// AWS
import {API, graphqlOperation, Storage } from 'aws-amplify';

import { listVideos } from '../graphql/queries';
import { deleteVideo, createVideo } from '../graphql/mutations';

// S3

export async function uploadVideo(video, agentId) {
    /**
     * Updload a video to S3.
     * @param {Blob} video A blob containing the video file.
     * @param {String} agentId The agentId of the agent that recorded this video.
     */
    try {
        if (!video) {
            throw new Error("Video not provided")
        }
        if (!agentId) {
            throw new Error("agentId not provided")
        }
        const result = await Storage.put(`${agentId}/videos`, video, {
            level: "public"
        })
        return {
            status: "Succesfull",
            message: "Video uploaded succesfully",
            data: result
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function downloadVideo(videoPath) {
    /**
     * Download a video from S3.
     * @param {String} videoPath The path in which the video is stored
     */

    try {
      const result = await Storage.get(videoPath)

      // Fetch the video and convert it into a blob
      fetch(result)
      .then((res) => {
        return {
            status: "Succesfull",
            message: "Correctly downloaded the video",
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

// Dynamo

export async function list() {
    /**
     * List all the videos. 
     */
    try {
        const videoData = await API.graphql(graphqlOperation(listVideos))
        const videoList = videoData.data.listVideos.items
        
        return {
            status: "Succesfull",
            message: "Fetched video recordings correctly",
            data: videoList
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function create(videoId_, agentId_, startTime_, title_, duration_) {
    /**
     * Given a new videoId and a agentId, create a new entry of a video in dynamoDB.
     * @param {String} videoId_ An Id for the new video.
     * @param {String} agentId_ The Id of the agent that recorded the video.
     */
    try {
        const videoData = await API.graphql(graphqlOperation(
            listVideos, { filter: { videoId: { eq: videoId_ } } }
        ))
        if (videoData.data.listVideos.items[0]) {
            throw new Error("Video Recording already exists")
        }
        const result = await API.graphql(graphqlOperation(
            createVideo, { input: { videoId: videoId_, agentId: agentId_, startTime: startTime_, path: `public/${agentId_}/videos/${videoId_}.mp4`, title: title_, duration: duration_ } } 
        )) 
        return {
            status: "Succesfull",
            message: "Video created succesfully",
            data: result
        }
    } catch (error) {
        return {
            status: "Failed",
            data: error
        }
    }
}

export async function get(videoId_) {
    /**
     * Given a videoId, return the information of a video.
     * @param {String} videoId_ A videoId of an existing entry.
     */
    try {
        const videoData = await API.graphql(graphqlOperation(
            listVideos, { filter: { videoId: { eq: videoId_ } } }
        ))
        const video = videoData.data.listVideos.items[0]
        if (!video) {
            throw new Error("Video does not exist")
        }
        return {
            status: "Succesfull",
            message: "Fetched a video correctly",
            data: video
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}

export async function del(videoId_) {
    /**
     * Given a videoId, deletes a video entry in DynamoDB.
     * @param {String} videoId_ A videoId of an existing entry.
     */
    try {
        const videoData = await API.graphql(graphqlOperation(
            listVideos, { filter: { videoId: { eq: videoId_ } } }
        ))
        const video = videoData.data.listVideos.items[0];
        if (!video) {
            throw new Error("Video recording does not exist")
        }

        const videoId = video.id
        
        const result = await API.graphql(graphqlOperation(
            deleteVideo, { input: { id: videoId } }
        ))
        return {
            status: "Succesfull",
            message: "Video deleted correctly",
            data: result
        }
    } catch (error) {
        return {
            status: "Unsuccesfull",
            data: error
        }
    }
}