// AWS
import {API, graphqlOperation, Storage } from 'aws-amplify';

import { listVideos } from './graphql/queries';
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

export async function create(videoId_, agentId_) {
    try {
        const videoData = await API.graphql(graphqlOperation(
            listVideos, { filter: { videoId: { eq: videoId_ } } }
        ))
        if (videoData.data.listVoices.items[0]) {
            throw new Error("Video Recording already exists")
        }
        const result = await API.graphql(graphqlOperation(
            createVideo, { input: { voiceId: videoId_, agentId: agentId_ } } 
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

// // fetchVideos returns a dictionary, this needs to be handled in 
// // frontend for displaying the videos
// export async function fetchAllVideos() {
//     try {
//         const videoData = await API.graphql(graphqlOperation(listVideos));
//         const videoList = videoData.data.listVideos.items;
//         console.log('videos external', videoList); // -> just for testing 
//         // videoList returns a dictionary for the front end to display
//         return videoList;
//     } catch (error) { console.log('Error fetching Videos 🥴', error); }
// }

// // For updating, unchanged field should be copied in front end so that videoData
// // has everything it previously had, plus the changes
// export async function updateOnDynamo(videoData) {
//     try {
//         if (videoData.videoId)
//             await API.graphql(graphqlOperation(mutations.updateVideo, { input: videoData }));
//     } catch (error) {
//         console.log(`Error updating ${videoData.videoId} 🥴`, error);
//     }
// }

// // Only the id is needed for deleting an item
// export async function deleteOnDynamo(videoId) {
//     try {
//         if (videoId !== '')
//             await API.graphql(graphqlOperation(mutations.deleteVideo, { input: videoId }));
//     } catch (error) {

//     }
// }

// // export async function fileUploaded(e) {
// //     file = e.target.files[0];
// // }
// // export async function addVideo(info) {
// //     try {
// //         if (!info.videoId || !info.videoPath) return;
// //         const videoUpload = { ...state };
// //         setVideoRecordings([...videoRecordings, videoUpload]);
// //         setState(video);
// //         await Storage.put(file.name, file)
// //         // Create a video
// //         await API.graphql(graphqlOperation(createVideo, { input: videoUpload }));
// //     } catch (error) { console.log('Error uploading video 🥴 ', error); }
// //     return window.location.reload();
// // }


// //  Aqui sigue para no cagarla
// // export async function fetchVideo(id) {
// //     console.log(`Got into fetchVideo function, with id ${id}`);
// //     try {
// //         console.log(await API.graphql(graphqlOperation(getVideo, { id: id })));
// //         // const videoData = await API.graphql(graphqlOperation(getVideo, { id: id }));
// //         // console.log(videoData);
// //     } catch (err) {
// //         console.log(`Error fetching the video with id ${id}, ${err}`)
// //     }
// // }

// export async function fetchVideo(id) {
//     console.log(`Got into fetchVideo function, with id ${id}`);
//     try {
//         // console.log(await API.graphql({ query: listVideos, filter: { videoId: id } }));
//         console.log(await API.graphql({ query: listVideos, variables: { filter: {videoId: id} } }));
//         // const videoData = await API.graphql(graphqlOperation(getVideo, { id: id }));
//         // console.log(videoData);
//     } catch (err) {
//         console.log(`Error fetching the video with videoId ${id}`, err)
//     }
// }
