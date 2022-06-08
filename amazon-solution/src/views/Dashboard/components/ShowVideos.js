import React, {useState, useEffect} from 'react'
import ShowVideoCard from './ShowVideoCard.js'
import * as video from '../../ScreenRecorder/components/VideoAPI'


function ShowVideos() {

  const data =[
    {
      title: "Waka Waka",
      path: "ejwjhrjjrew",
      duration: "3:14",
      rating: "4",
      videoId: 1234
    },
    {
      title: "Hola",
      path: "ejwjhrjjrew",
      duration: "3:14",
      rating: "4",
      videoId: 12341
    },
    {
      title: "Caro",
      path: "ejwjhrjjrew",
      duration: "3:14",
      rating: "4",
      videoId: 12342
    },
    {
      title: "vid1",
      path: "ejwjhrjjrew",
      duration: "3:14",
      rating: "4",
      videoId: 123435
    },
    {
      title: "vid2",
      path: "ejwjhrjjrew",
      duration: "3:14",
      rating: "4",
      videoId: 123436
    },
    {
      title: "vid3",
      path: "ejwjhrjjrew",
      duration: "3:14",
      rating: "4",
      videoId: 123430

    },
    {
      title: "vid4",
      path: "ejwjhrjjrew",
      duration: "3:14",
      rating: "4",
      videoId: 122
    },
    {
      title: "vid5",
      path: "ejwjhrjjrew",
      duration: "3:14",
      rating: "4",
      videoId: 121
    },

  ]

  const [videoCards, setVideoCards] = useState(data);

  //el evento es lo que el usuario vaya escribiendo
const handleFilteredData = (event) => {
  //debes acceder al valor del evento que estara guardado dentro de esta constante
  const searchWord = event.target.value;
  //este es un array que filtrara cada item de data, solo si este incluye ya search word en su title
  const newFilter = data.filter((item) => {
    return item.title.toLowerCase().includes(searchWord.toLowerCase());
  });

  //se cambiara el estado del componente con el nuevo array filtrado
  if (searchWord === "") {
    //si searchword esta vacia entonces no habra ningun estado
    setVideoCards(data);
  } else {
    setVideoCards(newFilter);
  }
};

  

 

  return (
    <div className='assign-pop-up'>
      
      
    <button className="assign-close">
      
    </button>
    <div className='assign-container'>
      <div className="assign-list-title">All Agents</div>
      <div className='search'>
        {/* /* on change: siempre que haya más letras esta función automáticamente va buscando resultados con eso  */}
        <div className="searchInputs">
          <input
            type="text"
            
            //se llamara cada vez que se escriba un nuevo caracter en la barra
            onChange={handleFilteredData}

          />
          


  </div>

</div>
      {
      videoCards.length !== 0 && (
        <div className='assign-sub-container'>
          {videoCards.map((value, key) => {
            return (
              <ShowVideoCard 
              videoTitle = {value.title}
              videoPath = {value.path}
              vidDuration = {value.duration}
              vidRating = {value.rating}
              key = {value.videoId}
            />
            );
          })}
        </div>
      )
    }
         
    </div>

   

    
</div>
  )
}

export default ShowVideos
