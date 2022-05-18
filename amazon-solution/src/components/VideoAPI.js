// AWS
import {API, graphqlOperation, Storage } from 'aws-amplify';

// GraphQl
import * as mutations from './graphql/mutations';
import { listVideos, getVideo } from './graphql/queries';

export async function uploadVideo(file) {
    try {
        if (file) {
            await Storage.put(file.name, file);
        }
    } catch (error) {
        console.log('Error uploading video to S3 🥴 ', error);
    }
}

export async function uploadAll(videoData, file) {
    /**
     * Upload video to S3 and video metadata to dynamoDB
     */
    try {
        if (file && videoData.videoId && videoData.videoPath) {
            await API.graphql(graphqlOperation(createVideo, { input: videoData }));
            await Storage.put(file.name, file);
            return "Data Uploaded Correctly"
        }
    } catch (error) {
        console.log('Error uploading somewhere 🥴 ', error);
        return "Data failed to upload"
    }
}

export function listVideoFiles(folder='images') {
    /**
     * List all video files 
     */
    Storage.list(`${folder}/`)
        .then(result => console.log(result))
        .catch(err => console.log(err));
}


// Dynamo CRUD

// Creating an entry can't have empty fields
export async function createVideo(videoData) {
    try {
        if (videoData.videoId && videoData.videoPath)
            await API.graphql(graphqlOperation(mutations.createVideo, { input: videoData }));
    } catch (error) {
        console.log('Error uploading video to Dynamo 🥴 ', error);
    }
}

// fetchVideos returns a dictionary, this needs to be handled in 
// frontend for displaying the videos
export async function fetchAllVideos() {
    try {
        const videoData = await API.graphql(graphqlOperation(listVideos));
        const videoList = videoData.data.listVideos.items;
        console.log('videos external', videoList); // -> just for testing 
        // videoList returns a dictionary for the front end to display
        return videoList;
    } catch (error) { console.log('Error fetching Videos 🥴', error); }
}

// For updating, unchanged field should be copied in front end so that videoData
// has everything it previously had, plus the changes
export async function updateOnDynamo(videoData) {
    try {
        if (videoData.videoId)
            await API.graphql(graphqlOperation(mutations.updateVideo, { input: videoData }));
    } catch (error) {
        console.log(`Error updating ${videoData.videoId} 🥴`, error);
    }
}

// Only the id is needed for deleting an item
export async function deleteOnDynamo(videoId) {
    try {
        if (videoId !== '')
            await API.graphql(graphqlOperation(mutations.deleteVideo, { input: videoId }));
    } catch (error) {

    }
}

// export async function fileUploaded(e) {
//     file = e.target.files[0];
// }
// export async function addVideo(info) {
//     try {
//         if (!info.videoId || !info.videoPath) return;
//         const videoUpload = { ...state };
//         setVideoRecordings([...videoRecordings, videoUpload]);
//         setState(video);
//         await Storage.put(file.name, file)
//         // Create a video
//         await API.graphql(graphqlOperation(createVideo, { input: videoUpload }));
//     } catch (error) { console.log('Error uploading video 🥴 ', error); }
//     return window.location.reload();
// }


//  Aqui sigue para no cagarla
// export async function fetchVideo(id) {
//     console.log(`Got into fetchVideo function, with id ${id}`);
//     try {
//         console.log(await API.graphql(graphqlOperation(getVideo, { id: id })));
//         // const videoData = await API.graphql(graphqlOperation(getVideo, { id: id }));
//         // console.log(videoData);
//     } catch (err) {
//         console.log(`Error fetching the video with id ${id}, ${err}`)
//     }
// }

export async function fetchVideo(id) {
    console.log(`Got into fetchVideo function, with id ${id}`);
    try {
        // console.log(await API.graphql({ query: listVideos, filter: { videoId: id } }));
        console.log(await API.graphql({ query: listVideos, variables: { filter: {videoId: id} } }));
        // const videoData = await API.graphql(graphqlOperation(getVideo, { id: id }));
        // console.log(videoData);
    } catch (err) {
        console.log(`Error fetching the video with videoId ${id}`, err)
    }
}
