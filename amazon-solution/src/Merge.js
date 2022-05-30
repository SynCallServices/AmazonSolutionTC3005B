import React from "react";
import { useState, useEffect } from "react";

//const fs = require('fs');
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');
const ffmpeg = createFFmpeg({
    corePath: "http://localhost:3000/ffmpeg-core.js",
    // Use public address
    log: true,
});

export default function Merge() {
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [output, setOutput] = useState(null);

    function handleClear() {
        setOutput(null);
    }

    async function handleSubmit(event) {
        if (audio && video) {
            if (!ffmpeg.isLoaded()) await ffmpeg.load();
            ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(video)); // write video file to video.mp4
            ffmpeg.FS('writeFile', 'audio.mp3', await fetchFile(audio)); // write audio file to audio.mp3
            await ffmpeg.run('-i', 'video.mp4', '-i', 'audio.mp3', '-c:v', 'copy', '-c:a', 'aac', '-map', '0:v:0', '-map', '1:a:0', 'output.mp4'); // merge video.mp4 and audio.mp3 w/o offset and write to output.mp4
            // offset: '-itsoffset', '00:00:05.0', '-i', 'video.mp4',  '-i', 'audio.mp3', '-c:v', 'copy', '-c:a', 'aac', '-map', '0:v:0', '-map', '1:a:0', 'output.mp4'
            let data = await ffmpeg.FS('readFile', 'output.mp4'); // read output.mp4
            setOutput(URL.createObjectURL(new Blob([new Uint8Array(data.buffer)], { type: 'video/mp4' }))); // make blob url with output.mp4
        }
    }

    return (
        <div className="App">
            <label htmlFor="audio">Select audio file: </label>
            <input id='audio' type="file" accept="audio/*"
                onChange={(event) => {
                    setAudio(event.target.files[0]);
                }} />
            <br />
            <label htmlFor="video">Select video file: </label>
            <input id='video' type="file" accept="video/*"
                onChange={(event) => {
                    setVideo(event.target.files[0]);
                }} />
            <br />
            <button
                onClick={async (event) => {
                    await handleSubmit(event);
                }}>
                Merge
            </button>
            <br />
            {output ?
                <div>
                    <video width="1028" height="720" controls>
                        <source src={output} type="video/mp4" />
                    </video>
                    <br />
                </div>
                : null}
            <br />
            <button onClick={(e) => { handleClear() }}>Clear Video</button>
        </div>
    );
}