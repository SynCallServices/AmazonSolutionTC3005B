import ShowVideoCard from './ShowVideoCard.js'
import vidsData from '../../../data/videosData.js'

function ShowVideos() {

  const videos = vidsData.data.videos;

  const videoCards = videos.map(vidData => {
    return (
      <ShowVideoCard
        videoTitle={vidData.title}
        vidDuration={vidData.duration}
        vidRating={vidData.rating}
      />
    )
  })

  return (
    <div className="showvideos">
      <h1>Show Videos</h1>
      <div className='videos-container'>
        {videoCards}
      </div>
    </div> 
  )
}

export default ShowVideos
